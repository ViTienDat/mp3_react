import React from "react";
import icons from "../ultils/icons";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const { IoIosArrowRoundBack, IoIosArrowRoundForward } = icons;
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between w-full ">
      <div className="flex  gap-6 w-full">
        <div className="flex items-center gap-[10px]">
          <span onClick={() => navigate(-1)} className="cursor-pointer">
            <IoIosArrowRoundBack size={30} />
          </span>
          <span onClick={() => navigate(1)} className="cursor-pointer">
            <IoIosArrowRoundForward size={30} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div className="flex items-center pb-[2px] mr-[15px]"></div>
    </div>
  );
};

export default Header;
