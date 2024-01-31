import actionTypes from "./actionTypes";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
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

// export const fetchDetailPlaylist = () => async (dispatch) => {
//   try {
//     const response = await music.apiGetDetailPlaylist(pid);
//     console.log(response);
//     if (response?.data?.err === 0) {
//       dispatch({
//         type: actionTypes.PLAYLIST,
//         songs: response.data?.data?.song?.items,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PLAYLIST,
//       songs: null,
//     });
//   }
// };
