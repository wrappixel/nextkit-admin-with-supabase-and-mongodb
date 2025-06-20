"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
import CardBox from "../shared/CardBox";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MonthlyEarning = () => {
    const [salesData , setSalesData] = useState<any>({});
    const [isLoading , setIsLoading] = useState(true);
    async function handleMonthlyEarning(){
        try{
        const response = await fetch("/api/sales");
        const result = await response.json();
        setIsLoading(false);
        setSalesData(result.data);
        }catch(error){
            console.log(error);
        }
    }
   useEffect(() => {
     handleMonthlyEarning();
   },[])
 if(!isLoading){
      const { series, categories } = salesData["8months"];
  const current = series.find((s: { name: string; }) => s.name === "Current Month")?.data || [];
  const previous = series.find((s: { name: string; }) => s.name === "Prev Month")?.data || [];
 
  const currentSales = current[current.length - 1];
  const currentTotal = current.reduce((a: any, b: any) => a + b, 0);
  const prevTotal = previous.reduce((a: any, b: any) => a + b, 0);
  const percentChange = prevTotal === 0 ? 0 : ((currentTotal - prevTotal) / prevTotal) * 100;
  const isPositive = percentChange >= 0;

  const ChartData: any = {
    series: [
      {
        name: "Monthly Earnings",
        color: "var(--color-primary)",
        data: current,
      },
    ],
    chart: {
      id: "monthly-earnings",
      type: "area",
      height: 120,
      sparkline: { enabled: true },
      group: 'sparklines',
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.1,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: { size: 0 },
    tooltip: {
      theme: "dark",
      fixed: { enabled: true, position: "right" },
      x: { show: false },
      y: {
                formatter: function (value: number) {
                    return `$${value.toLocaleString()}K`;
                }
            }
    },
  };

  return (
    <CardBox className="mt-0 px-0 pb-0">
      <div className="p-0 px-6">
        <div className="flex items-center justify-between mb-1">
          <h5 className="card-title mb-0">Monthly Earnings</h5>
          <div className="text-white bg-secondary rounded-full h-11 w-11 flex items-center justify-center">
            <Icon icon='tabler:currency-dollar' className="text-xl" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-4">
          <div className="lg:col-span-8 md:col-span-8 col-span-8">
            <h4 className="text-xl mb-3">${currentSales}</h4>
            <div className="flex items-center mb-3 gap-2">
              <span
                className={`rounded-full p-1 ${isPositive ? "bg-lightsuccess dark:bg-darksuccess" : "bg-lighterror dark:bg-darkerror"} flex items-center justify-center`}
              >
                <Icon
                  icon={isPositive ? "tabler:arrow-up-right" : "tabler:arrow-down-right"}
                  className={isPositive ? "text-success" : "text-error"}
                />
              </span>
              <p className={`mb-0 ${isPositive ? "text-success" : "text-error"}`}>
                {percentChange.toFixed(2)}%
              </p>
              <p className="dark:text-darklink mb-0">last month</p>
            </div>
          </div>
        </div>
      </div>

      {
        !isLoading ? <Chart
        options={ChartData}
        series={ChartData.series}
        type="area"
        height="88px"
        width="100%"
      />:null
      }
    </CardBox>
  );
 }
};

export { MonthlyEarning };
