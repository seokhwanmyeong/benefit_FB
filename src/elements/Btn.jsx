import React from "react";
import styled from "styled-components";

const Btn = React.forwardRef(
  ({ _text, _ariaLabel, _onClick, _className, _id }, _ref) => {
    // const { _text, _ariaLabel, _onClick, _ref} = props;

    return (
      <Button
        id={_id}
        className={_className}
        onClick={_onClick}
        aria-label={_ariaLabel}
        ref={_ref}
      >
        {_text}
      </Button>
    );
  }
);
const Button = styled.button``;

export default Btn;
