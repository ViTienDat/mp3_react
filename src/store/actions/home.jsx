import actionTypes from "./actionTypes";
import { getHome } from "../../apis";

export const getHomes = () => async (dispatch) => {
  try {
    const response = await getHome();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: response.data.data.items,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME,
      homeData: null,
    });
  }
};
