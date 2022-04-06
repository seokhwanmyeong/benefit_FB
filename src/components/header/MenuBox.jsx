import React, { useContext, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { Btn } from '../../elements';
import { SvgHome, SvgLogin, SvgSearch, SvgClose, SvgLogo, SvgCuration, SvgLogout } from '../../icons/ico_components'
import { actionCreators as userActions } from '../../redux/modules/user';
import { MenuController } from './MenuLayer';
import { commonAni } from '../../styles/Animation';

const MenuBox = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { toggleState, isOpen, MenuExit } = useContext(MenuController);
    const is_login = useSelector(state => state.user.is_login);

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const MenuEntrance = useRef();

    //map 메소드로 반복하여 항목 링크 생성을 위한 배열
    let menu_list = {};

    //로그인 조건부렌더링을 위한 객체
    if (is_login) {
        menu_list = [
            {name :'Home', path : '/', img: <SvgHome/>, cate: ""},
            {name :'Curation', path : '/curation', img: <SvgCuration/>, cate: ""},
            {name :'Search', path : '/search', img: <IcoSearch/>, cate: "c0"},
            {name :'Mypage', path : '/mypage', img: <SvgLogin/>, cate: ""},
            {name :'Logout', path : '/', img: <SvgLogout/>, cate: ""},
        ]
    } else {
        menu_list = [
            {name :'Home', path : '/', img: <SvgHome/>, cate: ""},
            {name :'Curation', path : '/curation', img: <SvgCuration/>, cate: ""},
            {name :'Search', path : '/search', img: <IcoSearch/>, cate: "c0"},
            {name :'Login', path : '/login', img: <SvgLogin/>, cate: ""},
        ]
    }

    //로그아웃
    const logoutHandler = () => {
        dispatch(userActions.logoutFB());
        toggleState();
    }

    // tap 이동관련
    useEffect(() => {
        isOpen ? MenuEntrance.current?.focus() : MenuExit.current?.focus();
    }, [isOpen, MenuEntrance, MenuExit])

    return (
        <Menu className={isOpen ? 'active' : 'inactive'}>
            <div className='menu-head'>
                <Logo/>
                <Btn _className={isOpen ? 'active btn-close' : 'inactive btn-close'} _ariaLabel="사이트 메뉴 닫기" _onClick={toggleState}>
                    <SvgClose/>
                    {/* <span></span>
                    <span></span>
                    <span></span>
                    <span></span> */}
                </Btn>
            </div>
            <Nav aria-label="사이트 메뉴">
                <ul>
                    {menu_list.map((cur, idx) => {
                        if(idx === 0){
                            return <li className={location.pathname === cur.path ? 'active' : ''} key={cur.name}><Link to={cur.path} onClick={toggleState} ref={MenuEntrance}>{cur.img}{cur.name}</Link></li>
                        }else if(cur.name === 'Search'){
                            return <li className={location.pathname === cur.path ? 'active' : ''} key={cur.name}><Link to={cur.path} onClick={toggleState}>{cur.img}{cur.name}</Link></li>
                        }else if(cur.name === 'Logout'){
                            return <li key={cur.name}><Link to={cur.path} onClick={logoutHandler}>{cur.img}{cur.name}</Link></li>
                        }else if(cur.name === 'Curation'){
                            return <li className={location.pathname === cur.path || location.pathname.includes('/folder') ? 'active' : ''} key={cur.name}><Link to={cur.path} onClick={toggleState}>{cur.img}{cur.name}</Link></li>
                        }
                        return <li className={location.pathname === cur.path ? 'active' : ''} key={cur.name}><Link to={cur.path} onClick={toggleState} >{cur.img}{cur.name}</Link></li>
                    })}
                </ul>
            </Nav>
        </Menu>
    );
};
const Menu = styled.div`
    display: block;
    background-color: #ffffff;
    .menu-head{
        position: relative;
        display: none;
        padding: 1.5rem 1.6rem;
        justify-content: flex-end;
    }
    .btn-close{
        display: none;
        position: absolute;
        top: 50%;
        right: 2.4rem;
        transform: rotate(0deg) translateY(-50%);

        // width: 2.4rem;
        // height: 2.4rem;
        // transition: 1s ease-in-out;
        // transition-delay: 250ms;
        // span{
        //     display: block;
        //     position: absolute;
        //     height: 1px;
        //     width: 100%;
        //     background: #000000;
        //     border-radius: 9px;
        //     opacity: 1;
        //     left: 0;
        //     transform: rotate(0deg);
        //     transition: 1s ease-in-out;
        //     transition-delay: 250ms;
        // }
        // span:nth-child(1) {
        //     top: 0px;
        // }
        // span:nth-child(2),span:nth-child(3) {
        //     top: 18px;
        // }
        // span:nth-child(4) {
        //     top: 36px;
        // }


        // span.active {
        //     transition-delay: 250ms;
        // }
        // span.active:nth-child(1) {
        //     top: 18px;
        //     width: 0%;
        //     left: 50%;
        // }
        // span.active:nth-child(2) {
        //     -webkit-transform: rotate(45deg);
        //     -moz-transform: rotate(45deg);
        //     -o-transform: rotate(45deg);
        //     transform: rotate(45deg);
        // }
        // span.active:nth-child(3) {
        //     -webkit-transform: rotate(-45deg);
        //     -moz-transform: rotate(-45deg);
        //     -o-transform: rotate(-45deg);
        //     transform: rotate(-45deg);
        // }
        // span.active:nth-child(4) {
        //     top: 18px;
        //     width: 0%;
        //     left: 50%;
        // }
    }
    &.active {
        display: block;
    }
    @media screen and (max-width: 808px) {
        display: none;
        z-index: 10;
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        // height: 100vh;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
        .menu-head{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 6.4rem;
            border-bottom: 1px solid ${props => props.theme.color.b0};
        }
        &.active {
            .btn-close{
                display: block;
            }
        }
    }
`
const Logo = styled(SvgLogo)`
    width: 10rem;
`
const Nav = styled.nav`
    ul{
        display: flex;
        li{
            // margin-right: 3.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11rem;
            height: calc(8rem - 1px);
            animation: 0.5s ${commonAni} ease-out;
            a{
                display: flex;
                align-items: center;
                font: ${props => props.theme.font.styleh5};
                color: ${props => props.theme.color.b0};
                height: 100%;
                svg{
                    margin-right: 1.6rem;
                }
            }
            &:first-child{
                display:none;
            }
            &:last-child{
                margin-right: 0;
            }
            &.active{
                border-bottom: 4px solid ${props => props.theme.color.b0};
            }
            &:hover{
                background-color: ${props => props.theme.color.g2};
            }
        }
    }
    @media screen and (max-width: 808px) {
        padding: 0 1.6rem;
        ul{
            flex-direction: column;
            li{
                width: 100%;
                height: auto;
                border-bottom: 1px solid ${props => props.theme.color.g1};
                a{
                    padding: 2.8rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                }
                &:first-child{
                    display:flex;
                }
                &:last-child{
                    margin-right: 0;
                }
                &.active{
                    border-bottom: 1px solid ${props => props.theme.color.g1};
                }
            }
        }
    }
`
const IcoSearch = styled(SvgSearch)`
    path{
        fill: #000000;
    }
`
export default MenuBox;