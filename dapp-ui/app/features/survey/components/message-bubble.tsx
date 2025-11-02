import { User2Icon } from "lucide-react";

export default function MessageBubble({ sender }: { sender: boolean }) {
    return (
        <div className="">
            {sender ? (
                <div className="flex flex-row items-center justify-end gap-1 ">
                    <div className="flex flex-col justify-center items-end w-[70%]" >
                        <h1 className=" font-bold text-xs">Nickname</h1>
                        <span className=" text-xs bg-primary/30 px-2 py-1 rounded-2xl ">
                            this is a sample messsage
                        </span>
                    </div>
                    <User2Icon />
                </div>
            ) :
                <div className="flex flex-row items-center gap-1">
                    <User2Icon />
                    <div className="flex flex-col justify-center  w-[70%]" >
                        <h1 className=" font-bold text-xs">Nickname</h1>
                        <span className=" text-xs">
                            this is a sample messsage
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}