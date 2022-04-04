import { createGlobalStyle, css } from "styled-components";
// import reset from "styled-reset";
import "./css/font.css"
import "./css/reset.css"

const GlobalStyle = createGlobalStyle`

    .hidden{
    display: none;
    }
    .clearfix{
    content: "";
    display: block;
    clear: both;
    }
    .fl{
    float:left;
    }
    .fr{
    float: right;
    }

    ${({ theme }) => {
      return css`
      `;
    }}
`;

export default GlobalStyle;