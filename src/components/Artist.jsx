import React, { memo, useState, useRef } from "react";
import icons from "../ultils/icons";
import { handleNumber } from "../ultils/fn";
import { Link } from "react-router-dom";

const { IoMdPlay } = icons;
const Artist = ({ thumbnailM, totalFollow, name, link }) => {
  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();
  const handleHover = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
  };
  return (
    <div className="flex flex-col gap-2 flex-1">
      <Link
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="relative w-full overflow-hidden rounded-lg"
        to={link}
      >
        {isHover && (
          <div className="absolute top-0 bottom-0 left-0 z-40 right-0 bg-overlay-30 rounded-full flex items-center justify-center cursor-pointer">
            <span className="border border-white p-3 rounded-full">
              <IoMdPlay size={30} className="pl-1" />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={thumbnailM}
          alt="avarta"
          className=" object-cover rounded-full cursor-pointer"
        />
      </Link>
      <Link
        to={link}
        className="m-auto text-[14px] font-semibold cursor-pointer text-white line-clamp-1 hover:underline hover:text-violet-700"
      >
        {name}
      </Link>
      <span className=" m-auto text-[12px] font-semibold text-text-1 line-clamp-1">
        {handleNumber(totalFollow) + " quan tâm"}
      </span>
    </div>
  );
};

export default memo(Artist);
