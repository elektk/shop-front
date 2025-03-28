import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  hr {
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;