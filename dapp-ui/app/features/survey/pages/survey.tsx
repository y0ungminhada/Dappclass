import { SendIcon, User2Icon } from "lucide-react"
import { Form } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import MessageBubble from "../components/message-bubble"
import type { Route } from "./+types/survey"

export const action = async ({ request }: Route.ActionArgs) => {//원래는 검증 해야됨
    const formData = await request.formData();
    const answers = Object.fromEntries(formData);
    console.log(Object.values(answers).map(str => Number(str)));
};

interface Questions {
    question: string;
    options: string[];
}
const questions: Questions[] = [
    {
        question: "이 서비스의 전반적인 만족도는 어느 정도인가요?",
        options: ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "인터페이스가 직관적이라고 느끼셨나요?",
        options: ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "페이지 로딩 속도에 만족하시나요?",
        options: ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "원하는 정보를 찾기 쉬웠나요?",
        options: ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "디자인이 보기 좋다고 느끼셨나요?",
        options: ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "설문 참여 과정이 간단했나요?",
        options: ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "오류나 버그를 자주 겪으셨나요?",
        options: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
    },
    {
        question: "다시 이용할 의향이 있으신가요?",
        options: ["전혀 없다", "별로 없다", "보통이다", "어느 정도 있다", "매우 있다"],
    },
    {
        question: "친구나 동료에게 추천하시겠습니까?",
        options: ["전혀 추천하지 않겠다", "추천하지 않겠다", "보통", "추천하겠다", "강력히 추천하겠다"],
    },
    {
        question: "전반적인 사용 경험은 기대에 부합했나요?",
        options: ["전혀 부합하지 않음", "부합하지 않음", "보통", "대체로 부합", "완전히 부합"],
    },
]

export default function Survey() {
    return (
        <div className="grid grid-cols-3 w-screen gap-3">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle className="text-3xl font-extrabold">Sample Survey </CardTitle>
                    <CardDescription>
                        This is a sample survey. Let's join to get reward!
                    </CardDescription>
                </CardHeader>
                {true ? (
                    <CardContent className="overflow-y-auto h-[70vh]">
                        <h1 className="text-xl font-semibold pb-4">Survey Progress</h1>
                        <div className="gap-5 grid grid-cols-2">
                            {
                                questions.map((q, i) => (
                                    <div className="flex flex-col  ">
                                        <h1 className="font-bold ">{q.question}</h1>
                                        <div className="flex flex-col pl-2 gap-1">
                                            {q.options.map((o, j) => (
                                                <div className="flex flex-row justify-center items-center relative">
                                                    <div className="absolute left-2 text-xs font-semibold ">{o}</div>
                                                    <div className="w-full h-5 bg-gray-200 rounded-full" >
                                                        <div className="bg-primary/30 w-7 h-5 rounded-full" ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <Form method="post" className="grid grid-cols-2">
                            {questions.map((q, i) => (
                                <div className="flex flex-col">
                                    <span className="mt-3 mb-1">{q.question}</span>
                                    {q.options.map((o, j) => (
                                        <label className="flex items-center gap-1">
                                            <Input
                                                type="radio"
                                                name={i.toString()}
                                                value={j.toString()}
                                                className="hidden peer"
                                            ></Input>
                                            <span
                                                className="w-4 h-4 rounded-full border-2 
                                                               peer-checked:bg-primary"
                                            ></span>
                                            <span className="font-semibold">{o}</span>
                                        </label>
                                    ))}
                                </div>
                            ))}
                            <Button type="submit" className="w-full mt-5">Submit</Button>
                        </Form>
                    </CardContent>
                )
                }
            </Card>
            <Card className="col-span-1 ">
                <CardHeader>
                    <CardTitle>Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 overflow-y-auto h-[70vh]" >
                    {Array.from({ length: 20 }).map((_, i) => (
                        <MessageBubble sender={i % 2 == 0} />
                    ))}

                </CardContent>
                <CardFooter className="w-full">
                    <Form className="flex flex-row items-center relative w-full">
                        <input type="text" placeholder="Enter your message..."
                            className="border-1 w-full h-8 rounded-2xl px-2 text-xs "
                        />
                        <Button className="flex flex-row items-center justify-center  w-6 h-6 absolute right-2">
                            <SendIcon />
                        </Button>
                    </Form>
                </CardFooter>
            </Card>
        </div>
    )
} 