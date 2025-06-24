"use client";
import "flowbite";
import React, { useState, useEffect, useContext } from "react";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { Icon } from "@iconify/react";
import Profile from "./Profile";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import Link from "next/link";
import Notifications from "./Notifications";



const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const [mobileMenu, setMobileMenu] = useState("");

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };


  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <header
        className={`sticky top-0 z-[2] ${isSticky
          ? "bg-white dark:bg-dark shadow-md fixed w-full"
          : "bg-transparent"
          }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:ps-6 !max-w-full sm:pe-10 $`}
        >
          {/* Mobile Toggle Icon */}
          <span
            onClick={() => setIsOpen(true)}
            className="px-[15px] hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
          >
            <Icon icon="tabler:menu-2" height={20} />
          </span>
          {/* Toggle Icon   */}
          <Navbar.Collapse className="xl:block ">
            <div className="flex gap-0 items-center relative">
              {/* Chat */}
               <Notifications/>
            </div>
          </Navbar.Collapse>


          <div className="block">
            <div className="flex gap-0 items-center">
            <Button
            color={"primary"}
            as={Link}
            size={"md"}
            href="https://www.wrappixel.com/templates/nextkit-free-admin-panel-with-supabase-mongodb/"
            className="w-full rounded-md py-0"
          >
            Download Free
          </Button>
              {/* Profile Dropdown */}
              <Profile  />
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-130">
        <Drawer.Items>
          <MobileSidebar />
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Header;
