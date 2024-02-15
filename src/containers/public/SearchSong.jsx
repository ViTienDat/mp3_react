import React, { useEffect } from "react";
import { ListSong, ListSongs } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";

const SearchSong = () => {
  const { searchData } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getSearchSong(searchData?.top?.id));
  }, [searchData]);
  return (
    <div className="px-[60px]">
      <ListSongs />
    </div>
  );
};

export default SearchSong;
