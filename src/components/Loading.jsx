import React, { memo } from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <RotatingLines
      visible={true}
      height="96"
      width="40"
      color="white"
      strokeColor="white"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default memo(Loading);
