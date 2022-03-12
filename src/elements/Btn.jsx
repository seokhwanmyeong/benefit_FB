import React, { Children } from 'react';
import styled from 'styled-components';

const Btn = React.forwardRef(({ _text, _ariaLabel, _onClick, _className, children}, _ref) => {
    // const { _text, _ariaLabel, _onClick, _ref} = props;

    return (
        <Button className={_className} onClick={_onClick} aria-label={_ariaLabel} ref={_ref}>
            {_text}
            {children}
        </Button>
    );
});
const Button = styled.button`

`

export default Btn;