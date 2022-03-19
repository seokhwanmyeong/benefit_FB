import React from "react";
import styled from "styled-components";
import { Kakao, Google, Naver } from "../components/index";

const Login = () => {
  return (
    <Container>
      <Kakao />
      {/* <Naver />
      <Google /> */}
      <MainTerms>
        <p className="text__two">
          <span className="text__two-2">이용약관, 개인정보 수집 및 이용</span>
          내용을 확인 하였고 동의합니다.
        </p>
      </MainTerms>
    </Container>
  );
};

const Container = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainTerms = styled.div`
  position: static;
  width: 334px;
  height: 51px;
  margin-top: 40px;
  .text__two {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 145%;
    letter-spacing: -0.02em;
  }
  .text__two-2 {
    color: #7879f1;
  }
`;

export default Login;