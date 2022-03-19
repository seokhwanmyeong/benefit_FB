import React, { useState } from "react";

import { Myzzim, Myreview } from "../components/index";
import { Btn } from "../elements";
import styled from "styled-components";

const Mypage = (props) => {
  let user = JSON.parse(localStorage.getItem("user"))

  const [tabState, setTabState] = useState({
    tapLike: true,
    tapComment: false,
  });

  const tabHandler = (event) => {
    const newTabState = { ...tabState };
    const activeTab = event.currentTarget.id;
    for (let key in newTabState) {
      key === activeTab
        ? (newTabState[key] = true)
        : (newTabState[key] = false);
    }
    setTabState(newTabState);
  };

  return (
    <MypageWrap>
      <MypageTitle>
        <p className="title-comment">반갑습니다</p>
        <p className="user-nickname">{user.nickname}님!</p>
      </MypageTitle>
      <MypageTap>
          <Btn
              _id="tapLike"
              _onClick={tabHandler}
              _text="찜한 정책"
              _className={tabState.tapLike ? "active" : ""}
          />
          <Btn
              _id="tapComment"
              _onClick={tabHandler}
              _text="나의 댓글"
              _className={tabState.tapComment ? "active" : ""}
          />
      </MypageTap>
      <MypageContent>
          {
              tabState.tapLike ? <Myzzim/> : <Myreview/>
          }
      </MypageContent>
    </MypageWrap>
  );
};
const MypageWrap = styled.div`
  padding: 5.6rem 10.4rem 3.2rem;
  @media screen and (max-width: 808px){
    padding: 2.4rem 1.6rem 3.2rem;
  }
`
const MypageTitle = styled.div`
  margin: 0 0 2.4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  p{
    text-align: center;
    font: ${props => props.theme.font.styleh3};
    color: ${props => props.theme.color.b0};
  }
`
const MypageTap = styled.div`
  margin-bottom: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
      width: 50%;
      height: 6.7rem;
      font: normal 500 1.6rem/1.3 Noto sans, sans-serif;
      color: ${props => props.theme.color.b0};
      box-shadow: inset 0 -1px 0 ${props => props.theme.color.p1};
      &.active{
          font-weight: 600;
          box-shadow: inset 0 -5px 0 ${props => props.theme.color.p1};
      }
  }
`
const MypageContent = styled.div`
`
export default Mypage;