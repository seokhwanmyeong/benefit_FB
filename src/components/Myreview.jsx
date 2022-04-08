import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as commentActions } from "../redux/modules/comment";
import { CardComment, Spinner } from "./index"

const Myreview = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.comment.comment_list);
  const loading = useSelector((state) => state.post.is_loading);

  useEffect(() => {
    dispatch(commentActions.setMyCommentFB());
  }, [])

  if(loading){
    return <Spinner type='page'/>;
  }return (
    <MyCommentWrap>
      <CardComment data={data}/>
    </MyCommentWrap>
  )
};
const MyCommentWrap = styled.div`
  width: 100%;
`

export default Myreview;