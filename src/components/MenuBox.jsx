import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Btn } from '../elements';
import { MenuController } from './MenuLayer';
import { SvgHome, SvgLogin, SvgSearch, SvgClose } from '../icons/ico_components'

const MenuBox = () => {
    const { toggleState, isOpen, MenuExit } = useContext(MenuController);

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const MenuEntrance = useRef();

    //map 메소드로 반복하여 항목 링크 생성을 위한 배열
    const menu_list=[
        {name :'Home', path : '/', img: <SvgHome/>},
        {name :'Search', path : '/search', img: <SvgSearch/>},
        {name :'Login', path : '/', img: <SvgLogin/>},
    ]

    useEffect(() => {
        isOpen ? MenuEntrance.current?.focus() : MenuExit.current?.focus();
    }, [isOpen, MenuEntrance, MenuExit])

    return (
        <Menu className={isOpen ? 'active' : 'inactive'}>
            <div className='menu-head'>
                <Btn _className="btn-close" _ariaLabel="사이트 메뉴 닫기" _onClick={toggleState}>
                    <SvgClose/>
                </Btn>
            </div>
            <Nav aria-label="사이트 메뉴">
                <ul>
                    {menu_list.map((cur, idx) => {
                        if(idx === 0){
                            return <li key={idx}><Link to={cur.path} ref={MenuEntrance}>{cur.img}{cur.name}</Link></li>
                        }
                        return <li key={idx}><Link to={cur.path} >{cur.img}{cur.name}</Link></li>
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
        display: none;
        padding: 24px;
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
        width: 20rem;
        height: 100vh;
        border-left: 1px solid #231F20;
        .menu-head{
            display: flex;
        }
        .btn-close{
            display: block;
        }
    }
`

const Nav = styled.nav`
    ul{
        display: flex;
        li{
            margin-right: 6rem;
            &:last-child{
                margin-right: 0;
            }
            a{
                display: flex;
                align-items: center;
                svg{
                    margin-right: 1.2rem;
                }
            }
        }
    }
    @media screen and (max-width: 808px) {
        padding: 0 60px 30px 45px;
        ul{
            display: block;
            li{
                margin-right: 0;
                padding: 26px 0;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
`
export default MenuBox;