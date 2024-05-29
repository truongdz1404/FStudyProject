import { cn } from "@/helpers/utils";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { GrNotification } from "react-icons/gr";
import { useState } from "react";
import { TfiSearch } from "react-icons/tfi";

const LayOut = () => {
    const navigate = useNavigate();
    enum ButtonType {
        HOME = 1,
        POST = 2,
        TOPIC = 3,
    }
    const [activeButton, setActiveButton] = useState<ButtonType | number>(1);
    const ButtonClickStatus = (buttonType: ButtonType) => { 
        switch (buttonType) {
            case 1:
                navigate("/home")
                break;
            case 2:
                navigate("/post")
                break;
            case 3:
                navigate("/topic")
                break;
            default:
                navigate("/home")
                break;
        }
        setActiveButton(buttonType);
    };
    return (
        <div>
            <div
                className={cn(
                    "fixed",
                    "top-0",
                    "left-0",
                    "w-full",
                    "grid grid-cols-7",
                    "bg-white z-50",
                    "h-[10%]"
                )}
            >
                <div className="col-span-2">
                    <div
                        onClick={() => window.location.href="/home"}
                        className={cn(
                            "font-bold",
                            "text-orange-500",
                            "ml-[5%]",
                            "w-[10%]",
                            "cursor-pointer",
                            "text-[150%]",
                            " mt-[3%]"
                        )}
                    >
                        FStudyForum
                    </div>
                </div>
                <div className="col-span-3">
                    <div className={cn("flex justify-center")}>
                        <input
                            type="search"
                            className={cn(
                                "rounded-full",
                                "outline-none",
                                "bg-gray-200",
                                " w-[90%]",
                                "mt-[2%]",
                                "h-[7vh]",
                                "pl-[7%]",
                                "pr-[2%]"
                            )}
                            placeholder="Search"
                        />
                        <div className={cn("absolute", "top-[43%]", "right-[67%]")}>
                        <TfiSearch />
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div
                        className={cn(
                            "flex",
                            "items-center",
                            "justify-center",
                            "h-[10vh]",
                            "mt-[0.5%]",
                            "ml-[10%]"
                        )}
                    >
                        <div
                            className={cn(
                                "flex",
                                "gap-[10%]",
                                "rounded-full",
                                "w-[30%]",
                                "cursor-pointer",
                                "hover:bg-gray-200",
                                "ml-[33%]"
                            )}
                        >
                            <div
                                className={cn(
                                    "font-bold",
                                    "text-3xl",
                                    "ml-[12%]",
                                    "flex",
                                    "pb-[5%]"
                                )}
                            >
                                +
                            </div>
                            <div
                                className={cn(
                                    "text-[100%]",
                                    "mt-[8%]",
                                    "ml-[-3%]"
                                )}
                            >
                                Create
                            </div>
                        </div>
                        <div
                            className={cn(
                                "p-[3%]",
                                "rounded-full",
                                "cursor-pointer",
                                "hover:bg-gray-200"
                            )}
                        >
                            <GrNotification />
                        </div>
                    </div>
                </div>
            </div>
            <hr
                className={cn(
                    "border-gray-200",
                    "w-full",
                    "fixed",
                    "top-[10%]",
                    "z-50",
                    "bg-white"
                )}
            />
            <div
                className={cn(
                    "h-[100vh]",
                    "border-l",
                    "border-gray-200",
                    "absolute",
                    "ml-[18%]",
                    "fixed",
                    "top-[10%]",
                    "z-50"
                )}
            ></div>

            <div className="flex">
                <div
                    className={cn(
                        "fixed",
                        "top-[12%]",
                        "left-[1%]",
                        "h-full",
                        "w-2/12",
                        "bg-white",
                        "z-50"
                    )}
                >
                    <div
                        className={cn(
                            "w-10/12",
                            "m-2",
                            "cursor-pointer",
                            "p-2",
                            "rounded-md",
                            "hover:bg-gray-200",                          
                           {"bg-slate-300": activeButton == ButtonType.HOME}
                        )}                       
                        onClick={() => ButtonClickStatus(ButtonType.HOME)}
                    >
                        <div className="ml-2">Home</div>
                    </div>
                    <div
                        className={cn(
                            "w-10/12",
                            "ml-2",
                            "mt-[-4%]",
                            "cursor-pointer",
                            "p-2",
                            "rounded-md",
                            "hover:bg-gray-200",
                            {"bg-slate-300": activeButton == ButtonType.POST}
                        )}
                        onClick={() => ButtonClickStatus(ButtonType.POST)}
                        tabIndex={0}
                    >
                        <div className={cn("ml-2", "cursor-pointer")}>Post</div>
                    </div>
                    <div
                        className={cn(
                            "w-10/12",
                            "ml-2",
                            "cursor-pointer",
                            "p-2",
                            "rounded-md",
                            "hover:bg-gray-200",
                            {"bg-slate-300": activeButton == ButtonType.TOPIC}
                        )}
                        onClick={() => ButtonClickStatus(ButtonType.TOPIC)}
                        tabIndex={0}
                    >
                        <div className={cn("ml-2", "cursor-pointer")}>
                            Topics
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn("mt-[5%]", "w-[80%]", 
                "ml-[19%]", "h-[1000vh]",    
                )}
            >
                <Outlet />
            </div>
        </div>
    );
};
export default LayOut;
