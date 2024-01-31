import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const navigate = useNavigate();
  const { seasontheme } = useSelector((state) => state.app);
  console.log(seasontheme);
  const handlePlayAlum = (item) => {
    const albumPath = item?.link?.split(".")[0];
    navigate(albumPath);
  };

  return (
    <div className="mt-12 flex flex-col gap-5 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{seasontheme?.title}</h3>
        <span className="text-[12px] text-text-1 font-semibold">TẤT CẢ</span>
      </div>
      <div className="flex items-center gap-8  justify-center">
        {seasontheme?.items?.slice(0, 4).map((item) => (
          <div key={item?.encodeId} className="flex flex-col gap-3 flex-1">
            <img
              src={item?.thumbnailM}
              alt="avarta"
              className="w-full object-contain rounded-md cursor-pointer"
              onClick={() => {
                handlePlayAlum(item);
              }}
            />
            <span className="text-[14px] font-semibold text-text-1">
              {`${item?.sortDescription?.slice(0, 50)}...`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
