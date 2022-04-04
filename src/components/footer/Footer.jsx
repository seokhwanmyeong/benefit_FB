import React from 'react';
import styled from 'styled-components';

import { Inner } from '../index';
import { SvgLogo, SvgInstagram } from '../../icons/ico_components';

const Footer = () => {
    return (
        <StyleFooter>
            <Inner>
                <FooterContents>
                    <div className='footer-company'>
                        <Logo/>
                        <h3 className='footer-title'>
                            <strong>청</strong>년 혜택,
                            <strong>바</strong>로,
                            <strong>지</strong>금
                        </h3>
                    </div>
                    <div className='footer-info'>
                        <p>Team YBRN</p>
                        <div className='footer-social'>
                            <SvgInstagram/>
                            <a href='https://www.instagram.com/y_benefit_official/'>y_benefit_official</a>
                        </div>
                    </div>
                    <ul className='footer-cont'>
                        <li>&lt;청바지&gt;는 온라인청년센터사이트의 오픈(OPEN) API정보를 사용합니다.</li>
                        <li>
                            <p>
                                <span>대표</span>
                                Jeahyun Woo ( ybrn2022@gmail.com )
                            </p>
                        </li>
                        <li>
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
    margin: 0 0 1rem;
    width: 10.2rem;
    height: 3.6rem;
    path{
        fill: ${props => props.theme.color.w};
    }
    @media screen and (max-width: 808px) {
        display:none;
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
            font: normal 400 1.2rem/1.45 Noto sans, sans-serif;
            color: ${props => props.theme.color.g3};
            strong{
                font-weight: 600;
            }
        }
    }
    .footer-info {
        margin: 0 4.4rem 0 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
            font: normal 700 1.4rem/1.45 Noto sans, sans-serif;
        }
        .footer-social {
            display: flex;
            align-items: center;
            svg{
                margin: 0 0.6rem 0 0;
                width: 2rem;
                height: 2rem;
            }
            a{
                font: ${props => props.theme.font.p};
                color: ${props => props.theme.color.w};
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
    .footer-cont{
        li{
            margin: 0 0 0.4rem;
            display: flex;
            font: normal 700 1.3rem/1.45 Noto sans, sans-serif;
            color: ${props => props.theme.color.g3};

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
                margin: 0 0 1.6rem;
            }
            &:last-child{
                margin: 0;
            }
        }
    }
    @media screen and (max-width: 808px) {
        flex-direction: column;
        align-items: center;
        .footer-company{
            margin: 0 0 1.6rem;
            .footer-title{
                strong{
                    font-weight: 700;
                }
            }
        }
        .footer-info {
            margin: 0 0rem 1.2rem 0;
            justify-content: center;
            p {
                margin: 0 0 1.2rem;
                font: normal 700 1.4rem/1.45 Noto sans, sans-serif;
            }
            .footer-social {
                display: flex;
                align-items: center;
                justify-content: center;
                svg{
                    margin: 0 0.6rem 0 0;
                    width: 2rem;
                    height: 2rem;
                }
                a{
                    font: ${props => props.theme.font.p};
                    color: ${props => props.theme.color.w};
                    &:hover{
                        text-decoration: underline;
                    }
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