import axios from "../axios";

export const getSong = async (sid) => {
  try {
    const response = await axios({
      url: "/song",
      method: "get",
      params: { id: sid },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
// infor song
export const apiGetDetailSong = async (sid) => {
  try {
    const response = await axios({
      url: "/infosong",
      method: "get",
      params: { id: sid },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiGetDetailPlaylist = async (pid) => {
  try {
    const response = await axios({
      url: "/detailplaylist",
      method: "get",
      params: { id: pid },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiSearch = async (keyword) => {
  try {
    const response = await axios({
      url: "/search",
      method: "get",
      params: { keyword },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiGetArtistSong = async (singerId) => {
  try {
    const response = await axios({
      url: "/artistsong",
      method: "get",
      params: {
        id: singerId,
        page: 1,
        count: 50,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiGetArtist = async (name) => {
  try {
    const response = await axios({
      url: "/artist",
      method: "get",
      params: {
        name,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
