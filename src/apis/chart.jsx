import axios from "../axios";

const getChartHome = async () => {
  try {
    const response = await axios({
      url: "/charthome",
      method: "get",
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default getChartHome;
