import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/Theme';

const FolderBg = (props) => {
    const { cate, shadow, blur } = props;

    const color_group = {
        "코로나19" : Theme.cate_color.covid,
        "주거·금융" : Theme.cate_color.finance,
        "창업지원" : Theme.cate_color.startup,
        "생활·복지" : Theme.cate_color.welfare,
        "정책참여" : Theme.cate_color.policy,
        "취업지원" : Theme.cate_color.recruit,
        null : "#FEE500",
    }

    return (
        <FolderBgBox 
            c1={color_group[cate.c1]} 
            c2={color_group[cate.c2]} 
            c3={color_group[cate.c3]} 
            c4={color_group[cate.c4]}
            shadow={shadow}
            blur={blur}
        >   
        </FolderBgBox>
    );
};
const FolderBgBox = styled.div`
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: ${props => props.blur ? `blur(${props.blur})` : 'blur(20px)'};
    ${props => props.shadow ? css`
        box-shadow: inset 0px -40px 0px 10px #ffffff;
    ` : ''};
    background: radial-gradient(circle at top left, ${props => props.c1} 0%, ${props => props.c1} 100%) top left,
    radial-gradient(circle at top right, ${props => props.c2} 0%, ${props => props.c2} 100%) top right,
    radial-gradient(circle at bottom right, ${props => props.c3} 0%, ${props => props.c3} 100%) bottom right,
    radial-gradient(circle at bottom left, ${props => props.c4} 0%, ${props => props.c4} 100%) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    `

export default FolderBg;