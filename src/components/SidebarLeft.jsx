import React from "react";
import logo from "../assets/logo.svg";
import { sidebarMenu } from "../ultils/menu";
import { NavLink } from "react-router-dom";

const notActiveStyle = "px-[21px] py-[12px] flex font-sans text-[#DADADA] ";
const activeStyle = "px-[21px] py-[12px] flex font-sans text-white bg-gray-700";

const SidebarLeft = () => {
  return (
    <div className="flex h-full flex-col bg-[#2a213a] text-white">
      <div className="w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start  ">
        <NavLink to="">
          <img src={logo} alt="logo" className="w-[120px] h-10 " />
        </NavLink>
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
            key={item.path}
            end={item.end}
          >
            <span className="flex items-center">{item.icon}</span>
            <span className="ml-[12px] ">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
