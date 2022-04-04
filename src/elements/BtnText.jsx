import React from 'react';
import styled from 'styled-components';

const BtnText = (props) => {
    const { text, onClick, margin, color } = props;

    return (
        <Btn onClick={onClick} margin={margin} color={color}>
            {text}
        </Btn>
    );
};
const Btn = styled.button`
    margin: ${props => props.margin ? props.margin : ''};
    font: ${props => props.theme.font.p};
    color: ${props => props.color === 'red' ? props.theme.color.w1 :props.theme.color.p2};
`

export default BtnText;