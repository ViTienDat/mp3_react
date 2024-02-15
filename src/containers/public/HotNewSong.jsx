import React, { useEffect, useState, useRef } from "react";
import getChartHome from "../../apis/chart";
import { RankList } from "../../components";

const HotNewSong = () => {
  const ref = useRef();
  const [data, setData] = useState(null);
  const [chartData, setchartData] = useState(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [chartData]);
  useEffect(() => {
    const fetchChartData = async () => {
      const response = await getChartHome();

      if (response.data.err === 0) {
        setchartData(response?.data?.data);
      }
    };
    fetchChartData();
  }, []);

  return (
    <div className="text-white  flex flex-col" ref={ref}>
      <div className="w-full h-[30px]"></div>
      <h1 className="px-[60px] font-bold text-[35px] text-white">
        BXH Nhạc Mới
      </h1>
      <div className="mt-8 px-[60px]">
        <RankList data={chartData?.newRelease} number={10} />
      </div>
      <div className="py-[200px]"></div>
    </div>
  );
};

export default HotNewSong;
