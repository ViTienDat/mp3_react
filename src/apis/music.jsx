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
