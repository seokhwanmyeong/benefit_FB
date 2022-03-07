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
                        <Link to={'/'} title="홈으로 가기">너만모를까나</Link>
                    </div>
                    <MenuLayer/>
                </Wrap>
            </Inner>
        </StyleHeader>
    );
};

const StyleHeader = styled.header`
`
const Wrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
`

export default Header;