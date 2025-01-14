import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface CardData {
  id: number;
  title: string;
  number: number;
  icon: string | StaticImageData;
  description: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Total Users",
    number: 40689,
    icon: "/Profile.svg",
    description: "8.5% up from yesterday",
  },
  {
    id: 2,
    title: "Active Rides",
    number: 10,
    icon: "Car.svg",
    description: "4.3% down from 1 hour ago",
  },
  {
    id: 3,
    title: "Completed Rides",
    number: 140,
    icon: "/Car2.svg",
    description: "8.5% up from 1 hour ago",
  },
  {
    id: 4,
    title: "Total Rides Today",
    number: 150,
    icon: "./Car3.svg",
    description: "8.5% up from yesterday",
  },
];

const CardsList: React.FC = () => {
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
          {description.slice(match.index! + match[0].length)} {/* Remaining text */}
        </span>
      );
    }

    return description; // Return original description if no number is found
  };


  return (
    <div className="card-grid mt-1">
      {cardData.map((card) => (
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
              <span className="ff-Mabry-Pro-bold fs-24">{card.number}</span>
            </div>
            <Image alt="Icon" src={card.icon} width={60} height={60} />
          </div>
          <p className="fs-14">{getDescriptionWithColor(card.description)}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsList;
