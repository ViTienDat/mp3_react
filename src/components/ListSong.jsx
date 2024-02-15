import React, { memo, useState, useRef } from "react";
import icons from "../ultils/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions";

const { IoMdPlay } = icons;

const { FiMusic } = icons;
const ListSong = ({ songData, type = 0, index }) => {
  const { curSongId } = useSelector((state) => state.music);

  const dispatch = useDispatch();
  const imageRef = useRef();
  const [isHover, setIsHover] = useState(false);
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
        curSongId === songData.encodeId ? "bg-gray-200" : ""
      }ac flex justify-between items-center p-[10px] gap-3  border-b border-gray-600 hover:bg-main-3 cursor-pointer`}
    >
      <div
        className="flex items-center w-1/2"
        onClick={() => {
          dispatch(action.setCurSongId(songData?.encodeId));
          dispatch(action.play(true));
          dispatch(action.playAlbum(true));
        }}
      >
        <span className="mr-[10px]">
          {type === 0 ? (
            <FiMusic fontSize={15} />
          ) : index ? (
            <span className="font-bold text-cyan-500 text-[30px] w-10 flex justify-center items-center">
              {index}
            </span>
          ) : (
            ""
          )}
        </span>
        <span className="mr-[10px]">
          <div
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className={`${"relative w-full overflow-hidden rounded-lg"}`}
          >
            {isHover && (
              <div
                className="absolute top-0 bottom-0 left-0 z-40 right-0 bg-overlay-30 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => {
                  dispatch(action.setCurSongId(songData?.encodeId));
                  dispatch(action.play(true));
                  dispatch(action.playAlbum(true));
                }}
              >
                <span className="border border-white p-3 rounded-full">
                  <IoMdPlay size={30} className="pl-1" />
                </span>
              </div>
            )}
            <img
              ref={imageRef}
              src={songData?.thumbnail}
              alt="thumbnail"
              className="w-10 h-10 rounded cursor-pointer"
            />
          </div>
        </span>
        <span className="flex flex-col w-2/3">
          <span className=" text-[14px] text-white line-clamp-1 font-semibold pb-[2px]">
            {songData?.title}
          </span>
          <span className="line-clamp-1">{songData?.artistsNames}</span>
        </span>
      </div>
      {type === 0 ||
        (type === 3 && (
          <div className="w-1/3 line-clamp-1">{songData?.album?.title}</div>
        ))}
      <div className="w-1/6 flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListSong);
