import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";

const Sliders = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
  //
  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setPlaylist(null));
      dispatch(actions.setCurSongId(item.encodeId));
      dispatch(actions.play(true));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };

  return (
    <div className="">
      <Slider {...settings}>
        {banner.map((item) => (
          <div key={item.encodeId}>
            <img
              src={item.banner}
              onClick={() => handleClickBanner(item)}
              alt="banner"
              className="rounded-[10px] cursor-pointer"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliders;
