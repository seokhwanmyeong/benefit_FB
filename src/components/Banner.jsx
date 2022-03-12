import React from 'react';
import styled from 'styled-components';

const Banner = () => {
    return (
        <StyleBanner>
            <div className='banner-text'>
                <p>검색해봐요<br/>청년혜택, 바로, 지금</p>
                <input type="text" placeholder='ex) 학자금, 보증금, 면접'/>
            </div>
        </StyleBanner>
    );
};
const StyleBanner = styled.div`
    position: relative;
    width: 100%;
    height: 23rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #999999;
    .banner-text{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p{
            margin: 0 0 2rem;
            text-align: center;
        }
        input{
            width: 40rem;
        }
    }
`
export default Banner;