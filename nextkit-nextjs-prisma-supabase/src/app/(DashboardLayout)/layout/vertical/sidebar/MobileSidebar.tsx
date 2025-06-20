"use client";
import React, { useContext } from "react";
import { Button, Sidebar, SidebarItemGroup, SidebarItems, Tooltip } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";
import { CustomizerContext } from "@/app/context/customizerContext";
import SimpleBar from "simplebar-react";
import FullLogo from "../../shared/logo/FullLogo";
import { Icon } from "@iconify/react";
import profileimg from "/public/images/profile/user-1.jpg"
import Image from "next/image";
import Link from "next/link";
import rocket from "/public/images/backgrounds/rocket.png"

const MobileSidebar = () => {
  const { selectedIconId, setSelectedIconId } = useContext(CustomizerContext) || {};
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );
  return (
    <>
     <div className="flex">
          <Sidebar
            className="fixed menu-sidebar pt-0 bg-white dark:bg-dark z-[10]"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <div className="px-6 flex items-center brand-logo overflow-hidden">
              <FullLogo />
            </div>
            <SimpleBar className="h-[calc(100vh_-_270px)]">
              <SidebarItems className={`px-6`}>
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
                <div className="lg:w-1/2 w-full -mt-4 ml-2 scale-[1] shrink-0">
                <Image src={rocket} alt="rocket" className="scale-80" />
                </div>
              </div>
            </div>

          </Sidebar>
        </div>
    </>
  );
};

export default MobileSidebar;
