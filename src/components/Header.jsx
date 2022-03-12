import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MenuLayer, Inner } from '../components/index';

const Header = (props) => {

    return (
        <StyleHeader>
            <Inner>
                <Wrap>
                    <div className='logo'>
                        <Link to={'/'} title="홈으로 가기">청바지</Link>
                    </div>
                    <MenuLayer/>
                </Wrap>
            </Inner>
        </StyleHeader>
    );
};

const StyleHeader = styled.header`
    border-bottom: 1px solid #231F20;
`
const Wrap = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8.4rem;
    @media screen and (max-width: 808px) {
        justify-content: center;
    }
`

export default Header;