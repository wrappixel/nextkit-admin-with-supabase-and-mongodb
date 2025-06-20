
import { Icon } from "@iconify/react";
import Link from "next/link";
import * as MessagesData from "./Data";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Badge, Button, Dropdown, DropdownItem } from "flowbite-react";
import { getTimeAgo } from "@/utils/getTimeAge";


const Notifications = () => {
  const [notifications , setNotifications] = useState([]);
  async function handleNotifications(){
     try{
       const response = await fetch("/api/product");
       const result = await response.json();
       const notificationInfo = result.data.map((item:any) => {
        return {
          title:`${item.customer} has purchased ${item.name}`,
          subtitle: `${getTimeAgo(item.createDate)}`
        }
       });
       setNotifications(notificationInfo);
     }catch(error){
      console.log(error);
     }
  }
  useEffect(() => {
    handleNotifications();
  },[])
  return (
    <div className="relative group/menu px-15">
      <Dropdown
        label=""
        className="w-screen sm:w-[300px] py-6 rounded-sm custom-dropdown"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="relative">
            <span className="relative after:absolute after:w-10 after:h-10 after:rounded-full hover:text-primary after:-top-1/2 hover:after:bg-lightprimary text-link dark:text-darklink rounded-full flex justify-center items-center cursor-pointer group-hover/menu:after:bg-lightprimary group-hover/menu:text-primary">
              <Icon icon="tabler:bell-ringing" height={20} />
            </span>
            <span className="rounded-full absolute -end-[6px] -top-[5px]  text-[10px] h-2 w-2 bg-primary flex justify-center items-center"></span>
          </div>
        )}
      >
        <div className="flex items-center  px-6 justify-between">
          <h3 className="mb-0 text-lg font-semibold text-ld">Notification</h3>
        </div>
        <SimpleBar className="max-h-80 mt-3">
          {notifications.map((item:any, index) => (
            <DropdownItem
              className="px-6 py-2 flex justify-between items-center bg-hover group/link w-full"
              key={index}
            >
              <div className="flex items-start">
                <div className="ps-0">
                  <h5 className="mb-1 text-sm  group-hover/link:text-primary max-w-60 truncate">
                    {item.title}
                  </h5>
                  <span className="text-xs block text-start font-medium truncate text-darklink">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </DropdownItem>
          ))}
        </SimpleBar>
        <div className="pt-5 px-6">
          <Button
          as={Link}
          href="/utilities/table"
            color={"primary"}
            className="w-full border border-primary text-primary hover:bg-primary hover:text-white rounded-md"
            pill
            outline
          >
            See All Orders
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
