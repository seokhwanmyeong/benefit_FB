import React from 'react';
import styled from 'styled-components';

const Btn = React.forwardRef(({ _text, _ariaLabel, _onClick}, _ref) => {
    // const { _text, _ariaLabel, _onClick, _ref} = props;

    return (
        <Button onClick={_onClick} aria-label={_ariaLabel} ref={_ref}>
            {_text}
        </Button>
    );
});
const Button = styled.button`

`

export default Btn;