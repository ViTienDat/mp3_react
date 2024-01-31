import React, { useEffect } from "react";
import { Sliders, Section } from "../../components";

const Home = () => {
  return (
    <div className="overflow-y-auto bg-[#170f23] px-[50px] text-[#DADADA] flex flex-col ">
      <div className=" text-white w-full">
        <Sliders />
        <Section />
      </div>
    </div>
  );
};

export default Home;
