import React, { useEffect, useState } from "react";
import icons from "../ultils/icons";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import path from "../ultils/path";

const { CiSearch } = icons;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full flex items-center ">
      <span className="bg-[#FFFFFF1A] h-[40px] flex items-center rounded-l-[20px] pl-2">
        <CiSearch size={24} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm tên bài hát, nghệ sĩ, lời bài hát..."
        className="outline-none bg-[#FFFFFF1A]  rounded-r-[20px] w-full px-[6px] pt-[6px] pb-[10px] h-10]"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
