import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actionCreators as commentActions } from '../redux/modules/comment';
import { ImgBenefit } from '../components/index'
import { Btn } from '../elements';
import { useNavigate } from 'react-router-dom';
import { commonAni, layerShow, layerDown } from '../styles/Animation'

const CardComment = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();
    const { data } = props;
    const [comment, setComment] = useState("");
    // console.log(data)

    const updateComment = (e, commentId) => {
        e.stopPropagation();
        if(comment === ""){
            alert('내용을 입력해주세요')
            return;
        }
        dispatch(commentActions.updateCommentFB(commentId, comment));
        e.currentTarget.parentNode.classList.remove('active');
        setComment("")
        e.currentTarget.previousSibling.value = "";
    }

    const deleteComment = (e, commentId) => {
        e.stopPropagation();
        dispatch(commentActions.deleteCommentFB(commentId))
    }

    const onChangeComment = (e) => {
        e.stopPropagation();
        setComment(e.currentTarget.value);
    }

    const fixTextareaHandler = (e) => {
        e.stopPropagation();
        if(e.currentTarget.nextSibling.classList.contains('active')){
            e.currentTarget.nextSibling.classList.remove('active');
        }else{
            e.currentTarget.nextSibling.classList.add('active');
        }
    }

    return (
        <React.Fragment>
            <CommentGroup>
                {data?.map(cur => {
                    return (
                        <CommentList onClick={() => navigate(`/detail/${cur.postId}`)} key={`comment${cur.commentId}`}>
                            <div className='comment-top'>
                                <p>{cur.createdAt?.split('T')[0].replaceAll('-','.')}</p>
                            </div>
                            <p className='comment-content'>{cur.content}</p>
                            <Btn _className='btn_controll' _onClick={(e) => deleteComment(e, cur.commentId)} _text="삭제"/>
                            <Btn _className="update btn_controll" _onClick={fixTextareaHandler} _text="수정"/>
                            <CommentTextarea>
                                <textarea onClick={(e) => e.stopPropagation()} onChange={onChangeComment} placeholder='수정할 내용을 입력해주세요'></textarea>
                                <Btn _type="small" _onClick={(e) => updateComment(e, cur.commentId)} _text='수정'/>
                            </CommentTextarea>
                            <div className='comment-bot'>
                                <ImgBenefit benefit={cur.benefit}/>
                                <p>{cur.title}</p>
                                <span>정책에 남긴 답글</span>
                            </div>
                        </CommentList>
                    )
                })}
            </CommentGroup>
        </React.Fragment>
    );
};
const CommentGroup = styled.ul`
    animation: 0.3s ${commonAni} ease-out;
    li+li{
        margin: 4px 0 0;
    }
`
const CommentList = styled.li`
    position: relative;
    padding: 2.4rem;
    background-color: ${props => props.theme.color.g3};
    cursor: pointer;
    .comment-top{
        margin-bottom: 1.3rem;
        width: 100%;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.p1};
    }
    .comment-content{
        margin-bottom: 3.2rem;
        width: 100%;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b0};
        word-break: break-word;
    }
    .comment-bot{
        padding: 0 2rem 1rem;
        display: inline-flex;
        align-items: flex-end;
        border-bottom: 2px solid ${props => props.theme.color.p1};
        p{
            margin: 0 0.8rem;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 15rem;
            font: ${props => props.theme.font.styleh6};
            color: ${props => props.theme.color.p1};
        }
        span{
            flex-shrink: 0;
            font: ${props => props.theme.font.small_number};
            color: ${props => props.theme.color.p1};
        }
        svg{
            width: 4rem;
            height: 4rem;
        }
    }
    .btn_controll{
        position: absolute;
        right: 2.4rem;
        top: 2.4rem;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b0};
        &.update{
            right: 6rem; 
        }
        &:hover{
            text-decoration: underline;
        }
    }
    &:hover{
        transition: 0.3s ease-out;
        background-color: ${props => props.theme.color.p5};
    }
    @media screen and (max-width: 808px) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .comment-bot{
            padding: 0 0rem 1rem;
        }
    }
`
const CommentTextarea = styled.div`
    margin: 1.4rem 0 0;
    display: none;
    flex-direction: column;
    align-items: flex-end;
    animation: 0.5s ${layerDown} ease-out;
    ${props => props.theme.font.p};
    &.active{
        animation: 0.5s ${layerShow} ease-out;
        display: flex;
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
`;

export default CardComment;