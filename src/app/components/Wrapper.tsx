import React from "react";
import Image from "next/image";
import Section from "./Section";
import CardsList from "./CardList";

type Props = {

};

const Wrapper = (props: Props) => {
  return (
    <div>
      <div className="mx-2 mt-0">
        <Section noWrapper name="cards">

        <p className="fs-32 fw-700 ff-Mabry-Pro-bold">
            Dashboard
            </p>
            <div>
              <CardsList/>
            </div>
        </Section>
      </div>
    </div>
  );
};

export default Wrapper;
