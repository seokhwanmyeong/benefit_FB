import React, {useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actionCreators as postActions } from '../redux/modules/post';
import { FilterBox } from '../components/index'
import { Btn } from '../elements/index';
import { SvgFilter } from '../icons/ico_components'

const FilterController = React.createContext();

const Filter = () => {
    const dispatch = useDispatch();

    //인기순, 마감임박순 관련 정렬을 위한 state
    const [tabState, setTabState] = useState({
        popul: true,
        period: false,
    });
    console.log(tabState)
    // 메뉴가 열고 닫힘을 알 수 있는 상태
    const [isOpen,setOpen] = useState(false);

    //메뉴가 닫힐 때 메뉴 열기 버튼에 초점을 다시 보내줄 ref 변수
    const FilterExit = useRef();

    //버튼을 클릭했을 때 state를 변경하는 토글
    const toggleState = () => { 
        setOpen(!isOpen);
    }

    //인기순, 마감임박순 관련 handler 함수
    const arrayHandler = (e) => {
        const newTabState = { ...tabState };
        const activeTab = e.currentTarget.id;

        for (let key in newTabState) {
            key === activeTab
            ? (newTabState[key] = true)
            : (newTabState[key] = false);
        };
        setTabState(newTabState);
        dispatch(postActions.setStandard(e.currentTarget.id));
    };
    
    return (
        <FilterController.Provider value={{toggleState, isOpen, FilterExit}}>
            <FilterHead>
                <FilterArr>
                    <Btn _id="popul" _ariaLabel="인기순 정렬" _onClick={arrayHandler} _className={tabState.popul ? 'active': ''} _text='인기순'/>
                    <Btn _id="period" _ariaLabel="마감 임박순 정렬" _onClick={arrayHandler} _className={tabState.period ? 'active': ''} _text='마감 임박순'/>
                </FilterArr>
                <FilterToggleBtn _className="btn-filter" _ariaLabel="필터메뉴" _ariahaspopup={!isOpen} _ref={FilterExit} _onClick={toggleState}>
                    <div className='btn-filter-box'>
                        <span className='filter-on'>ON</span>
                        <SvgFilter/>
                        <span className='filter-off'>Off</span>    
                    </div>
                </FilterToggleBtn>
            </FilterHead>
            <FilterBox/>
        </FilterController.Provider>
    );
};
const FilterHead = styled.div`
    flex-grow: 1;
    margin: 0 0 0.8rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
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
const FilterToggleBtn = styled(Btn)`
    &.active{

    }
`
const FilterArr = styled.div`
    button{
        padding: 0 1.2rem;
        height: 3.2rem;
        border-radius: 16px;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.b1};
        &.active{
            background-color: ${props => props.theme.color.filter_pc_color};
            font-weight: 700;
        }
    }
`

export default Filter;
export { FilterController }