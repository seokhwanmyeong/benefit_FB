import React, { useRef } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { NaviPrev, NaviNext } from "../icons/ico_url";

const DetailContent = (props) => {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const { data } = props;

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
            "요건-연령" : data?.age
        },
        {
            "요건-학력" : data?.education,
            "요건-전공" : data?.major,
            "요건-취업상태" : data?.job_status,
            "요건-특화분야" : data?.special,
            "신청절차" : data?.process,
            "심사 및 발표" : data?.dday,
            "신청 사이트" : data?.apply_site,
            "운영기관" : data?.operation,
            "사업 운영 기간" : data?.do_period,
            "거주지 및 소득" : data?.residence,
            "추가 단서 사항" : data?.plus
        },
        {
            "제출서류" : data?.submit,
            "기타 유익 정보" : data?.etc,
            "주관 기관" : data?.maker,
            "참고사이트1" : data?.reference_site1,
            "참고사이트2" : data?.reference_site2
        }
    ]
    console.log(Object.entries(sortDB))
    return (
        <Content>
            <div>
                <div className="navi navi--prev" ref={prevRef}></div>
                <div className="navi navi--next" ref={nextRef}></div>
            </div>
            <StyleSwiper
                slidesPerView={"auto"}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                modules={[Navigation, Pagination]}
                spaceBetween={16}
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
                                                    <td>{list[1]}</td>
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
        </Content>
    );
};
const Content = styled.div`
`
const StyleSwiper = styled(Swiper)`
    .swiper-wrapper{
        height: 50vh;
    }
`
const DetailCard = styled.div`
    padding: 1.6rem;
    height: 100%;
    border: 1px solid ${props => props.theme.color.b0};
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
    }
    @media screen and (max-width: 808px) {
    }
`
export default DetailContent;