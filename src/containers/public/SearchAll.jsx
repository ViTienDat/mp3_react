import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultils/fn";
import { ListSong, SectionItem, Artist } from "../../components";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [searchData]);
  return (
    <div className="w-full flex flex-col px-[60px]">
      <div className=" flex flex-col gap-10" ref={ref}>
        <h3 className="text-xl font-bold ">Nổi bật</h3>
        <div className=" flex gap-7 ">
          {searchData?.top && (
            <div className="flex flex-1 gap-3 items-center p-[10px] bg-main-3 rounded-md">
              <img
                className={`w-[84px] h-[84px] object-cover  ${
                  searchData?.top?.objectType === "artist"
                    ? "rounded-full"
                    : "rounded-md"
                }`}
                src={searchData?.top?.thumbnail}
                alt="thumbnail"
              />
              <div className=" flex flex-col gap-1 text-xs text-text-1">
                <span>
                  {searchData?.top?.objectType === "artist"
                    ? `Nghệ sĩ`
                    : `Bài hát`}
                </span>
                <span className="text-sm text-white font-bold line-clamp-2">
                  {searchData?.top?.title || searchData.top.name}
                </span>
                <span className="line-clamp-1">
                  {searchData?.top?.objectType === "artist" ? (
                    <span>
                      {handleNumber(searchData.artists[0].totalFollow) +
                        " quan tâm"}
                    </span>
                  ) : (
                    <span>{searchData?.top?.artistsNames}</span>
                  )}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-1 gap-3 items-center p-[10px] bg-main-3 rounded-md">
            <img
              className={`w-[84px] h-[84px] object-cover rounded-md `}
              src={searchData?.songs[0]?.thumbnailM}
              alt="thumbnail"
            />
            <div className=" flex flex-col gap-1 text-xs text-text-1">
              <span>Bài hát</span>
              <span className="text-sm text-white font-bold line-clamp-2">
                {searchData?.songs[0]?.title}
              </span>
              <span className="line-clamp-1">
                {searchData?.songs[0]?.artistsNames}
              </span>
            </div>
          </div>
          <div className="flex flex-1 gap-3 items-center p-[10px] bg-main-3 rounded-md">
            <img
              className={`w-[84px] h-[84px] object-cover rounded-md `}
              src={searchData?.songs[1]?.thumbnailM}
              alt="thumbnail"
            />
            <div className=" flex flex-col gap-1 text-xs text-text-1">
              <span>Bài hát</span>
              <span className="text-sm text-white font-bold line-clamp-2">
                {searchData?.songs[1]?.title}
              </span>
              <span className="line-clamp-1">
                {searchData?.songs[1]?.artistsNames}
              </span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold ">Bài hát</h3>
        <div className="flex flex-wrap w-full gap-3 ">
          {searchData?.songs?.slice(0, 6)?.map((item) => (
            <div
              key={item?.encodeId}
              className="flex-auto w-[40%] text-text-1 text-xs"
            >
              <ListSong songData={item} type={1} />
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold">Playlist/Album</h3>
        <div className="flex gap-6">
          {searchData?.playlists?.slice(0, 4)?.map((item) => (
            <div key={item.encodeId}>
              <SectionItem
                thumbnailM={item?.thumbnailM}
                link={item.link}
                title={item.title}
                artistsName={item.artistsNames}
              />
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold">Nghệ Sĩ/OA</h3>
        <div className="flex gap-6 items-start justify-start">
          {searchData?.artists?.slice(0, 4)?.map((item) => (
            <div key={item?.name} className="w-[212px] ">
              <Artist
                thumbnailM={item?.thumbnailM}
                name={item?.name}
                totalFollow={item?.totalFollow}
                link={item?.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
