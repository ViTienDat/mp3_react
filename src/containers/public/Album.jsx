import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { music } from "../../apis";
import moment from "moment";
import { ListSongs } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const Album = () => {
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await music.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(false));
      if (response?.data?.err === 0) {
        setPlaylistData(response.data.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  return (
    <div className="px-[60px] relative text-white w-full h-[80%] flex gap-8">
      <div className="flex-none w-1/3 flex flex-col">
        <img
          src={playlistData?.thumbnailM}
          alt="thumbnail"
          className="w-full object-contain rounded-lg"
        />
        <h3 className="mt-3 text-[20px] font-bold flex justify-center">
          {playlistData.title}
        </h3>
        <span className="flex flex-col gap-1 items-center justify-center text-[#FFFFFF80] text-[12px]">
          <span>
            <span>Cập nhâp: </span>
            <span>
              {moment.unix(playlistData.contentLastUpdate).format("DD/MM/YYYY")}
            </span>
          </span>
          <span>{playlistData.artistsNames}</span>
          <span>{playlistData.like} người yêu thích</span>
        </span>
      </div>
      <Scrollbars style={{ width: "100%", height: "90%" }}>
        <div className=" flex-auto mb-20">
          <span className="">
            <span className="text-[#FFFFFF80] text-[14px] mb-[10px]">
              Lời tựa{" "}
            </span>
            <span>{playlistData.description}</span>
          </span>
          <div>
            <ListSongs />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
