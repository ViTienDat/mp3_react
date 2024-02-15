import React, { useEffect } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { searchMenu } from "../../ultils/menu";
import { useSelector } from "react-redux";

const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  return (
    <div className="text-white">
      <div className="flex h-[50px] mb-7 items-center pl-[60px] text-sm border-b border-main-3">
        <span className="text-[24px]  font-bold border-r pr-5 border-main-3">
          Kết Quả Tìm Kiếm
        </span>
        <div className="flex items-center justify-start">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.replace(" ", "+")}`}
              className={({ isActive }) =>
                isActive
                  ? " text-white px-4 text-[15px] font-semibold cursor-pointer hover:text-white flex items-center h-[50px] border-b-2  "
                  : "px-4 text-[15px] text-[#DADADA] font-semibold cursor-pointer hover:text-white "
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className="mt-[100px]"></div>
    </div>
  );
};

export default Search;
