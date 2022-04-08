import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Myzzim, Myreview, Spinner, ModalPop } from "../components/index";
import { BtnTap, BtnText } from "../elements";
import styled from "styled-components";
import { commonAni } from '../styles/Animation'

const Mypage = (props) => {
  const modalRef = useRef();
  const loading = useSelector((state) => state.post.is_loading);
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

  const ModalHandler = () => {
    modalRef.current.classList.contains("active")
    ? modalRef.current.classList.remove("active")
    : modalRef.current.classList.add("active")
  }

  return (
    <MypageWrap>
      <MypageTitle>
        <p className="title-comment">반갑습니다</p>
        <p className="user-nickname">{user.nickname}님!</p>
      </MypageTitle>
      <MypageTap>
          <BtnTap
              _id="tapLike"
              _onClick={tabHandler}
              text="찜한 정책"
              _className={tabState.tapLike ? "active" : ""}
              count={2}
          />
          <BtnTap
              _id="tapComment"
              _onClick={tabHandler}
              text="나의 댓글"
              _className={tabState.tapComment ? "active" : ""}
              count={2}
          />
      </MypageTap>
      <MypageContent>
        {tabState.tapLike 
        ? <React.Fragment>
            <BtnText onClick={ModalHandler} text='폴더만들기 >' margin='0 0 2rem'/>
            <Myzzim/> 
        </React.Fragment>
        : <Myreview/>}
      </MypageContent>
      <ModalPop modalId={2} ref={modalRef}/>
    </MypageWrap>
  );
};
const MypageWrap = styled.div`
  padding: 5.6rem 10.4rem 3.2rem;
  animation: 0.3s ${commonAni} ease-out;
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
`
const MypageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export default Mypage;