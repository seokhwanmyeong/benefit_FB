import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/Theme';
import { FolderDeco1, FolderDeco2, FolderDecoSmall } from '../../img/img_url'

const FolderBg = (props) => {
    const { cate, shadow, blur, type, radius } = props;

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
            type={type}
            radius={radius}
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
    border-radius: ${props => props.radius ? props.radius : ''};
    ${props => props.shadow ? css`
        box-shadow: inset 0px -20px 20px 1px #ffffff;
    ` : ''};
    background-color: ${props => props.c1};
    // filter: ${props => props.blur ? `blur(${props.blur})` : 'blur(36px)'};
    // background: radial-gradient(circle at top left, ${props => props.c1} 0%, ${props => props.c1} 100%) top left,
    // radial-gradient(circle at top right, ${props => props.c2} 0%, ${props => props.c2} 100%) top right,
    // radial-gradient(circle at bottom right, ${props => props.c3} 0%, ${props => props.c3} 100%) bottom right,
    // radial-gradient(circle at bottom left, ${props => props.c4} 0%, ${props => props.c4} 100%) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    &:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 100%;
        background: url('${FolderDeco1}') no-repeat;
    }
    &:after{
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        ${props => props.type === 'small' 
        ? css`
        width: 86%;
        height: 86%;
        background: url('${FolderDecoSmall}') no-repeat;
        ` 
        : css`
        width: 94%;
        height: 91%;
        background: url('${FolderDeco2}') no-repeat;
        ` }

    }
`

export default FolderBg;