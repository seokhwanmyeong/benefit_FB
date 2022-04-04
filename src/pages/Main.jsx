import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post"
import { Banner, Card, CateBest, SessionTitle, CardReview, Spinner } from "../components/index";
const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.main_list);
  const loading = useSelector((state) => state.post.is_loading);
  
  useEffect(() => {
    dispatch(postActions.setMainFB())
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
    </React.Fragment>
  );
};
const Section = styled.section`
  padding: ${props => props.padding ? props.padding : '3.2rem 2.4rem'};
  ${props => props.media_bg === 'on' ? css`
    @media screen and (max-width: 808px) {
      background-color: ${props => props.theme.color.g3};
    }
  ` : ``}
`

export default Main;
