import React from 'react';
import styled, { css } from 'styled-components';

const BtnCircle = React.forwardRef(({ _text, _ariaLabel, _onClick, _id, _className, _type, _size, _bg, _disabled, children }, _ref) => {

    return (
        <Button 
            id = {_id}
            className={_className} 
            onClick={_onClick} 
            aria-label={_ariaLabel} 
            ref={_ref}
            type={_type}
            size={_size}
            bg={_bg}
            disabled={_disabled}
        >
            {_text}
            {children}
        </Button>
    );
});
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.size ? props.size : '5.6rem'};
    height: ${props => props.size ? props.size : '5.6rem'};
    background-color: ${props => props.theme.color.w};
    border: 0;
    border-radius: 50%;
    box-shadow: 0px 1px 2px #DDE5EF, 1px 1px 1px rgba(255, 255, 255, 0.5);
`

export default BtnCircle;