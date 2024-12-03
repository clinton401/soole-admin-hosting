import React from "react";
import Image from "next/image";
import Section from "./Section";

type Props = {};

const Wrapper = (props: Props) => {
  return (
    <div>
      <div className="sidebar">
        <Section 
        notTop
        >


        <p className="fs-20 ">
            New Me
            </p>
        </Section>
      </div>
    </div>
  );
};

export default Wrapper;
