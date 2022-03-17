import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux"
import { FilterController } from './Filter';

import { Btn, Input } from '../elements';
import { SvgClose } from '../icons/ico_components'
import { CheckTrue, CheckFalse } from "../icons/ico_url"
import { actionCreators as postActions } from "../redux/modules/post"

const FilterBox = () => {
    const dispatch = useDispatch();
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
    const [benefit, setBenefit] = useState("all");
    const [limit, setLimit] = useState("all");
    const [special_limit, setSlimit] = useState("all");
    const [apply_period, setPeriod] = useState(["all"]);
    const [category, setCate] = useState(["all"]);
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
                "마감일 임박 (7일 미만)",
                "신청 예정 (7일 미만) ",
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
        "category" : { 
            name: "카테고리", 
            content: [
                "전체",
                "주거 금융",
                "코로나 19",
                "창업지원",
                "생활 복지",
                "정책 참여",
                "취업"
            ],
            overlap: true
        },
        "benefit" : { 
            name: "지원내용", 
            content: [
                "돈",
                "대여",
                "상담",
                "기타"
            ],
            overlap: false
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
            name: "제한대상", 
            content: [
                "true",
                "false"
            ],
            overlap: false
        },
        "special_limit" : { 
            name: "특별제한대상", 
            content: [
                "true",
                "false"
            ],
            overlap: false
        },
    }

    const select_filter = {
        txt: txt,
        job_status: job_status,
        apply_period: apply_period,
        education: education,
        category : category,
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
                    setPeriod([...filter_list[id].content].filter((checkedId) => checkedId !== filter_list[id].content[0]))
                    e.currentTarget.checked = true;
                // 체크 해제할 시, 데이터 빈배열로 넣기 및 체크해제
                } else {
                    setPeriod([]);
                    e.currentTarget.checked = false;
                }
                break;
                // 위와 상동
            case 'category': 
                if (e.currentTarget.checked) {
                    setCate([...filter_list[id].content].filter((checkedId) => checkedId !== filter_list[id].content[0]))
                    e.currentTarget.checked = true;
                } else {
                    setCate([]);
                    e.currentTarget.checked = false;
                }
                break;
                // 위와 상동
            case 'location': 
                if (e.currentTarget.checked) {
                    setLocate([...filter_list[id].content].filter((checkedId) => checkedId !== filter_list[id].content[0]))
                    e.currentTarget.checked = true;
                } else {
                    setLocate([]);
                    e.currentTarget.checked = false;
                }
                break;
            default : 
        }
    };

    const onCheckBox = (e, id) => {
        console.log(e.currentTarget.checked)
        // 체크할 시 checkList id값 넣기
        switch(id){
            case 'apply_period': 
                // 체크 시, checkList 해당 id값 spread를 통해 넣기
                if (e.currentTarget.checked) {
                    setPeriod([...apply_period, e.target.value])
                    // 데이터 배열길이와 useState배열길이가 같다면(전체는 미포함) 전체 선택
                    if (apply_period.length === filter_list[id].content.length - 2) {
                        document.getElementById(`${id}`).checked = true;
                    }
                // 체크 해제할 시, filter를 사용하여 checkList 해당 id값이 `아닌` 값만 배열에 넣기
                } else {
                    setPeriod(apply_period.filter((checkedId) => checkedId !== e.target.value));
                    // 전체클릭이 되어있다면, 해제
                    if (document.getElementById(`${id}`).checked) {
                        document.getElementById(`${id}`).checked = false;
                    }
                }
                break;
                // 위와 상동
            case 'category': 
                if (e.currentTarget.checked) {
                    setCate([...category, e.target.value])
                    if (category.length === filter_list[id].content.length - 2) {
                        document.getElementById(`${id}`).checked = true;
                    }
                } else {
                    setCate(category.filter((checkedId) => checkedId !== e.target.value));
                    if (document.getElementById(`${id}`).checked) {
                        document.getElementById(`${id}`).checked = false;
                    }
                }
                break;
                // 위와 상동
            case 'location': 
                if (e.currentTarget.checked) {
                    setLocate([...location, e.target.value])
                    if (location.length === filter_list[id].content.length - 2) {
                        document.getElementById(`${id}`).checked = true;
                    }
                } else {
                    setLocate(location.filter((checkedId) => checkedId !== e.target.value));
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
                select_filter[id] === id ? setEdu("") : setEdu(e.currentTarget.value)
                break;
            case 'benefit': 
                // console.log(e.currentTarget.value);
                select_filter[id] === id ? setBenefit("") : setBenefit(e.currentTarget.value)
                break;
            case 'limit': 
                // console.log(e.currentTarget.value);
                select_filter[id] === id ? setLimit("") : setLimit(e.currentTarget.value == 'false' ? 'all' : 'true')
                break;
            case 'special_limit': 
                // console.log(e.currentTarget.value);
                select_filter[id] === id ? setSlimit("") : setSlimit(e.currentTarget.value == 'false' ? 'all' : 'true')
                break;
            default : 
                // console.log(e.currentTarget.value);
        }
        // console.log(_job, _edu, _benefit, _limit, _sLimit)
    };

    const reset = () => {
        setJob("all");
        setEdu("all");
        setBenefit("all");
        setLimit("all");
        setSlimit("all");
        setPeriod(["all"]);
        setCate(["all"]);
        setLocate(["all"]);
        document.getElementById(`apply_period`).checked = false;
        document.getElementById(`category`).checked = false;
        document.getElementById(`location`).checked = false;
    }

    const onInput = (e) => {
        setTxt(e.target.value)
    }

    const adaptOption = () => {
        console.log("검색시작")
        dispatch(postActions.getFilterListFB(select_filter))
    }

    useEffect(() => {
        console.log(select_filter)
    }, [txt, job_status, apply_period, education, category, benefit, location, limit, special_limit,])

    return (
        <Filter className={isOpen ? 'active' : 'inactive'}>
            <div className='filter-head'>
                <Btn _className="btn-close" _ariaLabel="필터 메뉴 닫기" _onClick={toggleState}>
                    <SvgClose/>
                </Btn>
            </div>
            <FilterWrap>
                <ResultGroup>
                    <GroupProperty>
                        <Input _onChange={onInput} _type='text' _placeholder='ex) 학자금 대출' />
                    </GroupProperty>
                    <GroupProperty>
                        <Btn _onClick={reset}>초기화</Btn>
                        <Btn _onClick={adaptOption} _text='검색'/>
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
    margin-left: 1.6rem;
    width: 27rem;
    height: 80vh;
    order: 2;
    display: flex;
    flex-direction: column;
    z-index: 10;
    background-color: #ffffff;
    overflow-y: scroll;
    border: 1px solid ${props => props.theme.color.filter_pc_color};
    border-radius: 0 1.2rem 1.2rem;
    .filter-head{
        display:none;
    }
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #2f3542;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
    }
    @media screen and (max-width: 808px) {
        z-index: 10;
        position: absolute;
        right: 0;
        top: 0;
        display: none;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        background-color: #ffffff;
        &.active {
            display: flex;
        }
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #2f3542;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: grey;
            border-radius: 10px;
        }
        .filter-head{
            display: block;
        }
    }
`
const FilterWrap = styled.div`
`
const ResultGroup = styled.div`
    background-color: ${props => props.theme.color.filter_pc_color};
`
const GroupProperty = styled.div`
    padding: 1.6rem 1.6rem 1.2rem;
    p{
        font: ${props => props.theme.font.option_title}
    }
`   
const GroupContents = styled.div`
    padding: 3.2rem 2rem;
    display: flex;
    flex-wrap: wrap;
    background-color: #eeeeee;
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
            margin: 0 0 0 1.6rem;
            line-height: 1;
        }
    }
`

export default FilterBox;