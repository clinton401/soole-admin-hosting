import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import {type GrowthData, type Growth} from "./Wrapper"

interface CardData {
  id: number;
  title: string;
  // number: number;
  icon: string | StaticImageData;
  type: "users" | "total_rides" | "active_rides" | "completed_rides";
  // description: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Total Users",
    // number: 40689,
    icon: "/Profile.svg",
    type: "users",
    // description: "8.5% up from yesterday",
  },
  {
    id: 2,
    title: "Active Rides",
    // number: 10,
    icon: "Car.svg",
    type: "active_rides",
    // description: "4.3% down from 1 hour ago",
  },
  {
    id: 3,
    title: "Completed Rides",
    // number: 140,
    type: "completed_rides",
    icon: "/Car2.svg",
    // description: "8.5% up from 1 hour ago",
  },
  {
    id: 4,
    title: "Total Rides Today",
    // number: 150,
    icon: "./Car3.svg",
    type: "total_rides",
    // description: "8.5% up from yesterday",
  },
];

type CardListProps = {
  data: Growth
};
const CardsList: React.FC<CardListProps> = ({ data }) => {
  // const getDescriptionWithColor = (description: string) => {
  //   const regex = /(\d+(\.\d+)?)/; // Match numeric values, including decimals
  //   const match = description.match(regex);

  //   if (match) {
  //     const value = parseFloat(match[0]); // Extract numeric value
  //     const color = value >= 6.0 ? "green" : "red"; // Determine color based on the value

  //     return (
  //       <>
  //         {description.split(regex).map((part, index) =>
  //           part === match[0] ? (
  //             <span key={index} style={{ color }}>
  //               {part}
  //             </span>
  //           ) : (
  //             part
  //           )
  //         )}
  //       </>
  //     );
  //   }

  //   return description; // Return the original description if no number is found
  // };
  const getDescription = (growth: GrowthData) => {
    const isIncrease = growth.status === "increase";
    const isDraw = growth.status === "draw";
    const color = isIncrease ? "green" : "red";
    const iconSrc = isIncrease ? "/trending-up.svg" : "/trending-down.svg";
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexWrap: "wrap",
        }}
      >
        {isDraw ? (
          "Stable user count in the last 24 hours"
        ) : (
          <>
            <Image
              src={iconSrc}
              alt={isIncrease ? "Trending Up" : "Trending Down"}
              width={14}
              height={14}
              style={{ color }}
            />
            <span style={{ color }}>{growth.percentage}%</span>
            {isIncrease ? "up" : "down"} from yesterday
            {/* {description.slice(match.index! + match[0].length)}{" "} */}
          </>
        )}

        {/* Remaining text */}
      </span>
    );
  };
  const getDescriptionWithColor = (description: string) => {
    const regex = /(\d+(\.\d+)?)/;
    const match = description.match(regex);

    if (match) {
      const value = parseFloat(match[0]);
      const color = value >= 6.0 ? "green" : "red";

      const iconSrc = value >= 6.0 ? "/trending-up.svg" : "/trending-down.svg"; // Icon path

      return (
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Image
            src={iconSrc}
            alt={value >= 6.0 ? "Trending Up" : "Trending Down"}
            width={14}
            height={14}
            style={{ color }}
          />
          <span style={{ color }}>{match[0]}</span>
          {description.slice(match.index! + match[0].length)}{" "}
          {/* Remaining text */}
        </span>
      );
    }

    return description; // Return original description if no number is found
  };

  return (
    <div className="card-grid mt-1">
      {cardData.map((card) => {
        const { type } = card;

        const growth = data[type];
        if (!growth) return;

        return (
          <div
            key={card.id}
            className="cards border rounded shadow-md d-flex flex-column align-start"
          >
            <div
              className="d-flex justify-between align-center mb-4"
              style={{ width: "100%" }}
            >
              <div>
                <p className="fs-16 mb-1 ff-Mabry-Pro-semibold card-title">
                  {card.title}
                </p>
                <span className="ff-Mabry-Pro-bold fs-24">{growth.count}</span>
              </div>
              <Image alt="Icon" src={card.icon} width={60} height={60} />
            </div>
            <p className="fs-14">{getDescription(growth)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CardsList;
