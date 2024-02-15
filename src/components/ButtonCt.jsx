import React, { memo } from "react";

const ButtonCt = ({ text, style }) => {
  return (
    <div>
      <button
        type="button"
        className={
          style
            ? style
            : "py-1 px-4 rounded-l-full rounded-r-full bg-transparent"
        }
      >
        {text}
      </button>
    </div>
  );
};

export default memo(ButtonCt);
