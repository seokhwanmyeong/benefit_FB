import React from 'react';
import styled from 'styled-components';

const Inner = (props) => {
    const { _size, _padding, children } = props;
    return (
        <Styleinner size={_size} padding={_padding}>
            {children}
        </Styleinner>
    );
};
const Styleinner = styled.div`
    margin: 0 auto;
    padding: ${props => props.padding ? props.padding : ""};
    width: ${props => props.size ? props.size : "808px"};
    height: 100%;
    @media screen and (max-width: 808px) {
        width: 100%;
    }
`

export default Inner;