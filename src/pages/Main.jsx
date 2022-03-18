import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post"
import { Banner, Card, CateBest, SessionTitle, CardReview } from "../components/index";

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.main_list);
  console.log(data)
  useEffect(() => {
    dispatch(postActions.setMainFB())
  }, [])

  return (
    <StyleMain>
      <Banner/>
      <section className="main-card">
        <SessionTitle>오늘의 베스트</SessionTitle>
        <Card data={data.todayBest} type="main"/>
      </section>
      <section>
        <CateBest data={data.categoryBest}/>
      </section>
      <section>
        <SessionTitle>후기부터 읽어보세요!</SessionTitle>
        <CardReview data={data.review_link}/>
      </section>
    </StyleMain>
  );
};
const StyleMain = styled.div`
  section{
    padding: 3.2rem 2.4rem;
    &.main-card{
      padding: 3.2rem 0 3.2rem 2.4rem
    }
    :last-child{
      padding: 5.6rem 2.4rem;
    }
  }
`

export default Main;
