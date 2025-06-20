"use client"
import { Button, Select } from "flowbite-react"
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "../shared/CardBox";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const YearlyBreakup = () => {
    const [userInfo , setUserInfo] = useState<string>();
     useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    const capitalizeName = userInfo?.fullname.split("");
    capitalizeName[0] = capitalizeName[0].toLocaleUpperCase();
     setUserInfo(capitalizeName.join(""));
     },[])
    return (
        <>
            <CardBox className="relative bg-lightprimary" >
                <div className="flex items-center gap-6">
                    <div className="lg:w-7/12 md:w-7/12 w-7/12">
                        <h5 className="card-title mb-4">{`Welcome back ${userInfo}`}</h5>
                    </div>
                    <div className="lg:w-5/12 md:w-5/12 w-5/12">
                        <div className="flex justify-center absolute bottom-0 end-2">
                         <img src="https://modernize-tailwind-nextjs-main.vercel.app/_next/static/media/welcome-bg.f53305ca.svg" alt="" className="max-w-40" />
                        </div>
                    </div>
                </div>

            </CardBox>
        </>
    )
}
export { YearlyBreakup }