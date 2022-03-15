import React, { useState } from "react";
import { Myzzim, Myreview } from "../components/index";
import { Btn } from "../elements";
import styled from "styled-components";

const Mypage = (props) => {
  console.log(props);
  const [tabState, setTabState] = useState({
    myzzim: true,
    myreview: false,
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
    <React.Fragment>
      <MyBtn>
        <Btn
          _id="myzzim"
          _onClick={tabHandler}
          _text="나의 찜"
          _className="my__zzim"
        />
        <Btn
          _id="myreview"
          _onClick={tabHandler}
          _text="내댓글"
          _className="my__review"
        />
      </MyBtn>
      <div>
        {tabState.myzzim ? <Myzzim /> : ""}
        {tabState.myreview ? <Myreview /> : ""}
      </div>
    </React.Fragment>
  );
};
const MyBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 53px 0px 0px;

  position: static;
  width: 263px;
  height: 200px;
  float: right;
  .my__zzim {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 20px 60px;

    position: static;
    width: 263px;
    height: 61px;

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 12px 0px;
  }
  .my__review {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 20px 60px;

    position: static;
    width: 263px;
    height: 61px;
  }
`;

const MySub = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 12px 0px 0px 12px;

  position: absolute;
  width: 532px;
  height: 40px;
`;
export default Mypage;
