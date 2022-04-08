import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { ImgBenefit, CateBox, DecoNew, ModalPop, ImgLocation, Nonlayer } from './index';
import { BtnCircle } from '../elements';
import { SvgLikeOn, SvgLikeOff } from '../icons/ico_components';

const CardSearch = (props) => {
    const { data, user_like_list } = props;
    const navigate = useNavigate();
    const token = localStorage.getItem("ybrn");
    const [postId, setPostId] = useState();
    const addRef = useRef();
    const deleteRef = useRef();

    const linkToDetail = (postId, cate) => {
        navigate(`/detail/${postId}`, {state: {cate: cate}})
    }

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
        let arr_class = document.getElementsByClassName('modal_simple');
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
        let arr_class = document.getElementsByClassName('modal_simple');
        setPostId(postId)
        deleteRef.current.classList.contains("active")
        ? deleteRef.current.classList.remove("active")
        : deleteRef.current.classList.add("active")

        for(let x = 0; 0 < arr_class.length; x++){
            arr_class[x].classList.remove('active')
        }
    }

    return (
        <SearchGroup>
            {data.map(cur => {
                return(
                    <SearchList onClick={() => linkToDetail(cur.postId, cur.category)} key={cur.postId}>
                        <CardLeft>
                            <DecoNew/>
                            <ImgBenefit benefit={cur.benefit}/>
                        </CardLeft>
                        <CardRight>
                            <CardContent>
                                <div className="card-head">
                                    <CateBox category={cur.category}/>
                                    <h4 className="card-title">{cur.title}</h4>
                                </div>
                                <div className="card-foot">
                                    <ImgLocation location={cur.location}/>
                                    <p className="card-agency">{cur.location}</p>
                                    <p className="card-period">{cur.apply_end}</p>
                                </div>
                            </CardContent>
                            <CardLike>
                                <BtnCircle _className={user_like_list.includes(String(cur.postId)) ? 'on' : ''} _onClick={(e) => simpleModalHandler(e, cur.postId)}>
                                    {user_like_list.includes(String(cur.postId)) ? <SvgLikeOn/> : <SvgLikeOff/>}
                                </BtnCircle>
                                <SimpleModal className='modal_simple'>
                                    {user_like_list.includes(String(cur.postId)) 
                                    ? <React.Fragment>
                                        <BtnSimpleModal onClick={(e) => addModalHandler(e, cur.postId)}>찜 추가</BtnSimpleModal>
                                        <BtnSimpleModal type="delete" onClick={(e) => deleteModalHandler(e, cur.postId)}>찜 삭제</BtnSimpleModal>
                                    </React.Fragment>
                                    : <BtnSimpleModal onClick={(e) => addModalHandler(e, cur.postId)}>찜 추가</BtnSimpleModal>
                                    }
                                </SimpleModal>
                            </CardLike>
                        </CardRight>
                    </SearchList>
                )
            })}
            {data?.length === 0 && <Nonlayer path='/search'/>}
            <ModalPop ref={addRef} modalId={4} postId={postId}/>
            <ModalPop ref={deleteRef} modalId={5} postId={postId}/>
        </SearchGroup>
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
const SearchGroup = styled.ul`
    flex-grow: 1;
    width: 30%;
    cursor: pointer;
    li+li{
        margin: 8px 0 0;
    }
    @media screen and (max-width: 808px) {
        li+li{
            margin: 20px 0 0;
        }
    }
`
const SearchList = styled.li`
    z-index: 2;
    position: relative;
    padding: 2.8rem 1.6rem 2rem; 
    display: flex;
    width: 100%;
    border: 1px solid ${props => props.theme.color.p5};
    border-radius: 8px;
    transition: 0.3s;
    &:hover{
        background-color: ${props => props.theme.color.p5};
    }
    @media screen and (max-width: 808px) {
        padding: 1.6rem; 
        border: 0;
        background-color: ${props => props.theme.color.g3};
        border-radius: 32px;
    }
`
const CardLeft = styled.div`
    position: relative;
    margin: 0 1.8rem 0 0;
    svg{
        width: 7.2rem;
        height: 7.2rem;
        background-color: ${props => props.theme.color.p5};
        border-radius: 50%;
    }
    @media screen and (max-width: 808px) {
        display: flex;
        align-items: center;
        svg{
            width: 6.4rem;
            height: 6.4rem;
        }
    }
`
const CardRight = styled.div`
    display: flex;
    width: 100%;
`
const CardContent = styled.div`
    width: 100%;
    .card-head {
        margin: 0 0 4px;
        display: flex;
        flex-wrap: wrap;
    }
    .card-title {
        margin: 4px 0 0;
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font: ${props => props.theme.font.pc_list_title};
        color: ${props => props.theme.color.b1};
    }
    .card-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font: ${props => props.theme.font.pc_list_info};
        color: ${props => props.theme.color.b1};
        svg{
            margin-right: 0.5rem;
            width: 2rem;
            height: 2.4rem;
        }
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
    .card-period {
        flex-grow: 1;
    }
    @media screen and (max-width: 808px) {
        .card-head {
            margin: 0;
        }
        .card-title {
            margin: 1px 0 0;
            font: ${props => props.theme.font.m_list_title};
        }
        .card-foot {
            font: ${props => props.theme.font.m_list_info};
        }
    }
    @media screen and (max-width: 500px) {
        // .card-agency {
        //     display: none;
        // }
        // .card-period {
        //     width: 100%;
        // }
        // .card-foot {
        //     svg{
        //         display:none;
        //     }
        // }
    }
    @media screen and (max-width: 385px) {
        // .card-agency {
        //     display: none;
        // }
        // .card-period {
        //     width: 100%;
        // }
        .card-foot {
            svg{
                display:none;
            }
        }
    }
`
const CardLike = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    svg{
        path{
            fill: ${props => props.theme.color.p1};
        }
    }
        
`
export default CardSearch;