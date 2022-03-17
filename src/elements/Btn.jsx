import React, { Children } from 'react';
import styled, { css } from 'styled-components';

const Btn = React.forwardRef(({ _text, _ariaLabel, _onClick, _className, _type, children }, _ref) => {

    return (
        <Button 
            className={_className} 
            onClick={_onClick} 
            aria-label={_ariaLabel} 
            ref={_ref}
            type={_type}
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
        background-color: ${props => props.theme.color.p2};
        border-radius: 24px;
        font: ${props => props.theme.font.btn_medium};
        color: ${props => props.theme.color.w};
    ` : ''}
`

export default Btn;