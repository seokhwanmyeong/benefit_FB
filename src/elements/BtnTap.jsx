import React from 'react';
import styled from 'styled-components';

const BtnTap = (props) => {
    const { _id, _onClick, text, _className, count } = props;

    return (
        <Btn
            id={_id}
            onClick={_onClick}
            className={_className}
            count={count}
        >
            {text}
        </Btn>
    );
};
const Btn = styled.button`
    width: ${props => props.count ? `calc(100% / ${props.count})` : '100%'};
    height: 6.7rem;
    font: ${props => props.theme.font.tap};
    color: ${props => props.theme.color.b0};
    box-shadow: inset 0 -1px 0 ${props => props.theme.color.p1};
    &.active{
        font-weight: 600;
        box-shadow: inset 0 -5px 0 ${props => props.theme.color.p1};
    }
`
export default BtnTap;