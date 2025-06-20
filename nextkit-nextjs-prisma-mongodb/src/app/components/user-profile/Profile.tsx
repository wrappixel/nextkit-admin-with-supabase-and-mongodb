"use client"
import { Button, Label, Spinner, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react"
import { Bounce, toast } from "react-toastify";

export const Profile = () => {

    const [userinfo, setUserinfo] = useState<any>();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo")!);
        console.log(user);
        setUserinfo(user);
    }, [])

    const initalUserInfo = {
        email: "",
        fullname: "",
        password:""
    }

    function reducer(userInfo: any, action: { type: string, payload: string }) {
        switch (action.type) {
            case "SET_EMAIL":
                return { ...userInfo, email: action.payload };
                break;
            case "SET_FULLNAME":
                return { ...userInfo, fullname: action.payload };
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

    useEffect(() => {
        if (userinfo) {
            dispatch({ type: "SET_FULLNAME", payload: userinfo.fullname });
            dispatch({ type: "SET_EMAIL", payload: userinfo.email });
            dispatch({ type: "SET_PASSWORD", payload: "12345" });
        }
    }, [userinfo]);

    async function handleProfileUpdate() {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ fullname: userInfo.fullname, email: userInfo.email , password: userInfo.password })
            });
            const result = await response.json();
            console.log("updated result", result);
            setIsLoading(false);
            if (response.ok) {
                toast.success('Profile updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    className: "!font-semibold !font-inherit !text-[#00C853]",
                });
            } else {
                toast.error('Modification not allowed in Demo Mode!', {
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
            }
        } catch (error) {
            console.log(error, "Failed to updated user profile")
        }
    }


    return (<>
        <form action="" onSubmit={(e) => {
            handleProfileUpdate();
            e.preventDefault();
        }}>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fullname1" value="Fullname" className="font-medium" />
                    </div>
                    <TextInput id="fullname1" value={userInfo.fullname} onChange={(e) => dispatch({ type: "SET_FULLNAME", payload: e.target.value })} type="text" className="form-control" placeholder="Enter your fullname" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Email" className="font-medium" />
                    </div>
                    <TextInput id="email1" value={userInfo.email} onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })} type="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password" className="font-medium" />
                    </div>
                    <TextInput id="password1" value={userInfo.password} onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })} type="password" className="form-control" placeholder="Enter your password" required />
                </div>
            </div>
            <Button type="submit" disabled={isLoading} color={"primary"} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none" >
                {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
                Update Profile
            </Button>
        </form>
    </>)
}