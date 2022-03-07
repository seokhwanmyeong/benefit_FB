import React from "react";
import styled from "styled-components";
import NaverLogin from "react-naver-login";
import { SiNaver } from "react-icons/si";

const Naver = () => {
  const oAuthHandler = (res) => {
    console.log(res);
  };
  //7FYQf7FgJk6F84CUSgHS
  return (
    <NaverLogin
      clientId="7FYQf7FgJk6F84CUSgHS"
      callbackUrl="http://localhost:3000/"
      isPopup="false"
      render={(renderProps) => (
        <NaverLoginBtn
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          isPopup="false"
        >
          <SiNaver size="30" />
          {/* 네이버 아이디로 로그인 */}
        </NaverLoginBtn>
      )}
      buttonText="Sign In With Naver"
      onSuccess={oAuthHandler}
      onFailure={console.error}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
    />
  );
};
const NaverLoginBtn = styled.button`
  width: 100px;
  height: 58px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dadada;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  color: green;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: 5px;
    width: 110px;
    margin-top: -126px;
    border-top: 1px solid #363940;
    pointer-events: none;
  }
`;
export default Naver;
