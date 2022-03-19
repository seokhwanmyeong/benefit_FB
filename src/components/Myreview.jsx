import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as postActions } from "../redux/modules/post";
import { Btn } from "../elements";
import {  } from '../icons/ico_components'

const Myreview = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const data = useSelector((state) => state.post.user_like_list);
  // console.log(data)
  const linkToDetail = (postId) => {
    navigate(`/detail/${postId}`, {state: {id: postId}})
  }

  useEffect(() => {
    // dispatch(postActions.setMyLikeFB());
  }, [])

  return (
    <MyCommentWrap>

    </MyCommentWrap>
  )
};
const MyCommentWrap = styled.div`
`

export default Myreview;