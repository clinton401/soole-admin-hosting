import React from "react";

// Define types for props
interface LineGraphProps {
  data: { label: string; value: number }[];
  maxValue?: number; // Optional max value for scaling
  lineColor?: string; // Customizable line color
  fillColor?: string; // Customizable fill color under the line
}

export default function LineGraph({
  data,
  maxValue,
  lineColor = "#D2AC47",
  fillColor = "rgba(76, 175, 80, 0.1)",
}: LineGraphProps) {
  const scale = maxValue || Math.max(...data.map((item) => item.value));

  // Generate the curved path for the line graph
  const pathData = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100; // Distribute points evenly along the X-axis
      const y = 100 - (item.value / scale) * 100; // Scale values for Y-axis (invert for SVG)
      return { x, y };
    })
    .reduce((path, point, index, points) => {
      if (index === 0) {
        return `M${point.x},${point.y}`; // Move to the starting point
      }

      // Calculate control points for the curve
      const prev = points[index - 1];
      const cp1X = (prev.x + point.x) / 2;
      const cp1Y = prev.y;
      const cp2X = cp1X;
      const cp2Y = point.y;

      return `${path} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${point.x},${point.y}`;
    }, "");

  // Add area fill under the line
  const fillPath = `${pathData} L100,100 L0,100 Z`;

  return (
    <div className="line-graph-wrapper mb-2">
      <div className="graph-header d-flex mb-2">
      
      <p className="graph-title">Revenue Overview</p>
      <select name="year" id="year" className="list-of-years" >
        <option value="Year">This Year</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
      </select>
      </div>
      <div className="line-graph-container">
        <svg
          className="line-graph-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Filled area under the line */}
          <path d={fillPath} fill={fillColor}></path>

          {/* Curved line */}
          <path d={pathData} fill="none" stroke={lineColor} strokeWidth="1.5"></path>

          {/* Dots at each data point */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / scale) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill={lineColor}
              ></circle>
            );
          })}
        </svg>
        <div className="labels-container">
          {data.map((item, index) => (
            <span key={index} className="label">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
