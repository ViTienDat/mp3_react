import React, { memo } from "react";
import icons from "../ultils/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
// import { useSelector } from "react-redux";

const { FiMusic } = icons;
const ListSong = ({ songData }) => {
  const dispatch = useDispatch();
  // const { curSongId } = useSelector((state) => state.music);

  return (
    <div
      className="ac flex justify-between items-center p-[10px] gap-3  border-b border-gray-600 hover:bg-main-3 cursor-pointer "
      onClick={() => {
        dispatch(action.setCurSongId(songData?.encodeId));
        dispatch(action.play(true));
        dispatch(action.playAlbum(true));
      }}
    >
      <div className="flex items-center w-1/2">
        <span className="mr-[10px]">
          <FiMusic fontSize={15} />
        </span>
        <span className="mr-[10px]">
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="w-10 h-10 rounded"
          />
        </span>
        <span className="flex flex-col w-2/3  ">
          <span className=" text-[14px] text-white line-clamp-1 font-semibold">
            {songData?.title}
          </span>
          <span className="line-clamp-1">{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="w-1/3 line-clamp-1">{songData?.album?.title}</div>
      <div className="w-1/6 flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListSong);
