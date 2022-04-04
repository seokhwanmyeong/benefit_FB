import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MenuLayer, Inner } from '../index';
import { SvgLogo, SvgBack } from '../../icons/ico_components';

const Header = (props) => {
    const navigate = useNavigate();

    return (
        <StyleHeader>
            <Inner _padding="0rem 2.4rem">
                <Wrap>
                    <BtnPrev onClick={() => navigate(-1)}>
                        <SvgBack/>
                    </BtnPrev>
                    <HomeLink to={'/'} title="홈으로 가기">
                        <Logo/>
                    </HomeLink>
                    <HeadTitle/>
                    <MenuLayer/>
                </Wrap>
            </Inner>
        </StyleHeader>
    );
};
const HeadTitle = (props) => {
    // const { path } = props;
    const location = useLocation();
    const path = location.pathname;
    // console.log(location)

    let href = path.includes('/detail') ? '/detail' 
    : path.includes('/folder') ? '/folder' 
    : path

    return (
        <MobileTtile>
            {{
                "/" : 
                <TitleLink to={'/'} title="홈으로 가기">
                    <Logo/>
                </TitleLink>
                ,
                "/search" : 
                <Title>검색페이지</Title>
                ,
                "/login" : 
                <Title>로그인페이지</Title>
                ,
                "/mypage" : 
                <Title>마이페이지</Title>
                ,
                "/curation" : 
                <Title>큐레이션페이지</Title>
                ,
                "/detail" : 
                <Title>{location.state?.cate} 분야 정책</Title>
                ,
                "/folder" : 
                <Title>폴더페이지</Title>
                ,
                "/law" : 
                <Title>약관</Title>
                ,
            }[href]}
        </MobileTtile>
    );
}

const StyleHeader = styled.header`
    z-index: 5;
    flex-shrink: 0;
    height: 8rem;   
    border-bottom: 1px solid ${props => props.theme.color.b0};
    @media screen and (max-width: 808px) {
        height: 6.4rem; 
    }
`
const HomeLink = styled(Link)`
    display: flex;
    @media screen and (max-width: 808px) {
        display: none;
    }
`
const TitleLink = styled(Link)`
    display: flex;
`
const Logo = styled(SvgLogo)`
    path{
        fill: ${props => props.theme.color.p1};
    }
    @media screen and (max-width: 808px) {
        width: 10rem;
    }
`
const Wrap = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 808px) {
        justify-content: center;
    }
`
const MobileTtile = styled.div`
    display: none;
    @media screen and (max-width: 808px) {
        display: flex;
    }
`
const Title = styled.h2`
    font: ${props => props.theme.font.styleh4};
    color: ${props => props.theme.color.b0};;
`
const BtnPrev = styled.button`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    @media screen and (max-width: 808px) {
        display: flex;
    }
`

export default Header;