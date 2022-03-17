import React, {useState, useRef } from 'react';
import styled from 'styled-components';

import { FilterBox } from '../components/index'
import { Btn } from '../elements/index';
import { SvgFilter } from '../icons/ico_components'

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
            <FilterHead>
                <FilterArr>
                    <Btn _ariaLabel="인기순 정렬" _onClick={null} _text='인기순'/>
                    <Btn _ariaLabel="마감 임박순 정렬" _onClick={null} _text='마감 임박순'/>
                </FilterArr>
                <Btn _className="btn-filter" _ariaLabel="필터메뉴" _ariahaspopup={!isOpen} _ref={FilterExit} _onClick={toggleState}>
                    <div className='btn-filter-box'>
                        <span className='filter-on'>23</span>
                        <SvgFilter/>
                        <span className='filter-off'>Off</span>    
                    </div>
                </Btn>
            </FilterHead>
            <FilterBox/>
        </FilterController.Provider>
    );
};
const FilterHead = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .btn-filter{
        position: relative;
        display: none;
        width: 68px;
        height: 28px;
        overflow-x: hidden;
        .btn-filter-box{
            .filter-on{
                display: block;
                width: 68px;
                height: 28px;
            }
            .filter-off{
                display: block;
                width: 68px;
                height: 28px;
            }
        }
    }
    @media screen and (max-width: 808px){
        .btn-filter{
            display: block;
        }
    }
`
const FilterArr = styled.div`

`

export default Filter;
export { FilterController }