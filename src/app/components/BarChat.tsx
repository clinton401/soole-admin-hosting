import React from "react";

// Define types for props
interface BarGraphProps {
  data: { label: string; value: number }[];
  maxValue?: number; // Optional max value for scaling
  barColor?: string; // Customizable bar color
}

export default function BarGraph({
  data,
  maxValue,
  barColor = "#D2AC47",
}: BarGraphProps) {
  const scale = maxValue || Math.max(...data.map((item) => item.value));
  const scaleSteps = [180, 140, 100, 60, 20, 0]; // Scale values for the Y-axis

  return (
    <div className="bar-graph-wrapper">
      <div className="graph-header d-flex mb-2">

      <p className="graph-title fs-32 fw-700 ff-Mabry-Pro-bold my-1">Weekly Overview of New Users</p>
      <select name="year" id="year" className="list-of-years" >
        <option value="Year">This week</option>
        <option value="2022">Monday</option>
        <option value="2021">Tuesday</option>
        <option value="2020">Wednesday</option>
        <option value="2019">Thursday</option>
        <option value="2018">Friday</option>
      </select>
      </div>
      <div className="bar-graph-container">
        {/* Scale Section */}
        <div className="scale-section">
          {scaleSteps.map((step, index) => (
            <span key={index} className="scale-step">
              {step}
            </span>
          ))}
        </div>

        {/* Bars Section */}
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
      </div>
    </div>
  );
}
