"use client";
import React, {useState} from "react";
// import Image from "next/image";
import Section from "./Section";
import CardsList from "./CardList";
import BarGraph from "./BarChat";
import LineGraph from "./LineGraph";
import fetchData from "../../../hooks/fetch-data";
import { QueryFunctionContext } from "@tanstack/react-query";
import api from "../../../config/api";
import { Loader } from "lucide-react";
type GrowthStatus = "increase" | "decrease" | "draw";

export type GrowthData = {
  status: GrowthStatus;
  percentage: number;
  count: number;
};

export type Growth = {
  users: GrowthData;
  total_rides: GrowthData;
  active_rides: GrowthData;
  completed_rides: GrowthData;
};

type DayCount = {
  day: string;
  count: number;
};

type MonthCount = {
  month: string;
  count: number;
};

type AnalyticsResponse = {
  growth: Growth;
  day_counts: DayCount[]; 
  month_counts: MonthCount[]; 
};
type AnalyticsQueryKey = ["analytics"];


const Wrapper = () => {
  const [selectedYear, setSelectedYear] = useState(()=> {
    return  new Date().getFullYear()
  });

  const fetchAnalytics = async ({
    queryKey,
    signal,
  }: QueryFunctionContext<AnalyticsQueryKey>): Promise<AnalyticsResponse> => {
    try {
      const response = await api.get(`/analytics?year=${selectedYear}`, {
        signal,
      });
  
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Unknown error occurred");
    }
  };
  const {
    data: analytics_data,
    error,
    isLoading,
    refetch
  } = fetchData<AnalyticsResponse, AnalyticsQueryKey>(
    ["analytics"],
    fetchAnalytics
  );
  // const data = [
  //   { label: "Sun", value: 120 },
  //   { label: "Mon", value: 146 },
  //   { label: "Tues", value: 80 },
  //   { label: "Wed", value: 130 },
  //   { label: "Thurs", value: 120 },
  //   { label: "Fri", value: 40 },
  //   { label: "Sat", value: 120 },
  // ];

  
  
  console.log({ selectedYear});
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          marginTop: "16px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "50px",
          // border: "1px solid red"
        }}
      >
        <Loader className="custom-loader large-loader" />
      </div>
    );
  }
  if(error || !analytics_data) {
    const errorMessage = error?.message || "Unknown error occured";
    return (
      <div  style={{width: "100%", display: "flex", flexDirection: "column", paddingTop: "16px", gap: 4, alignItems: "center"}}>
        <h2
          className={` w-full text-center font-bold`}
          style={{width: "100%",  textAlign: "center", fontWeight: "bold"}}
        >
          {errorMessage}
        </h2>
        <button  onClick={(e: React.MouseEvent<HTMLButtonElement>) => refetch()} className="refetch-button">Retry</button>
      </div>
    )
  }

  const day_count_data = analytics_data.day_counts.map(day => {
    return {...day,
      day: day.day.slice(0,3)
    }
  })
  const month_count_data = analytics_data.month_counts.map(month => {
    return {...month,
      month: month.month.slice(0,3)
    }
  })

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    if(!value) return 
    setSelectedYear(value);
  };
  return (
    <div className="mx-2 mt-0">
      <Section name="cards">
        <p className="fs-32 fw-700 ff-Mabry-Pro-bold">Dashboard</p>
        <div>
          <CardsList data={analytics_data.growth} />
          <br />
          <BarGraph data={day_count_data} barColor="#D2AC47" maxValue={150} />
          <br />
          <br />

          <LineGraph data={month_count_data} handleYearChange={handleYearChange} selectedYear={selectedYear}/>
        </div>
      </Section>
    </div>
  );
};

export default Wrapper;
