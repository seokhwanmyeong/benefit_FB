import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { actionCreators as postActions } from "../redux/modules/post";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Category, SessionTitle } from "../components/index";
import { Btn } from "../elements";
import { Center } from "../icons/ico_components";
import { NaviPrev, NaviNext } from "../icons/ico_url";

const CateBest = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const { data } = props;
    const [btnText, setText] = useState('')
    
    // ["c0", "전체"],
                // ["c1", "주거 금융"],
                // ["c2", "코로나 19"],
                // ["c3", "창업지원"],
                // ["c4", "생활 복지"],
                // ["c5", "정책 참여"],
                // ["c6", "취업"]

    const catId = (id) => {
        const id_list = {
            "주거·금융" : "c1",
            "코로나19" : "c2",
            "창업지원" : "c3",
            "생활·복지" : "c4",
            "정책참여" : "c5",
            "취업지원" : "c6",
        }
        return(id_list[id])
    }

    const linkToDetail = (postId) => {
        navigate(`/detail/${postId}`, {state: {id: postId}})
    }

    useEffect(() => {
		if(data && data.length > 0) {
			setText(data[0].category);
		}
	}, [data])
    
    return (
        <CardWrap>
            <CardHead>
                <SessionTitle margin="0">카테고리별 베스트</SessionTitle>
                <CardNavi>
                    <div className="navi navi--prev" ref={prevRef}></div>
                    <div className="navi navi--next" ref={nextRef}></div>
                </CardNavi>
            </CardHead>
            <Swiper
                onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
                }}
                modules={[Navigation]}
                loop={true}
                breakpoints={{
                    0 : {
                        spaceBetween: 0
                    },
                    808 : {
                        slidesPerView: 1,
                    }
                  }}
            >
                {data?.map((cur, idx) => {
                    return(
                        <SwiperSlide key={cur.postId}>
                            <CardCate>{cur.category}</CardCate>
                            <BgCate></BgCate>
                            <Card onClick={() => linkToDetail(cur.postId)}>
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
                            <Btn 
                            _type='normal' 
                            _onClick={() => {
                                navigate('/search')
                                dispatch(postActions.setCate(catId(cur.category), true))
                            }} 
                            _text={cur.category + ' 분야 정책 더보기'}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </CardWrap>
    );
};
const CardWrap = styled.div`
  position: relative;
  .swiper{
      .swiper-slide{
        display: flex;
        flex-wrap: wrap;
      }
  }
`;
const CardHead = styled.div`
    z-index: 2;
    position: absolute;
    top: 0;
    left: 12rem;
    padding-right: 1.4rem;
    width: calc(100% - 12rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    @media screen and (max-width: 808px) {
        left: 13rem;
        padding-right: 0rem;
    }
`
const CardCate = styled.div`
    z-index: 2;
    margin: 0 0 2.4rem;
    width: 100%;
    flex-grow: 1;
    font: ${props => props.theme.font.styleh3};
    color: ${props => props.theme.color.p1};
    background-color: #ffffff;
`
const BgCate = styled.div`
    margin-bottom: 1rem;
    width: 33.8rem;
    background-color: #999999;
    @media screen and (max-width: 808px) {
        z-index: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 6rem;
        padding-top: 9rem;
        width: 100%;
        height: 22rem;
    } 
`
const Card = styled.div`
    z-index: 2;
    margin-bottom: 1rem;
    padding: 3.2rem 3rem; 
    width: 42.2rem;
    border: 1px solid ${props => props.theme.color.g2};
    cursor: pointer;
    .card-deco {
        margin: 0 0 2.4rem;
        font-size: 2.8rem;
        font-weight: 600;
        font-family: 'Ohneuleun';
        color: ${props => props.theme.color.p1};
    }
    .card-title {
        margin: 0 0 0.4rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font: ${props => props.theme.font.styleh3};
    }
    .card-contents {
        margin: 0 0 1.6rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font: ${props => props.theme.font.body};
    }
    .card-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .card-period {
        font: ${props => props.theme.font.body};
    }
    .card-agency {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .card-agency-logo {
        margin-right: 0.58rem;
    }
    .card-agency-name {
        font: ${props => props.theme.font.body};
    }
    @media screen and (max-width: 808px) {
        width: 100%;
        border: 0;
    } 
`
const CardNavi = styled.div`
    position: relative;
    display: flex;
    .navi{
        width: 3.2rem;
        height: 3.2rem;
        border: 1px solid #000000;
        border-radius: 50%;
        &.navi--prev{
            background: url('${NaviPrev}') no-repeat center center;
        }
        &.navi--next{
            margin-left: 1.5rem;
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