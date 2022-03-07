import React from "react";
import styled, { keyframes } from "styled-components";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Card = () => {
  return (
    <CardWrap>
      <Swiper
        slidesPerView={3}
        slidesPerGroup={1}
        navigation={true}
        modules={[Navigation]}
        spaceBetween={10}
      >
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
        <SwiperSlide>4</SwiperSlide>
        <SwiperSlide>5</SwiperSlide>
        <SwiperSlide>6</SwiperSlide>
        <SwiperSlide>7</SwiperSlide>
      </Swiper>
    </CardWrap>
  );
};
const CardWrap = styled.div``;

export default Card;
