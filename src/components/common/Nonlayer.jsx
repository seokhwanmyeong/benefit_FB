import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Btn } from '../../elements';

const Nonlayer = (props) => {
    const { path } = props;
    const navigate = useNavigate();
    const nickname = useSelector(state => state.user.user.nickname);

    const onclickToSinmoongo = () => {
        window.open('https://www.2030fair.com/YouthConference/YouthPolicyProposal', '_blank');
    }

    if(path === '/folder'){
        return (
            <NonPage>
                <span>앗!</span>
                <p>큐레이션이 비어있어요.<br/>발견되기를 기다리고 있는 수많은 정책을<br/>가득 담으러 가볼까요?</p>
                <Btn _onClick={() => navigate('/search')} _width='16rem' _type='small' _text='정책 담으러가기'/>
            </NonPage>
        );
    }else if(path === '/search'){
        return (
            <NonPage>
                <span>이런!</span>
                <p>{nickname ? nickname : '청년'}님이필요하신 정책이 없다니.<br/>
                먼저 제안해보시는건 어때요?</p>
                <p>{nickname ? nickname : '청년'}님이 먼저 정책을 제안해보세요.</p>
                <Btn _onClick={onclickToSinmoongo} _width='16rem' _type='small' _text='청년 신문고에 정책 제안하기'/>
            </NonPage>
        );
    }else{
        return null;
    }
};
const NonPage = styled.div`
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        margin: 0 0 0.8rem;
        font: ${props => props.theme.font.styleh3};
        color: ${props => props.theme.color.p2};
        text-align: center;
    }
    p{
        margin: 0 0 2rem;
        font: ${props => props.theme.font.styleh5};
        color: ${props => props.theme.color.b1};
        letter-spacing: 1px;
        text-align: center;
    }
`

export default Nonlayer;