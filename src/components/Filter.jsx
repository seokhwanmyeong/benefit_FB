import React, {useState, useRef } from 'react';
import styled from 'styled-components';

import { FilterBox } from '../components/index'
import { Btn } from '../elements/index';

const FilterController = React.createContext();

const Filter = () => {
    // 메뉴가 열고 닫힘을 알 수 있는 상태
    const [isOpen,setOpen] = useState(false);

    //메뉴가 닫힐 때 메뉴 열기 버튼에 초점을 다시 보내줄 ref 변수
    const FilterExit = useRef();

    //버튼을 클릭했을 때 state를 변경하는 토글
    const toggleState = () => { 
        setOpen(!isOpen);
    }
    
    return (
        <FilterController.Provider value={{toggleState, isOpen, FilterExit}}>
            <FilterContents>
                <Btn _ariaLabel="필터메뉴" _ariahaspopup={!isOpen} _ref={FilterExit} _onClick={toggleState} _text='필터다'/>
                <FilterBox/>
            </FilterContents>
        </FilterController.Provider>
    );
};
const FilterContents = styled.div`
`

export default Filter;
export { FilterController }