import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as postActions } from '../redux/modules/post';
import { ImgBenefit, DetailSideMenu, DetailTap, Spinner, CateBox, AnimateShare, ModalPop} from '../components/index';
import { SvgView, SvgLikeOn, SvgLikeOff, SvgShare } from '../icons/ico_components'
import { Btn, BtnCircle } from '../elements';
import { commonAni } from '../styles/Animation'

const Detail = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const ref = useRef();
    const modalRef = useRef();
    const addRef = useRef();
    const deleteRef = useRef();
    const [postId, setPostId] = useState();
    const paramsId = params.id;
    const data = useSelector((state) => state.post.list_detail);
    const review_link = useSelector((state) => state.post.review_link);
    const loading = useSelector((state) => state.post.is_loading);
    const user_folder = useSelector(state => state.user.user_folder);
    const token = localStorage.getItem("ybrn");
    // console.log(review_link)
    let like_list = [];
    user_folder?.forEach(cur => {
        if(cur.postId_list){
            return like_list = [...like_list, ...cur.postId_list];
        }
    })

    const onShareEvent = () => {
        let text = window.location.href;
        ref.current.classList.add('active');
        // 흐름 1.
        if (navigator.clipboard) {
            // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
            navigator.clipboard
            .writeText(text)
            // .then(() => {
            //     alert("복사되었습니다.");
            // })
            // .catch(() => {
            //     alert("다시 시도해주세요.");
            // });
        } else {
            // 흐름 2.
            if (!document.queryCommandSupported("copy")) {
                return alert("복사하기가 지원되지 않는 브라우저입니다.");
            }
    
            // 흐름 3.
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.top = 0;
            textarea.style.left = 0;
            textarea.style.position = "fixed";
    
            // 흐름 4.
            document.body.appendChild(textarea);
            // focus() -> 사파리 브라우저 서포팅
            textarea.focus();
            // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
            textarea.select();
            // 흐름 5.
            document.execCommand("copy");
            // 흐름 6.
            document.body.removeChild(textarea);
            // alert("복사되었습니다.");
        }
        setTimeout(() => {
            ref.current.classList.remove('active');
        }, 700)

    };

    const simpleModalHandler = (e) => {
        e.stopPropagation();
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

    const addModalHandler = (e, postId) => {
        e.stopPropagation();
        console.log('1')
        let arr_class = document.getElementsByClassName('modal_simple');
        // setModal(4)
        setPostId(postId)
        addRef.current.classList.contains("active")
        ? addRef.current.classList.remove("active")
        : addRef.current.classList.add("active")
        
        for(let x = 0; 0 < arr_class.length; x++){
            arr_class[x].classList.remove('active')
        }
    }

    const deleteModalHandler = (e, postId) => {
        e.stopPropagation();
        console.log('1')
        let arr_class = document.getElementsByClassName('modal_simple');
        // setModal(5)
        setPostId(postId)
        deleteRef.current.classList.contains("active")
        ? deleteRef.current.classList.remove("active")
        : deleteRef.current.classList.add("active")

        for(let x = 0; 0 < arr_class.length; x++){
            arr_class[x].classList.remove('active')
        }
    }

    // const ModalHandler = (e) => {
    //     e.stopPropagation();
    //     modalRef.current.classList.contains("active")
    //     ? modalRef.current.classList.remove("active")
    //     : modalRef.current.classList.add("active")
    // }

    useEffect(() => {
        dispatch(postActions.getOnePostFB(paramsId));
    }, [])

    if(loading){
        return <Spinner type='page'/>;
    }return (
        <DetailWrap>
            <DetailSideMenu postId={data?.postId} like={data["Zzims.zzim_status"] ? data["Zzims.zzim_status"] : false}/>
            <DetailBox>
                <DetailHead key={data?.postId}>
                    <div className="detail-head-top">
                        <CateBox category={data?.category}/>
                    </div>
                    <div className="detail-head-middle">
                        <ImgBenefit benefit={data?.benefit}/>
                        <h4 className="detail-head-title">{data?.title}</h4>
                    </div>
                    <div className="detail-head-bot">
                        <div className='detail-head-info'>
                            <div className='detail-head-view'>
                                <SvgView/>
                                <span>{data?.view}</span>
                            </div>
                            <div className='detail-head-view'>
                                <SvgLikeOff/>
                                <span>{data?.zzim_count}</span>
                            </div>
                        </div>
                    </div>
                </DetailHead>
                <DetailCard>
                    <table>
                        <tbody>
                            {data.benefit_desc !== '-' & data.benefit_desc !== null & data.benefit_desc !== ""
                            ? <tr>
                                <th>지원내용</th>
                                <td>{data.benefit_desc?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            : null
                            }
                            {data.apply_period !== '-' & data.apply_period !== null & data.apply_period !== ""
                            ? <tr>
                                <th>신청 기간</th>
                                <td>{data.apply_period?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            : null
                            }
                            {data.age !== '-' & data.age !== null & data.age !== ""
                            ? <tr>
                                <th>연령</th>
                                <td>{data.age?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            : null
                            }
                            {data.process !== '-' & data.process !== null & data.process !== ""
                            ? <tr>
                                <th>신청 절차</th>
                                <td>{data.process?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            : null
                            }
                            {data.residence !== '-' & data.residence !== null & data.residence !== ""
                            ? <tr>
                                <th>대상/제한</th>
                                <td>{data.residence?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            : null
                            }
                            {data.location !== '-' & data.location !== null & data.location !== ""
                            ? <tr>
                                <th>지역</th>
                                <td>{data.location?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            : null
                            }
                            {data?.apply_site !== '-' & data?.apply_site !== null & data?.apply_site !== ""
                            ? <tr>
                                <th>신청 사이트</th>
                                <td>
                                    <DetailLink href={data?.apply_site} target='_blank'>
                                        {data?.apply_site}
                                    </DetailLink>
                                    {/* <a href={data?.apply_site} target='_blank'>{data?.apply_site}</a> */}
                                </td>
                            </tr>
                            : null
                            }
                            {/* <tr>
                                <th>지원내용</th>
                                <td>{data.benefit_desc?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            <tr>
                                <th>신청 기간</th>
                                <td>{data.apply_period?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            <tr>
                                <th>연령</th>
                                <td>{data.age?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>

                            <tr>
                                <th>신청 절차</th>
                                <td>{data.process?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>

                            <tr>
                                <th>대상/제한</th>
                                <td>{data.residence?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            <tr>
                                <th>지역</th>
                                <td>{data.location?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}</td>
                            </tr>
                            <tr>
                                <th>신청 사이트</th>
                                <td>{data?.apply_site}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </DetailCard>
                <DetailFooter>
                    <BtnCircle _onClick={onShareEvent}>
                        <SvgShare className='btn-share'/>
                    </BtnCircle>
                    <CardLike>
                        <BtnCircle _className={like_list.includes(String(data?.postId)) ? 'on' : ''} _onClick={(e) => simpleModalHandler(e, data?.postId)}>
                            {like_list.includes(String(data?.postId)) ? <SvgLikeOn/> : <SvgLikeOff/>}
                        </BtnCircle>
                        <SimpleModal className='modal_simple'>
                            {like_list.includes(String(data?.postId))
                            ? <React.Fragment>
                                <BtnSimpleModal onClick={(e) => addModalHandler(e, data?.postId)}>찜 추가</BtnSimpleModal>
                                <BtnSimpleModal type="delete" onClick={(e) => deleteModalHandler(e, data?.postId)}>찜 삭제</BtnSimpleModal>
                            </React.Fragment>
                            : <BtnSimpleModal onClick={(e) => addModalHandler(e, data?.postId)}>찜 추가</BtnSimpleModal>
                            }
                        </SimpleModal>
                    </CardLike>
                    {/* <BtnCircle _onClick={ModalHandler}>
                        {like_list.includes(String(data?.postId)) ? <SvgLikeOn/> : <SvgLikeOff/>}
                    </BtnCircle> */}
                    <Btn _type="large" _onClick={() => {window.open(`${data?.reference_site}`)}} _ariaLabel="상세내용 보기" _width='18.7rem'  _text="자세히 보기"/>
                </DetailFooter>
            </DetailBox>
            <DetailTap review_link={review_link}/>
            <AnimateShare ref={ref}/>
            <ModalPop ref={addRef} modalId={4} postId={postId}/>
            <ModalPop ref={deleteRef} modalId={5} postId={postId}/>
            {/* <ModalPop postId={data?.postId} ref={modalRef} modalId={like_list.includes(String(data?.postId)) ? 5 : 4}/> */}
        </DetailWrap>
    );
};
const SimpleModal = styled.div`
    position: absolute;
    max-width: 37.8rem;
    top: 0;
    right: 6rem;
    height: auto;
    width: auto;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.theme.color.w};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    &.active{
        display: flex;
    }
`
const BtnSimpleModal = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7.2rem;
    height: 3.5rem;
    background-color: ${props => props.theme.color.w};
    font: ${props => props.theme.font.text_small};
    color: ${props => props.type === 'delete' ? props.theme.color.w1 : props.theme.color.b1};
    &:hover{
        background-color: ${props => props.theme.color.p32};
    }
`
const CardLike = styled.div`
    position: relative;
    margin: 0 0.8rem;
    display: flex;
    align-items: center;
    svg{
        path{
            fill: ${props => props.theme.color.p1};
        }
    }
`
const DetailWrap = styled.div`
    padding: 5.2rem 10.5rem;
    animation: 0.3s ${commonAni} ease-out;
    @media screen and (max-width: 808px) {
        padding: 0 0 1.5rem;
    }
`
const DetailBox = styled.div`
    padding: 5.6rem 3.2rem 3.2rem;
    background-color: ${props => props.theme.color.p5};
    border-radius: 32px;
    @media screen and (max-width: 808px) {
        padding: 3.2rem 1.5rem;
        border-radius: 0px;
    }
`
const DetailHead = styled.div`
    margin: 0 0 4rem;
    width: 100%;
    .detail-head-top {
        margin: 0 0 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
        svg{
            width: 2.4rem;
            height: 2.4rem;
            path{
                fill: ${props => props.theme.color.p1};
            }
        }
        span{
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.p1};
        }
    }
    .detail-head-view:last-child{
        margin-left: 0.8rem;
    }
    @media screen and (max-width: 808px) {
        .detail-head-top{
            display: none;
        }
        .detail-head-middle {
            flex-direction: column;
            svg{
                margin: 0 0 4px;
                flex-shrink: 0;
                width: 4.8rem;
                height: 4.8rem;
            }
            .detail-head-title {
                text-align: center;
            }
        }
    }
`
const DetailCard = styled.div`
    padding: 1.6rem 3.2rem;
    background-color: ${props => props.theme.color.w};
    border-radius: 32px;
    table {
        width: 100%;
        height: 100%;
        border-collapse: separate;
    }
    tbody{
        display: flex;
        flex-direction: column;
    }
    tr{
        margin-bottom: 0.8rem;
        &:last-child{
            margin-bottom: 0rem;
        }
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
        font: ${props => props.theme.font.body};
        color: ${props => props.theme.color.b0};
        text-align: left;
        vertical-align: top;
        white-space: pre-wrap;
        word-break: keep-all;
        a{
            word-break: break-word;
        }
    }
    @media screen and (max-width: 808px) {
        padding: 1.6rem 2.4rem;
    }
`
const DetailFooter = styled.div`
    margin: 1.9rem 0 0;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 808px) {
        z-index: 10;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 1.6rem 0;
        width: 100%;
        background-color: rgba(239, 243, 250, 1);
        border-radius: 24px 24px 0px 0px;
    }
    .btn-share{
        path{
            fill: ${props => props.theme.color.p1};
        }
    }
     
`
const DetailLink = styled.a`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.color.p1};
    &:hover{
        text-decoration: underline;
    }
`

export default Detail;