import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, Player } from "../../components";

const Public = () => {
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div className=" flex h-full w-full flex-auto">
        <div className="w-[240px] bg-main-3 flex-none">
          <SidebarLeft />
        </div>
        <div className="bg-main-2 w-[1040px] flex-none">
          <Outlet />
        </div>
      </div>
      <div className="flex-none h-[90px] bg-main-1 text-white">
        <Player />
      </div>
    </div>
  );
};

export default Public;
