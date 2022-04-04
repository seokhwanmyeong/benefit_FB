import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import { IntSeacrh } from '../icons/ico_url'

const Input = (props) => {
    const { intId, _key, _onChange, _onKeyPress, _type, _placeholder, _value, _img, _width, _ref, _id, _defaultValue } = props;
    const ref = useRef();

    const inputHandler = (e) => {
        e.target.value !== '' ? ref.current.classList.add('active') : ref.current.classList.remove('active');
        _onChange(e);
    }

    if(intId === 'common'){
        return (
            <CommonInt
                type={_type} 
                placeholder={_placeholder} 
                value={_value}
                width={_width} 
                onChange={_onChange}
                ref={_ref}
                ket={_key}
            />
        );
    }else{
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
                    onChange={inputHandler}
                    onKeyPress={_onKeyPress}
                    ref={_ref}
                    id={_id}
                />
                <div className='Int-deco-img'></div>
                <div className='Int-deco-focus'>Enter</div>
            </StyleInt>
        );
    }
    
};
const StyleInt = styled.div`
    position: relative;
    display: flex;
    width:  ${props => props.width ? props.width : '100%'};
    height: 4.8rem;
    box-sizing: border-box;
    background-color: ${props => props.theme.color.w};
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
    @media screen and (max-width: 808px) {
        input{
            padding-right: 1.8rem;
            ::placeholder,
            ::-webkit-input-placeholder{
                padding-left: 2.8rem;
            }
            :-ms-input-placeholder {
                padding-left: 2.8rem;
            }
            :focus{
                padding-right: 3.6rem;
            }
        }
    }

    ${props => props.type === 'text' ? css`
        padding: 0 1.8rem;
        border: 2px solid ${props => props.theme.color.p2};
        border-radius: ${props => props.theme.radius.round};
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
    `
    : props.type === 'text_search' ? css`
        padding: 0 0.8rem;
        height: 3.2rem;
        border: 1px solid ${props => props.theme.color.p5};
        input{
            padding-right: 3.8rem;
            width: 100%;
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.p2};
            line-height: 3.2rem;
            ::placeholder,
            ::-webkit-input-placeholder{
                padding-left: 2.8rem;
                font: ${props => props.theme.font.p};
                color: ${props => props.theme.color.g1};
            }
            :-ms-input-placeholder {
                padding-left: 2.8rem;
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
            left: 0.6rem;
            transform: translateY(-50%);
            display: inline-block;
            width: 2.4rem;
            height: 2.4rem;
            background: url('${IntSeacrh}') no-repeat center center;
        }
        .Int-deco-focus{
            position: absolute;
            top: calc(50% - 1px);
            right: 1rem;
            transform: translateY(-50%);
            display: none;
            font: ${props => props.theme.font.p};
            color: ${props => props.theme.color.g1};
        }
    ` : ""
    }
`
const CommonInt = styled.input`
    padding: 1.026rem 1.537rem 1.174rem;
    width: 100%;
    border: 1px solid ${props => props.theme.color.g1};
    ::placeholder,
    ::-webkit-input-placeholder{
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.g1};
    }
    :-ms-input-placeholder {
        font: ${props => props.theme.font.p};
        color: ${props => props.theme.color.g1};
    }
`
export default Input;