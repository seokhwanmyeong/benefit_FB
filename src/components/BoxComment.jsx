import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actionCreators as commentActions } from '../redux/modules/comment';
import { Btn, BtnText } from '../elements';
import { commonAni, layerShow, layerDown } from '../styles/Animation'

const BoxComment = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const { data } = props;
    const comment_list = useSelector(state => state.comment.comment_list);
    const user = useSelector(state => state.user.user)
    const token = localStorage.getItem("ybrn");
    const [comment, setComment] = useState("");
    const ref = useRef();

    const onChangeTextarea = (e) => {
        setComment(e.currentTarget.value);
    }
    
    const addComment = (e) => {
        if(comment === ""){
            alert('내용을 입력해주세요')
            return;
        }
        dispatch(commentActions.addCommentFB(params.id, user.nickname, user.userId, comment));
        setComment("");
        ref.current.classList.remove('active');
        e.currentTarget.previousSibling.value = "";
        e.currentTarget.parentNode.previousSibling.classList.remove('active');
    }

    const cancleComment = (e) => {
        ref.current.classList.remove('active');
        e.currentTarget.previousSibling.previousSibling.value = "";
        e.currentTarget.parentNode.previousSibling.classList.remove('active');
    }

    const deleteComment = (commentId) => {
        console.log(commentId);
        dispatch(commentActions.deleteCommentFB(commentId));
    }

    const updateComment = (e, commentId) => {
        if(comment === ""){
            alert('내용을 입력해주세요')
            return;
        }
        dispatch(commentActions.updateCommentFB(commentId, comment));
        e.currentTarget.parentNode.classList.remove('active');
        setComment("")
        e.currentTarget.previousSibling.value = "";
    }

    const openTextareaHandler = (e) => {
        if(!token){
            alert("로그인해주세요");
            return;
        }
        if(ref.current.classList.contains('active')){
            ref.current.classList.remove('active');
            e.currentTarget.remove('active');
        }else{
            ref.current.classList.add('active');
            e.currentTarget.classList.add('active');
        }
    }

    const fixTextareaHandler = (e) => {
        if(!token){
            alert("로그인해주세요");
            return;
        }
        if(e.currentTarget.nextSibling.classList.contains('active')){
            e.currentTarget.nextSibling.classList.remove('active');
        }else{
            e.currentTarget.nextSibling.classList.add('active');
        }
    }
    
    return (
        <CommentWrap>
            <CommentInput>
                <CommentOpenBox onClick={openTextareaHandler}>
                    <span>댓글을 입력해주세요.</span>
                </CommentOpenBox>
                <CommentTextarea ref={ref}>
                    <textarea onChange={onChangeTextarea} placeholder='댓글을 입력해주세요'></textarea>
                    <Btn _type="small" _onClick={addComment} _text='등록하기'/>
                    <Btn _type="small" _onClick={cancleComment} _text='취소'/>
                </CommentTextarea>
            </CommentInput>
            <CommentGroup>
                {comment_list.map(cur => {
                    return (
                        <CommentList className='comment-list' key={cur.commentId}>
                            <div className='comment-info'>
                                <span className='comment-user'>{cur.nickname}</span>
                                <span className='comment-period'>{cur.insert_time?.split('T')[0].replaceAll('-','.')}</span>
                            </div>
                            <div className='comment-cont'>
                                <p>{cur.content}</p>
                            </div>
                            {cur.userId === user.userId
                            ? <React.Fragment>
                                <Btn _onClick={() => deleteComment(cur.commentId)} _className='btn-delete' _text='삭제'/>
                                <Btn _onClick={fixTextareaHandler} _className='btn-update' _text='수정'/>
                                <CommentTextarea>
                                    <textarea defalutvalue={cur.content} onChange={onChangeTextarea} placeholder='수정할 내용을 입력해주세요'></textarea>
                                    <Btn _type="small" _onClick={(e) => updateComment(e, cur.commentId)} _text='수정'/>
                                </CommentTextarea>
                            </React.Fragment>
                            : null
                            }
                        </CommentList>
                    )
                })}
            </CommentGroup>
        </CommentWrap>
    );
};
const CommentWrap = styled.div`
    width: 100%;
    animation: 0.3s ${commonAni} ease-out;
`;
const CommentInput = styled.div`
    margin: 2rem 0;
    @media screen and (max-width: 808px) {
        margin: 0 0 2rem;
    }
`;
const CommentOpenBox = styled.div`
    padding: 1rem 2rem;
    display: flex;
    width: 100%;
    border: 1px solid ${props => props.theme.color.g1};
    font: ${props => props.theme.font.p};
    color: ${props => props.theme.color.g1};
    &.active{
        display: none;
    }
`;
const CommentTextarea = styled.div`
    margin: 1.4rem 0 0;
    display: none;
    ${props => props.theme.font.p};
    &.active{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        flex-direction: row;
        flex-wrap: wrap;
        animation: 0.3s ${layerShow} ease-out;
    }
    textarea{
        margin: 0 0 1.4rem;
        padding: 1rem 2rem;
        width: 100%;
        height: 9rem;
        resize: none;
        border: 1px solid ${props => props.theme.color.g1};
        ::placeholder,
        ::-webkit-input-placeholder{
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.g1};
        }
        :-ms-input-placeholder {
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.g1};
        }
    }
    button+button{
        margin: 0 0 0 0.5rem;
    }
`;
const CommentGroup = styled.ul`
    position: relative;
`;

const CommentList = styled.li`
    position: relative;
    margin: 0 0 1.4rem;
    padding: 0 0 1.4rem;
    border-bottom: 1px solid ${props => props.theme.color.b0};
    .comment-info{
        margin: 0 0 1.4rem;
        span{
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.b0};
        }
        .comment-user{
            &:after{
                content: "";
                margin: 0 0.5rem;
                display: inline-block;
                width: 1px;
                height: 14px;
                background-color: ${props => props.theme.color.b0};
                transform: translateY(2px);
            }
        }
        .comment-period{

        }
    }
    .comment-cont{
        p{
            padding-right: 15%;
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.b0};
        }
    }
    .btn-update{
        position: absolute;
        right: 4rem;
        top: 0;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b0};
    }
    .btn-delete{
        position: absolute;
        right: 0;
        top: 0;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b0};
    }
`
export default BoxComment;