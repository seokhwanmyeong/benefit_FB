import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Btn } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post"
import { actionCreators as userActions } from "../redux/modules/user";

const Category = (props) => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.post.search_list);
    const cate_list = useSelector((state) => state.post.cate)

    const key_group = [
        {id: "c0", content: "전체", count: list.c0.length},
        {id: "c1", content: "주거·금융", count: list.c1.length},
        {id: "c2", content: "코로나 19", count: list.c2.length},
        {id: "c3", content: "창업지원", count: list.c3.length},
        {id: "c4", content: "생활·복지", count: list.c4.length},
        {id: "c5", content: "정책참여", count: list.c5.length},
        {id: "c6", content: "취업지원", count: list.c6.length},
    ]

    const changCate = (e, id) => {
        dispatch(postActions.setCate(id))
    }

    return (
        <StyleCategory>
            <Swiper
                slidesPerView={"auto"}
                // slidesPerGroup={1}
                // navigation={true}
                // modules={[Navigation]}
                spaceBetween={8}
                className="cate-group"
            >
                {key_group.map((cur, idx) => {
                    return(
                        <SwiperSlide 
                        key={cur.id}
                        >
                            <Btn 
                            _onClick={(e) => changCate(e, cur.id)} 
                            _className={cate_list.includes(cur.id) ? 'cate active' : 'cate'}
                            _disabled={cur.count === 0 ? true : false}
                            >
                                {cur.content}
                                <span>{cur.count}</span>
                            </Btn>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </StyleCategory>
    );
};
const StyleCategory = styled.div`
    margin: 3.2rem 0 2.4rem;
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
    @media screen and (max-width: 808px){
        padding: 0 0 0 1rem;
    }
`
export default Category;
