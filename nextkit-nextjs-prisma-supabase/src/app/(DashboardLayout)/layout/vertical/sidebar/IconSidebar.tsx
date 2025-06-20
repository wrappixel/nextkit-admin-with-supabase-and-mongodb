"use-client";
import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Miniicons from "./MiniSidebar";
import SimpleBar from "simplebar-react";
import { CustomizerContext } from '@/app/context/customizerContext'
import Logo from "../../shared/logo/Logo";

export const IconSidebar = () => {
  const { selectedIconId, setSelectedIconId, setIsCollapse } = useContext(CustomizerContext) || {};
  const [activeIcon, setActiveIcon] = useState(selectedIconId);

  // Effect to store and retrieve selectedIconId from localStorage
  useEffect(() => {
    const storedIconId = localStorage.getItem("selectedIconId");
    if (storedIconId) {
      setActiveIcon(parseInt(storedIconId));
    }
  }, []);

  // Handle icon click
  const handleClick = (id: any) => {
    setSelectedIconId(id);
    setIsCollapse("full-sidebar");
    setActiveIcon(id);
    localStorage.setItem("selectedIconId", id); // Store selectedIconId in localStorage
  };

  return (
    <>
      <div className="px-4 py-6 pt-7 logo">
        <Logo />
      </div>
      <SimpleBar className="miniicons">
        {Miniicons.map((links, index) => (
          <button
            key={index}
            className={`h-12 w-12 hover:text-primary text-darklink hover:bg-lightprimary rounded-full flex justify-center items-center mx-auto mb-2 ${links.id === activeIcon ? "text-primary bg-lightprimary" : "text-darklink bg-transparent"
              }`}
            type="button"
            onClick={() => handleClick(links.id)}
          >
            <Icon icon={links.icon} height={24} className="dark:bg-blue" />
          </button>
        ))}
      </SimpleBar>
    </>
  );
};



