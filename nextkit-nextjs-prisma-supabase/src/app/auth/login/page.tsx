"use client"
import CardBox from "@/app/components/shared/CardBox";
import React from "react";
import SocialButtons from "../authforms/SocialButtons";
import AuthLogin from "../authforms/AuthLogin";
import Link from "next/link";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import { Icon } from "@iconify/react/dist/iconify.js";

const BoxedLogin = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkprimary">
        <div className="flex h-full justify-center items-center px-4">
          <CardBox className="md:w-[400px] w-full border-none">
            <div className="mx-auto mb-6">
              <FullLogo />
            </div>
            <SocialButtons title="or sign in with" />
            <AuthLogin />
            <div className="flex gap-2 text-base text-ld font-medium mt-4  items-center justify-center">
              <p>New to NextKit?</p>
              <Link
                href={"/auth/register"}
                className="text-primary text-sm font-medium"
              >
                Create an account
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  );
};

export default BoxedLogin;
