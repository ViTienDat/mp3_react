import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionItem from "./SectionItem";

const Section = ({ data, type, isAlbum = 1 }) => {
  return (
    <div className="mt-12 flex flex-col gap-5 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{data?.title}</h3>
      </div>
      <div
        className={`${
          isAlbum === 1
            ? "flex items-start gap-8 justify-between"
            : "flex items-start gap-8"
        }`}
      >
        {data?.items?.slice(0, 4).map((item) => (
          <SectionItem
            key={item.encodeId}
            link={item.link}
            sortDescription={item.sortDescription}
            thumbnailM={item.thumbnailM}
            title={item.title}
            type={type}
            releaseDateText={item.releaseDateText}
            isAlbum={isAlbum}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
