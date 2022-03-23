import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux"
import { FilterController } from './Filter';

import { Btn, Input } from '../elements';
import { SvgClose, SvgReset } from '../icons/ico_components'
import { CheckTrue, CheckFalse } from "../icons/ico_url"
import { actionCreators as postActions } from "../redux/modules/post"

const FilterBox = () => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const { toggleState, isOpen, FilterExit } = useContext(FilterController);

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const FilterEntrance = useRef();

    useEffect(() => {
        isOpen ? FilterEntrance.current?.focus() : FilterExit.current?.focus();
    }, [isOpen, FilterEntrance, FilterExit])

     //비어있을 경우 value = "empty"
    const [txt, setTxt] = useState("all"); 
    const [job_status, setJob] = useState("all");
    const [education, setEdu] = useState("all");
    const [benefit, setBenefit] = useState(["all"]);
    const [limit, setLimit] = useState("all");
    const [special_limit, setSlimit] = useState("all");
    const [apply_period, setPeriod] = useState(["all"]);
    // const [category, setCate] = useState(["all"]);
    const [location, setLocate] = useState(["all"]);

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
                "마감",
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
                "cash",
                "clothes",
                "edu",
                "equipment",
                "place",
                "support",
                "counsel",
                "consulting",
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
        "limit" : { 
            name: "나이·전공제한", 
            content: [
                "제한 O",
                "제한 X"
            ],
            overlap: false
        },
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
        limit : limit,
        special_limit : special_limit,
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
        // console.log(e.target, id)
        switch(id){
            case 'job_status': 
                console.log(e.currentTarget.checked);
                if(e.currentTarget.checked){
                    setJob(e.currentTarget.value);
                }else {
                    setJob("");
                    e.currentTarget.checked = false;
                }
                break;
            case 'education': 
                // console.log(e.currentTarget.value);
                select_filter[id] === id ? setEdu("all") : setEdu(e.currentTarget.value)
                break;
            case 'limit': 
                // console.log(e.currentTarget.value);
                select_filter[id] === id ? setLimit("all") : setLimit(e.currentTarget.value == '제한 X' ? 'false' : 'true')
                break;
            case 'special_limit': 
                // console.log(e.currentTarget.value);
                select_filter[id] === id ? setSlimit("all") : setSlimit(e.currentTarget.value == '제한 X' ? 'false' : 'true')
                break;
            default : 
                // console.log(e.currentTarget.value);
        }
        // console.log(_job, _edu, _benefit, _limit, _sLimit)
    };

    const reset = () => {
        setTxt("all")
        setJob("all");
        setEdu("all");
        setLimit("all");
        setSlimit("all");
        setPeriod(["all"]);
        setBenefit(["all"]);
        setLocate(["all"]);
        // setCate(["all"]);
        inputRef.current.value = "";

        document.getElementById(`apply_period`).checked = false;
        document.getElementById(`category`).checked = false;
        document.getElementById(`location`).checked = false;
    }

    const onInput = (e) => {
        setTxt(e.target.value)
    }

    const adaptOption = () => {
        console.log("검색시작")
        dispatch(postActions.setCate('c0'));
        dispatch(postActions.getCateListFB(select_filter));
        toggleState();
    }

    useEffect(() => {
        // console.log(select_filter)
    }, [txt, job_status, apply_period, education, benefit, location, limit, special_limit,])

    return (
        <Filter className={isOpen ? 'active' : 'inactive'}>
            <div className='filter-head'>
                <h4>세부검색</h4>
                <Btn _className="btn-close" _ariaLabel="필터 메뉴 닫기" _onClick={toggleState}>
                    <SvgClose/>
                </Btn>
            </div>
            <FilterDeco>세부검색</FilterDeco>
            <FilterWrap>
                <ResultGroup>
                    <GroupProperty className='int-search'>
                        <h5>검색어</h5>
                        <Input _ref={inputRef} _onChange={onInput} _type='text' _placeholder='ex) 학자금 대출' />
                    </GroupProperty>
                    <hr/>
                    <GroupProperty className='btn-group'>
                        <Btn _type="normal" _onClick={reset} _className="btn-reset" _width="4.8rem" _bg={'#E5E5E5'}><SvgReset/></Btn>
                        <Btn _type="normal" _onClick={adaptOption} _text='검색하기'/>
                    </GroupProperty>
                </ResultGroup>
                {Object.entries(filter_list).map((cur) => {
                    // console.log(cur)
                    return(
                        <React.Fragment>
                            <GroupProperty>
                                <p>{cur[1].name}</p>
                            </GroupProperty>
                            <GroupContents key={cur[0]}>
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
                                                <label className="check-label">
                                                    <input 
                                                        onChange={(e) => {onRadio(e, cur[0])}} key={cur[0] + `${idx}`}
                                                        type="radio"  
                                                        name={cur[0]} 
                                                        value={list} 
                                                        checked={select_filter[cur[0]] === list} 
                                                        className='check-int'
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
            </FilterWrap>
        </Filter>
    );
};        
const Filter = styled.div`
    position: relative;
    margin-left: 1.6rem;
    width: 27rem;
    height: 80vh;
    order: 2;
    display: flex;
    flex-direction: column;
    z-index: 10;
    .filter-head{
        display:none;
    }
    @media screen and (max-width: 808px) {
        z-index: 10;
        position: fixed;
        right: 0;
        top: 0;
        display: none;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        &.active {
            display: flex;
        }
        .filter-head{
            padding: 2rem 1.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #000000;
            h4{
                font: ${props => props.theme.font.option_title};
                font-size: 2rem;
                color: ${props => props.theme.color.b0};
            }
        }
    }
`
const FilterWrap = styled.div`
    width: 27rem;
    height: 80vh;
    display: flex;
    flex-direction: column;
    z-index: 10;
    background-color: #ffffff;
    overflow-y: scroll;
    border: 1px solid ${props => props.theme.color.g3};
    border-top: 0;
    border-radius: 0 0.4rem 0.4rem;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.color.filter_pc_color};
        border-radius: 0 10px 0 0;
    }
    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.color.g3};
        border-radius: 0 10px 0 0;
    }
    @media screen and (max-width: 808px) {
        z-index: 10;
        position: absolute;
        right: 0;
        top: 7.8rem;
        padding: 0 1.6rem 20rem;
        flex-direction: column;
        width: 100%;
        height: 100%;
        &::-webkit-scrollbar {
            width: 0px;
        }
    }
`
const ResultGroup = styled.div`
    background-color: ${props => props.theme.color.filter_pc_color};
    hr{
        margin: 0 auto;
        width: 83%;
        border-bottom: 1px solid ${props => props.theme.color.g3};
    }
    @media screen and (max-width: 808px) {
        background-color: ${props => props.theme.color.w};
        hr{
            width: 100%;
            border-bottom: 1px solid ${props => props.theme.color.g1};
        }
    }
`
const GroupProperty = styled.div`
    padding: 1.6rem 1.6rem 1.2rem;
    p{
        font: ${props => props.theme.font.option_title};
        color: ${props => props.theme.color.b0};
        white-space: pre-line;
    }
    &.int-search{
        h5{
            margin: 0 0 2.4rem;
            font: ${props => props.theme.font.option_title};
            color: ${props => props.theme.color.b0};
        }
    }
    &.btn-group{
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
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: ${props => props.theme.color.w};
            border-top: 1px solid ${props => props.theme.color.p2};
            border-radius: 2.4rem 2.4rem 0 0;
            .btn-reset{
                width: 14rem;
                &:after{
                    content: "초기화";
                    color: ${props => props.theme.color.b0}
                }
            }
        }
    }
`   
const GroupContents = styled.div`
    padding: 3.2rem 2rem;
    display: flex;
    flex-wrap: wrap;
    background-color: ${props => props.theme.color.g3};
    label{
        margin: 1.6rem 0 0;
        display: block;
        min-width: 50%;
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
    @media screen and (max-width: 808px) {
        border-bottom: 1px solid ${props => props.theme.color.g1};
        label{
            min-width: 33.33%
        }
    }
`
const FilterDeco = styled.div`
    position: absolute;
    top: -4rem;
    left: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8.4rem;
    height: 4rem;
    border-radius: 12px 12px 0px 0px;
    background-color: ${props => props.theme.color.filter_pc_color};
    font: ${props => props.theme.font.p};
    color: ${props => props.theme.color.p1};
    @media screen and (max-width: 808px) {
        display: none;
    }
`

export default FilterBox;