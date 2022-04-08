import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { actionCreators as postActions } from "../redux/modules/post";
import { ImgBenefit, ModalPop, FolderBg, Spinner } from '../components/index';
import { SvgLockOn, SvgLockOff } from '../icons/ico_components'
import { commonAni } from '../styles/Animation'
import { Btn } from '../elements';

const Curation = () => {
    const userId = useSelector(state => state.user.user.userId);
    const folder_list = useSelector(state => state.post.folder_list);
    const user_folder = useSelector(state => state.user.user_folder);
    const loading = useSelector(state => state.post.is_loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalRef = useRef();
    const [folderId, setId] = useState();
    const [folderName, setName] = useState();
    const [folderCont, setContent] = useState();
    const [lockstatus, setLock] = useState();

    let lock_list = [];
    user_folder?.forEach(cur => {
        if(cur.folderId){
            return lock_list = [...lock_list, cur.folderId];
        }
    })

    const [tabState, setTabState] = useState({
        popul: true,
        period: false,
    });

    //인기순, 마감임박순 관련 handler 함수
    const arrayHandler = (e) => {
        const newTabState = { ...tabState };
        const activeTab = e.currentTarget.id;

        for (let key in newTabState) {
            key === activeTab
            ? (newTabState[key] = true)
            : (newTabState[key] = false);
        };
        setTabState(newTabState);
        if(e.currentTarget.id === 'popul'){
            dispatch(postActions.getCurationFB('default'))
        }else{
            dispatch(postActions.getCurationFB('period'))
        }
    };

    const ModalHandler = (e, id, name, content, status) => {
        e.stopPropagation();
        modalRef.current.classList.contains("active")
        ? modalRef.current.classList.remove("active")
        : modalRef.current.classList.add("active")

        setId(id);
        setName(name);
        setContent(content)
        setLock(status);
    }

    const lockFolderEvent = (e, folderId, folder_name, folder_content, folder_status) => {
        e.stopPropagation();
        dispatch(postActions.setUpdateFolderFB(folderId, folder_name, folder_content, !folder_status))
    }

    useEffect(() => {
        dispatch(postActions.getCurationFB('default'));
    }, [])

    if(loading){
        return <Spinner type='page'/>;
    }return (
        <CurationWrap>
            <CurationTitle>
                <p>다른분들은</p>
                <p>이렇게 정책을 찜하고 계시네요!</p>
            </CurationTitle>
            <CurationBest>
                <Swiper
                    spaceBetween={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0 : {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        500 : {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        600 : {
                            spaceBetween: 1,
                            slidesPerView: 2,
                        }
                    }}
                >
                    {folder_list.map((cur, idx) => {
                        if(idx >= 2){
                            return null;
                        }else{
                            return(
                                <SwiperSlide>
                                    <BestCard key={`cura${cur.folderId}`} onClick={() => navigate(`/folder/${cur.folderId}`, {state: {folder_name: cur.folder_name}})}>
                                        <FolderBg cate={{c1: cur.c1, c2: cur.c2, c3: cur.c3, c4: cur.c4}}/>
                                        <FolderCont padding='0'>
                                            <FolderName type='best' color='white'>{cur.folder_name}</FolderName>
                                            <FolderMemo type='best' color='white'>{cur.folder_content}</FolderMemo>
                                            <FolderContBot>
                                                <FolderStatus color='white' onClick={(e) => ModalHandler(e, cur.folderId, cur.folder_name, cur.folder_content, cur.folder_status)}>편집</FolderStatus>
                                                <Deco color='white'/>
                                                <LockBtn color='white' onClick={(e) => lockFolderEvent(e, cur.folderId, cur.folder_name, cur.folder_content, cur.folder_status)}>
                                                    {cur.folder_status 
                                                    ? <React.Fragment>
                                                        <SvgLockOn/>
                                                        <span>공개중</span>
                                                    </React.Fragment>
                                                    :<React.Fragment>
                                                        <SvgLockOff/>
                                                        <span>비공개</span>
                                                    </React.Fragment>}
                                                </LockBtn>
                                            </FolderContBot>
                                        </FolderCont>
                                        <FolderIcon className='ico-benefit'>
                                            <ImgBenefit benefit={cur.benefit}/>
                                        </FolderIcon>
                                    </BestCard>
                                </SwiperSlide>
                            )
                        }
                    })}
                </Swiper>
            </CurationBest>
            <FilterArr>
                <Btn _id="popul" _ariaLabel="인기순 정렬" _onClick={arrayHandler} _className={tabState.popul ? 'active': ''} _text='인기순'/>
                <Btn _id="period" _ariaLabel="최신 작성순 정렬" _onClick={arrayHandler} _className={tabState.period ? 'active': ''} _text='최신 작성순'/>
            </FilterArr>
            <FolderGroup>
                {folder_list.map((cur, idx) => {
                    if(idx < 2){
                        return null;
                    }else{
                        return(
                            <FolderList key={`cura${cur.folderId}`} onClick={() => navigate(`/folder/${cur.folderId}`, {state: {folder_name: cur.folder_name}})}>
                                <FolderImg>
                                    <FolderBg type='small' cate={{c1: cur.c1, c2: cur.c2, c3: cur.c3, c4: cur.c4}}/>
                                    <ImgBenefit benefit={cur.benefit}/>
                                </FolderImg>
                                <FolderCont>
                                    <FolderName>{cur.folder_name}</FolderName>
                                    <FolderMemo>{cur.folder_content}</FolderMemo>
                                    <FolderCont padding='0'>
                                        {userId === cur.userId 
                                        ? 
                                        <FolderContBot>
                                            <FolderStatus onClick={(e) => ModalHandler(e, cur.folderId, cur.folder_name, cur.folder_content, cur.folder_status)}>편집</FolderStatus>
                                            <Deco/>
                                            <LockBtn onClick={(e) => lockFolderEvent(e, cur.folderId, cur.folder_name, cur.folder_content, cur.folder_status)}>
                                                {cur.folder_status 
                                                ? <React.Fragment>
                                                    <SvgLockOn/>
                                                    <span>공개중</span>
                                                </React.Fragment>
                                                :<React.Fragment>
                                                    <SvgLockOff/>
                                                    <span>비공개</span>
                                                </React.Fragment>}
                                            </LockBtn>
                                        </FolderContBot>
                                        : <FolderNick>{cur.nickname}</FolderNick>
                                        }
                                    </FolderCont>
                                </FolderCont>
                            </FolderList>
                        )
                    }
                })}
            </FolderGroup>
            <ModalPop ref={modalRef} modalId={3} folderId={folderId} folder_name={folderName} folder_content={folderCont} lockstatus={lockstatus}/>
        </CurationWrap>
    );
};
const CurationWrap = styled.div`
    padding: 5.6rem 10.4rem;
    animation: 0.3s ${commonAni} ease-out;
    @media screen and (max-width: 808px) {
        padding: 5.6rem 1.4rem;
    } 
`
const CurationTitle = styled.div`
    margin: 0 0 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        font: ${props => props.theme.font.styleh3};
        color: ${props => props.theme.color.b0};
    }
`
const FolderGroup = styled.ul`
    display: flex;
    flex-wrap: wrap;
    transition: 0.5s linear;
`
const FolderList = styled.li`
    margin: 0 0 1.6rem;
    display: flex;
    width: 50%;
    cursor: pointer;
    transition: 0.5s linear;
    overflow: hidden;
    @media screen and (max-width: 808px) {
    } 
    @media screen and (max-width: 600px) {
        width: 100%;
    } 
`
const FolderImg = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 12rem;
    height: 12rem;
    border-radius: 17.0936px;
    overflow: hidden;
    svg{
        z-index: 1;
        width: 10rem;
        height: 10rem;
        path{
            fill: ${props => props.theme.color.w};
        }
    }
    &:hover{
        svg{
            transform: scale(1.15);
            transition: 0.3s;
        }
    }
`
const FolderCont = styled.div`
    z-index: 2;
    padding: ${props => props.padding ? props.padding : '0.8rem 1.6rem'};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const FolderStatus = styled.div`
    font: ${props => props.theme.font.curation_author};
    color ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.p2};
    line-height: 1;
`
const FolderName = styled.h4`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: ${props => props.type === 'best' ? '88%' : '100%'};
    min-height: 3.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font: ${props => props.theme.font.curation_title};
    color ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.p1};
    line-height: 1.2;
    @media screen and (max-width: 808px) {
        width: ${props => props.type === 'best' ? '78%' : '100%'};
    } 
    @media screen and (max-width: 808px) {
        width: ${props => props.type === 'best' ? '100%' : '100%'};
    } 
`
const FolderMemo = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: ${props => props.type === 'best' ? '60%' : '100%'};
    min-height: 3.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font: ${props => props.theme.font.curation_author};
    color ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.b0};
`
const FolderNick = styled.p`
    font: ${props => props.theme.font.curation_author};
    color: ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.b0};
