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
    margin: 0 auto;
    width: ${props => props.size ? props.size : "1280px"};
`

export default Inner;