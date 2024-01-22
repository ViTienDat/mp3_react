import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { music } from "../apis";

const Player = () => {
  const { curSongId } = useSelector((state) => state.music);
  useEffect(() => {
    const fecthDetailSong = async () => {
      const response = await music.getDetailSong(curSongId);
      console.log(response);
    };
    fecthDetailSong();
  }, [curSongId]);
  return (
    <div className="px-5 h-full flex">
      <div className="flex-auto w-[30%] border-red-500">Details Song</div>
      <div className="flex-auto w-[40%] border-red-500">Main player</div>
      <div className="flex-auto w-[30%] border-red-500">volumn</div>
    </div>
  );
};

export default Player;
