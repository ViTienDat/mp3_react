import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  seasontheme: {},
  heditortheme3: {},
  heditortheme: {},
  top100: {},
  newrelease: {},
  weekchart: {},
  isloading: false,
  chart: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        seasontheme:
          action.homeData?.find((item) => item.sectionId === "hSeasonTheme") ||
          {},
        heditortheme3:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        heditortheme:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        newrelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekchart:
          action.homeData?.find((item) => item.sectionType === "weekChart") ||
          {},
        chart: action.homeData?.find((item) => item.sectionId === "hZC") || {},
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isloading: action.flag,
      };
    default:
      return state;
  }
};

export default appReducer;
