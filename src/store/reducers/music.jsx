import actionTypes from "../actions/actionTypes";

const initState = {
  curSongId: null,
  curSongData: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  searchData: null,
  keyword: "",
  sections: {},
  artistData: null,
  curAlbumId: null,
};

const music = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data || null,
      };
    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.pid || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
        sections: action.sections || {},
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action.data || null,
        keyword: action?.keyword || "",
      };
    case actionTypes.ARTIST:
      return {
        ...state,
        artistData: action.data || null,
      };
    default:
      return state;
  }
};

export default music;
