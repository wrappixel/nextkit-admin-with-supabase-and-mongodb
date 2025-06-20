"use client";

import { Icon } from "@iconify/react";
import { Button, Dropdown, Spinner } from "flowbite-react";
import React, { useState, useEffect } from "react";
import * as profileData from "./Data";
import Link from "next/link";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null); 

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  async function handleLogout() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });
      const result = await response.json();
      console.log(result);
      localStorage.removeItem("userInfo");
      window.location.href = "/";
    } catch (error) {
      console.log(error, "Logout failed!");
    }
  }

  return (
    <div className="relative group/menu ps-15 shrink-0">
      <Dropdown
        label=""
        className="w-screen sm:w-[200px] pb-6 pt-4 rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            {userInfo?.image ? (
              <Image
                src="/images/profile/user-1.jpg"
                alt="logo"
                height="35"
                width="35"
                className="rounded-full"
              />
            ) : (
              <span className="size-[35px] rounded-full bg-lightprimary flex items-center justify-center text-primary border border-primary text-lg font-medium">
                {userInfo?.fullname?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        )}
      >
        <SimpleBar>
          {profileData.profileDD.map((items, index) => (
            <Dropdown.Item
              as={Link}
              href={items.url}
              className="px-4 py-2 flex justify-between items-center bg-hover group/link w-full"
              key={index}
            >
              <div className="w-full">
                <div className="ps-0 flex items-center gap-3 w-full">
                  <Icon
                    icon={items.icon}
                    className="text-lg text-bodytext dark:text-darklink group-hover/link:text-primary"
                  />
                  <div className="w-3/4 ">
                    <h5 className="mb-0 text-sm text-bodytext dark:text-darklink group-hover/link:text-primary">
                      {items.title}
                    </h5>
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </SimpleBar>

        <div className="pt-2 px-4">
          <Button
            color={"outlineprimary"}
            size={"md"}
            className="w-full rounded-md py-0 flex items-center gap-2 disabled:hover:bg-none"
            onClick={handleLogout}
          >
            {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
