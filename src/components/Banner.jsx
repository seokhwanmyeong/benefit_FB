import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';

import { actionCreators as postActions } from '../redux/modules/post';
import { Input } from '../elements';
import { SvgLoader } from "../icons/ico_components"

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
        limit : "all",
        special_limit : "all",
    }

    const onInput = (e) => {
        setTxt(e.target.value)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            console.log('enter press')
            navigate('/search');
            dispatch(postActions.setOptions(basic_option))
        }
    }
    return (
        <StyleBanner>
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

const StyleBanner = styled.div`
    position: relative;
    width: 100%;
    height: 27.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.color.g3};
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
            text-align: center;
        }
    }
    @media screen and (max-width: 808px) {
        .banner-text{
            padding: 0 16.4103vw;
        }
    }
`
export default Banner;