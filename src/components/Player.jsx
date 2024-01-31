import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { music } from "../apis";
import icons from "../ultils/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";

const {
  TiHeartOutline,
  BsThreeDots,
  PiShuffle,
  PiRepeat,
  MdSkipNext,
  MdSkipPrevious,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
} = icons;
var intervalId;
const Player = () => {
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [curSeconds, setCurSeconds] = useState(0);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(new Audio());
  const thumbRef = useRef();
  const trunkRef = useRef();

  useEffect(() => {
    const fecthDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        music.apiGetDetailSong(curSongId),
        music.getSong(curSongId),
      ]);
      if (res1?.data?.err === 0) {
        setSongInfo(res1.data.data);
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
    // console.log(trunkRef.current.getBoundingClientRect());
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
      // const currentSongIndex = songs.filter((item, index))
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
      // const currentSongIndex = songs.filter((item, index))
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

  // const handleRepeat = () => {
  //   if (songs) {
  //     let currentSongIndex;
  //     // const currentSongIndex = songs.filter((item, index))
  //     songs?.forEach((item, index) => {
  //       if (item.encodeId === curSongId) {
  //         currentSongIndex = index;
  //       }
  //     });
  //     dispatch(actions.setCurSongId(songs[currentSongIndex].encodeId));
  //     dispatch(actions.play(true));
  //   }
  // };

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
      <div className="flex-auto w-[40%] border border-white flex flex-col gap-2 items-center justify-center">
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
            {isPlaying ? (
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
      <div className="flex-auto w-[30%] border-red-500">volumn</div>
    </div>
  );
};

export default Player;
