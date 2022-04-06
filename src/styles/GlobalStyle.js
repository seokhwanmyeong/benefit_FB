import { createGlobalStyle, css } from "styled-components";

/* font-familly 설정관련 CSS */
import "./css/font.css"

/* 브라우저별 CSS RESET관련 CSS */
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