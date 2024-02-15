import React, { memo } from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoadingData = () => {
  return (
    <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="white"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default memo(LoadingData);
