import React from 'react';
import styled from 'styled-components';

import { Inner } from '../components/index';
import { SvgLogo } from '../icons/ico_components';

const Footer = () => {
    return (
        <StyleFooter>
            <Inner>
                <FooterContents>
                    <div className='footer-company'>
                        <div className='footer-logo'>
                            <Logo/>
                        </div>
                        <h3 className='footer-title'>
                            <strong>청</strong>년 혜택,
                            <strong>바</strong>로,
                            <strong>지</strong>금
                        </h3>
                    </div>
                    <ul className='footer-cont'>
                        <li>Team YBRN</li>
                        <li>&lt;청바지&gt;는  정부 2.0 사이트의 정보를 사용합니다.</li>
                        <li>
                            <p>
                                <span>개인 정보 책임자</span>
                                Jeahyun Woo ( aaa@mail.to )
                            </p>
                            <p>
                                <span>문의</span>
                                Team YBRN ( ybrn2022@gmail.com )
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>호스팅</span>
                                amazon
                            </p>
                        </li>
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
const Logo = styled(SvgLogo)`
    margin: 0 0 1.2rem;
    width: 10.2rem;
    height: 3.6rem;
    path{
        fill: #ffffff;
    }
`
const FooterContents = styled.div`
    padding: 3.2rem 0 3.2rem 2.4rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .footer-company{
        margin: 0 6.6rem 0 0;
        .footer-title{
            font: normal 400 1.4rem/1.45 Noto sans, sans-serif;
            color: ${props => props.theme.color.g3};
            strong{
                font-weight: 600;
            }
        }
    }
    .footer-cont{
        li{
            margin: 1.6rem 0 0;
            display: flex;
            font: normal 700 1.2rem/1.45 Noto sans, sans-serif;
            color: ${props => props.theme.color.g2};
            p{
                font: normal 400 1.2rem/1.45 Noto sans, sans-serif;
                span{
                    font: normal 700 1.2rem/1.45 Noto sans, sans-serif;
                    &:after{
                        margin: 0 0.4rem;
                        content: ":";
                    }
                }
            }
            p+p{
                &:before{
                    margin: 0 0.4rem;
                    content: "|";
                }
            }
            &:first-child{
                margin: 0;
                font: normal 700 1.4rem/1.45 Noto sans, sans-serif;
            }
            &:last-child{
                margin: 0;
            }
        }
    }
    @media screen and (max-width: 860px) {
        flex-direction: column;
        align-items: center;
        .footer-company{
            margin: 0;
            .footer-logo{
                display:none;
            }
            .footer-title{
                strong{
                    font-weight: 700;
                }
            }
        }
        .footer-cont{
            li{
                flex-direction: column;
                justify-content: center;
                p{
                    text-align: center;
                }
                p+p{
                    &:before{
                        display: none;
                    }
                }
                &:first-child{
                    display: none;
                }
            }
        }
    }
`

export default Footer;