"use client"
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo"
import CardBox from "../shared/CardBox"
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react"
import Link from "next/link"
import { useReducer, useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Bounce, toast } from "react-toastify"

const initalUserInfo = {
    email: "",
    password: ""
}

export const Login = () => {
    const router = useRouter();
    function reducer(userInfo: any, action: { type: string, payload: string }) {
        switch (action.type) {
            case "SET_EMAIL":
                return { ...userInfo, email: action.payload };
                break;
            case "SET_PASSWORD":
                return { ...userInfo, password: action.payload };
                break;
            default:
                return userInfo
        }
    }
    const [userInfo, dispatch] = useReducer(reducer, initalUserInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    async function handleLogin() {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            const result = await response.json();
            localStorage.setItem("userInfo", JSON.stringify(result))

            if (response.ok) {
                window.location.href = "/";
                console.log(response);
                setIsLoading(false);
            } else {
                toast.error(result.error || "Login failed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    className: "!font-semibold !font-inherit !text-[#EF4444]",
                });
                setIsLoading(false);
                setIsError(true);
            }
        } catch (error) {
            console.log(error, "Login failed! ");
            setIsError(true);
        }
    }

    return (<>
        <div className="h-screen w-full flex justify-center items-center bg-lightprimary">
            <div className="md:min-w-[400px] min-w-max">
                <CardBox>
                    <div className="flex justify-center mb-8">
                        <FullLogo />
                    </div>
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Email" className="font-medium" />
                                </div>
                                <TextInput id="email1" value={userInfo.email} onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })} type="email" className={`${isError ? 'active-error' : ''} form-control`} placeholder="Enter your email" required />
                            </div>
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="password1" value="Password" className="font-medium" />
                                </div>
                                <TextInput value={userInfo.password} onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })} id="password1" type="password" className={`${isError ? 'active-error' : ''} form-control`} placeholder="Enter your password" required />
                            </div>
                            <div className="flex flex-wrap gap-6 items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" className="checkbox" checked readOnly />
                                    <Label className="text-link font-normal text-sm" htmlFor="remember">Remember this device</Label>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} color={"primary"} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none" >
                            {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
                            Sign In
                        </Button>
                        <div className="flex items center gap-2 justify-center mt-6 flex-wrap">
                            <p className="text-base font-medium text-muted dark:text-darklink">New to NextKit?
                            </p>
                            <Link href="/auth/register" className="text-sm font-medium text-primary hover:text-primaryemphasis">Create an account</Link>
                        </div>
                    </form>
                    <div className=" w-full gap-2 py-1.5 px-4 mx-auto justify-center rounded-md bg-lightsuccess text-success text-[13px] text-center font-medium mt-6 mb-2">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Icon icon="cuida:alert-outline" width={16} height={16} classNametext-success />
                            SignIn as Admin
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <div className="flex items-start gap-2">
                                <span className="font-semibold">Demo Email:</span>
                                <p className="text-sm">admin@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <div className="flex items-start gap-2">
                                <span className="font-semibold">Demo password:</span>
                                <p className="text-sm">12345</p>
                            </div>
                        </div>
                    </div>
                </CardBox>
            </div>
        </div>
    </>)
}