import appReducer from "./appReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import music from "./music";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: "music",
  whitelist: ["curSongId", "curSongData", "curAlbumId"],
};

const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(musicConfig, music),
});

export default rootReducer;
