import React, { useRef } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { NaviPrev, NaviNext } from "../icons/ico_url";

const DetailContent = (props) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null)
    const { data, _className } = props;

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "</span>";
        },
    };

    const sortDB = [
        {
            "정책명" : data?.title,
            "기관 및 지자체 구분" : data?.group,
            "지역" : data?.location,
            "정책요약" : data?.summary,
            "정책유형" : data?.category,
            "지원내용" : data?.benefit_desc,
            "지원형태" : data?.benefit,
            "신청기간" : data?.apply_period,
            "지원규모" : data?.scale,
        },
        {
            "요건-연령" : data?.age,
            "요건-학력" : data?.education,
            "요건-전공" : data?.major,
            "요건-취업상태" : data?.job_status,
            "요건-특화분야" : data?.special,
            "운영기관" : data?.operation,
            "사업 운영 기간" : data?.do_period,
            "거주지 및 소득" : data?.residence,
            "추가 단서 사항" : data?.plus
        },
        {
            "신청절차" : data?.process,
            "심사 및 발표" : data?.dday,
            "신청 사이트" : data?.apply_site,
            "제출서류" : data?.submit,
            "기타 유익 정보" : data?.etc,
            "주관 기관" : data?.maker,
            "참고사이트1" : data?.reference_site1,
            "참고사이트2" : data?.reference_site2
        }
    ]
    
    return (
        <Content className={_className}>
            <CardNavi>
                <div className="navi navi--prev" ref={prevRef}></div>
                <div className="navi navi--next" ref={nextRef}></div>
            </CardNavi>
            <StyleSwiper
                // slidesPerView={"auto"}
                modules={[Navigation, Pagination]}
                pagination={{ el: paginationRef.current, clickable: true }}
                paginationbulletrender= {{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + "</span>";
                    },
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current
                    swiper.params.navigation.el = paginationRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                spaceBetween={16}
                breakpoints={{
                    360 : {
                        autoHeight: true,
                        slidesPerView: 3,
                        spaceBetween: 20,
                        direction: "vertical"
                    },
                    808 : {
                        autoHeight: true,
                        slidesPerView: 1,
                        direction: "horizontal"
                    }
                }}
            >
                {sortDB.map((cur, idx) => {
                    return (
                        <SwiperSlide>
                            <DetailCard>
                                <table>
                                    <tbody>
                                        {Object.entries(cur).map((list) => {
                                            return(
                                                <tr key={list[0]}>
                                                    <th>{list[0]}</th>
                                                    <td>
                                                        {(list[0] === "신청 사이트" || list[0] === "참고사이트1" || list[0] === "참고사이트2") & list[1]?.includes('http')
                                                            ? <a href={list[1]} target='_blank'>{list[1]}</a>
                                                            : list[1]?.replace(/(\\r\\n|\\n|\\r)/g, '\n')
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </DetailCard>
                        </SwiperSlide>
                    )
                })}
            </StyleSwiper>
            <CardPagenation ref={paginationRef} className="test"></CardPagenation>
        </Content>
    );
};
const Content = styled.div`
    position: relative;
    display: none;
    &.active{
        display: block;
    }
`
const StyleSwiper = styled(Swiper)`
    padding-bottom: 1px;
    .swiper-wrapper{
        height: 70rem;
    }
    @media screen and (max-width: 808px) {
        .swiper-wrapper{
            height: auto!important;
            .swiper-slide{
                height: auto!important;
            }
        }
    }
`
const DetailCard = styled.div`
    padding: 1.6rem;
    height: 100%;
    border: 1px solid ${props => props.theme.color.b0};
    // overflow-y: scroll;
    table {
        width: 100%;
        height: 100%;
        border-collapse: separate;
        border-spacing: 0 1rem;
    }
    tbody{
        display: flex;
        flex-direction: column;
    }
    th{
        padding-right: 2.4rem;
        width: 10rem; 
        text-align: left;
        font: normal 600 1.4rem/1.45 Noto sans, sans-serif;
        color: ${props => props.theme.color.b0};
        vertical-align: top;
        word-break: keep-all;
    }
    td{
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b0};
        text-align: left;
        vertical-align: top;
        word-break: break-all;
        white-space: pre-wrap;
    }
    @media screen and (max-width: 808px) {
    }
`
const CardNavi = styled.div`
    z-index: 11;
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
            left: -1.6rem;
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
const CardPagenation = styled.div`
    margin: 2rem 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .swiper-pagination-bullet{
        margin: 0 3px;
        &-active{
            border-radius: 8px;
            width: 32px;
            background-color: ${props => props.theme.color.b0};
        }
    }
`;

export default DetailContent;