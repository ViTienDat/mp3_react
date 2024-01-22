import axios from "../axios";

const getHome = async () => {
  try {
    const response = await axios({
      url: "/home",
      method: "get",
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default getHome;
