import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Btn } from '../elements';

const CardComment = () => {
    const dispatch = useDispatch();
    const ref = useRef();

    const deleteCommentHandler = () => {

    }

    const openTextareaHandler = () => {
        if(ref.current.classList.contains('active')){
            ref.current.classList.remove('active');
        }else{
            ref.current.classList.add('active');
        }
    }

    return (
        <CommentWrap>
            <CommentInput>
                <Btn _onClick={openTextareaHandler} _className='btn-open'>
                    <span>댓글을 입력해주세요.</span>
                </Btn>
                <CommentTextarea ref={ref}>
                    <textarea placeholder='댓글을 입력해주세요'></textarea>
                    <Btn _type="small" _onClick={null} _className='btn-submit' _text='등록하기'/>
                </CommentTextarea>
            </CommentInput>
            <Comment>
                <ul className='comment-group'>
                    <li className='comment-list'>
                        <div className='comment-info'>
                            <span className='comment-user'>example</span>
                            <span className='comment-period'>22.02.28</span>
                        </div>
                        <div className='comment-cont'>
                            <p>lorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem</p>
                        </div>
                        <Btn _onClick={deleteCommentHandler} _className='btn-delete' _text='삭제'/>
                    </li>
                </ul>
            </Comment>
        </CommentWrap>
    );
};
const CommentWrap = styled.div`

`;
const CommentInput = styled.div`
    margin: 2rem 0;
    .btn-open{
        padding: 1rem 2rem;
        display: flex;
        width: 100%;
        border: 1px solid ${props => props.theme.color.g1};
        span{
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.g1};
        }
    }
`;
const CommentTextarea = styled.div`
    margin: 1.4rem 0 0;
    display: none;
    &.active{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
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
    .btn-submit{
    }
`
const Comment = styled.div`
    .comment-group{
        position: relative;
        .comment-list{
            padding: 0 0 1.4rem;
            border-bottom: 1px solid ${props => props.theme.color.b0};
        }
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
        .btn-delete{
            position: absolute;
            right: 0;
            top: 0;
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.b0};
        }
    }
`;
export default CardComment;