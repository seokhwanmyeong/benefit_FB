import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Category } from "../components/index";
import { Center } from "../icons/ico_components";
import { NaviPrev, NaviNext } from "../icons/ico_url";

const CateBest = (props) => {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const { data } = props;
    const [btnText, setText] = useState('')

    useEffect(() => {
		if(data && data.length > 0) {
			setText(data[0].category);
		}
	}, [data])
    
    return (
        <CardWrap>
            <CardNavi>
                <div className="navi navi--prev" ref={prevRef}></div>
                <div className="navi navi--next" ref={nextRef}></div>
            </CardNavi>
            <Swiper
                slidesPerView={1}
                onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
                }}
                modules={[Navigation]}
            >
                {data?.map((cur, idx) => {
                    return(
                        <SwiperSlide key={cur.postId}>
                            <BgCate></BgCate>
                            <Card>
                                <div className="card-deco">BEST</div>
                                <h4 className="card-title">{cur.title}</h4>
                                <p className="card-contents">{cur.summary}</p>
                                <div className="card-foot">
                                    <p className="card-period">{cur.apply_period.length >= 16 ? ('~ ' + cur.apply_period.split("~")[1].toString().trim()) : cur.apply_period}</p>
                                    <div className="card-agency">
                                        <div className="card-agency-logo"><Center/></div>
                                        <span className="card-agency-name">중앙부처</span>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </CardWrap>
    );
};
const CardWrap = styled.div`
  position: relative;
  .swiper-wrapper{
    .swiper-slide{
        display: flex;
    }
  }

`;
// const CardWrap = styled.article`
//     margin: 0 0 3.2rem;
//     position: relative;
//     display: flex;
//     flex-direction: row;
//     width: 100%;
// `
const Card = styled.div`
    z-index: 2;
    padding: 2.4rem 2.2rem 2rem 4.8rem; 
    width: 60%;
    border: 1px solid #000000;
    .card-deco {
        margin: 0 0 2rem;
        font-size: 3.4rem;
        font-family: "Ohneuleun";
        font-weight: 700;
    }
    .card-title {
        margin: 0 0 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 2.4rem;
        font-weight: 600;
    }
    .card-contents {
        margin: 0 0 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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
    @media screen and (max-width: 808px) {
        width: 100%;
        border: 0;
    } 
`
const BgCate = styled.div`
    width: 40%;
    background-color: #999999;
    @media screen and (max-width: 808px) {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    } 
`
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

export default CateBest;