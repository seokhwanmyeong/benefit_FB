import React, { useState } from "react";
import styled from "styled-components";
import { LoginSocial } from "../components/index";
import { Link } from "react-router-dom";
import { CheckTrue, CheckFalse } from "../icons/ico_url"

const Login = () => {
  const [state, setState] = useState(false);
  const onChangeState = () => {
    setState(!state)
  }

  return (
    <LoginWrap>
      <LoginTitle>로그인</LoginTitle>
      <LoginSocial social='kakao' margin='0 0 4rem' status={state}/>
      <MainTerms>
        <label key='lawStatus' className="check-label">
          <input 
              onChange={onChangeState} 
              id='lawStatus' 
              type="checkbox" 
              className='check-int'
          />
          <span className='check-box'></span>
        </label>
        <Link to='/law'>
          <span>이용약관</span>, <span>개인정보 수집 및 이용</span>
          내용을 확인 하였고 동의합니다.
        </Link>
      </MainTerms>
    </LoginWrap>
  );
};
const LoginWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 33.6rem;
  min-height: 70vh;
`;

const LoginTitle = styled.h3`
  margin: 0 0 4rem;
  font: ${props => props.theme.font.styleh4};
  color: ${props => props.theme.color.b0};
`

const MainTerms = styled.div`
  position: static;
  display: flex;
  width: 100%;
  font: ${props => props.theme.font.p};
  color: ${props => props.theme.color.b1};
  span{
    color: ${props => props.theme.color.p2};
  }
  a{
    color: ${props => props.theme.color.p2};
  }
  &:hover{
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.color.p2};
  }
  label{
    margin: 1.6rem 0 0;
    display: block;
    &:first-child{
      margin: 0 0 0;
      width: 10%;
    }
    &.check-label {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        .check-box{
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(${CheckFalse}) center center / contain no-repeat;
        }
        .check-int:checked + .check-box{
            background: url(${CheckTrue}) center center / contain no-repeat;
        }
    }
    .check-cont{
        margin: 0 0 0 0.8rem;
        font: ${props => props.theme.font.option_selected};
    }
}
`;

export default Login;