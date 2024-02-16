import React, { useEffect, useState, useRef } from "react";
import getChartHome from "../../apis/chart";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { RankList } from "../../components";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const ZingChart = () => {
  const ref = useRef();
  const [data, setData] = useState(null);
  const [chartData, setchartData] = useState(null);
  const [chart, setChart] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [chartData]);
  useEffect(() => {
    const fetchChartData = async () => {
      dispatch(actions.loading(true));
      const response = await getChartHome();
      dispatch(actions.loading(false));
      if (response.data.err === 0) {
        setchartData(response?.data?.data);
      }
    };
    fetchChartData();
  }, []);
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
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => item.hour % 2 === 0)
      .map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
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
  }, [chartData]);
  return (
    <div className="text-white  flex flex-col" ref={ref}>
      <div className="w-full h-[30px]"></div>
      <div className="px-[60px] font-bold text-[42px] mb-3 inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-indigo-600">
        #zingchart
      </div>
      <div className="px-[60px]">
        <div className="w-full h-full ">
          {data && <Line data={data} options={options} />}
        </div>
      </div>
      <div className="mt-8 px-[60px]">
        <RankList data={chartData?.RTChart?.items} number={10} />
      </div>
      <div className="py-[200px]"></div>
    </div>
  );
};

export default ZingChart;
