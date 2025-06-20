"use client";
import React, { useContext } from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import AuthGuard from "@/app/guards/authGuard/AuthGuard";
import { Bounce, ToastContainer } from "react-toastify";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <AuthGuard>
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="body-wrapper w-full bg-white dark:bg-dark">
            {/* Top Header  */}
            <Header/>
            {/* Body Content */}
            <div
              className={`container mx-auto  py-[30px] `}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </AuthGuard>
  );
}

