import React from 'react';
import styled from 'styled-components';

const SessionTitle = ({children, margin}) => {
    return (
        <Title margin={margin}>
          <h3>{children}</h3>
        </Title>
    );
};
const Title = styled.div`
    margin: ${props => props.margin ? props.margin : "0 0 2.4rem"};
    display: flex;
    h3{
        font: ${props => props.theme.font.styleh3};
    }
    @media screen and (max-width: 808px) {
        h3{
            font: ${props => props.theme.font.title_m};
        }
    }
`

export default SessionTitle;