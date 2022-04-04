import React from "react";
import styled from "styled-components";

import GoogleLogin from "react-google-login";

import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const REST_API_KEY = "3865ce74de220921c4eefe23112c13f0";
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const GOOGLE_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const clientId =
  //   "452925253514-7c4uikf1k53887q599muhpv2uvhistm4.apps.googleusercontent.com";

  // const onSuccess = async (response) => {
  //   console.log(response);

  //   const {
  //     googleId,
  //     profileObj: { email, name },
  //   } = response;

  //   console.log(response);
  // };

  // const onFailure = (error) => {
  //   console.log(error);
  // };
  return (
    <GoogleWrap>
      <GoogleLogo
        className="socialLogo"
        width="24"
        height="24  "
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.56 11.25C21.56 10.47 21.49 9.72 21.36 9H11V13.255H16.92C16.665 14.63 15.89 15.795 14.725 16.575V19.335H18.28C20.36 17.42 21.56 14.6 21.56 11.25Z"
          fill="#4285F4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.9999 21.9998C13.9699 21.9998 16.4599 21.0148 18.2799 19.3348L14.7249 16.5748C13.7399 17.2348 12.4799 17.6248 10.9999 17.6248C8.13491 17.6248 5.70992 15.6898 4.84492 13.0898H1.16992V15.9398C2.97992 19.5348 6.69992 21.9998 10.9999 21.9998Z"
          fill="#34A853"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.84499 13.09C4.62499 12.4301 4.49999 11.7251 4.49999 11.0001C4.49999 10.2751 4.62499 9.57005 4.84499 8.91005V6.06006H1.17C0.424999 7.54506 0 9.22505 0 11.0001C0 12.775 0.424999 14.455 1.17 15.94L4.84499 13.09Z"
          fill="#FBBC05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.9999 4.37499C12.6149 4.37499 14.0649 4.92999 15.2049 6.01999L18.3599 2.865C16.4549 1.09 13.9649 0 10.9999 0C6.69992 0 2.97992 2.465 1.16992 6.05999L4.84492 8.90999C5.70992 6.30999 8.13491 4.37499 10.9999 4.37499Z"
          fill="#EA4335"
        />
      </GoogleLogo>
      <GoogleLink href={GOOGLE_AUTH_URL}>Google Login</GoogleLink>
      
      {/* <GoogleLogin
        className="google__login"
        clientId={clientId}
        buttonText={"Login"}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        icon={false}
      >
          <ButtoninnerText>
          <div className="google__mark">
            <svg
              className="socialLogo"
              width="24"
              height="24  "
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.56 11.25C21.56 10.47 21.49 9.72 21.36 9H11V13.255H16.92C16.665 14.63 15.89 15.795 14.725 16.575V19.335H18.28C20.36 17.42 21.56 14.6 21.56 11.25Z"
                fill="#4285F4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9999 21.9998C13.9699 21.9998 16.4599 21.0148 18.2799 19.3348L14.7249 16.5748C13.7399 17.2348 12.4799 17.6248 10.9999 17.6248C8.13491 17.6248 5.70992 15.6898 4.84492 13.0898H1.16992V15.9398C2.97992 19.5348 6.69992 21.9998 10.9999 21.9998Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.84499 13.09C4.62499 12.4301 4.49999 11.7251 4.49999 11.0001C4.49999 10.2751 4.62499 9.57005 4.84499 8.91005V6.06006H1.17C0.424999 7.54506 0 9.22505 0 11.0001C0 12.775 0.424999 14.455 1.17 15.94L4.84499 13.09Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9999 4.37499C12.6149 4.37499 14.0649 4.92999 15.2049 6.01999L18.3599 2.865C16.4549 1.09 13.9649 0 10.9999 0C6.69992 0 2.97992 2.465 1.16992 6.05999L4.84492 8.90999C5.70992 6.30999 8.13491 4.37499 10.9999 4.37499Z"
                fill="#EA4335"
              />
            </svg>
            <span className="google__text">구글 로그인</span>
          </div>
        </ButtoninnerText>
      </GoogleLogin> */}
    </GoogleWrap>
  );
};
const GoogleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 40px;
  position: static;
  width: 336px;
  height: 72px;
  margin-top: 16px;
  background: #ffffff;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
  border-radius: 12px;
`;
const GoogleLogo = styled.svg`
  width: 2.4rem;
  height: 2.4rem;
`
const GoogleLink = styled.a`
  font: ${props => props.theme.font.styleh4};
  color: ${props => props.theme.color.b0};
`
// const ButtoninnerText = styled.div`
//   font-family: "Noto Sans";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 20px;
//   line-height: 130%;
//   color: #000000;
//   .google__mark {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//   }
//   .google__text {
//     margin: 0px 4px;
//   }
// `;
export default Google;