import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as action from "../../store/actions";
import { handleNumber } from "../../ultils/fn";
import { ListSong, Section, Artist } from "../../components";

const Singer = () => {
  const [seeMore, setSeeMore] = useState(false);
  const ref = useRef();
  const { singer } = useParams();
  const dispatch = useDispatch();
  const { artistData } = useSelector((state) => state.music);
  useEffect(() => {
    dispatch(action.getDetailArtist(singer));
  }, [singer]);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [singer]);
  return (
    <div className="text-white">
      <div ref={ref} className="relative">
        <img
          src={artistData?.cover}
          alt=""
          className="h-[350px] w-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 px-[60px] bg-gradient-to-t from-overlay-30 to-transparent">
          <div className="absolute bottom-0 flex gap-8">
            <img
              src={artistData?.thumbnailM}
              alt="avatar"
              className="w-[140px] h-[140px] rounded-full object-cover"
            />
            <div className="flex flex-col gap-4 justify-start ">
              <span className="text-[60px] font-bold">{artistData?.alias}</span>
              <span className="text-gray-100 text-sm">
                {handleNumber(artistData?.totalFollow)} người quan tâm
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[60px] flex flex-col">
        <div className="">
          <h3 className="text-xl font-bold my-8">
            {artistData?.sections[0]?.title}
          </h3>
          <div className="flex flex-wrap w-full gap-3 ">
            {artistData?.sections[0]?.items?.slice(0, 6)?.map((item) => (
              <div
                key={item?.encodeId}
                className="flex-auto w-[40%] text-text-1 text-xs"
              >
                <ListSong songData={item} type={1} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Section data={artistData?.sections[1]} type={2} />
        </div>
        <div>
          <Section data={artistData?.sections[2]} type={2} isAlbum={0} />
        </div>
        <div>
          <h3 className="text-xl font-bold my-8">
            {artistData?.sections[6]?.title}
          </h3>
          <div className="flex gap-6 items-start justify-start">
            {artistData?.sections[6]?.items?.slice(0, 4)?.map((item) => (
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
        <div>
          <h3 className="text-xl font-bold my-8">Về {artistData?.alias}</h3>
          <div className="flex gap-8">
            <img
              src={artistData?.thumbnailM}
              alt="avarta"
              className="w-[45%] h-[300px] justify-start object-cover flex-none rounded-md "
            />
            <div className="flex flex-col">
              <div
                dangerouslySetInnerHTML={{ __html: artistData?.biography }}
                className={`${!seeMore ? "line-clamp-5" : ""} text-text-1`}
              />
              <div
                className="cursor-pointer"
                onClick={() => setSeeMore(!seeMore)}
              >
                xem thêm
              </div>
            </div>
          </div>
        </div>
        <div className="py-[200px]"></div>
      </div>
    </div>
  );
};

export default Singer;
