import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Btn } from '../elements';
import { MenuController } from './MenuLayer';

const MenuBox = () => {
    const { toggleState, isOpen, MenuExit } = useContext(MenuController);

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const MenuEntrance = useRef();

    //map 메소드로 반복하여 항목 링크 생성을 위한 배열
    const menu_list=[
        {name :'tmp1', path : '/'},
        {name :'tmp2', path : '/'},
        {name :'tmp3', path : '/'},
        {name :'tmp4', path : '/'},
    ]

    useEffect(() => {
        isOpen ? MenuEntrance.current?.focus() : MenuExit.current?.focus();
    }, [isOpen, MenuEntrance, MenuExit])

    return (
        <Menu className={isOpen ? 'active' : 'inactive'}>
            <Nav aria-label="사이트 메뉴">
                <ul>
                    {menu_list.map((cur, idx) => {
                        if(idx === 0){
                            return <li key={idx}><Link to={cur.path} ref={MenuEntrance}>{cur.name}</Link></li>
                        }
                        return <li key={idx}><Link to={cur.path} >{cur.name}</Link></li>
                    })}
                </ul>
            </Nav>
            <Btn _ariaLabel="사이트 메뉴 닫기" _onClick={toggleState} _text='닫기'/>
        </Menu>
    );
};
const Menu = styled.div`
    display: none;
    z-index: 10;
    position: absolute;
    right: 0;
    top: 0;
    width: 20rem;
    background-color: #ffffff;
    &.active {
        display: block;
    }
`

const Nav = styled.nav`

`
export default MenuBox;