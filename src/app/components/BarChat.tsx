import React from "react";
import DayCountsBarChart from "./DayCountBarChart"
// Define types for props
interface BarGraphProps {
  data: { day: string; count: number }[];
  maxValue?: number; // Optional max value for scaling
  barColor?: string; // Customizable bar color
  
  handleWeekChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedWeek: number
}

export default function BarGraph({
  data,
  maxValue,
  barColor = "#D2AC47",
  selectedWeek,
  handleWeekChange
}: BarGraphProps) {
  // const scale = maxValue || Math.max(...data.map((item) => item.value));
  // const scaleSteps = [180, 140, 100, 60, 20, 0]; // Scale values for the Y-axis
  const weeks = Array.from({ length: 3 }, (_, index) => ({
    text: index === 0 ? "This Week" : index === 1 ? "Last Week" : `Last ${index} Weeks`,
    value: index
  }));
  return (
    <div className="bar-graph-wrapper">
      <div className="graph-header d-flex mb-2">

      <p className="graph-title fs-32 fw-700 ff-Mabry-Pro-bold my-1">Weekly Overview of New Users</p>
      {/* <select name="year" id="year" className="list-of-years" >
        <option value="Year">This week</option>
        <option value="2022">Monday</option>
        <option value="2021">Tuesday</option>
        <option value="2020">Wednesday</option>
        <option value="2019">Thursday</option>
        <option value="2018">Friday</option>
      </select> */}
      <select name="year" id="year" className="list-of-years" value={selectedWeek}
        onChange={handleWeekChange}>
  {weeks.map((week) => (
    <option key={week.value} value={week.value}>
      {week.text}
    </option>
  ))}
</select>
      </div>
      <DayCountsBarChart data={data}/>
      {/* <div className="bar-graph-container">
        
        <div className="scale-section">
          {scaleSteps.map((step, index) => (
            <span key={index} className="scale-step">
              {step}
            </span>
          ))}
        </div>

        <div className="bar-graph">
          {data.map((item, index) => (
            <div key={index} className="bar-container">
              <div
                className="bar"
                style={{
                  height: `${(item.value / scale) * 150}px`,
                  backgroundColor: barColor,
                  width: "2.28438rem"
                }}
              ></div>
              <span className="bar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
