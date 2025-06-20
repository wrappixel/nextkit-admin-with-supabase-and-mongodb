"use client";

import React, { useContext } from "react";
import { Button, Sidebar, SidebarItemGroup, SidebarItems, Tooltip } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";
import SimpleBar from "simplebar-react";
import FullLogo from "../../shared/logo/FullLogo";
import { Icon } from "@iconify/react";
import Image from "next/image";
import rocket from "/public/images/backgrounds/rocket.png"
import { CustomizerContext } from "@/app/context/customizerContext";
import AuthContext from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
const SidebarLayout = () => {
  const { isCollapse } = useContext(CustomizerContext);

  const router = useRouter();
  const { logout, user } = useContext(AuthContext);



  const handleLogout = async () => {
    logout()
    router.push('/auth/login');
  };
  return (
    <>
      <div className="xl:block hidden">
        <div className="flex">
          <Sidebar
            className="fixed menu-sidebar bg-white dark:bg-dark z-[3]"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <div className={`${isCollapse === "full-sidebar" ? "px-6" : "px-5"} flex items-center brand-logo overflow-hidden`}>
              <FullLogo />
            </div>

            <SimpleBar className="h-[calc(100vh_-_260px)]">
              <SidebarItems className={`${isCollapse === "full-sidebar" ? "px-6" : "px-4"}`}>
                <SidebarItemGroup className="sidebar-nav">
                  {SidebarContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h5 className="text-link font-bold text-xs dark:text-darklink caption">
                        <span className="hide-menu leading-21">{item.heading?.toUpperCase()}</span>
                        <Icon
                          icon="tabler:dots"
                          className="text-ld block mx-auto leading-6 dark:text-opacity-60 hide-icon"
                          height={18}
                        />
                      </h5>

                      {item.children?.map((child, index) => (
                        <React.Fragment key={child.id && index}>
                          {child.children ? (
                            <div className="collpase-items">
                              <NavCollapse item={child} />
                            </div>
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))} 
                    </React.Fragment>
                  ))}
                </SidebarItemGroup>
              </SidebarItems>
            </SimpleBar>
              {/* Offer Banner */}
            <div className="mt-9 px-6 pb-6">
            <div className="flex w-full bg-lightprimary p-6 rounded-md">
                <div className="lg:w-8/12 w-full">
                 <h5 className="text-base text-link dark:text-darklink">
                  Liked what we offer?
                 </h5>
                 <Button size={"xs"} color={"primary"} as={Link} href="/" className=" mt-2 text-[13px] whitespace-nowrap" >Download Free</Button>
                </div>
                <div className="lg:w-1/2 w-full -mt-4 ml-4 scale-[1] shrink-0">
                <Image src={rocket} alt="rocket" />
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
