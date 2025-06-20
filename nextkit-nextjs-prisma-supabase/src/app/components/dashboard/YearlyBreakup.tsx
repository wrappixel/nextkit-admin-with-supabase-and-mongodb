"use client"
import dynamic from "next/dynamic";
import CardBox from "../shared/CardBox";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/app/context/AuthContext";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const YearlyBreakup = () => {
  const { user } = useContext(AuthContext);

  const userName = user?.displayName || "Mathew Anderson";
   const displayName = userName.split("");
   displayName[0] = displayName[0].toLocaleUpperCase();
    return (
        <>
            <CardBox className="relative bg-primary/10" >
                <div className="flex items-center gap-6">
                    <div className="lg:w-7/12 md:w-7/12 w-7/12">
                        <h5 className="card-title mb-4">{`Welcome back ${displayName.join("")}`}</h5>
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