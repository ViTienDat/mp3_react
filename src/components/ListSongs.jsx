import React, { memo } from "react";
import ListSong from "./ListSong";
import { useSelector } from "react-redux";

const ListSongs = () => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col text-[12px] text-[#FFFFFF80] ">
      <div className="flex justify-between items-center font-semibold p-[10px]">
        <span className="w-1/2">BÀI HÁT</span>
        <span className="w-1/3">ALBUM</span>
        <span className="w-1/6 flex justify-end">THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <ListSong songData={item} key={item.encodeId} type={3} />
        ))}
      </div>
    </div>
  );
};

export default memo(ListSongs);
