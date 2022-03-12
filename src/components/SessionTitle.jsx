import React from 'react';
import styled from 'styled-components';

const SessionTitle = ({children}) => {
    return (
        <Title>
          <h3>{children}</h3>
        </Title>
    );
};
const Title = styled.div`
    margin: 0 0 6rem 0;
    display: flex;
    justify-content: center;
    font-size: 2.4rem;
    font-weight: 600;
`

export default SessionTitle;