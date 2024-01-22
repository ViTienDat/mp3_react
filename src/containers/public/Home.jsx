import React, { useEffect } from "react";
import { Header, Sliders } from "../../components";

const Home = () => {
  return (
    <div className="overflow-y-auto bg-[#170f23] px-[60px] text-[#DADADA] flex flex-col">
      <div className="h-[70px] flex items-center">
        <Header />
      </div>
      <div className=" text-white w-full pt-[32px]">
        <Sliders />
      </div>
    </div>
  );
};

export default Home;
