import React from "react";
import styled, { css } from "styled-components";
import ImgSocial from "./ImgSocial";

const LoginSocial = (props) => {
    const { social, margin, status } = props;

    const social_controll = {
        "kakao" : {
            href: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`,
            text: '카카오로 시작하기',
        },
        "naver" : {
            href: ``,
            text: '네이버 로그인',
        },
        "google" : {
            href: ``,
            text: '구글로 로그인',
        },
        "": null,
    }[social]
    const preventBtn = (link) => {
      if(!status){
        alert('아래의 정보약관을 동의해주시길바랍니다')
        return;
      }
      window.location.href = link;
    }

    return (
      <Link onClick={() => preventBtn(social_controll.href)} type={social} margin={margin}>
          <LoginLogo social={social}/>
          {social_controll.text}
      </Link>
    );
};

const Link = styled.div`
  margin: ${props => props.margin ? props.margin : null};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.6rem;
  cursor: pointer;
  ${props => props.type === 'kakao' ? css`
    background: ${props => props.theme.social_login.kakao};
    font: ${props => props.theme.font.social_login_label};
    color: ${props => props.theme.color.b0};
  ` : props.type === 'naver' ? css`
    background: ${props => props.theme.social_login.naver};
    font: ${props => props.theme.font.social_login_label};
    color: ${props => props.theme.color.w};
  ` : props.type === 'google' ? css`
    background: ${props => props.theme.social_login.google};
    font: ${props => props.theme.font.social_login_label};
    color: ${props => props.theme.color.google};
  ` : null};
`

const LoginLogo = styled(ImgSocial)`
  margin: 0 4px 0;
  width: 2.4rem;
  height: 2.4rem;
`

export default LoginSocial;