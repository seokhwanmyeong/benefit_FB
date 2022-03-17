import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IntSeacrh } from '../icons/ico_url'

const Input = (props) => {
    const { _onChange, _type, _placeholder, _value, _img, _width, } = props;
    const navigate = useNavigate();
    const ref = useRef();

    const inputHandler = (e) => {
        e.target.value !== '' ? ref.current.classList.add('active') : ref.current.classList.remove('active');
    }

    if(_type === 'text'){
        return (
            <StyleInt 
                type={_type} 
                img={_img}
                width={_width} 
                value={_value}
                ref={ref}
            >
                <input
                    type={_type} 
                    placeholder={_placeholder} 
                    value={_value}
                    width={_width} 
                    onChange={_onChange}
                />
                <div className='Int-deco-img' onClick={() => {navigate({pathname: '/search', state: {txt: ""}})}}></div>
                <div className='Int-deco-focus'>Enter</div>
            </StyleInt>
        );
    }else if(_type === ''){
        return null;
    }else{
        return null;
    }
    
};
const StyleInt = styled.div`
    ${props => props.type === 'text' ? css`
        position: relative;
        padding: 0 1.8rem;
        display: flex;
        width:  ${props => props.width ? props.width : '100%'};
        height: 4.8rem;
        background-color: ${props => props.theme.color.w};
        border: 2px solid ${props => props.theme.color.p2};
        box-sizing: border-box;
        border-radius: ${props => props.theme.radius.round};
        overflow: hidden;
        input{
            padding-right: 3.8rem;
            width: 100%;
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.p2};
            line-height: 4.4rem;
            ::placeholder,
            ::-webkit-input-placeholder{
                padding-left: 3.8rem;
                font: ${props => props.theme.font.p};
                color: ${props => props.theme.color.g1};
            }
            :-ms-input-placeholder {
                padding-left: 3.8rem;
                font: ${props => props.theme.font.p};
                color: ${props => props.theme.color.g1};
            }
            :focus{
                font: ${props => props.theme.font.p};
                color: ${props => props.theme.color.p2};
                line-height: 4.4rem;
                outline: none;
                &::placeholder,
                ::-webkit-input-placeholder{
                    opacity: 0;
                }
                &:-ms-input-placeholder {
                    opacity: 0;
                }
            }
        }
        .Int-deco-img{
            position: absolute;
            top: calc(50% - 1px);
            left: 1.8rem;
            transform: translateY(-50%);
            display: inline-block;
            width: 2.4rem;
            height: 2.4rem;
            background: url('${IntSeacrh}') no-repeat center center;
        }
        .Int-deco-focus{
            position: absolute;
            top: calc(50% - 1px);
            right: 1.8rem;
            transform: translateY(-50%);
            display: none;
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.g1};
        }
        input:focus ~ .Int-deco-img{
            display: none;
        }
        input:focus ~ .Int-deco-focus{
            display: inline-block;
        }
        &.active{
            .Int-deco-img{
                display: none;
            }
            .Int-deco-focus{
                display: inline-block;
            }
        }
    `
    :
    ""
    }
`

export default Input;