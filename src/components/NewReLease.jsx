import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewReLease = () => {
  const { newrelease } = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState(0);
  return (
    <div className="mt-12 gap-5 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{newrelease?.title}</h3>
      </div>
      <div className="flex items-center gap-5 mt-4">
        <button
          type="button"
          className={`py-[2px] px-6 rounded-l-full border border-gray-400 rounded-r-full bg-transparent text-[12px] font-semibold ${
            isActive === 0 && "bg-violet-600"
          }`}
          onClick={() => setIsActive(0)}
        >
          TẤT CẢ
        </button>
        <button
          type="button"
          className={`py-[2px] px-6 rounded-l-full border border-gray-400 rounded-r-full bg-transparent text-[12px] font-semibold ${
            isActive === 1 && "bg-violet-600"
          }`}
          onClick={() => setIsActive(1)}
        >
          VIỆT NAM
        </button>
        <button
          type="button"
          className={`py-[2px] px-6 rounded-l-full border border-gray-400 rounded-r-full bg-transparent text-[12px] font-semibold ${
            isActive === 2 && "bg-violet-600"
          }`}
          onClick={() => setIsActive(2)}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full mt-4">
        {isActive === 0
          ? newrelease?.items?.all
              .slice(0, 12)
              .map((item) => <SongItem data={item} key={item.encodeId} />)
          : isActive === 1
          ? newrelease?.items?.vPop
              .slice(0, 12)
              .map((item) => <SongItem data={item} key={item.encodeId} />)
          : newrelease?.items?.others
              .slice(0, 12)
              .map((item) => <SongItem data={item} key={item.encodeId} />)}
      </div>
    </div>
  );
};

export default memo(NewReLease);
