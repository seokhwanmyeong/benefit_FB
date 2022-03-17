import React from 'react';
import styled, {keyframes} from 'styled-components';

import { Input } from '../elements';
import { SvgLoader } from "../icons/ico_components"

const Banner = (props) => {
    return (
        <StyleBanner>
            <div className='banner-text'>
                <p>검색해봐요<br/>청년혜택, 바로, 지금</p>
                <Input 
                    _type="text" 
                    _placeholder='ex) 학자금, 보증금, 면접' 
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