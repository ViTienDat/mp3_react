import React from "react";
import icons from "../ultils/icons";

const { CiSearch } = icons;
const Search = () => {
  return (
    <div className="w-full flex items-center ">
      <span className="bg-[#FFFFFF1A] h-[40px] flex items-center rounded-l-[20px] pl-2">
        <CiSearch size={24} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm tên bài hát, nghệ sĩ, lời bài hát..."
        className="outline-none bg-[#FFFFFF1A]  rounded-r-[20px] w-full px-[6px] pt-[6px] pb-[10px] h-10]"
      />
    </div>
  );
};

export default Search;
