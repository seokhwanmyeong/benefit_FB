import React from "react";
import styled from "styled-components";
// import { KAKAO_AUTH_URL } from "../shared/OAuth";
// import KaKaoLogin from "react-kakao-login";

const Kakao = (props) => {
  const REST_API_KEY = "3865ce74de220921c4eefe23112c13f0";
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <KakaoWrap>
      <a href={KAKAO_AUTH_URL}>Kakao Login</a>
      {/* <KaKaoLogin
        href={KAKAO_AUTH_URL}
        className="kakao__login"
        token={"12c9932e15c693e83a7e37f3cf8f60be"}
        buttonText={"kakao"}
        onSuccess={oAuthHandler}
        onFail={console.error}
        onLogout={console.info}
      >
        <ButtoninnerText>
          <div className="kakao__mark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4C7.029 4 3 7.185 3 11.115C3 13.673 4.707 15.915 7.27 17.169L6.49 20.109C6.368 20.598 6.669 20.592 6.867 20.46L10.33 18.107C10.8829 18.1889 11.4411 18.23 12 18.23C16.971 18.23 21 15.045 21 11.115C21 7.185 16.971 4 12 4Z"
                fill="#1B1C1D"
              />
            </svg>
            <span className="kakao__text">카카오 로그인</span>
          </div>
        </ButtoninnerText>
      </KaKaoLogin> */}
    </KakaoWrap>
  );
};
const KakaoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 40px;
  position: static;
  width: 336px;
  height: 72px;
  background: #ffe812;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
  border-radius: 12px;
`;
const ButtoninnerText = styled.div`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  .kakao__mark {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .kakao__text {
    margin: 0px 4px;
  }
`;

export default Kakao;