import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Btn } from '../elements';
import { SvgShare, SvgLikeOff, SvgLikeOn, SvgGotop } from '../icons/ico_components'
import { actionCreators as likeActions } from "../redux/modules/like"
import { actionCreators as postActions } from '../redux/modules/post';

const DetailSideMenu = (props) => {
    const { postId, like } = props;
    const dispatch = useDispatch();
    const onShareEvent = () => {
        let text = window.location.href;

        // 흐름 1.
        if (navigator.clipboard) {
            // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
            navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("복사되었습니다.");
            })
            .catch(() => {
                alert("다시 시도해주세요.");
            });
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
            alert("복사되었습니다.");
        }
    };

    const checkLike = (postId) => { 
        if(like === "true"){
            dispatch(likeActions.setLikeFB(postId, false));
            dispatch(postActions.setDetailLike("false"));
        }else {
            dispatch(likeActions.setLikeFB(postId, true));
            dispatch(postActions.setDetailLike("true"));
        }
    }
    
    const goToTopHandler = () => {
        window.scrollTo(0, 0)
    }

    return (
        <SideMenu>
            <Btn _onClick={onShareEvent} _className="btn-side"><SvgShare/></Btn>
            <Btn _onClick={() => checkLike(postId)} _className="btn-side">
                {like === "true" ? <SvgLikeOn/> : <SvgLikeOff/>}
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
    // display: flex;
    display:none;
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