import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as likeActions } from "../redux/modules/like";
import { ImgBenefit } from './index';
import { Btn } from "../elements";
import { SvgView, SvgLikeOn, SvgLikeOff } from '../icons/ico_components'

const Myzzim = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.like.like_list);
    console.log(data)

    const linkToDetail = (postId) => {
        navigate(`/detail/${postId}`, {state: {id: postId}})
    }

    const deleteLike = (e, postId) => { 
        e.stopPropagation();
        dispatch(likeActions.setLikeFB(postId, false));
    }

    useEffect(() => {
        dispatch(likeActions.setMyLikeFB());
    }, [])

    return (
        <LikeGroup>
            {data?.map(cur => {
                return(
                    <LikeList onClick={() => linkToDetail(cur.postId)} key={cur.postId}>
                        <div className="card-head">
                            <ImgBenefit benefit={cur.benefit}/>
                            <h4 className="card-title">{cur.title}</h4>
                            <div className="card-head-cate">{cur.category}</div>
                        </div>
                        <div className="card-foot">
                            <div className="card-agency">
                                <span className="card-agency-name">{cur.operation}</span>
                            </div>
                            <p className="card-period">{cur.apply_period}</p>
                            <div className='card-info'>
                                <div className='card-view'>
                                    <SvgView/>
                                    <span>{cur.view}</span>
                                </div>
                                <Btn _onClick={(e) => deleteLike(e, cur.postId)} _className="on">
                                    <SvgLikeOn/>
                                </Btn>
                            </div>
                        </div>
                    </LikeList>
                )
            })}
        </LikeGroup>
    );
};

const LikeGroup = styled.ul`
    flex-grow: 1;
    width: 100%;
    cursor: pointer;
`
const LikeList = styled.li`
    z-index: 2;
    padding: 2.4rem 3.1rem 1.6rem 1.6rem; 
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.color.filter_pc_color};
    .card-head {
        margin: 0 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg{
            min-width: 4rem;
        }
    }
    .card-head-img {
        width: 5.6rem;
        height: 5.6rem;
        background-color: #888888;
    }
    .card-head-cate {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 7rem;
        height: 2.4rem;
        border: 1px solid #000000;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b1};
    }
    .card-title {
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font: ${props => props.theme.font.styleh5};
        color: ${props => props.theme.color.b1};
    }
    .card-contents {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b1};
    }
    .card-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .card-agency {
        margin: 0 1.5rem 0 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card-agency-logo {
        margin-right: 0.5rem;
    }
    .card-agency-name {
        font-size: 1.3rem;
    }
    .card-period {
        flex-grow: 1;
        min-width: 18rem;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b1};
    }
    .card-info{
        display: flex;
        button{
            z-index: 13;
        }
    }
    .card-view{
        display: flex;
        svg{
            width: 2rem;
            height: 2rem;
        }
        span{
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.b1};
        }
    }
    &:hover{
        background-color: ${props => props.theme.color.p3};
    }
    @media screen and (max-width: 808px) {
        margin: 0 0 1.2rem;
        border-top: 0;
        background-color: ${props => props.theme.color.g3};
        .card-head {
            margin: 0 0 1rem;
        }
        .card-foot {
            flex-wrap: wrap;
        }
        .card-agency {
            margin: 0 0 1rem;
            width: 100%;
            flex-flow: column;
            align-items: flex-start;
        }
        .card-agency-logo {
            margin-right: 0.5rem;
        }
        .card-agency-name {
            font-size: 1.3rem;
        }
        .card-period {
            flex-grow: 1;
            font-size: 1.3rem;
        }
        .card-info{
            display: flex;
        }
        .card-view{
            display: flex;
        }
    }
`
export default Myzzim;