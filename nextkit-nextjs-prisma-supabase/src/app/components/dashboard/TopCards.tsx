"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "../shared/CardBox";
import { useEffect, useState } from "react";
import { reduce } from "lodash";

export default function TopCards(){
    const [totalProducts , setTotalProducts] = useState(0);
    const [totalSales , setTotalSales] = useState(0);
    const [currentMonthSales , setcurrentMonthSales] = useState(0);
    const [totalCustomers , setTotalCustomer] = useState(0);
const Metrics = [
    {
        id: "1",
        metric: "Products Sold",
        value: totalProducts,
        icon: "icon-park-outline:sales-report",
        bgColor: "bg-purple/10",
        textColor: "text-purple",
        subTitle: "Number of items sold"
    },
    {
        id: "2",
        metric: "Total Sales",
        value: totalSales,
        icon: "proicons:box",
        bgColor: "bg-lighterror",
        textColor: "text-error",
        subTitle: "Cumulative sales revenue"
    },
    {
        id: "3",
        metric: "Monthly Sales",
        value: currentMonthSales,
        icon: "material-symbols:inventory-2-outline",
        bgColor: "bg-lightwarning",
        textColor: "text-warning",
        subTitle: "Sales generated"
    },
    {
        id: "4",
        metric: "Total Customers",
        value: totalCustomers,
        icon: "ph:users-three-light",
        bgColor: "bg-lightsuccess",
        textColor: "text-success",
        subTitle: "Customers acquired"
    },
];

      async function handleOrders(){
    try{
     const response = await fetch("/api/product");
     const result = await response.json();
const totalSales = result.data.reduce((reducer: number, item: { quantity: any }) => {
  return reducer + Number(item.quantity);
}, 0); 
     setTotalProducts(totalSales);
     setTotalCustomer(result.data.length);
    }catch(error){
      console.log(error);
    }
  };
    async function handleMonthlyEarning(){
        try{
        const response = await fetch("/api/sales");
        const result = await response.json();
        const currentSalesInfo = result.data["8months"].series[1].data;
        const currentMonthSales = currentSalesInfo[currentSalesInfo.length -  1];
        setcurrentMonthSales(currentMonthSales);
        const allSalesInfo = result.data["8months"].series[1].data;
        const totalSales = allSalesInfo.reduce((reducer: any , item: any) => {
            return reducer + item
        })
        setTotalSales(totalSales);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
     handleOrders();
     handleMonthlyEarning();
    },[])
    return (
        <>
        <div className="grid grid-cols-12 gap-6">
            {
                Metrics.map((item) => (
            <div key={item.id} className="lg:col-span-3 md:col-span-6 col-span-12 ">
                 <CardBox className="flex flex-col" >
                    <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h5 className="text-base font-bold text-dark">{item.metric}</h5>
                        <span className="text-[13px]" >{item.subTitle}</span>
                    </div>
                    <span className={`size-11 rounded-full flex justify-center items-center ${item.bgColor}`}>
                        <Icon icon={item.icon} className={item.textColor} width={24} height={24} />
                    </span>
                 </div>
                 <h5 className="text-xl font-semibold text-dark mt-3">{` ${item.metric.toLocaleLowerCase().includes('sales') ? '$' : ''} ${item.value}`}</h5>
                 </CardBox>
            </div>
                ))
            }
        </div>
        </>
    )
}