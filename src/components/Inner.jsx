import React from 'react';
import styled from 'styled-components';

const Inner = (props) => {
    const { _size, children } = props;
    return (
        <Styleinner size={_size}>
            {children}
        </Styleinner>
    );
};
const Styleinner = styled.div`
    position: inherit;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    width: ${props => props.size ? props.size : "1280px"};
`

export default Inner;