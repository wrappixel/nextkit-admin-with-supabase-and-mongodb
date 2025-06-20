"use client"
import { Button, Label, Spinner, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react"
import { Bounce, toast } from "react-toastify";
import { supabase } from '@/app/guards/supabase/supabaseClient';
import useAuth from "@/app/guards/authGuard/UseAuth";

export const Profile = () => {

    const [userinfo, setUserinfo] = useState<any>();
    const { user } = useAuth();
    useEffect(() => {
        if(user){
            setUserinfo(user);
        }
    }, [user])

    const initalUserInfo = {
        email: "",
        fullname: "",
        password: ""
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
            dispatch({ type: "SET_FULLNAME", payload: userinfo.displayName });
            dispatch({ type: "SET_EMAIL", payload: userinfo.email });
            dispatch({ type: "SET_PASSWORD", payload: "12345" });
        }
    }, [userinfo]);

    async function handleProfileUpdate() {
        setIsLoading(true);
        if (process.env.NODE_ENV === "development") {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    full_name: "New Name",
                    avatar_url: "https://example.com/avatar.png",
                },
            });

            if (error) {
                toast.error("Failed to update profile!", {
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
            } else {
                console.log("User updated", data);
            }
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

    }


    return (<>
        <form action="" onSubmit={(e) => {
            handleProfileUpdate();
            e.preventDefault();
        }}>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fullname1" className="font-medium">Fullname</Label>
                    </div>
                    <TextInput id="fullname1" value={userInfo.fullname} onChange={(e) => dispatch({ type: "SET_FULLNAME", payload: e.target.value })} type="text" className="form-control" placeholder="Enter your fullname" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" className="font-medium">Email</Label>
                    </div>
                    <TextInput id="email1" value={userInfo.email} onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })} type="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" className="font-medium">Password</Label>
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