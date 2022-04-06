import React from 'react';
import styled from 'styled-components';
import {
    SvgAnseong,
    SvgAnyang,
    SvgBucheon,
    SvgBusan,
    SvgChungbuk,
    SvgChungnam,
    SvgDaegu,
    SvgGangwon,
    SvgGapyeong,
    SvgGimpo,
    SvgGoyang,
    SvgGunpo,
    SvgGuri,
    SvgGwacheon,
    SvgGwangjusi,
    SvgGwangju,
    SvgGwangmyeong,
    SvgGyeongbuk,
    SvgGyeonggi,
    SvgGyeongnam,
    SvgHanam,
    SvgIncheon,
    SvgJeju,
    SvgJeonbuk,
    SvgJeonnam,
    SvgCenter,
    SvgNamyangju,
    SvgOsan,
    SvgPaju,
    SvgPocheon,
    SvgSeoul,
    SvgSiheung,
    SvgSuwon,
    SvgUijeongbu,
    SvgUiwang,
    SvgUlsan,
    SvgYangpyeong,
    SvgYeoju,
    SvgYongin,
    SvgPyeongtaek,
} from '../../icons/ico_location'
import total from '../../icons/ico_location/kor.jpg'
import seoul from '../../icons/ico_location/seoul.jpg'

const ImgLocation = (props) => {
    const { location } = props;
    const text = location.split(',')[0] === "경기" ? location : 
    location === "전국" ? location : location.split(',')[0];

    return (
        <React.Fragment>
            {{
                "전국" : <Img src={total} alt="중앙정부아이콘" />,
                "서울" : <Img src={seoul} alt="서울시 아이콘" />,
                "강원" : <SvgGangwon/>,
                "경북" : <SvgGyeongbuk/>,
                "경남" : <SvgGyeongnam/>,
                "광주" : <SvgGwangju/>,
                "대구" : <SvgDaegu/>,
                "부산" : <SvgBusan/>,
                "울산" : <SvgUlsan/>,
                "인천" : <SvgIncheon/>,
                "전북" : <SvgJeonbuk/>,
                "전남" : <SvgJeonnam/>,
                "충북" : <SvgChungbuk/>,
                "충남" : <SvgChungnam/>,
                "제주" : <SvgJeju/>,
                "경기,전체" : <SvgGyeonggi/>,
                "경기,가평군" : <SvgGapyeong/>,
                "경기,고양시" : <SvgGoyang/>,
                "경기,과천시" : <SvgGwacheon/>,
                "경기,광명시" : <SvgGwangmyeong/>,
                "경기,광주시" : <SvgGwangjusi/>,
                "경기,구리시" : <SvgGuri/>,
                "경기,군포시" : <SvgGunpo/>,
                "경기,김포시" : <SvgGimpo/>,
                "경기,남양주시" : <SvgNamyangju/>,
                "경기,부천시" : <SvgBucheon/>,
                "경기,수원시" : <SvgSuwon/>,
                "경기,시흥시" : <SvgSiheung/>,
                "경기,안성시" : <SvgAnseong/>,
                "경기,안양시" : <SvgAnyang/>,
                "경기,양평군" : <SvgYangpyeong/>,
                "경기,여주시" : <SvgYeoju/>,
                "경기,오산시" : <SvgOsan/>,
                "경기,용인시" : <SvgYongin/>,
                "경기,의왕시" : <SvgUiwang/>,
                "경기,의정부시" : <SvgUijeongbu/>,
                "경기,파주시" : <SvgPaju/>,
                "경기,평택시" : <SvgPyeongtaek/>,
                "경기,포천시" : <SvgPocheon/>,
                "경기,하남시" : <SvgHanam/>,
            }[text]}
        </React.Fragment>
    );
};
const Img = styled.img`
    border-radius: 50%
`
export default ImgLocation;