import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface CardData {
  id: number;
  title: string;
  number: number;
  // icon: React.ReactNode;
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
    description: "8.5% Up from 1 hour ago",
  },
  {
    id: 4,
    title: "Total Rides Today",
    number: 150,
    icon: "./Car3.svg",
    description: "8.5% Up from yestrday",
  },
];

const CardsList: React.FC = () => {
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
              <p className="fs-16 mb-1 ff-Mabry-Pro-semibold card-title">{card.title}</p>
              <span className=" ff-Mabry-Pro-bold fs-24">{card.number}</span>
            </div>
            <Image
              alt="Icon"
              className=""
              src={card.icon}
              width={60}
              height={60}
            />
          </div>
          <p className="fs-14">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsList;
