import React from "react";
// import Image from "next/image";
import Section from "./Section";
import CardsList from "./CardList";
import BarGraph from "./BarChat";
import LineGraph from "./LineGraph";

const Wrapper = () => {
  const data = [
    { label: "Sun", value: 120 },
    { label: "Mon", value: 146 },
    { label: "Tues", value: 80 },
    { label: "Wed", value: 130 },
    { label: "Thurs", value: 120 },
    { label: "Fri", value: 40 },
    { label: "Sat", value: 120 },


  ];

  return (
      <div className="mx-2 mt-0">
        <Section noWrapper name="cards">

        <p className="fs-32 fw-700 ff-Mabry-Pro-bold">
            Dashboard
            </p>
            <div>
              <CardsList/>
              <br />
              <BarGraph 
                      data={data}
                      barColor="#D2AC47"
                      maxValue={150}
              />
              <br /><br />

              <LineGraph data={data} />
            </div>
        </Section>
      </div>
  );
};

export default Wrapper;
