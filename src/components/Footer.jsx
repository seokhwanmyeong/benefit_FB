import React from 'react';
import styled from 'styled-components';

import { Inner } from '../components/index';

const Footer = () => {
    return (
        <StyleFooter>
            <Inner>
                <FooterContents>
                    <div className='footer-company'>
                        <div className='footer-logo'>
                            <img className='footer-img'/>
                        </div>
                        <h3 className='footer-title'>청바지</h3>
                    </div>
                    <ul className='footer-cont'>
                        <li>정보는 어디서 가져왔고, 개인정보책임자는 누구고</li>
                        <li>서비스는 언제 시작되었고</li>
                        <li>문의는 여기로주세요</li>
                    </ul>
                </FooterContents>
            </Inner>
        </StyleFooter>
    );
};
const StyleFooter = styled.footer`
    background-color: #231F20;
    color: #ffffff;
`
const FooterContents = styled.div`
    padding: 3.6rem 6rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .footer-company{
        margin: 0 10rem 0 0;
    }
    @media screen and (max-width: 860px) {
        flex-direction: column;
        align-items: center;
        .footer-company{
            margin: 0 0 4rem 0;
        }
    }
`

export default Footer;