`
const CurationBest = styled.div`
    margin: 0 0 3.2rem;
    display: flex;
    .swiper{
        width: 100%;
        .swiper-slide{
            padding: 0 5% 0 0;
        }
    }
    @media screen and (max-width: 600px) {
        justify-content: space-between;
        .swiper{
            .swiper-slide{
                padding: 0;
            }
        }
    } 
`
const BestCard = styled.div`
    position: relative;
    margin: 0 5% 0 0;
    padding: 3.2rem 2.4rem;
    display: flex;
    width: 100%;
    height: 18.8rem;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        div{
            transform: scale(1.1);
            &:last-child{
                transform: unset;
            }
        }
        .ico-benefit{
            svg{
                width: 50%;
                transition: 0.3s;
            }
        }
    }
    @media screen and (max-width: 600px) {
        margin: 0;
        width: 100%;
    } 
`
const LockBtn = styled.button`
    display: flex;
    align-items: center;
    svg{
        width: 1.067rem;
        height: 1.067rem;
        path{
            fill: ${props => props.color === 'white' ? props.theme.color.w : null};
        }
    }
    font: ${props => props.theme.font.p};
    color ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.p2};
    svg+span{
        margin: 0 0 0 2px;
    }
`
const Deco = styled.div`
    content:"";
    margin: 0 1.4rem;
    display: inline-flex;
    width: 2px;
    height: 1.2rem;
    background-color: ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.p2};
    pointer-events: none;
`
const FolderContBot = styled.div`
    display: flex;
    align-items: center;
`
const FolderIcon = styled.div`
    svg{
        position: absolute;
        right: 0;
        bottom: 1rem;
        width: 44.445%;
        height: auto;
        path{
            fill: ${props => props.theme.color.w};
        }
    }
`
const FilterArr = styled.div`
    margin: 0 0 3.2rem;
    display: flex;
    button{
        padding: 6px 8px;
        border: 1px solid ${props => props.theme.color.p5};
        font: ${props => props.theme.font.align_default};
        color: ${props => props.theme.color.b3};
        &.active{
            background-color: ${props => props.theme.color.p5};
            font: ${props => props.theme.font.align_tab};
        }
        &:first-child{
            border-radius: 4px 0 0 4px;
        }
        &:last-child{
            border-radius: 0 4px 4px 0;
        }
    }
`


export default Curation;