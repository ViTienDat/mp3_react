import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
import { useNavigate } from "react-router-dom";

const SearchPlaylist = () => {
  const { searchData, sections } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getArtist(searchData?.top?.alias));
  }, [searchData]);
  const navigate = useNavigate();
  const handlePlayAlum = (item) => {
    const albumPath = item?.link?.split(".")[0];
    navigate(albumPath);
  };
  return (
    <div className="flex flex-col w-full gap-8 px-[60px]">
      <h3>Playlist/Album</h3>
      <div className="flex w-full items-start gap-4 justify-between flex-wrap">
        {sections?.items?.map((item) => (
          <div key={item?.encodeId} className="flex flex-col gap-3 w-[23%]">
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

export default SearchPlaylist;
