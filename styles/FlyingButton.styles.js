import styled from "styled-components";
import {ButtonStyle} from "@/styles/Button.styles";
import {primary} from "@/lib/colors";

export const FlyingButtonWrapper = styled.div`
  button{
    ${ButtonStyle};
    ${props => props.main ? `
      background-color: ${primary};
      color:white;
    ` : `
      background-color: transparent;
      border: 1px solid ${primary};
      color:${primary};
    `}
    ${props => props.white && `
      background-color: white;
      border: 1px solid white;
      font-weight:500;
    `}
      max-width: 110px;
      max-height: 40px;
  }
  @keyframes fly{
    100%{
      top:0;
      left:65%;
      opacity: 0;
      display:none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img{
    display:none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;