import React, { useContext, useRef, useEffect, useState } from 'react';
import styled, { css, keyframes} from 'styled-components';
import { useDispatch } from "react-redux"
import { FilterController } from './Filter';

import { Btn, BtnCircle, Input } from '../elements';
import { SvgClose, SvgReset } from '../icons/ico_components'
import { CheckTrue, CheckFalse } from "../icons/ico_url"
import { actionCreators as postActions } from "../redux/modules/post"
import { commonAni } from '../styles/Animation';

const FilterBox = () => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const user_options = JSON.parse(localStorage.getItem('options'));
    const { toggleState, isOpen, FilterExit } = useContext(FilterController);
    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const FilterEntrance = useRef();

    useEffect(() => {
        isOpen ? FilterEntrance.current?.focus() : FilterExit.current?.focus();
    }, [isOpen, FilterEntrance, FilterExit])

     //비어있을 경우 value = "empty"
    const [txt, setTxt] = useState(user_options ? user_options.txt : "all"); 
    const [job_status, setJob] = useState(user_options ? user_options.job_status : "all");
    const [education, setEdu] = useState(user_options ? user_options.education : "all");
    const [age, setAge] = useState(user_options ? user_options.age : "all");
    const [major, setMajor] = useState(user_options ? user_options.major : "all");
    const [special_limit, setSlimit] = useState(user_options ? user_options.special_limit : "all");
    
    const [benefit, setBenefit] = useState(user_options ? Array.from(user_options.benefit) : ["all"]);
    const [location, setLocate] = useState(user_options ? Array.from(user_options.location) : ["all"]);
    const [apply_period, setPeriod] = useState(user_options ? Array.from(user_options.apply_period) : ["all"]);
    // const [category, setCate] = useState(["all"]);

    const filter_list = {
        "job_status" : { 
            name: "취업상태", 
            content: [
                "미취업",
                "자영업",
                "창업",
                "제한없음",
                "구직자 / 취업준비생",
                "재직자(중소포함)",
                "기타"
            ],
            overlap: false
        },
        "apply_period" : { 
            name: "신청기간", 
            content: [
                "전체",
                "상시",
                "선착순",
                "공모중",
                "마감일 임박 (14일 미만)",
                "신청 예정 (14일 미만)",
                "기타",
                // "마감",
            ],
            overlap: true
        },
        "education" : { 
            name: "재학상태", 
            content: [
                "대학생 (재학,대학생)",
                "대학원생 (석사, 박사 다 포함)",
                "기타",
                "제한없음",
            ],
            overlap: false
        },
        "benefit" : { 
            name: "지원내용", 
            content: [
                "전체",
                "돈",
                "옷",
                "컨설팅",
                "상담",
                "교육",
                "장비",
                "공간",
                "건강",
                "주거",
                "스펙",
                "문화생활",
                "기타",
            ],
            overlap: true
        },
        "location" : { 
            name: "대상지역", 
            content: [
                "전체",
                "지역무관",
                "서울", 
                "부산", 
                "대구", 
                "인천", 
                "광주",
                "대전", 
                "울산", 
                "경기", 
                "강원", 
                "충북", 
                "충남", 
                "전북", 
                "전남", 
                "경북", 
                "경남", 
                "세종",
                "제주"
            ],
            overlap: true
        },
        "age" : {
            name: "나이제한", 
            content: [
                "제한 O",
                "제한 X"
            ],
            overlap: false
        },
        "major" : {
            name: "전공제한", 
            content: [
                "제한 O",
                "제한 X"
            ],
            overlap: false
        },

        // "limit" : { 
        //     name: "나이·전공제한", 
        //     content: [
        //         "제한 O",
        //         "제한 X"
        //     ],
        //     overlap: false
        // },
        "special_limit" : { 
            name: `기타제한대상\nex) 군인, 소득제한, etc`, 
            content: [
                "제한 O",
                "제한 X"
            ],
            overlap: false
        },
        /*
        switch형식 버튼
            1. 나이 제한 (    ㅇ)
            2. 전공 제한 (    ㅇ)
            3. 소득 기준 (    ㅇ)
            4. 직업 조건 (    ㅇ)
        */
    }

    const select_filter = {
        txt: txt,
        job_status: job_status,
        apply_period: apply_period,
        education: education,
        benefit : benefit,
        location : location,
        age: age,
        major: major,
        special_limit : special_limit,
        // order: "인기순",
        // paging: 1,
    }

    const onChangeAll = (e, id) => {
        switch(id){
            case 'apply_period': 
                // 체크 시, 전체에 해당하는 filter_list[id].content[0]을 제와하고 spread를 통해 넣기 및 체크
                if (e.currentTarget.checked) {
                    // setPeriod([...filter_list[id].content].filter((checkedId) => checkedId !== filter_list[id].content[0]))
                    setPeriod(["all"]);
                    e.currentTarget.checked = true;
                // 체크 해제할 시, 데이터 빈배열로 넣기 및 체크해제
                } else {
                    setPeriod(["all"]);
                    e.currentTarget.checked = false;
                }
                break;
            // 위와 상동
            case 'location': 
                if (e.currentTarget.checked) {
                    // setLocate([...filter_list[id].content].filter((checkedId) => checkedId !== filter_list[id].content[0]))
                    setLocate(["all"]);
                    e.currentTarget.checked = true;
                } else {
                    setLocate(["all"]);
                    e.currentTarget.checked = false;
                }
                break;
            case 'benefit': 
                if (e.currentTarget.checked) {
                    setBenefit(["all"]);
                    e.currentTarget.checked = true;
                } else {
                    setBenefit(["all"]);
                    e.currentTarget.checked = false;
                }
                break;
            default : 
        }
    };

    const onCheckBox = (e, id) => {
        // console.log(e.currentTarget.checked)

        // 체크할 시 checkList id값 넣기
        switch(id){
            case 'apply_period': 
                // 체크 시, checkList 해당 id값 spread를 통해 넣기
                if (e.currentTarget.checked) {
                    setPeriod([...apply_period, e.target.value].filter((checkedId) => checkedId !== 'all'));

                    // 데이터 배열길이와 useState배열길이가 같다면(전체는 미포함) 전체 선택
                    if (apply_period.length === filter_list[id].content.length - 2) {
                        document.getElementById(`${id}`).checked = true;
                        setPeriod(["all"])
                    }else {
                        document.getElementById(`${id}`).checked = false;
                    }
                // 체크 해제할 시, filter를 사용하여 checkList 해당 id값이 `아닌` 값만 배열에 넣기
                } else {
                    setPeriod(apply_period.filter((checkedId) => checkedId !== e.target.value & checkedId !== 'all'));
                    if(apply_period.length === 1){
                        setPeriod(["all"])
                    }
                    // 전체클릭이 되어있다면, 해제
                    if (document.getElementById(`${id}`).checked) {
                        document.getElementById(`${id}`).checked = false;
                    }
                }
                break;
                // 위와 상동
            case 'location': 
                if (e.currentTarget.checked) {
                    setLocate([...location, e.target.value].filter((checkedId) => checkedId !== 'all'));
                    if (location.length === filter_list[id].content.length - 2) {
                        document.getElementById(`${id}`).checked = true;
                        setLocate(["all"])
                    }else {
                        document.getElementById(`${id}`).checked = false;
                    }
                } else {
                    setLocate(location.filter((checkedId) => checkedId !== e.target.value & checkedId !== 'all'));
                    if(location.length === 1){
                        setLocate(["all"])
                    }
                    if (document.getElementById(`${id}`).checked) {
                        document.getElementById(`${id}`).checked = false;
                    }
                }
                break;
            case 'benefit': 
                if (e.currentTarget.checked) {
                    setBenefit([...benefit, e.target.value].filter((checkedId) => checkedId !== 'all'));
                    if (benefit.length === filter_list[id].content.length - 2) {
                        document.getElementById(`${id}`).checked = true;
                        setBenefit(["all"])
                    }else {
                        document.getElementById(`${id}`).checked = false;
                    }
                } else {
                    setBenefit(benefit.filter((checkedId) => checkedId !== e.target.value & checkedId !== 'all'));
                    if(benefit.length === 1){
                        setBenefit(["all"])
                    }
                    if (document.getElementById(`${id}`).checked) {
                        document.getElementById(`${id}`).checked = false;
                    }
                }
                break;
            default : 
        }
    };

    const onRadio = (e, id) => {
        switch(id){
            case 'job_status': 
                if(select_filter[id] === e.currentTarget.value){
                    setJob("all")
                    e.currentTarget.checked = false;
                }else {
                    setJob(e.currentTarget.value)
                    e.currentTarget.checked = true;
                }
                break;
            case 'education': 
                if(select_filter[id] === e.currentTarget.value){
                    setEdu("all")
                    e.currentTarget.checked = false;
                }else {
                    setEdu(e.currentTarget.value)
                    e.currentTarget.checked = true;
                }
                break;
            case 'age': 
                if(select_filter[id] === e.currentTarget.value){
                    setAge("all")
                    e.currentTarget.checked = false;
                }else {
                    setAge(e.currentTarget.value)
                    e.currentTarget.checked = true;
                }
                break;
            case 'major': 
                if(select_filter[id] === e.currentTarget.value){
                    setMajor("all")
                    e.currentTarget.checked = false;
                }else {
                    setMajor(e.currentTarget.value)
                    e.currentTarget.checked = true;
                }
                break;
            case 'special_limit': 
                if(select_filter[id] === e.currentTarget.value){
                    setSlimit("all")
                    e.currentTarget.checked = false;
                }else {
                    setSlimit(e.currentTarget.value)
                    e.currentTarget.checked = true;
                }
                break;
            default : 
                // console.log(e.currentTarget.value);
        }
        // console.log(_job, _edu, _benefit, _limit, _sLimit)
    };

    const reset = () => {
        const reset_options = {
            txt: "all",
            job_status : "all",
            education : "all",
            benefit : ["all"],
            apply_period : ["all"],
            location : ["all"],
            age: "all",
            major: "all",
            special_limit : "all",
        }

        setTxt("all")
        setJob("all");
        setEdu("all");
        setAge("all");
        setMajor("all");
        setSlimit("all");
        setPeriod(["all"]);
        setBenefit(["all"]);
        setLocate(["all"]);
        inputRef.current.value= '';
        inputRef.current.parentNode.classList.remove('active')
        document.getElementById(`apply_period`).checked = false;
        document.getElementById(`benefit`).checked = false;
        document.getElementById(`location`).checked = false;
        dispatch(postActions.setCate('all'));
        dispatch(postActions.getCateListFB(reset_options, ['all']));
    }

    const onInput = (e) => {
        setTxt(e.target.value)
    }

    const adaptOption = () => {
        dispatch(postActions.setCate('all'));
        dispatch(postActions.getCateListFB(select_filter, ['all']));
        dispatch(postActions.setFilterState(true));
        toggleState();
    }
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            adaptOption();
        }
    }

    const acodianHandler = (e, id) => {
        if(e.currentTarget.classList.contains('active')){
            e.currentTarget.classList.remove('active');
            document.getElementById(id).classList.remove('active');
        }else {
            e.currentTarget.classList.add('active');
            document.getElementById(id).classList.add('active');
        }
    }

    useEffect(() => {
        // console.log(select_filter)
    }, [txt, job_status, apply_period, education, benefit, location, age, major, special_limit,])

    return (
        <Filter className={isOpen ? 'active' : 'inactive'}>
            <div className='filter-head'>
                <h4>세부검색</h4>
                <Btn _className="btn-close" _ariaLabel="필터 메뉴 닫기" _onClick={toggleState}>
                    <SvgClose/>
                </Btn>
            </div>
            <FilterWrap>
                <ResultGroup>
                    <GroupProperty className='int-search'>
                        <h5>검색어</h5>
                        <Input _ref={inputRef} _onChange={onInput} _onKeyPress={handleKeyPress} _type='text_search' _placeholder='ex) 학자금 대출' />
                    </GroupProperty>
                    <GroupProperty className='btn-group'>
                        <BtnCircle _onClick={reset} _className="btn-reset" _size="3.6rem" _bg={'#FFFFFF'}><SvgReset/></BtnCircle>
                        <Btn _type="small" _onClick={adaptOption} _width='100%' _text='검색하기'/>
                    </GroupProperty>
                    <GroupOptions>
                        {Object.entries(select_filter).map(cur => {
                            if(cur[0] === 'order' || cur[0] === 'paging'){
                                return null;
                            }else if(cur[1] instanceof Array){
                                return (
                                        (cur[1].map(list => {
                                        return <SelectOption>{filter_list[cur[0]].name} : {list === 'all' ? '전체' : list}</SelectOption>
                                        }))
                                )
                            }else if(cur[0] === 'txt'){
                                return(
                                        <SelectOption>검색어 : {cur[1] === 'all' ? '전체' : cur[1]}</SelectOption>
                                )
                            }else if(cur[0] === 'special_limit'){
                                return(
                                        <SelectOption>기타제한대상 : {cur[1] === 'all' ? '전체' : cur[1]}</SelectOption>
                                )
                            }else {
                                return(
                                        <SelectOption>{filter_list[cur[0]].name} : {cur[1] === 'all' ? '전체' : cur[1]}</SelectOption>
                                )
                            }
                        })}
                    </GroupOptions>
                </ResultGroup>
                <Hr type='dash'/>
                <ContentGroup>
                    {Object.entries(filter_list).map((cur, idx) => {
                        // console.log('main_'+cur[0])
                        return(
                            <React.Fragment>
                                <GroupProperty key={'main_'+cur[0]} onClick={(e) => acodianHandler(e, 'tap' + idx)} type='acodian'>
                                    <p>{cur[1].name}</p>
                                </GroupProperty>
                                <Hr/>
                                <GroupContents id={'tap' + idx} key={cur[0]}>
                                    {
                                        cur[1].overlap 
                                        ? 
                                            cur[1].content.map((list, idx) => {
                                                // console.log(cur[0]+`${idx}`)
                                                return (
                                                    <label key={cur[0] + `${idx}`} className="check-label">
                                                        <input 
                                                            onChange={(e) => idx === 0 ? onChangeAll(e, cur[0]) : onCheckBox(e, cur[0])} 
                                                            id={idx === 0 ? cur[0] : null} 
                                                            type="checkbox" 
                                                            value={list} 
                                                            checked={idx === 0 ? null : select_filter[cur[0]].includes(list)} 
                                                            className='check-int'
                                                        />
                                                        <span className='check-box'></span>
                                                        <p className='check-cont'>{list}</p>
                                                    </label>
                                                )
                                            })
                                        :
                                            cur[1].content.map((list, idx) => {
                                                // console.log(cur[0]+`${idx}`)
                                                return (
                                                    <label key={cur[0] + `${idx}`} className="check-label">
                                                        <input 
                                                            onClick={(e) => {onRadio(e, cur[0])}}
                                                            type="radio"  
                                                            name={cur[0]} 
                                                            value={list} 
                                                            checked={select_filter[cur[0]] === list ? true : false}
                                                            className='check-int'
                                                            readOnly
                                                        />
                                                        <span className='check-box'></span>
                                                        <p className='check-cont'>{list}</p>
                                                    </label>
                                                )
                                            })
                                    }
                                </GroupContents>
                            </React.Fragment>
                        )
                    })}
                </ContentGroup>
            </FilterWrap>
        </Filter>
    );
};        
const tabAnimate = (start, end) => keyframes`
    0% {
        opacity: ${start};
    }
    100% {
        opacity: ${end};
    }
`
const acodianArrow = (deg) => keyframes`
    0% {
        transform: rotate(${deg});
    }
    100% {
        transform: rotate(-${deg});
    }
`;
const Filter = styled.div`
    z-index: 10;
    position: relative;
    margin-left: 1.6rem;
    display: flex;
    flex-direction: column;
    width: 27rem;
    order: 2;
    .filter-head{
        padding: 2rem 1.6rem;
        display:none;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #000000;
        h4{
            font: ${props => props.theme.font.option_title};
            font-size: 2rem;
            color: ${props => props.theme.color.b0};
        }
    }
    @media screen and (max-width: 808px) {
        z-index: 10;
        position: fixed;
        right: 0;
        top: 0;
        padding: 0;
        display: none;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        
        &.active {
            display: flex;
        }
        .filter-head{
            display: flex;
        }
    }
`
const FilterWrap = styled.div`
    z-index: 10;
    transform: translateY(-50px);
    padding: 2rem 0 3rem;
    display: flex;
    flex-direction: column;
    width: 27rem;
    // height: 80vh;
    background-color: ${props => props.theme.color.w};
    border: 1px solid ${props => props.theme.color.p5};
    border-radius: 24px;
    overflow: hidden;
    @media screen and (max-width: 808px) {
        transform: translateY(0px);
        position: absolute;
        right: 0;
        top: 7.8rem;
        padding: 0 1.6rem 11rem;
        width: 100%;
        height: 93vh;
        border: 0;
        &::-webkit-scrollbar {
            width: 0px;
        }
    }
    &::-webkit-scrollbar {
        width: 0px;
    }
`
const ResultGroup = styled.div`
    @media screen and (max-width: 808px) {
        background-color: ${props => props.theme.color.w};
    }
`
const GroupProperty = styled.div`
    position: relative;
    padding: 2rem 1.6rem 1.6rem;
    cursor: pointer;
    ${props => props.type ==='acodian' ? css`
        &:before{
            content: '';
            position: absolute;
            right: 30.48px;
            top: 50%;
            transform: translateY(-50%);
            transform: rotate(45deg);
            animation: 0.3s ${acodianArrow('-45deg')} ease-out;
            display: inline-block;
            width: 10px;
            height: 1.5px;
            background-color: ${props => props.theme.color.b0};
        }
        &:after{
            content: '';
            position: absolute;
            right: 24px;
            top: 50%;
            transform: translateY(-50%);
            transform: rotate(-45deg);
            animation: 0.3s ${acodianArrow('45deg')} ease-out;
            display: inline-block;
            width: 10px;
            height: 1.5px;
            background-color: ${props => props.theme.color.b0};
        }
        &.active{
            display: flex;
            &:before{
                animation: 0.3s ${acodianArrow('45deg')} ease-out;
                transform: rotate(-45deg);
            }
            &:after{
                animation: 0.3s ${acodianArrow('-45deg')} ease-out;
                transform: rotate(45deg);
            }
        }
    ` : ''};

    p{
        font: ${props => props.theme.font.option_title};
        color: ${props => props.theme.color.b0};
        white-space: pre-line;
    }
    &.int-search{
        padding: 0rem 1.6rem;
        h5{
            margin: 0 0 1.2rem;
            font: ${props => props.theme.font.option_title};
            color: ${props => props.theme.color.b0};
        }
    }
    &.btn-group{
        padding: 2rem 1.6rem;
        display: flex;
        .btn-reset{
            flex-shrink: 0;
            margin-right: 0.8rem;
        }
    }
    @media screen and (max-width: 808px) {
        padding: 1.6rem 1.6rem 1.2rem;
        &.int-search{
            padding: 2.4rem 1.6rem;
            display: flex;
            align-items: center;
            h5{
                margin: 0 1rem;
                flex-shrink: 0;
            }
        }
        &.btn-group{
            z-index: 11;
            position: fixed;
            bottom: 1rem;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            border-top: 1px solid #3B74B9;
            border-radius: 2.4rem 2.4rem 0 0;
        }
    }
`   
const GroupContents = styled.div`
    padding: 2.4rem 1.5rem;
    display: none;
    flex-wrap: wrap;
    animation: 0.3s ${tabAnimate('1', '0')} ease-out;

    label{
        margin: 1.6rem 0 0;
        display: block;
        min-width: 50%;
        animation: 0.3s ${commonAni} ease-out;
        &:first-child{
            margin: 0 0 0;
            width: 100%;
        }
        &.check-label {
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;
            .check-box{
                display: inline-block;
                width: 24px;
                height: 24px;
                background: url(${CheckFalse}) center center / contain no-repeat;
                animation: 0.3s ${commonAni} ease-out;
            }
            .check-int:checked + .check-box{
                background: url(${CheckTrue}) center center / contain no-repeat;
            }
        }
        .check-cont{
            margin: 0 0 0 0.8rem;
            font: ${props => props.theme.font.option_selected};
        }
    }
    &.active{
        display: flex;
        animation: 0.3s ${tabAnimate('0', '1')} ease-out;
    }

    @media screen and (max-width: 808px) {
        border-bottom: 1px solid ${props => props.theme.color.g1};
        label{
            min-width: 33.33%
        }
    }
`
const Hr = styled.hr`
    margin: 0 auto;
    width: 90%;
    border-bottom: ${props => props.type === 'dash' ? '1px dashed' : '1px solid'};
    border-color: ${props => props.type === 'dash' ? props.theme.color.p2 : props.theme.color.b0};
    @media screen and (max-width: 808px) {
        width: 100%;
    }
`
const ContentGroup = styled.div`
    @media screen and (max-width: 808px) {
        height: 80vh;
        overflow-y: scroll;
    }
`
const GroupOptions = styled.div`
    padding: 2rem 1.6rem 1.6rem;
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 808px) {
        padding: 0rem 1.6rem 1.6rem;
    }
`
const SelectOption = styled.li`
    margin: 0 0.4rem 0.4rem;
    padding: 0.4rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    background-color: ${props => props.theme.color.p32};
    color: ${props => props.theme.color.w};
    font: ${props => props.theme.font.option_selected};
`
const Options = styled.ul`
    margin: 1.2rem 0;
    display: flex;
    flex-wrap: wrap;
    font: ${props => props.theme.font.styleh5};
    border-bottom: 1px solid ${props => props.theme.color.p5};
    &:last-child {
        border: 0;
    }
    @media screen and (max-width: 808px) {
        margin: 0.4rem 0.8rem;
        align-items: center;
        border: 0;
    }
`

export default FilterBox;