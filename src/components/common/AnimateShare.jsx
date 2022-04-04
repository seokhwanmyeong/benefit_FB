import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { SvgLink } from '../../icons/ico_components.js'
const AnimateShare = (props, ref) => {

    return (
        <Box ref={ref}>
            <SvgLink/>
            링크가 복사되었습니다.
        </Box>
    );
};
const animate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1; 
  }
  100% {
    opacity: 0;
  }
`;
const Box = styled.div`
    z-index: 9999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    align-items: center;
    justify-content: center;
    width: 26rem;
    height: 26rem;
    opacity: 0;
    border-radius: 50%;
    background-color: ${props => props.theme.color.p1};
    font: ${props => props.theme.font.styleh5};
    color: ${props => props.theme.color.w};
    animation: 0.7s ${animate} ease-out;
    &.active{
        display: flex;
    }
`

export default forwardRef(AnimateShare);