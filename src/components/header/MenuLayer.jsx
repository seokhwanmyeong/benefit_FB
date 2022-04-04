import React, {useState, useRef } from 'react';
import styled from 'styled-components';

import { MenuBox } from '../index';
import { Btn } from '../../elements/index';
import { SvgMenu } from '../../icons/ico_components'

const MenuController = React.createContext();

const MenuLayer = (props) => {
    const BtnRef = useRef();

    // 메뉴가 열고 닫힘을 알 수 있는 상태
    const [isOpen,setOpen] = useState(false);

    //메뉴가 닫힐 때 메뉴 열기 버튼에 초점을 다시 보내줄 ref 변수
    const MenuExit = useRef();

    //버튼을 클릭했을 때 state를 변경하는 토글
    const toggleState = () => { 
        setOpen(!isOpen);
    }

    return (
        <MenuController.Provider value={{toggleState, isOpen, MenuExit}}>
            <HeaderMenu>
                <Btn _className="btn-menu" _ariaLabel="메뉴 보기" _ariahaspopup={!isOpen} _ref={MenuExit} _onClick={toggleState}>
                    <SvgMenu/>
                </Btn>
                <MenuBox/>
            </HeaderMenu>
        </MenuController.Provider>
    );
};
const HeaderMenu = styled.div`
    .btn-menu{
        display: none;
    }
    @media screen and (max-width: 808px) {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        display: flex;
        align-items: center;
        .btn-menu{
            display: block;
        }
    }
`

export default MenuLayer;
export { MenuController }