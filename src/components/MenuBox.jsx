import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Btn } from '../elements';
import { SvgHome, SvgLogin, SvgSearch, SvgClose, SvgLogo } from '../icons/ico_components'
import { MenuController } from './MenuLayer';

const MenuBox = (props) => {
    const { toggleState, isOpen, MenuExit } = useContext(MenuController);

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const MenuEntrance = useRef();

    //map 메소드로 반복하여 항목 링크 생성을 위한 배열
    const menu_list=[
        // {name :'Home', path : '/', img: <SvgHome/>},
        {name :'Search', path : '/search', img: <SvgSearch/>, cate: "c0"},
        {name :'Login', path : '/', img: <SvgLogin/>, cate: ""},
    ]

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
                            return <li key={idx}><Link to={{pathname: cur.path, state: {cate: cur.cate}}} ref={MenuEntrance}>{cur.img}{cur.name}</Link></li>
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
            margin-right: 1.6rem;
            &:last-child{
                margin-right: 0;
            }
            a{
                display: flex;
                align-items: center;
                font: ${props => props.theme.font.styleh5};
                color: ${props => props.theme.color.b0};
                svg{
                    margin-right: 1.6rem;
                }
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
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
`
export default MenuBox;