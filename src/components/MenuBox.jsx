import React, { useContext, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Btn } from '../elements';
import { SvgHome, SvgLogin, SvgSearch, SvgClose, SvgLogo } from '../icons/ico_components'
import { actionCreators as userActions } from '../redux/modules/user';
import { MenuController } from './MenuLayer';

const MenuBox = (props) => {
    const dispatch = useDispatch();
    const { toggleState, isOpen, MenuExit } = useContext(MenuController);
    const is_login = localStorage.getItem('is_login');

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const MenuEntrance = useRef();

    //map 메소드로 반복하여 항목 링크 생성을 위한 배열
    let menu_list = {};

    //로그인 조건부렌더링을 위한 객체
    if (is_login) {
        menu_list = [
            {name :'Home', path : '/', img: <SvgHome/>, cate: ""},
            {name :'Search', path : '/search', img: <SvgSearch/>, cate: "c0"},
            {name :'Mypage', path : '/mypage', img: <SvgLogin/>, cate: ""},
            {name :'Logout', path : '/', img: <SvgLogin/>, cate: ""},
        ]
    } else {
        menu_list = [
            {name :'Home', path : '/', img: <SvgHome/>, cate: ""},
            {name :'Search', path : '/search', img: <SvgSearch/>, cate: "c0"},
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
                <Btn _className="btn-close" _ariaLabel="사이트 메뉴 닫기" _onClick={toggleState}>
                    <SvgClose/>
                </Btn>
            </div>
            <Nav aria-label="사이트 메뉴">
                <ul>
                    {menu_list.map((cur, idx) => {
                        if(idx === 0){
                            return <li key={idx}><Link to={cur.path} onClick={toggleState} ref={MenuEntrance}>{cur.img}{cur.name}</Link></li>
                        }else if(cur.name === 'Search'){
                            return <li key={idx}><Link to={{pathname: cur.path}} onClick={toggleState}>{cur.img}{cur.name}</Link></li>
                        }else if(cur.name === 'Logout'){
                            return <li key={idx}><Link to={cur.path} onClick={logoutHandler}>{cur.img}{cur.name}</Link></li>
                        }
                        return <li key={idx}><Link to={cur.path} onClick={toggleState} >{cur.img}{cur.name}</Link></li>
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
        height: 100vh;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
        .menu-head{
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid ${props => props.theme.color.b0};
        }
        .btn-close{
            position: absolute;
            top: 50%;
            right: 1.6rem;
            transform: translateY(-50%);
            display: block;
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
            margin-right: 4.8rem;
            a{
                display: flex;
                align-items: center;
                font: ${props => props.theme.font.styleh5};
                color: ${props => props.theme.color.b0};
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
        }
    }
    @media screen and (max-width: 808px) {
        padding: 0 1.6rem;
        ul{
            flex-direction: column;
            li{
                padding: 2.8rem 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid ${props => props.theme.color.g1};
                &:first-child{
                    display:flex;
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
`
export default MenuBox;