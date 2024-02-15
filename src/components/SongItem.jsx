import React, { memo, useState, useRef } from "react";
import moment from "moment";
import "moment/dist/locale/vi";
import { useDispatch } from "react-redux";
import * as action from "../store/actions";
import icons from "../ultils/icons";

const { IoMdPlay } = icons;
const SongItem = ({ data, isRight = 1, style }) => {
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
    <div
      className={`${
        isRight === 0 ? "w-full" : "w-[45%] lg:w-[30%]"
      }  flex-auto flex hover:bg-main-3 p-[10px] rounded-md ${style}`}
    >
      <div className="w-1/4">
        <div
          className={`${
            isRight === 0 ? "w-[40px]" : "w-[60px]"
          } relative overflow-hidden rounded-lg`}
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
            className={`${
              isRight === 0 ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"
            } object-cover rounded-md cursor-pointer`}
          />
        </div>
      </div>
      <div className="flex flex-col w-3/4 justify-start ">
        <span className="text-[14px] line-clamp-1 font-semibold cursor-default ">
          {data?.title}
        </span>
        <span className="text-[12px] text-text-1 line-clamp-1 ">
          {data?.artistsNames}
        </span>
        {isRight === 1 && (
          <span className="text-[12px] text-text-1 line-clamp-1 cursor-default">
            {moment(data?.releaseDate * 1000).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(SongItem);
