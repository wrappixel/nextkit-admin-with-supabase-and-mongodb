"use client";
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import CardBox from '../shared/CardBox';
import { Select } from 'flowbite-react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  type RangeOption = "8months" | "6months" | "4months" | string;

  const [range, setRange] = useState<RangeOption>("8months");
  const [salesInfo, setSalesInfo] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  async function handleSalesData() {
    try {
      const response = await fetch("/api/sales");
      const result = await response.json();
      console.log(result);
      setIsFetched(true);
      setSalesInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleSalesData();
  }, []);

  const chartData: Record<RangeOption, {
    categories: string[];
    series: { name: string; data: number[] }[];
  }> = salesInfo;

  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: true },
      height: 370,
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: { show: false },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: chartData[range]?.categories,
      axisBorder: { show: false },
    },
tooltip: {
  theme: 'dark',
  fillSeriesColor: false,
  custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
    const categories = chartData[range]?.categories || [];

    const isPrev = w.config.series[seriesIndex].name.toLowerCase().includes("prev");
    const monthIndex = isPrev ? dataPointIndex - 1 : dataPointIndex;

    const monthLabel = categories[monthIndex] || "N/A";
    const seriesName = w.config.series[seriesIndex].name;
    const value = series[seriesIndex][dataPointIndex];

    return `
      <div style="
        background-color: #2c2c2c;
        padding: 10px 12px;
        border-radius: 6px;
        font-family: inherit;
        font-size: 13px;
        color: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="margin-bottom: 4px;">${seriesName} – ${monthLabel}</div>
        <div style="font-weight: 600;">$${value.toLocaleString()}</div>
      </div>
    `;
  }
}



  };

  return (
    <CardBox className='pb-0'>
      <div className="sm:flex items-center justify-between mb-6">
        <div>
          <h5 className="card-title">Sales Overview</h5>
        </div>
        <div className="sm:mt-0 mt-4">
          <Select
            className="form-control select-md"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="8months">Last 8 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="4months">Last 4 Months</option>
          </Select>
        </div>
      </div>

      {isFetched && (
        <Chart
          options={optionscolumnchart}
          series={chartData[range]?.series}
          type="bar"
          height={255}
          width="100%"
        />
      )}
      <div className="justify-center flex items-center gap-2 -mt-4 pb-6">
         <div className="flex items-center gap-2">
           <span className="size-2.5 rounded-full bg-primary"></span>
           <p className="text-sm font-medium text-dark">Previous Month</p>
         </div>
         <div className="flex items-center gap-2">
           <span className="size-2.5 rounded-full bg-secondary"></span>
           <p className="text-sm font-medium text-dark">Current Month</p>
         </div>
      </div>
    </CardBox>
  );
};

export default SalesOverview;
