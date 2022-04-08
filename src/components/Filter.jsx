import React, {useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { actionCreators as postActions } from '../redux/modules/post';
import { FilterBox } from '../components/index'
import { Btn } from '../elements/index';
import { SvgFilter } from '../icons/ico_components'

const FilterController = React.createContext();

const Filter = () => {
    const dispatch = useDispatch();
    const standard = useSelector(state => state.post.order);
    const cate = useSelector(state => state.post.cate);
    const option = useSelector(state => state.post.options);
    const filter_state = useSelector(state => state.post.filter_state);

    //인기순, 마감임박순 관련 정렬을 위한 state
    const [tabState, setTabState] = useState({
        popul: true,
        period: false,
    });
    
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
        const localOptions = JSON.parse(localStorage.getItem('options'))

        for (let key in newTabState) {
            key === activeTab
            ? (newTabState[key] = true)
            : (newTabState[key] = false);
        };
        setTabState(newTabState);
        if(e.currentTarget.id === 'popul'){
            dispatch(postActions.setStandard('인기순'));
            dispatch(postActions.getCateListFB(localOptions, cate))
        }else{
            dispatch(postActions.setStandard('마감임박순'));
            dispatch(postActions.getCateListFB(localOptions, cate))
        }
    };
    
    return (
        <FilterController.Provider value={{toggleState, isOpen, FilterExit}}>
            <FilterHead>
                <FilterArr>
                    <Btn _id="popul" _ariaLabel="인기순 정렬" _onClick={arrayHandler} _className={standard === '인기순' ? 'active': ''} _text='인기순'/>
                    <Btn _id="period" _ariaLabel="마감 임박순 정렬" _onClick={arrayHandler} _className={standard === '마감임박순' ? 'active': ''} _text='마감 임박순'/>
                </FilterArr>
                <FilterToggleBtn className={filter_state ? 'btn-filter active' : 'btn-filter'} ariaLabel="필터메뉴" ariahaspopup={!isOpen} ref={FilterExit} onClick={toggleState}>
                    <span className='filter-cont'><SvgFilter/></span>
                    <span className='filter-text'>{filter_state ? 'on' : 'off'}</span>
                    <input type='checkbox' checked={filter_state}/>
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
    @media screen and (max-width: 808px){
        margin: 0 0 2.4rem;
        .btn-filter{
            display: block;
        }
    }
`
const FilterToggleBtn = styled.button`
    font-size: 0px;
    position: relative;
    display: inline-block;
    width: 56px;
    height: 28px;
    margin: 10px;
    background-color: ${props => props.theme.color.g2}; 
    cursor: pointer;
    border-radius: 16px;
    input{
        cursor: inherit;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        opacity: 0;
        z-index: 1;
        margin: 0px;
    }
    .filter-cont{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        top: 0px;
        left: 3px;
        border-radius: 16px;
        background-color: rgb(255, 255, 255);
        position: relative;
        transition: all 200ms ease 0s;
    }
    .filter-text{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        font: ${props => props.theme.font.align_default};
        color: ${props => props.theme.color.b0};
    }
    &.active{
        background-color: ${props => props.theme.color.p32};
        .filter-cont{
            left: 3px;
            background-color: ${props => props.theme.color.w};
        }
        .filter-text{
            left: 28px;
            font: ${props => props.theme.font.align_default};
            color: ${props => props.theme.color.w};
        }
    }
`
const FilterArr = styled.div`
    display: flex;
    button{
        padding: 6px 8px;
        border: 1px solid ${props => props.theme.color.p5};
        font: ${props => props.theme.font.align_default};
        color: ${props => props.theme.color.b3};
        height: 3.2rem;
        &.active{
            background-color: ${props => props.theme.color.p5};
            font: ${props => props.theme.font.align_tab};
        }
        &:first-child{
            border-radius: 4px 0 0 4px;
        }
        &:last-child{
            border-radius: 0 4px 4px 0;
        }
    }
`

export default Filter;
export { FilterController }