import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { actionCreators as postActions } from "../redux/modules/post";
import { ImgBenefit, ImgRanking, ImgLocation, CateBox } from './index';
import { SvgPlus } from "../icons/ico_components";
import { NaviPrev, NaviNext } from "../icons/ico_url";
import { CardDeco1, CardDeco2, CardDeco3 } from "../img/img_url";
import { commonAni } from '../styles/Animation'

const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data } = props;

  const linkToDetail = (postId, cate) => {
    navigate(`/detail/${postId}`, {state: {cate: cate}})
  }
  
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
            <SwiperSlide onClick={() => linkToDetail(cur.postId, cur.category)} key={`best${cur.postId}`}>
              <MainCard>
                <div className="card-rank">
                  <ImgRanking rank={idx + 1}/>
                </div>
                <div className="card-head">
                  <div className="card-head-img"><ImgBenefit benefit={cur.benefit}/></div>
                  <CateBox category={cur.category}/>
                </div>
                <h4 className="card-title">{cur.title}</h4>
                <p className="card-contents">{cur.summary}</p>
                <div className="card-foot">
                  <p className="card-period">{cur.apply_period?.length >= 16 ? ('~ ' + cur.apply_period.split("~")[1].toString().trim()) : cur.apply_period}</p>
                  <div className="card-agency">
                    <div className="card-agency-logo"><ImgLocation location={cur.location}/></div>
                    <span className="card-agency-name">{cur.location}</span>
                  </div>
                </div>
              </MainCard>
            </SwiperSlide>
          )
        })}
        <SwiperSlide>
          <MovePage>
            <Link to='/search' onClick={() => {dispatch(postActions.setCate('c0', true))}}>
              <SvgPlus/>
              더 보기
            </Link>
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
  position: relative;
  padding: 9rem 3rem 0;
  width: 28rem;
  height: 33.6rem;
  border-radius: ${props => props.theme.radius.card};
  background-color: ${props => props.theme.color.g3};
  cursor: pointer;
  &:before{
    content: "";
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    display: flex;
    width: 100%;
    height: 100%;
    background: url('${CardDeco1}') no-repeat;
  }
  &:after{
    content: "";
    position: absolute;
    top: 5.7rem;
    left: 0.6rem;
    display: flex;
    width: 100%;
    height: 5.4rem;
    background: url('${CardDeco2}') no-repeat;
  }
  .card-rank {
    position: absolute;
    top: 0;
    left: 3.2rem;
  }
  .card-head {
    margin: 0 0 1.6rem;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    align-items: flex-end;
  }
  .card-head-img {
    width: 5.6rem;
    height: 5.6rem;
    svg{
      width: 100%;
      height: 100%;
    }
  }
  .card-head-cate {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 7.1rem;
    height: 2.4rem;
    border: 1px solid ${props => props.theme.color.b0};
    font: ${props => props.theme.font.p};
  }
  .card-title {
    margin: 0 0 1.6rem;
    height: 2.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font: ${props => props.theme.font.styleh4};
  }
  .card-contents {
    margin: 0 0 1.6rem;
    height: 5.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font: ${props => props.theme.font.p};
  }
  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-period {
    font: ${props => props.theme.font.p};
  }
  .card-agency {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .card-agency-logo {
    margin-right: 0.5rem;
    display: flex;
  }
  .card-agency-name {
    font: ${props => props.theme.font.body};
  }
  div{
    transition: 0.1s;
  }
  &:hover{
    background-color: ${props => props.theme.color.p2};
    color: ${props => props.theme.color.w};
    .card-head-img{
      border-radius: 50%;
      background-color: ${props => props.theme.color.o1};
    }
    .card-head-cate {
      border: 1px solid ${props => props.theme.color.w};
    }
    svg{
      fill: ${props => props.theme.color.w};
    }
  }
`;
const MovePage = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  a{
    width: 11.6rem;
    height: 11.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.color.g3} url('${CardDeco3}') no-repeat 4px 4px;
    border-radius: 50%;
    font: ${props => props.theme.font.p};
    color: ${props => props.theme.color.p2};
    svg{
      margin-bottom: 0.4rem;
    }
    &:hover{
      background-color: ${props => props.theme.color.p2};
      color: ${props => props.theme.color.w};
      svg{
        path{
          stroke: #ffffff;
        }
      }
    }
  }
`;
const CardNavi = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  .navi{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid #000000;
    border-radius: 50%;
    cursor: pointer;
    &.navi--prev{
      left: -4rem;
      background: ${props => props.theme.color.w} url('${NaviPrev}') no-repeat center center;
    }
    &.navi--next{
      right: -1.6rem;
      background: ${props => props.theme.color.w} url('${NaviNext}') no-repeat center center;
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
