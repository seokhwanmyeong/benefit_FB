import { keyframes, css } from "styled-components";

const commonAni = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const layerShow = keyframes`
    0% {
        display: flex;
        opacity: 0
    }
    100% {
        opacity: 1;
    }
`

const layerDown = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
`

export { commonAni, layerShow, layerDown };