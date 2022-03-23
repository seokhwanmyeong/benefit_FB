import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MenuLayer, Inner } from '../components/index';
import { SvgLogo } from '../icons/ico_components';

const Header = (props) => {

    return (
        <StyleHeader>
            <Inner _padding="1.55rem 2.4rem">
                <Wrap>
                    <div className='logo'>
                        <Link to={'/'} title="홈으로 가기">
                            <Logo/>
                        </Link>
                    </div>
                    <MenuLayer/>
                </Wrap>
            </Inner>
        </StyleHeader>
    );
};

const StyleHeader = styled.header`
    min-height: 8rem;   
    border-bottom: 1px solid ${props => props.theme.color.b0};
`
const Logo = styled(SvgLogo)`
    path{
        fill: ${props => props.theme.color.p1};
    }
`
const Wrap = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 808px) {
        justify-content: center;
    }
`

export default Header;