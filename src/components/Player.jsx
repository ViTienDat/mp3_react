import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { music } from "../apis";
import icons from "../ultils/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { Loading } from "./";

const {
  TiHeartOutline,
  CiViewList,
  BsThreeDots,
  PiShuffle,
  PiRepeat,
  MdSkipNext,
  MdSkipPrevious,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} = icons;
var intervalId;
const Player = ({ setIsShowRightSidebar }) => {
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [songInfo, setSongInfo] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [volume, setVolume] = useState(100);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(new Audio());
  const thumbRef = useRef();
  const trunkRef = useRef();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

  useEffect(() => {
    const fecthDetailSong = async () => {
      setIsLoaded(false);
      const [res1, res2] = await Promise.all([
        music.apiGetDetailSong(curSongId),
        music.getSong(curSongId),
      ]);
      setIsLoaded(true);
      if (res1?.data?.err === 0) {
        setSongInfo(res1.data.data);
        dispatch(actions.setCurSongData(res1.data.data));
      }
      if (res2?.data?.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fecthDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle === true) {
        handleShuffle();
      } else {
        handleNextSong();
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume, audio]);

  const handleIsPlaying = () => {
    if (!isPlaying) {
      audio.play();
      dispatch(actions.play(true));
    } else {
      audio.pause();
      dispatch(actions.play(false));
    }
  };

  const handleClickProgressbar = (e) => {
    const trunkRect = trunkRef.current.getBoundingClientRect();
    const percent2 =
      Math.round(((e.clientX - trunkRect.left) * 10000) / trunkRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent2}%`;
    audio.currentTime = (percent2 * songInfo.duration) / 100;
    setCurSeconds(Math.round((percent2 * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePreSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    const indexRandom = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[indexRandom].encodeId));
    dispatch(actions.play(true));
  };

  const handleMuteVolume = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(50);
    }
  };
  return (
    <div className="px-5 h-full flex gap-[10px]">
      <div className="flex-auto w-[30%]  flex items-center">
        <div className="flex w-1/5">
          <img
            src={songInfo?.thumbnail}
            alt="thumbnail"
            className="w-[64px] h-[64px] mr-[10px] rounded-md"
          />
        </div>

        <div className=" flex flex-col w-3/5">
          <span className="line-clamp-1">{songInfo?.title}</span>
          <span className="line-clamp-1 text-[12px] text-[#FFFFFF80]">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-3 justify-end w-1/5">
          <span>
            <TiHeartOutline fontSize={20} />
          </span>
          <span>
            <BsThreeDots />
          </span>
        </div>
      </div>
      <div className="flex-auto w-[40%]   flex flex-col gap-2 items-center justify-center">
        <div className="flex gap-[14px] items-center">
          <span
            className={`${
              isShuffle
                ? "cursor-pointer rounded-full hover:bg-main-3 text-violet-600"
                : "cursor-pointer rounded-full hover:bg-main-3 "
            } p-2`}
            onClick={() => {
              setIsShuffle(!isShuffle);
            }}
            title="Phát ngẫu nhiên"
          >
            <PiShuffle fontSize={22} />
          </span>
          <span
            className={`${
              !songs
                ? "text-gray-500"
                : "cursor-pointer rounded-full hover:bg-main-3"
            } p-1`}
            onClick={handlePreSong}
          >
            <MdSkipPrevious fontSize={30} />
          </span>
          <span
            className="cursor-pointer rounded-full hover:text-blue-300"
            onClick={handleIsPlaying}
          >
            {isLoaded === false ? (
              <Loading />
            ) : isPlaying ? (
              <IoPauseCircleOutline fontSize={40} />
            ) : (
              <IoPlayCircleOutline fontSize={40} />
            )}
          </span>
          <span
            className={`${
              !songs
                ? "text-gray-500"
                : "cursor-pointer rounded-full hover:bg-main-3"
            } p-1`}
            onClick={handleNextSong}
          >
            <MdSkipNext fontSize={30} />
          </span>
          <span
            className={`${
              isRepeat
                ? "cursor-pointer rounded-full hover:bg-main-3 text-violet-600"
                : "cursor-pointer rounded-full hover:bg-main-3 "
            }`}
            onClick={() => setIsRepeat(!isRepeat)}
            title="Phát lại"
          >
            <PiRepeat fontSize={22} />
          </span>
        </div>
        <div className="w-full flex justify-center items-center gap-[10px] cursor-pointer text-[14px] font-semibold">
          <div>{moment.utc(curSeconds * 1000).format("mm:ss")}</div>
          <div
            className="bg-main-3 w-3/4 rounded relative h-[3px] hover:h-[8px]"
            onClick={handleClickProgressbar}
            ref={trunkRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 bottom-0 left-0 bg-white rounded"
            ></div>
          </div>
          <div>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</div>
        </div>
      </div>
      <div className="flex-auto w-[30%] border-red-500 flex items-center justify-center gap-2">
        <span
          className=" hover:bg-main-3 rounded-full cursor-pointer p-2 "
          onClick={handleMuteVolume}
        >
          {volume > 0 ? (
            <IoVolumeHighOutline size={20} />
          ) : (
            <IoVolumeMuteOutline size={20} />
          )}
        </span>
        <input
          className="w-[150px] h-[4px] hover:h-[6px] input-range rounded-lg"
          type="range"
          step={1}
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <div className="h-full items-center flex">
        <CiViewList
          className="p-2 hover:bg-main-3 rounded-full"
          size={40}
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          title="Danh sách phát"
        />
      </div>
    </div>
  );
};

export default Player;
