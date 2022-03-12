import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Center } from "../icons/ico_components";
import { NaviPrev, NaviNext } from "../icons/ico_url";

const Card = (props) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const { data } = props;

  return (
    <CardWrap>
      <CardNavi>
        <div className="navi navi--prev" ref={prevRef}></div>
        <div className="navi navi--next" ref={nextRef}></div>
      </CardNavi>
      <Swiper
        slidesPerView={"auto"}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation]}
        spaceBetween={16}
      >
        {data?.map((cur, idx) => {
          return(
            <SwiperSlide key={cur.postId}>
              <MainCard>
                <div className="card-rank">
                  <p className="card-rank-content"><span>{idx + 1}</span>위</p>
                </div>
                <div className="card-head">
                  <div className="card-head-img">지원형태 {cur.benefit}</div>
                  <div className="card-head-cate">{cur.category}</div>
                </div>
                <h4 className="card-title">{cur.title}</h4>
                <p className="card-contents">{cur.summary}</p>
                <div className="card-foot">
                  <p className="card-period">{cur.apply_period.length >= 16 ? ('~ ' + cur.apply_period.split("~")[1].toString().trim()) : cur.apply_period}</p>
                  <div className="card-agency">
                    <div className="card-agency-logo"><Center/></div>
                    <span className="card-agency-name">중앙부처</span>
                  </div>
                </div>
              </MainCard>
            </SwiperSlide>
          )
        })}
        <SwiperSlide>
          <MovePage>
            <Link to='/search'>더 보기</Link>
          </MovePage>
        </SwiperSlide>
      </Swiper>
    </CardWrap>
  );
};

const CardWrap = styled.div`
  position: relative;
  .swiper-wrapper{
    justify-content: flex-start;
    .swiper-slide{
      width: auto;
      &:last-child{
        height: initial;
      }
    }
  }
`;
const MainCard = styled.div`
  padding: 1.4rem 3rem 3.2rem;
  width: 28rem;
  border: 1px solid #000000;
  .card-rank {
    margin: 0 0 2rem;
  }
  .card-rank-content {
    font-size: 2.3rem;
  }
  .card-rank-content span {
    font-size: 3.4rem;
    line-height: 1;
  } 
  .card-head {
    margin: 0 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .card-head-img {
    width: 5.6rem;
    height: 5.6rem;
    background-color: #888888;
  }
  .card-head-cate {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 7rem;
    height: 2.4rem;
    border: 1px solid #000000;
    font-size: 1.4rem;
  }
  .card-title {
    margin: 0 0 1.2rem;
    height: 6.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 2.4rem;
    font-weight: 600;
  }
  .card-contents {
    margin: 0 0 1rem;
    height: 5.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
  }
  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-period {
    font-size: 1.3rem;
  }
  .card-agency {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .card-agency-logo {
    margin-right: 0.5rem;
  }
  .card-agency-name {
    font-size: 1.3rem;
  }
`;
const MovePage = styled.div`
  width: 14.2rem;
  height: 100%;
  a{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;
  }
`;
const CardNavi = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .navi{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    &.navi--prev{
      left: -30px;
      background: url('${NaviPrev}') no-repeat center center;
    }
    &.navi--next{
      right: -30px;
      background: url('${NaviNext}') no-repeat center center;
    }
    &.swiper-button-disabled{
      display: none;
    }
  }
  @media screen and (max-width: 808px) {
    display: none;
  } 
`;

export default Card;
