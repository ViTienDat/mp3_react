import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Section2 = ({ data }) => {
  const navigate = useNavigate();
  const handlePlayAlum = (item) => {
    const albumPath = item?.link?.split(".")[0];
    navigate(albumPath);
  };

  return (
    <div className="mt-12 flex flex-col gap-5 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{data?.title}</h3>
      </div>
      <div className="flex items-start gap-8 justify-center">
        {data?.items?.slice(0, 4).map((item) => (
          <div key={item?.encodeId} className="flex flex-col gap-3 flex-1">
            <img
              src={item?.thumbnailM}
              alt="avarta"
              className="w-full object-contain rounded-md cursor-pointer"
              onClick={() => {
                handlePlayAlum(item);
              }}
            />
            <div className="flex flex-col gap-1">
              <span
                className="line-clamp-1 cursor-pointer hover:text-violet-500 text-[14px] font-bold"
                onClick={() => {
                  handlePlayAlum(item);
                }}
              >
                {item?.title}
              </span>
              <span className="text-[14px] font-semibold text-text-1 line-clamp-2">
                {`${item?.artists.map((el) => " " + el.name)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Section2);
