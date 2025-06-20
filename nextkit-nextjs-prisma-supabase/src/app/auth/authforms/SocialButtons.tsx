"use client";
import Link from "next/link";
import React, { useContext } from "react";
import Google from "/public/images/svgs/google-icon.svg";
import github from "/public/images/svgs/logos--github-icon.svg";
import Image from "next/image";
import { HR, HRText } from "flowbite-react";

import AuthContext from "@/app/context/AuthContext";

interface MyAppProps {
  title?: string;
}

const SocialButtons: React.FC<MyAppProps> = ({ title }) => {
  const { loginWithProvider }: any = useContext(AuthContext);

  const handleGoogle = async () => {
    try {
      await loginWithProvider("google");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleGithub = async () => {
    try {
      await loginWithProvider("github");
    } catch (error) {
      console.error("GitHub login failed", error);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-8 my-4 mt-2">
        <div
          onClick={handleGoogle}
          className="px-4 py-2.5 border-border border dark:border-darkborder flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld cursor-pointer"
        >
          <Image src={Google} alt="google" height={18} width={18} /> Google
        </div>
        <div
          onClick={handleGithub}
          className="px-4 py-2.5 border-border border dark:border-darkborder flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld cursor-pointer"
        >
          <Image src={github} alt="google" height={18} width={18} />
          Github
        </div>
      </div>
      {/* Divider */}
      <HRText text={`${title}`} className="!border-t border-border dark:border-darkborder !bg-transparent" />
    </>
  );
};

export default SocialButtons;
