import React, { useEffect } from "react";
import {
  Sliders,
  Section,
  Section2,
  NewReLease,
  ChartSection,
  LoadingData,
  Loading,
} from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { seasontheme, weekchart, heditortheme3, heditortheme, top100 } =
    useSelector((state) => state.app);
  return (
    <>
      {seasontheme !== null &&
      weekchart !== null &&
      heditortheme3 !== null &&
      heditortheme !== null &&
      top100 !== null ? (
        <div className="overflow-y-auto bg-[#170f23] px-[50px] text-[#DADADA] flex flex-col ">
          <div className=" text-white w-full">
            <Sliders />
            <NewReLease />
            <Section data={seasontheme} />
            <Section2 data={top100} />
            <ChartSection />
            <div className="flex gap-6 mt-10">
              {weekchart?.items?.map((item) => (
                <Link
                  to={item?.link?.split(".")[0]}
                  key={item.link}
                  className="flex-1"
                >
                  <img
                    src={item?.cover}
                    alt="cover"
                    className="w-full object-cover rounded-md"
                  />
                </Link>
              ))}
            </div>
            <Section data={heditortheme3} />
            <Section data={heditortheme} />
            <div className="h-[150px]"></div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          <LoadingData />
        </div>
      )}
    </>
  );
};

export default Home;
