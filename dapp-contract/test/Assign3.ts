import { expect } from "chai";
import { network } from "hardhat";


interface Question {
    question: string;
    options: string[];
}

describe("Survey init", () => {

    const title = "막무가내 설문조사라면";

    const description =

        "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.";

    const questions: Question[] = [

        {

            question: "누가 내 응답을 관리할때 더 솔직할 수 있을까요?",

            options: [

                "구글폼 운영자",

                "탈중앙화된 블록체인 (관리주체 없으며 모든 데이터 공개)",

                "상관없음",

            ],

        },

    ];



    const getSurveyContractAndEthers = async (survey: {

        title: string;

        description: string;

        targetNumber: number;

        questions: Question[];

    }) => {

        const { ethers } = await network.connect();

        const value = ethers.parseEther("100"); //설문 배포할 때 예치할 금액

        const cSurvey = await ethers.deployContract("Survey", [

            survey.title,

            survey.description,

            survey.targetNumber,

            survey.questions,

        ], {
            value,
        });

        await cSurvey.waitForDeployment();

        return { ethers, cSurvey };

    };



    describe("Deployment", () => {

        it("should store survey info correctly", async () => {
            const surveyInput = {
                title,
                description,
                targetNumber: 100,
                questions,
            };
            const { cSurvey } = await getSurveyContractAndEthers(surveyInput);
            expect(await cSurvey.title()).to.equal(title);
            expect(await cSurvey.description()).to.equal(description);
            expect(await cSurvey.targetNumber()).to.equal(BigInt(surveyInput.targetNumber));

        });

        it("should calculate rewardAmount correctly", async () => {
            const surveyInput = {
                title,
                description,
                targetNumber: 100,
                questions,
            };
            const { cSurvey } = await getSurveyContractAndEthers(surveyInput);
            const deployTx = cSurvey.deploymentTransaction();
            const sentValue = deployTx?.value ?? 0n;
            expect(await cSurvey.rewardAmount()).to.equal(
                sentValue / BigInt(surveyInput.targetNumber)
            );
        });

    });


    describe("Questions and Answers", () => {

        it("should return questions correctly", async () => {
            const surveyInput = {
                title,
                description,
                targetNumber: 100,
                questions,
            };
            const { cSurvey } = await getSurveyContractAndEthers(surveyInput);
            const onchainQuestions = await cSurvey.getQuestions();
            const normalized = onchainQuestions.map((q: { question: string; options: string[] }) => ({
                question: q.question,
                options: [...q.options],
            }));
            expect(normalized).to.deep.equal(surveyInput.questions);
        });

        it("should allow valid answer submission", async () => {

            const surveyInput = {
                title,
                description,
                targetNumber: 100,
                questions,
            };

            const { ethers, cSurvey } = await getSurveyContractAndEthers(surveyInput);
            const [_, respondent] = await ethers.getSigners();
            const respondentAddress = await respondent.getAddress();

            const validAnswers = [1];

            await cSurvey
                .connect(respondent)
                .submitAnswer({ respondent: respondentAddress, answers: validAnswers });

            const onchainAnswers = await cSurvey.getAnswers();
            expect(onchainAnswers).to.have.lengthOf(1);

            const normalized = onchainAnswers.map((a: { respondent: string; answers: any[] }) => ({
                respondent: a.respondent,
                answers: a.answers.map((x: any) => Number(x)),
            }));

            expect(normalized[0].respondent).to.equal(respondentAddress);
            expect(normalized[0].answers).to.deep.equal(validAnswers);
        });

        it("should revert if answer length mismatch", async () => {

            const surveyInput = {
                title,
                description,
                targetNumber: 100,
                questions,
            };
            const { ethers, cSurvey } = await getSurveyContractAndEthers(surveyInput);
            const [_, respondent] = await ethers.getSigners();
            const respondentAddress = await respondent.getAddress();

            // Case 1: 질문 수보다 적은 답변 (0 vs 1)
            await expect(
                cSurvey
                    .connect(respondent)
                    .submitAnswer({ respondent: respondentAddress, answers: [] })

            ).to.be.revertedWith("Mismatched answers length");

            // Case 2: 질문 수보다 많은 답변 (2 vs 1)
            await expect(
                cSurvey
                    .connect(respondent)
                    .submitAnswer({ respondent: respondentAddress, answers: [0, 1] })
            ).to.be.revertedWith("Mismatched answers length");

        });

        it("should revert if target reached", async () => {

            const surveyInput = {
                title,
                description,
                targetNumber: 1, // test를 위해 targetNumber를 1로 설정
                questions,
            };
            const { ethers, cSurvey } = await getSurveyContractAndEthers(surveyInput);
            const [signer0, signer1] = await ethers.getSigners();
            const addr0 = await signer0.getAddress();
            const addr1 = await signer1.getAddress();

            await cSurvey
                .connect(signer0)
                .submitAnswer({ respondent: addr0, answers: [1] });

            await expect(
                cSurvey
                    .connect(signer1)
                    .submitAnswer({ respondent: addr1, answers: [1] })
            ).to.be.revertedWith("This survey has been ended");

        });

    });



    describe("Rewards", () => {

        it("should pay correct reward to respondent", async () => {

            const surveyInput = {
                title,
                description,
                targetNumber: 100,
                questions,
            };
            const { ethers, cSurvey } = await getSurveyContractAndEthers(surveyInput);
            const [_, respondent] = await ethers.getSigners();
            const respondentAddress = await respondent.getAddress();
            const reward = await cSurvey.rewardAmount();
            const contractAddress = await cSurvey.getAddress();
            const provider = ethers.provider;

            const beforeRespondent = await provider.getBalance(respondentAddress);
            const beforeContract = await provider.getBalance(contractAddress);

            // 트랜잭션 보내고 receipt 받기 -> gas 비용 계산 위해서
            const tx = await cSurvey
                .connect(respondent)
                .submitAnswer({ respondent: respondentAddress, answers: [1] });
            const receipt = await tx.wait();
            if (!receipt) throw new Error("tx failed");

            // 제출 후 스냅샷
            const afterRespondent = await provider.getBalance(respondentAddress);
            const afterContract = await provider.getBalance(contractAddress);

            const gasUsed = receipt.gasUsed;
            const gasPrice = (receipt as any).effectiveGasPrice ?? (receipt as any).gasPrice;
            const gasCost = gasUsed * gasPrice;

            // 검증: 컨트랙트는 reward만큼 감소, 응답자는 reward - 가스비만큼 증가
            expect(afterContract).to.equal(beforeContract - reward);
            expect(afterRespondent).to.equal(beforeRespondent + reward - gasCost);
        });

    });

});