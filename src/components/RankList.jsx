import React, { memo, useState, useEffect } from "react";
import ListSong from "./ListSong";

const RankList = ({ data, number }) => {
  const [isShow, setIsShow] = useState(false);
  const [numberSong, setNumberSong] = useState(number);
  useEffect(() => {
    isShow ? setNumberSong(100) : setNumberSong(number);
  }, [isShow]);
  return (
    <div className="text-text-1">
      {data?.slice(0, numberSong).map((item, index) => (
        <ListSong
          songData={item}
          key={item.encodeId}
          type={3}
          index={index + 1}
        />
      ))}
      {number === 10 && (
        <div className="flex justify-center items-center w-full my-8">
          <button
            type="button"
            className="px-6 py-1 border border-white rounded-l-full rounded-r-full hover:bg-main-3  font-bold text-[14px] text-gray-100"
            onClick={() => setIsShow(!isShow)}
          >
            {isShow ? "Ẩn bớt" : "Xem Thêm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(RankList);
