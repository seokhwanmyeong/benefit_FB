import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Btn } from '../elements';
import { SvgShare, SvgLikeOff, SvgLikeOn, SvgGotop } from '../icons/ico_components'
import { actionCreators as postActions } from "../redux/modules/post"

const DetailSideMenu = (props) => {
    const { postId } = props;
    const [className, setClass] = useState("");
    console.log(postId)
    const dispatch = useDispatch();
    const onShareEvent = () => {
        // if (!document.queryCommandSupported("copy")) {
        //     alert("No Support");
        //     return;
        // }

        // // 선택 후 복사
        // copyLinkRef.current.focus();
        // copyLinkRef.current.select();
        // document.execCommand('copy');

        // // 복사 완료 알림
        // alert("링크를 복사했습니다.");
    }

    const checkLike = (e, postId) => { 
        if(e.currentTarget.classList.contains("on")){
            e.currentTarget.classList.remove("on")
            setClass("")
            dispatch(postActions.setLikeFB(postId, false));
        }else {
            e.currentTarget.classList.add("on")
            setClass("on")
            dispatch(postActions.setLikeFB(postId, true));
        }
    }
    
    const goToTopHandler = () => {
        window.scrollTo(0, 0)
    }


    return (
        <SideMenu>
            <Btn _onClick={onShareEvent} _className="btn-side"><SvgShare/></Btn>
            <Btn _onClick={(e) => checkLike(e, postId)} _className="btn-side">
                {className === 'on' ? <SvgLikeOn/> : <SvgLikeOff/>}
            </Btn>
            <Btn _onClick={goToTopHandler} _className="btn-side"><SvgGotop/></Btn>
        </SideMenu>
    );
};
const SideMenu = styled.div`
    z-index: 13;
    position:fixed;
    top: 40%;
    right: 15%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btn-side{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.2rem;
        height: 3.2rem;
        border: 1px solid ${props => props.theme.color.b0};
        border-radius: 50%;
        background-color: ${props => props.theme.color.w};
    }
    button + button{
        margin: 1.6rem 0 0;
    }
    @media screen and (max-width: 808px){
        right: 2rem;
    }
`
export default DetailSideMenu;