import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post"
import { Banner, Card, CateBest, SessionTitle, CardReview, Spinner } from "../components/index";
import { commonAni } from '../styles/Animation'

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.main_list);
  const loading = useSelector((state) => state.post.is_loading);
  
  useEffect(() => {
    dispatch(postActions.getMainFB())
  }, [])
  
  if(loading){
    return <Spinner type='page'/>;
  }return (
    <React.Fragment>
      <Banner/>
      <Section padding={'3.2rem 0 3.2rem 2.4rem'}>
        <SessionTitle>오늘의 베스트</SessionTitle>
        <Card data={data.todayBest} type="main"/>
      </Section>
      <Section media_bg='on'>
        <CateBest data={data.categoryBest}/>
      </Section>
      <Section padding={'5.6rem 2.4rem'}>
        <SessionTitle>후기부터 읽어보세요!</SessionTitle>
        <CardReview data={data.review_link}/>
      </Section>
      {/* <PageAlertFixing>
        <div className="box">
          <h4>죄송합니다<br/> 현재 서비스 점검중입니다</h4>
          <p>2022-04-05 16:15 ~ 2022-04-05 18:00</p>
        </div>
      </PageAlertFixing> */}
    </React.Fragment>
  );
};
const Section = styled.section`
  padding: ${props => props.padding ? props.padding : '3.2rem 2.4rem'};
  animation: 0.3s ${commonAni} ease-out;
  ${props => props.media_bg === 'on' ? css`
    @media screen and (max-width: 808px) {
      background-color: ${props => props.theme.color.g3};
    }
  ` : ``}
`
const PageAlertFixing = styled.div`
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  .box{
    h4{
      margin: 0 0 3.2rem;
      font: ${props => props.theme.font.styleh2};
      color: ${props => props.theme.color.p1};
      text-align: center;
    }
    p{
      font: ${props => props.theme.font.styleh5};
      color: ${props => props.theme.color.b0};
      text-align: center;
    }
  }
`

export default Main;
