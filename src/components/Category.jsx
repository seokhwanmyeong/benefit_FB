import React from "react";
import styled, { keyframes } from "styled-components";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { actionCreators as postActions } from "../redux/modules/post"

const Category = (props) => {
    const { _margin, _path } = props;
    const dispatch = useDispatch();

    const key_group = [
        {id: "c0", content: "전체", count: 100},
        {id: "c1", content: "생활·복지", count: 100},
        {id: "c2", content: "창업지원", count: 100},
        {id: "c3", content: "정책참여", count: 100},
        {id: "c4", content: "코로나19", count: 100},
        {id: "c5", content: "주거·금융", count: 100},
        {id: "c6", content: "창업지원", count: 100},
    ]
    const changCate = (id) => {
        dispatch(postActions.getCateListFBtest(id))
    }
    return (
        <StyleCategory margin={_margin}>
            <Swiper
                slidesPerView={"auto"}
                // slidesPerGroup={1}
                // navigation={true}
                // modules={[Navigation]}
                spaceBetween={16}
                className="cate-group"
            >
                {key_group.map((cur, idx) => {
                    return(
                        <SwiperSlide key={cur.id}><div onClick={() => changCate(cur.id)} className="cate">{cur.content}<span>{cur.count}</span></div></SwiperSlide>
                    )
                })}
            </Swiper>
        </StyleCategory>
    );
};
const StyleCategory = styled.div`
    margin: ${props => props.margin ? props.margin : ""};
    .cate-group{
        display:flex;
        .swiper-wrapper{
            justify-content: flex-start;
            .swiper-slide{
                width: auto;
            }
        }
    }
    .cate{
        padding: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border: 1px solid ${props => props.theme.color.p3};
        font: ${props => props.theme.font.cat_tags};
        span{
            margin-left: 2px;
            font: ${props => props.theme.font.small_number};
        }
        &.active{
            background-color: ${props => props.theme.color.p2};
            border: 1px solid ${props => props.theme.color.p2};
            color: ${props => props.theme.color.w};
            span{
                color: inherit;
            }
        }
    }
`
const CateGroupe = styled.ul`

`
export default Category;
