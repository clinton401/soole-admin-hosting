"use client";
import React, { useState } from "react";

const InboxList = () => {
  const [activeButton, setActiveButton] = useState<string>("All Inbox");
  const [labelStates, setLabelStates] = useState({
    Resolved: false,
    Unresolved: false,
  });

  const menuItems = [
    {
      label: "All Inbox",
      count: 100,
      iconPath:
        "M16.2767 1.4455L10.3538 6.00113C9.489 6.6664 8.28478 6.6664 7.41998 6.00113L1.49707 1.4455",
    },
    {
      label: "Starred",
      count: 100,
      iconPath: [
        "M9.08485 1.79716L11.3155 6.2165L15.6089 6.64183C15.8176 6.65917 15.9971 6.79633 16.0687 6.99313C16.1403 7.18993 16.0909 7.41041 15.9422 7.55783L12.4089 11.0598L13.7189 15.8185C13.7736 16.0247 13.7023 16.2438 13.5367 16.3783C13.3712 16.5128 13.1421 16.5377 12.9515 16.4418L8.59885 14.2865L4.25218 16.4392C4.0616 16.535 3.83253 16.5101 3.66696 16.3756C3.50138 16.2411 3.4301 16.022 3.48485 15.8158L4.79485 11.0572L1.25885 7.55516C1.1101 7.40774 1.0607 7.18726 1.13231 6.99047C1.20393 6.79367 1.38348 6.65651 1.59218 6.63916L5.88552 6.21383L8.11285 1.79716C8.20625 1.61475 8.39392 1.5 8.59885 1.5C8.80378 1.5 8.99145 1.61475 9.08485 1.79716Z",
      ],
    },
    {
      label: "Sent",
      count: 100,
      iconPath: [
        "M1.82213 7.7823C1.40354 7.66421 1.1108 7.28707 1.10024 6.85227C1.08968 6.41747 1.36376 6.02657 1.77613 5.8883L15.1568 1.5243C15.3355 1.46604 15.5318 1.51279 15.6651 1.64535C15.7983 1.77792 15.8461 1.97395 15.7888 2.15297L11.4281 15.5403C11.2905 15.9534 10.8992 16.2282 10.4639 16.2175C10.0286 16.2068 9.65128 15.913 9.53413 15.4936L8.03679 9.27297L1.82213 7.7823Z",
      ],
    },
    {
      label: "Bin",
      count: 9,
      iconPath: [
        "M12.9999 15.9174H4.5999C3.93716 15.9174 3.3999 15.3801 3.3999 14.7174V3.91736H14.1999V14.7174C14.1999 15.3801 13.6626 15.9174 12.9999 15.9174Z",
        "M7.0001 12.3173V7.51733",
        "M10.6 12.3173V7.51733",
        "M1 3.91733H16.6",
        "M10.6 1.51733H7.00005C6.33731 1.51733 5.80005 2.05459 5.80005 2.71733V3.91733H11.8V2.71733C11.8 2.05459 11.2628 1.51733 10.6 1.51733Z",
      ],
    },
  ];

  const handleCheckboxChange = (label: string) => {
    setLabelStates((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <div className="inbox-container">
      <div className="customer-tickets">
        <h2 className="ff-Mabry-Pro-bold fs-16">Custom Ticket</h2>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`ticket-option ${
              activeButton === item.label ? "active" : ""
            }`}
            onClick={() => setActiveButton(item.label)}
          >
            <button className="ticket-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="icon"
              >
                            {item.label === "All Inbox" && (
                  <rect
                    x="1.25049"
                    y="1.04547"
                    width="15.2727"
                    height="10.9091"
                    rx="1.5"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {Array.isArray(item.iconPath)
                  ? item.iconPath.map((path, index) => (
                      <path
                        key={index}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={path}
                      />
                    ))
                  : item.iconPath && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.iconPath}
                      />
                    )}
              </svg>
              {item.label}
            </button>
            <span className="ticket-count">{item.count}</span>
          </div>
        ))}
      </div>

      
      <div className="label-section">
      <h2 className="ff-Mabry-Pro-bold fs-16">Label</h2>

        {["Resolved", "Unresolved"].map((label) => (
          <div key={label} className="label-option">
            <input
              type="checkbox"
              id={label}
              checked={labelStates[label as "Resolved" | "Unresolved"]}
              onChange={() => handleCheckboxChange(label)}
              className={`checkbox ${
                label === "Resolved" ? "resolved" : "unresolved"
              }`}
            />
                <label htmlFor={label} className="label-text">
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxList;
