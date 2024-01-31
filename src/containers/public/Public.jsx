import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, Player, Header } from "../../components";

const Public = () => {
  return (
    <div className="flex relative flex-col h-screen w-full ">
      <div className=" flex h-full w-full flex-auto bg-main-2">
        <div className="w-[240px] h-full bg-main-3 flex-none">
          <SidebarLeft />
        </div>
        <div className=" w-[1040px] flex-none">
          <div className="h-[70px] flex items-center text-white px-[60px] mb-8">
            <Header />
          </div>
          <Outlet />
          <div className="w-full h-[500px]"></div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-main-1 w-[1280px] text-white">
        <Player />
      </div>
    </div>
  );
};

export default Public;
