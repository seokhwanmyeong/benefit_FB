import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { actionCreators as postActions } from '../redux/modules/post';
import { Input } from '../elements';
import { SvgLoader } from "../icons/ico_components";
import { BannerDeco1, BannerDeco2, BannerDeco3 } from "../img/img_svg"

const Banner = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [txt, setTxt] = useState("all"); 

    const basic_option = {
        txt: txt,
        job_status : "all",
        apply_period : ["all"],
        education : "all",
        benefit : ["all"],
        location : ["all"],
        age: "all",
        major: "all",
        special_limit : "all",
    }

    const onInput = (e) => {
        setTxt(e.target.value)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            console.log('enter press')
            navigate('/search');
            dispatch(postActions.setCate('all'));
            dispatch(postActions.setOptions(basic_option))
            dispatch(postActions.setFilterState(true));
        }
    }
    return (
        <StyleBanner>
            <Deco/>
            <Deco2/>
            <Deco3/>
            <div className='banner-text'>
                <p>검색해봐요<br/>청년혜택, 바로, 지금</p>
                <Input 
                    _type="text" 
                    _placeholder='ex) 학자금, 보증금, 면접' 
                    _onChange={onInput}
                    _onKeyPress={handleKeyPress}
                />
            </div>
        </StyleBanner>
    );
};
const Deco = styled(BannerDeco1)`
    position: absolute;
    top: 0;
    left: 2%;
    display: flex;
    width: 96%;
    height: 100%;
    @media screen and (max-width: 808px) {
        display: none;
    }
`
const Deco2 = styled(BannerDeco2)`
    position: absolute;
    top: -2vw;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
`
const Deco3 = styled(BannerDeco3)`
    position: absolute;
    top: -3%;
    left: 3%;
    display: none;
    width: 94%;
    height: 100%;
    rect{
        height: 105%;
    }
    @media screen and (max-width: 808px) {
        display: flex;
    }
`
const StyleBanner = styled.div`
    position: relative;
    width: 100%;
    height: 27.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.color.p1};
    border-radius: 0px 0px 24px 24px;
    .banner-text{
        padding: 0 20.4rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p{
            margin: 0 0 2.4rem;
            font: ${props => props.theme.font.styleh3};
            color: ${props => props.theme.color.w};
            text-align: center;
        }
    }
    @media screen and (max-width: 808px) {
        height: 41.41vw;
        .banner-text{
            padding: 0 16.4103vw;
        }
    }
    @media screen and (max-width: 500px) {
        .banner-text{
            p{
                margin: 0 0 1.2rem;
                font: ${props => props.theme.font.styleh5};
            }
        }
    }
`
export default Banner;