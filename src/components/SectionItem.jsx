import React, { memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultils/icons";

const { IoMdPlay } = icons;

const SectionItem = ({
  thumbnailM,
  link,
  sortDescription,
  artistsName,
  title,
  releaseDateText,
  type = 0,
  isAlbum = 1,
}) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef();
  const handlePlayAlum = () => {
    const albumPath = link?.split(".")[0];
    navigate(albumPath);
  };
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
        isAlbum === 0
          ? "w-[210px] flex flex-col"
          : "flex flex-col justify-center gap-2 flex-1"
      }`}
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className={`${"relative w-full overflow-hidden rounded-lg"}`}
      >
        {isHover && (
          <div
            className="absolute top-0 bottom-0 left-0 z-40 right-0 bg-overlay-30 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              handlePlayAlum();
            }}
          >
            <span className="border border-white p-3 rounded-full">
              <IoMdPlay size={30} className="pl-1" />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={thumbnailM}
          alt="avarta"
          className="object-cover w-full rounded-md cursor-pointer"
        />
      </div>
      {title && (
        <span className="text-[14px] font-semibold text-white line-clamp-1">
          {title}
        </span>
      )}
      {artistsName && (
        <span className="text-[14px] font-semibold text-text-1 line-clamp-2">
          {artistsName}
        </span>
      )}
      {sortDescription && type === 0 ? (
        <span className="text-[14px] font-semibold text-text-1 line-clamp-2">
          {sortDescription}
        </span>
      ) : (
        <span className="text-[14px] font-semibold text-text-1 line-clamp-2">
          {releaseDateText}
        </span>
      )}
    </div>
  );
};

export default memo(SectionItem);
