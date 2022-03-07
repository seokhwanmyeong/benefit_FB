import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux"
import { FilterController } from './Filter';

const FilterBox = () => {
    // const dispatch = useDispatch();
    const { toggleState, isOpen, FilterExit } = useContext(FilterController);

    //메뉴가 열리면 초점이 보내질 요소를 가리킬 ref
    const FilterEntrance = useRef();

    useEffect(() => {
        isOpen ? FilterEntrance.current?.focus() : FilterExit.current?.focus();
    }, [isOpen, FilterEntrance, FilterExit])

     //비어있을 경우 value = "empty"
    const [jobStatus, setJob] = useState("empty");
    const [period, setPeriod] = useState("empty");
    const [edu, setEdu] = useState("empty");
    const [cate, setCate] = useState("empty");
    const [benefit, setBenefit] = useState("empty");
    const [locate, setLocate] = useState("empty");
    const [limit, setLimit] = useState("empty");
    const [sLimit, setSlimit] = useState("empty");

    const select_filter = [jobStatus, period, edu, cate, benefit, locate, limit, sLimit];

    const filter_list = {
        job_status : [
            "미취업",
            "자영업",
            "구직자 / 취업준비생",
            "재직자(중소포함)",
            "창업",
            "제한없음",
            "기타"
        ],
        apply_period : [
            "상시",
            "선착순",
            "공모중",
            "마감일 임박 (7일 미만)",
            "신청 예정 (7일 미만) ",
            "기타",
            "마감",
        ],
        education: [
            "대학생 (재학,대학생)",
            "대학원생 (석사, 박사 다 포함)",
            "기타",
            "제한없음",
        ],
        category: [
            ["c0", "전체"],
            ["c1", "주거 금융"],
            ["c2", "코로나 19"],
            ["c3", "창업지원"],
            ["c4", "생활 복지"],
            ["c5", "정책 참여"],
            ["c6", "취업"]
        ],
        benefit: [
            "돈",
            "대여",
            "상담",
            "기타"
        ],
        location: [
            "중앙부서",
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
        limit: [
            "true",
            "false"
        ],
        special_limit: [
            "true",
            "false"
        ],
    }
    // const getEntries = Object.entries(filter_list).map((entrie, idx) => {
    //     return console.log(entrie, idx);
    // });

    const menu_list = {
        job_status: jobStatus,
        apply_period: period,
        education: edu,
        category : cate,
        benefit : benefit,
        location : locate,
        limit : limit,
        special_limit : sLimit,
    }

    // useEffect(() => {
    //     dispatch(select_filter)
    // }, [jobStatus, period, edu, cate, benefit, locate, limit, sLimit])

    return (
        <Filter className={isOpen ? 'active' : 'inactive'}>
            {Object.entries(filter_list).map((cur, idx) => {
                return(
                    <div key={idx}>
                        {cur[0] !== "category" 
                            ?   cur[1].map((_cur) => {
                                    return (
                                        <label key={_cur}>
                                            <input type="radio" />
                                            <p>{_cur}</p>
                                        </label>
                                    )
                                })
                            :   cur[1].map((_cur) => {
                                    return (
                                        <label key={_cur[0]}>
                                            <input type="radio" />
                                            <p>{_cur[1]}</p>
                                        </label>
                                    )
                                })
                        }
                    </div>
                )
            })}
        </Filter>
    );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
const Filter = styled.div`
    display: none;
    z-index: 10;
    position: absolute;
    right: 0;
    top: 0;
    width: 20rem;
    background-color: #ffffff;
    &.active {
        display: block;
    }
`

export default FilterBox;