import React, { Children } from 'react';
import styled, { css } from 'styled-components';

const Btn = React.forwardRef(({ _text, _ariaLabel, _onClick, _id, _className, _type, _width, _height, _bg, _disabled, children }, _ref) => {

    return (
        <Button 
            id = {_id}
            className={_className} 
            onClick={_onClick} 
            aria-label={_ariaLabel} 
            ref={_ref}
            type={_type}
            width={_width}
            height={_height}
            bg={_bg}
            disabled={_disabled}
        >
            {_text}
            {children}
        </Button>
    );
});
const Button = styled.button`
    ${props => props.type === 'large' ? css`
        display: flex;
        align-items: center;
        justify-content: center;
        width:  ${props => props.width ? props.width : '100%'};
        height: ${props => props.height ? props.height : '5.6rem;'};
        background-color: ${props => props.bg ? props.bg : props.theme.color.p2}};
        border-radius: 28px;
        font: ${props => props.theme.font.styleh4};
        color: ${props => props.theme.color.w};
    ` : props.type === 'normal' ? css`
        display: flex;
        align-items: center;
        justify-content: center;
        width:  ${props => props.width ? props.width : '100%'};
        height: ${props => props.height ? props.height : '4.8rem;'};
        background-color: ${props => props.bg ? props.bg : props.theme.color.p2}};
        border-radius: 28px;
        font: ${props => props.theme.font.btn_medium};
        color: ${props => props.theme.color.w};
    ` : props.type === 'small' ? css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${props => props.width ? props.width : '10rem'};
        height: 3.6rem;
        background-color: ${props => props.theme.color.p2};
        border:1px solid ${props => props.theme.color.p2};
        border-radius: 28px;
        font: ${props => props.theme.font.btn_small};
        color: ${props => props.theme.color.w};
    ` : props.type === 'small_off' ? css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${props => props.width ? props.width : '10rem'};
        height: 3.6rem;
        background-color: ${props => props.theme.color.w};
        border:1px solid ${props => props.theme.color.p32};
        border-radius: 28px;
        font: ${props => props.theme.font.btn_small};
        color: ${props => props.theme.color.p32};
    `: ''}
`

export default Btn;