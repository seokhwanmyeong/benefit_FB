import React from 'react';
import styled from 'styled-components';

const DecoNew = () => {
    return (
        <Deco></Deco>
    );
};
const Deco = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.color.w1};
`
export default DecoNew;