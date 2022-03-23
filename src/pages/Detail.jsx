import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as postActions } from "../redux/modules/post"
import { BenefitImg, DetailContent, CardReview, DetailSideMenu, DetailTap } from '../components/index';
import { SvgView, SvgClose, SvgLikeOn, SvgLikeOff } from '../icons/ico_components'
import { Btn } from '../elements';

import axios from 'axios';
const Detail = (props) => {
    const dispatch = useDispatch();
    const path = useLocation();
    const postId = path.state.id;
    const data = useSelector((state) => state.post.list_detail);
    const review_link = useSelector((state) => state.post.review_link);
    const [_className, setClass] = useState("");
    console.log(data)
    // console.log(review_link)
    
    const checkLike = (e) => { 
        if(e.currentTarget.classList.contains("on")){
            e.currentTarget.classList.remove("on")
        }else {
            e.currentTarget.classList.add("on")
        }
    }

    const [isOpen,setOpen] = useState(false);

    const toggleState = () => { 
        setOpen(!isOpen);
    }

    const detail_toggle = () => {
        _className === "active" ? setClass("") : setClass("active")
    }

    useEffect(() => {
        dispatch(postActions.getOnePostFB(postId));
    }, [])

    return (
        <DetailWrap>
            <DetailSideMenu postId={data?.postId} like={data.zzim_status ? data.zzim_status : false}/>
            <DetailHead key={data?.postId}>
                <div className="detail-head-top">
                    <div className="detail-head-cate">{data?.category}</div>
                </div>
                <div className="detail-head-middle">
                    <BenefitImg benefit={data?.benefit}/>
                    <h4 className="detail-head-title">{data?.title}</h4>
                </div>
                <div className="detail-head-bot">
                    <div className='detail-head-info'>
                        <div className='detail-head-view'>
                            <SvgView/>
                            <span>{data?.view}</span>
                        </div>
                        <div className='detail-head-view'>
                            <Btn _onClick={checkLike} _className={data?.check ? "on" : ""}>
                                {data?.check ? <SvgLikeOn/> : <SvgLikeOff/>}
                            </Btn>
                            <span>{data?.zzim}</span>
                        </div>
                    </div>
                </div>
            </DetailHead>
            <DetailCard>
                <table>
                    <tbody>
                        <tr>
                            <th>세부 항목</th>
                            <td>{data.summary?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                        </tr>
                        <tr>
                            <th>운영 기간</th>
                            <td>{data.apply_period?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                        </tr>
                        <tr>
                            <th>주관 기관</th>
                            <td>{data.operation?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                        </tr>
                        <tr>
                            <th>지원내용</th>
                            <td>{data.benefit_desc?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                        </tr>
                        <tr>
                            <th>연령</th>
                            <td>{data.age?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                        </tr>
                    </tbody>
                </table>
            </DetailCard>
            <DetailContent data={data} _className={_className}/>
            <DetailFooter>
                <Btn _type="normal" _onClick={detail_toggle} _ariaLabel="상세내용 보기" _ariahaspopup={!isOpen} _text="정책 자세히 보기"/>
            </DetailFooter>
            <DetailTap data={review_link}/>
        </DetailWrap>
    );
};
const DetailWrap = styled.div`
    padding: 5.2rem 10.5rem;
    @media screen and (max-width: 808px) {
        padding: 3.2rem 1.5rem;
    }
`
const DetailHead = styled.div`
    margin: 0 0 4rem;
    width: 100%;
    .detail-head-top {
        margin: 0 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .detail-head-cate {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 7rem;
        height: 2.4rem;
        border: 1px solid ${props => props.theme.color.b0};
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b1};
    }
    .detail-head-middle {
        margin: 0 0 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
            margin-right: 1rem;
            flex-shrink: 0;
            width: 4.8rem;
            height: 4.8rem;
        }
    }
    .detail-head-title {
        font: ${props => props.theme.font.styleh3};
        color: ${props => props.theme.color.b0};
    }
    .detail-head-bot {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .detail-head-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .detail-head-view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg{}
        span{}
    }
    .detail-head-view:last-child{
        margin-left: 0.8rem;
    }
    @media screen and (max-width: 808px) {
    }
`
const DetailCard = styled.div`
    margin: 0 0 1.9rem;
    padding: 1.6rem 3.2rem;
    border: 1px solid ${props => props.theme.color.b0};
    table {
        width: 100%;
        height: 100%;
        border-collapse: separate;
        border-spacing: 0 1rem;
    }
    tbody{
        display: flex;
        flex-direction: column;
    }
    th{
        padding-right: 2.4rem;
        width: 10rem; 
        text-align: left;
        font: normal 600 1.4rem/1.45 Noto sans, sans-serif;
        color: ${props => props.theme.color.b0};
        vertical-align: top;
    }
    td{
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b0};
        text-align: left;
        vertical-align: top;
        white-space: pre-wrap;
    }
    @media screen and (max-width: 808px) {
        padding: 1.6rem;
        table {
            width: 100%;
            height: 100%;
            border-collapse: separate;
            border-spacing: 0 1rem;
        }
        tbody{
            display: flex;
            flex-direction: column;
        }
        th{
            padding-right: 2.4rem;
            width: 10rem; 
            text-align: left;
            font: normal 600 1.4rem/1.45 Noto sans, sans-serif;
            color: ${props => props.theme.color.b0};
            vertical-align: top;
        }
        td{
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.b0};
            text-align: left;
            vertical-align: top;
        }
    }
`
const DetailFooter = styled.div`
    margin: 2.4rem 0 3.2rem;
`

export default Detail;