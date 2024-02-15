import { apiGetArtist, apiGetArtistSong, apiSearch } from "../../apis/music";
import actionTypes from "./actionTypes";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});

export const setCurSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});

export const setCurAlbumId = (pid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  pid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

export const search = (keyword) => async (dispatch) => {
  try {
    const response = await apiSearch(keyword);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes?.SEARCH,
        data: response?.data?.data,
        keyword,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH,
        data: null,
        keyword,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};

export const getSearchSong = (singerId) => async (dispatch) => {
  try {
    const response = await apiGetArtistSong(singerId);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes?.PLAYLIST,
        songs: response.data.data.items,
      });
    } else {
      dispatch({
        type: actionTypes?.PLAYLIST,
        songs: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.PLAYLIST,
      data: null,
    });
  }
};

export const getArtist = (name) => async (dispatch) => {
  try {
    const response = await apiGetArtist(name);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes?.PLAYLIST,
        sections: response.data.data.sections[1],
      });
    } else {
      dispatch({
        type: actionTypes?.PLAYLIST,
        sections: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.PLAYLIST,
      data: null,
    });
  }
};

export const getDetailArtist = (name) => async (dispatch) => {
  try {
    const response = await apiGetArtist(name);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes?.ARTIST,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionTypes?.ARTIST,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ARTIST,
      data: null,
    });
  }
};
