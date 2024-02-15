import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarLeft,
  Player,
  Header,
  LoadingData,
  SidebarRight,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(false);
  const { isloading } = useSelector((state) => state.app);
  const { curSongId, curAlbumId } = useSelector((state) => state.music);

  return (
    <div className="w-full flex relative flex-col h-screen ">
      <div className=" flex h-full w-full flex-auto bg-main-2">
        <div className="w-[240px] h-full bg-main-3 flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto flex flex-col relative">
          {isloading === true && (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-2 flex items-center justify-center">
              <LoadingData />
            </div>
          )}

          <div className="h-[70px] flex-none  flex items-center text-white px-[60px]">
            <Header />
          </div>
          <div className=" flex-auto w-full ">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && curAlbumId && (
          <div className="w-[300px] absolute top-0 right-0 bottom-0 h-full bg-main-2 animate-slide-right flex-none">
            <SidebarRight />
          </div>
        )}
      </div>
      {curSongId && (
        <div className="fixed bottom-0 z-50 left-0 right-0 h-[90px] bg-main-1 text-white">
          <Player setIsShowRightSidebar={setIsShowRightSidebar} />
        </div>
      )}
    </div>
  );
};

export default Public;
