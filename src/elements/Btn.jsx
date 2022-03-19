import React, { Children } from 'react';
import styled, { css } from 'styled-components';

const Btn = React.forwardRef(({ _text, _ariaLabel, _onClick, _id, _className, _type, _width, _bg, _disabled, children }, _ref) => {

    return (
        <Button 
            id = {_id}
            className={_className} 
            onClick={_onClick} 
            aria-label={_ariaLabel} 
            ref={_ref}
            type={_type}
            width={_width}
            bg={_bg}
            disabled={_disabled}
        >
            {_text}
            {children}
        </Button>
    );
});
const Button = styled.button`
    ${props => props.type === 'normal' ? css`
        display: flex;
        align-items: center;
        justify-content: center;
        width:  ${props => props.width ? props.width : '100%'};
        height: 4.8rem;
        background-color: ${props => props.bg ? props.bg : props.theme.color.p2}};
        border-radius: 24px;
        font: ${props => props.theme.font.btn_medium};
        color: ${props => props.theme.color.w};
    ` : props.type === 'small' ? css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${props => props.width ? props.width : '10rem'};
        height: 3.2rem;
        background-color: ${props => props.bg ? props.bg : props.theme.color.p2}};
        border-radius: 24px;
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.w};
    ` : ''}
`

export default Btn;