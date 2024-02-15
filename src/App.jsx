import { useState } from "react";
import {
  Home,
  Login,
  Public,
  Album,
  WeekRank,
  ZingChart,
  Search,
  SearchAll,
  SearchSong,
  Singer,
  SearchPlaylist,
  HotNewSong,
} from "./containers/public";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import path from "./ultils/path";
import { useEffect } from "react";
import * as actions from "./store/actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHomes());
  }, []);
  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME_ARTIST__SINGER} element={<Singer />} />
            <Route path={path.HOT_MEWSONG} element={<HotNewSong />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSong />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>

            {/* ------------- */}
            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
}

export default App;
