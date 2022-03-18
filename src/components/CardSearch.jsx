import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ImgBenefit } from './index';
import { SvgView, SvgClose, SvgLikeOn, SvgLikeOff } from '../icons/ico_components'
import { Btn } from '../elements';
import { actionCreators as postActions } from "../redux/modules/post"

const CardSearch = (props) => {
    const { option } = props;
    const list = useSelector((state) => state.post.search_list);
    const cate_list = useSelector((state) => state.post.cate);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([])

    // const checkLike = (e) => { 
    //     if(e.currentTarget.classList.contains("on")){
    //         e.currentTarget.classList.remove("on")
    //     }else {
    //         e.currentTarget.classList.add("on")
    //     }
    // }

    const linkToDetail = (postId) => {
        navigate(`/detail/${postId}`, {state: {id: postId}})
    }

    useEffect(() => {
        dispatch(postActions.getCateListFB(option))
    }, [])

    let list_data = [];

    useEffect(() => {
        let middle = []
        const arr = cate_list.map((cur, idx) => {
            for(let y = 0; y < list[cur].length; y++){
                middle.push(list[cur][y])
            }
            return middle;
        })
        setData(middle);
    }, [list, cate_list])

    return (
        <SearchGroup>
            {data.map(cur => {
                return(
                    <SearchList onClick={() => linkToDetail(cur.postId)} key={cur.postId}>
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
                                {/* <Btn _onClick={checkLike} _className={cur.check ? "on" : ""}>
                                    {cur.check ? <SvgLikeOn/> : <SvgLikeOff/>}
                                </Btn> */}
                            </div>
                        </div>
                    </SearchList>
                )
            })}
        </SearchGroup>
    );
};
const SearchGroup = styled.ul`
    flex-grow: 1;
    width: 30%;
    li + li{
        margin: 2rem 0 0 0;
    }
`
const SearchList = styled.li`
    z-index: 2;
    padding: 2.4rem 2.2rem 2rem 4.8rem; 
    width: 100%;
    border: 1px solid #000000;
    .card-head {
        margin: 0 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        font-size: 1.4rem;
    }
    .card-title {
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 2.4rem;
        font-weight: 600;
    }
    .card-contents {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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
    @media screen and (max-width: 808px) {
        .card-foot {
            flex-wrap: wrap;
        }
        .card-agency {
            margin: 0 0 0 0;
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
export default CardSearch;