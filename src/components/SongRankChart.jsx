import React, { memo, useState, useRef } from "react";
import moment from "moment";
import "moment/dist/locale/vi";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import icons from "../ultils/icons";

const { IoMdPlay } = icons;
const SongRankChart = ({ data, index }) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const imageRef = useRef();

  const handleHover = () => {
    setIsHover(true);
    imageRef?.current?.classList?.remove("animate-scale-down-image");
    imageRef?.current?.classList?.add("animate-scale-up-image");
  };

  const handleLeave = () => {
    setIsHover(false);
    imageRef?.current?.classList?.remove("animate-scale-up-image");
    imageRef?.current?.classList?.add("animate-scale-down-image");
  };
  return (
    <div className="w-[full] flex-auto flex hover:bg-main-3 p-[10px] rounded-md bg-overlay-30 ">
      <div className="w-full flex gap-2">
        <div
          className={`w-[15%] flex font-bold items-center justify-center text-[40px] cursor-default text-overlay-30 ${
            index === 1
              ? "text-shadow-no1"
              : index === 2
              ? "text-shadow-no2"
              : "text-shadow-no3"
          } `}
        >
          {index}
        </div>
        <div className="w-[25%] flex items-center">
          <div
            className="w-[60px] relative overflow-hidden rounded-lg"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {isHover && (
              <div
                className="absolute top-0 bottom-0 left-0 z-40 right-0 bg-overlay-30 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => {
                  dispatch(action.setCurSongId(data?.encodeId));
                  dispatch(action.play(true));
                  dispatch(action.playAlbum(true));
                }}
              >
                <span className=" rounded-full">
                  <IoMdPlay size={14} className="" />
                </span>
              </div>
            )}
            <img
              src={data?.thumbnailM}
              alt="thumbnail"
              className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col w-[60%] justify-center ">
          <span className="text-[14px] line-clamp-1 font-semibold cursor-default ">
            {data?.title}
          </span>
          <span className="text-[12px] text-text-1 line-clamp-1 ">
            {data?.artistsNames}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SongRankChart);
