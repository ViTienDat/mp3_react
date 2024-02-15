import React, { memo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { SongRankChart } from "./";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart } = useSelector((state) => state.app);
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspecRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "gray", drawTicks: false },
        min: chart?.chart?.minScore,
        max: chart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.chart?.times
      ?.filter((item) => item.hour % 2 === 0)
      .map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]
            ?.filter((item) => item.hour % 2 === 0)
            .map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
      setData({ labels, datasets });
    }
  }, [chart]);

  return (
    <div className=" w-full p-4 mt-10 bg-gradient-to-r from-violet-900 to-fuchsia-900 rounded-lg max-h-[414px]">
      <h3 className="mb-3 font-bold text-[28px] inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-indigo-600 ">
        <Link to={path.ZING_CHART}>#zingchart</Link>
      </h3>
      <div className="flex gap-10 h-full">
        <div className="w-2/5 flex gap-1 flex-col ">
          {chart?.items?.slice(0, 3)?.map((item, index) => (
            <SongRankChart data={item} key={index} index={index + 1} />
          ))}
        </div>
        <div className="w-3/5 h-full ">
          {data && <Line data={data} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
