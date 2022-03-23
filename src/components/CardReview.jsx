import React from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper";
import { LinkPreview } from '@dhaiwat10/react-link-preview';

import { NaviPrev, NaviNext } from "../icons/ico_url"

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const CardReview = (props) => {
    const { data, _line, _view, _type } = props;
    // console.log(data)
    return (
      <ReviewWrap type={_type}>
        <Swiper
          spaceBetween={16}
          modules={[Grid]}
          grid={{
            rows: _line ? _line : 1,
          }}
          breakpoints={{
            0 : {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            808 : {
              slidesPerView: _view ? _view : 4,
              slidesPerGroup: _view? _view * 2 : 4,
              spaceBetween: 16
            }
          }}
        >
          {data?.map((cur, idx) => {
            return(
              <SwiperSlide key={idx}>
                <Preview 
                url={cur} 
                width='100%' 
                imageHeight='100px'
                borderRadius= '0'
                borderColor= 'transparent'
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </ReviewWrap>
    );
};
const ReviewWrap = styled.div`
  display: flex;
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
    padding: 1rem 0.6rem 2.2rem 0;
    .Title{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      font: ${props => props.theme.font.styleh6}
    }
    .Secondary{
      display: none;
    }
  }
`
// const CardNavi = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   .navi{
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     width: 20px;
//     height: 20px;
//     &.navi--prev{
//       left: -30px;
//       background: url('${NaviPrev}') no-repeat center center;
//     }
//     &.navi--next{
//       right: -30px;
//       background: url('${NaviNext}') no-repeat center center;
//     }
//     &.swiper-button-disabled{
//       display: none;
//     }
//   }
//   @media screen and (max-width: 808px) {
//     display: none;
//   } 
// `;

export default CardReview;