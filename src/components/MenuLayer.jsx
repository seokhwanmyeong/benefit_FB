import React, {useState, useRef } from 'react';
import styled from 'styled-components';

import { MenuBox } from '../components/index';
import { Btn } from '../elements/index';

const MenuController = React.createContext();

const MenuLayer = () => {
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
                <Btn _ariaLabel="메뉴 보기" _ariahaspopup={!isOpen} _ref={MenuExit} _onClick={toggleState} _text='MENU'/>
                <MenuBox/>
            </HeaderMenu>
        </MenuController.Provider>
    );
};
const HeaderMenu = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
`

export default MenuLayer;
export { MenuController }