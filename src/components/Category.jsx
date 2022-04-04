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
        {id: "all", content: "전체", count: list.count?.c0},
        {id: "c1", content: "주거·금융", count: list.count?.c1},
        {id: "c2", content: "코로나 19", count: list.count?.c2},
        {id: "c3", content: "창업지원", count: list.count?.c3},
        {id: "c4", content: "생활·복지", count: list.count?.c4},
        {id: "c5", content: "정책참여", count: list.count?.c5},
        {id: "c6", content: "취업지원", count: list.count?.c6},
    ]

    const changCate = (e, id) => {
        dispatch(postActions.setCate(id))
    }

    return (
        <StyleCategory>
            <StyleSwiper
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
            </StyleSwiper>
        </StyleCategory>
    );
};
const StyleCategory = styled.div`
    margin: 3.2rem 0 3.6rem;
    @media screen and (max-width: 808px){
        margin: 2rem 0 1.2rem;
        padding: 0 0 0 1rem;
    }
`;
const StyleSwiper = styled(Swiper)`
    display:flex;
    .swiper-wrapper{
        justify-content: flex-start;
        .swiper-slide{
            width: auto;
            .cate{
                padding: 1.2rem 2rem;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                border: 1px solid ${props => props.theme.color.g2};
                font: ${props => props.theme.font.tags_cate_tab};
                border-radius: 24px;
                span{
                    margin-left: 2px;
                    font: ${props => props.theme.font.tab_category_number};
                    color: inherit;
                }
                &.active{
                    background-color: ${props => props.theme.color.p31};
                    border: 1px solid ${props => props.theme.color.p31};
                    color: ${props => props.theme.color.w};
                }
            }
        }
    }
`
export default Category;
