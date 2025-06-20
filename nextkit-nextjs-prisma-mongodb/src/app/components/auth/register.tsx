"use client"
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo"
import CardBox from "../shared/CardBox"
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react"
import Link from "next/link"
import { useReducer, useState } from "react"
import { useRouter } from "next/navigation"
import { Bounce, toast } from "react-toastify"

const InitialUserInfo = {
    fullname: "",
    email: "",
    password: ""
}

export const Register = () => {
    function reducer(userInfo: any, action: { type: string, payload: string }) {
        switch (action.type) {
            case "SET_FULLNAME":
                return { ...userInfo, fullname: action.payload };
                break;

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
    const [userInfo, dispatch] = useReducer(reducer, InitialUserInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);
    const router = useRouter();

    async function handleRegister() {
        setIsLoading(true)
        try {
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userInfo)
            });
            const result = await response.json();
          localStorage.setItem("userInfo" , JSON.stringify(result))
            if (response.ok) {
               window.location.href="/"
            }else{
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
                setIsError(true);
                  setIsLoading(false);
            }
        } catch (error) {
            console.log(error, "Failed to register user!")
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
                        handleRegister();
                    }} >
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name1" value="Full Name" className="font-medium" />
                                </div>
                                <TextInput id="name1" onChange={(e) => dispatch({ type: "SET_FULLNAME", payload: e.target.value })} value={userInfo.fullname} type="text" className={`${isError ? 'active-error' : ''} form-control`} placeholder="Enter your fullname" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Email" className="font-medium" />
                                </div>
                                <TextInput id="email1" type="email" onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })} value={userInfo.email} className={`${isError ? 'active-error' : ''} form-control`} placeholder="Enter your email" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password1" value="Password" className="font-medium" />
                                </div>
                                <TextInput id="password1" type="password" onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })} value={userInfo.password} className={`${isError ? 'active-error' : ''} form-control`} placeholder="Enter your password" required />
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} color={"primary"} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none" >
                            {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
                            Sign Up
                        </Button>
                        <div className="flex items center gap-2 justify-center mt-6 flex-wrap">
                            <p className="text-base font-medium text-muted dark:text-darklink">Already have an account?
                            </p>
                            <Link href="/auth/login" className="text-sm font-medium text-primary hover:text-primaryemphasis">Sign In</Link>
                        </div>
                    </form>
                </CardBox>
            </div>
        </div>
    </>)
}