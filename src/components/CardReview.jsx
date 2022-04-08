import React from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay } from "swiper";
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { useDispatch } from 'react-redux';

import { actionCreators as postActions } from '../redux/modules/post';
import { BtnText } from '../elements';
import { commonAni } from '../styles/Animation'

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const CardReview = (props) => {
    const { data, _line, _view, _type, _auto} = props;
    const dispatch = useDispatch();
    // console.log(data)

    const deleteReviewLink = (reviewId) => {
      dispatch(postActions.deleteLinkFB(reviewId))
    }

    return (
      <ReviewWrap type={_type}>
        <Swiper
          spaceBetween={16}
          modules={[Grid, Autoplay]}
          // grid={{
          //   rows: _line ? _line : 1,
          // }}
          autoplay={
            _auto === 'true' ? {
              delay: 2500,
              disableOnInteraction: false,
            } : {
              disableOnInteraction: true,
            }
          }
          breakpoints={{
            0 : {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            808 : {
              slidesPerView: _view ? _view : 4,
              // slidesPerGroup: _view? _view * 2 : 4,
              spaceBetween: 16
            }
          }}
        >
          {data?.map((cur, idx) => {
            return(
              <SwiperSlide key={idx}>
                <Preview 
                url={cur.review_link} 
                width='100%' 
                imageHeight='100px'
                borderRadius= '0'
                borderColor= 'transparent'
                />
                {cur.review_status ?
                  <BtnText onClick={() => deleteReviewLink(cur.reviewId)} text='스토리 후기 삭제'/>
                : null }
              </SwiperSlide>
            )
          })}
        </Swiper>
      </ReviewWrap>
    );
};
const ReviewWrap = styled.div`
  display: flex;
  width: 100%;
  animation: 0.3s ${commonAni} ease-out;
  .swiper{
    width: 100%;
  }
  ${props => props.type === 'grid' ? css`
    .swiper-wrapper{
      height: auto;
      flex-direction: row;
      .swiper-slide{
        margin-top: 0px!important;
        margin-bottom: 2rem;
      }
    }
  ` : ''}
`
const Preview = styled(LinkPreview)`
  .LowerContainer{
    padding: 1rem 0.6rem 1.2rem 0;
    .Title{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      height: 4.2rem;
      font: ${props => props.theme.font.styleh6}
    }
    .Description{
      display: none;
    }
    .SiteDetails{
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      span{
        font: ${props => props.theme.font.social_rv_author};
        color: ${props => props.theme.color.p2}; 
      }
    }
  }
`

export default CardReview;