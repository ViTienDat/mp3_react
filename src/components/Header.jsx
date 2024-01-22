import React from "react";
import icons from "../ultils/icons";
import Search from "./Search";

const { IoIosArrowRoundBack, IoIosArrowRoundForward } = icons;
const Header = () => {
  return (
    <div className=" flex justify-between w-full">
      <div className="flex  gap-6 w-full">
        <div className="flex items-center gap-[10px]">
          <span>
            <IoIosArrowRoundBack size={30} />
          </span>
          <span className="">
            <IoIosArrowRoundForward size={30} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div className="flex items-center pb-[2px] mr-[15px]">login</div>
    </div>
  );
};

export default Header;
