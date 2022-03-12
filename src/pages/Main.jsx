import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Banner, Card, CateBest, SessionTitle } from "../components/index";
import { Btn } from "../elements";

import axios from 'axios';
const Main = () => {
  const [data, setData] = useState('')
  const getMain = async () => {
    const response = await axios.get('http://localhost:4000/main');
    setData(response.data);
    console.log(data)
  };
  useEffect(() => {
    getMain();
  }, [])

  return (
    <StyleMain>
      <Banner/>
      <section>
        <SessionTitle>오늘의 베스트</SessionTitle>
        <Card data={data.todayBest} type="main"/>
      </section>
      <section>
        <SessionTitle>카테고리별 베스트</SessionTitle>
        <CateBest data={data.categoryBest}/>
      </section>
      <section>
        <SessionTitle>나에게 꼭 필요한 정책을 찾아볼까요?</SessionTitle>
        <MoreLink>
          <MoreLinkBtn to='/search'>맞춤 정책 찾기</MoreLinkBtn>
        </MoreLink>
      </section>
    </StyleMain>
  );
};
const StyleMain = styled.div`
  padding: 0 0 0 20px;
  section{
    padding-top: 8rem;
    .cont-tit{
      margin: 0 0 6rem 0;
      display: flex;
      justify-content: center;
      font-size: 2.4rem;
      font-weight: 600;
    }
  }
`
const MoreLink = styled.div`
  margin: 0 0 8rem;
  display: flex;
  justify-content: center;
  width: 100%;
`
const MoreLinkBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.7rem;
  height: 6.4rem;
  background-color: #aeaec9;
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
`

export default Main;
