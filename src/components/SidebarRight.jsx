import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { apiGetDetailPlaylist, apiGetDetailSong } from "../apis/music";
import { useSelector, useDispatch } from "react-redux";
import { SongItem } from "./";
import { Scrollbars } from "react-custom-scrollbars-2";
import * as actions from "../store/actions";

const { RiDeleteBin7Fill } = icons;

const SidebarRight = () => {
  const dispatch = useDispatch();
  const [isRecent, setIsRecent] = useState(false);
  const { curSongData, curAlbumId } = useSelector((state) => state.music);
  const [playlst, setPlaylst] = useState(null);
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apiGetDetailPlaylist(curAlbumId);
      if (response?.data?.err === 0)
        setPlaylst(response?.data?.data?.song?.items);
    };

    if (curAlbumId) {
      fetchDetailPlaylist();
    }
  }, [curAlbumId]);
  return (
    <div className="flex  flex-col text-xs w-full h-full text-white">
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className=" px-2">
          <div className="h-[70px] w-full flex-none py-[14px] gap-2 justify-between flex items-center">
            <div className="flex flex-auto  ">
              <span
                className={`rounded-l-full rounded-r-full cursor-default py-2 px-[22px] bg-main-3 `}
              >
                Danh sách phát
              </span>
            </div>
          </div>
          <div className="w-full">
            <SongItem data={curSongData} isRight={0} style={"bg-violet-700"} />
          </div>
          <div className="mt-4 pb-2">
            <span className="font-bold ">Tiếp theo</span>
          </div>
        </div>

        <div className="flex flex-col">
          {playlst &&
            playlst?.map((item) => (
              <SongItem key={item.encodeId} data={item} isRight={0} />
            ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default memo(SidebarRight);
