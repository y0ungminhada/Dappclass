import { expect } from "chai";
import { anyValue } from "@nomicfoundation/hardhat-ethers-chai-matchers/withArgs";
import { network } from "hardhat";
import type { Signer } from "ethers";
import type {
  SurveyFactory,
  QuestionStruct,
  SurveySchemaStruct,
} from "../types/ethers-contracts/SurveyFactory.js";

describe("SurveyFactory Contract", () => {
  let factory: SurveyFactory;
  let owner: Signer;
  let respondent1: Signer;
  let respondent2: Signer;
  let ethersInstance: Awaited<ReturnType<typeof network.connect>>["ethers"];

  beforeEach(async () => {
    ({ ethers: ethersInstance } = await network.connect());
    [owner, respondent1, respondent2] = await ethersInstance.getSigners();
    factory = (await ethersInstance.deployContract("SurveyFactory", [
      ethersInstance.parseEther("50"),
      ethersInstance.parseEther("0.1"),
    ])) as SurveyFactory;
    await factory.waitForDeployment();
  });

  it("should deploy with correct minimum amounts", async () => {
    // TODO: check min_pool_amount and min_reward_amount
    const min_pool_amount = await ethersInstance.provider.getStorage(
      factory.target,
      0n,
    );
    const min_reward_amount = await ethersInstance.provider.getStorage(
      factory.target,
      1n,
    );

    expect(BigInt(min_pool_amount)).to.equal(ethersInstance.parseEther("50"));
    expect(BigInt(min_reward_amount)).to.equal(
      ethersInstance.parseEther("0.1"),
    );
  });

  it("should create a new survey when valid values are provided", async () => {
    // TODO: prepare SurveySchema and call createSurvey with msg.value
    const title = "막무가내 설문조사";
    const description =
      "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.";
    const questions: QuestionStruct[] = [
      {
        question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
        options: ["구글폼 운영자", "탈중앙화된 블록체인", "상관없음"],
      },
    ];
    const surveySchema: SurveySchemaStruct = {
      title,
      description,
      targetNumber: 100,
      questions,
    };

    const createTxPromise = factory.createSurvey(surveySchema, {
      value: ethersInstance.parseEther("100"),
    });
    await expect(createTxPromise)
      .to.emit(factory, "SurveyCreated")
      .withArgs(anyValue);

    const createTx = await createTxPromise;
    expect(createTx.value).to.equal(ethersInstance.parseEther("100"));

    const receipt = await createTx.wait();
    const surveyEvent = receipt?.logs
      .map((log) => {
        try {
          return factory.interface.parseLog(log);
        } catch (error) {
          return undefined;
        }
      })
      .find((parsed) => parsed?.name === "SurveyCreated");

    expect(surveyEvent, "SurveyCreated event not found").to.not.be.undefined;
    expect(surveyEvent!.name).to.equal("SurveyCreated");
    const [surveyAddress] = surveyEvent!.args;
    expect(surveyAddress).to.be.properAddress;

    // TODO: check surveys array length increased
    const surveys = await factory.getSurveys();
    expect(surveys).to.have.lengthOf(1);
    expect(surveys[0]).to.equal(surveyAddress);
  });

  it("should revert if pool amount is too small", async () => {
    // TODO: expect revert when msg.value < min_pool_amount
    await expect(
      factory.createSurvey(
        {
          title: "막무가내 설문조사",
          description:
            "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.",
          targetNumber: 100,
          questions: [
            {
              question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
              options: ["구글폼 운영자", "탈중앙화된 블록체인", "상관없음"],
            },
          ],
        },
        { value: ethersInstance.parseEther("10") },
      ),
    ).to.be.revertedWith("Insufficient pool amount");
  });

  it("should revert if reward amount per respondent is too small", async () => {
    // TODO: expect revert when msg.value / targetNumber < min_reward_amount
    await expect(
      factory.createSurvey(
        {
          title: "막무가내 설문조사",
          description:
            "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.",
          targetNumber: 1000,
          questions: [
            {
              question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
              options: ["구글폼 운영자", "탈중앙화된 블록체인", "상관없음"],
            },
          ],
        },
        { value: ethersInstance.parseEther("50") }, // 50 / 1000 = 0.05 < 0.1 (min_reward_amount)
      ),
    ).to.be.revertedWith("Insufficient reward amount");
  });

  it("should store created surveys and return them from getSurveys", async () => {
    // TODO: create multiple surveys and check getSurveys output
    const surveySchema1: SurveySchemaStruct = {
      title: "막무가내 설문조사",
      description:
        "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.",
      targetNumber: 100,
      questions: [
        {
          question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
          options: ["구글폼 운영자", "탈중앙화된 블록체인", "상관없음"],
        },
      ],
    };
    const surveySchema2: SurveySchemaStruct = {
      title: "막무가내 설문조사",
      description:
        "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.22",
      targetNumber: 20,
      questions: [
        {
          question: "만약 내일 외계인이 나타난다면, 나는....",
          options: [
            "외계인에게 졸라서 우주여행 떠나기",
            "일단 숨고 본다",
            "싸운다",
            "친구가 될 수 있는 온갖 방법을 찾아본다",
          ],
        },
      ],
    };
    const surveysBefore = await factory.getSurveys();
    expect(surveysBefore.length).to.equal(0);

    const createTx1 = await factory.createSurvey(surveySchema1, {
      value: ethersInstance.parseEther("100"),
    });
    await createTx1.wait();

    const surveysMid = await factory.getSurveys();
    expect(surveysMid).to.have.lengthOf(1);

    const createTx2 = await factory.createSurvey(surveySchema2, {
      value: ethersInstance.parseEther("100"),
    });
    await createTx2.wait();

    const surveysAfter = await factory.getSurveys();
    expect(surveysAfter).to.have.lengthOf(2);

    const [firstSurveyAddress, secondSurveyAddress] = surveysAfter;

    const survey1 = await ethersInstance.getContractAt(
      "Survey",
      firstSurveyAddress,
    );

    expect(await survey1.title()).to.equal(surveySchema1.title);
    expect(await survey1.description()).to.equal(surveySchema1.description);
    expect(await survey1.targetNumber()).to.equal(
      BigInt(surveySchema1.targetNumber),
    );
    expect(await survey1.rewardAmount()).to.equal(
      ethersInstance.parseEther("100") / BigInt(surveySchema1.targetNumber),
    );
    const questions1 = await survey1.getQuestions();
    const normalizedQuestions1 = questions1.map((question) => ({
      question: question.question,
      options: [...question.options],
    }));
    expect(normalizedQuestions1).to.deep.equal(surveySchema1.questions);

    const survey2 = await ethersInstance.getContractAt(
      "Survey",
      secondSurveyAddress,
    );

    expect(await survey2.title()).to.equal(surveySchema2.title);
    expect(await survey2.description()).to.equal(surveySchema2.description);
    expect(await survey2.targetNumber()).to.equal(
      BigInt(surveySchema2.targetNumber),
    );
    expect(await survey2.rewardAmount()).to.equal(
      ethersInstance.parseEther("100") / BigInt(surveySchema2.targetNumber),
    );
    const questions2 = await survey2.getQuestions();
    const normalizedQuestions2 = questions2.map((question) => ({
      question: question.question,
      options: [...question.options],
    }));
    expect(normalizedQuestions2).to.deep.equal(surveySchema2.questions);
  });
});
