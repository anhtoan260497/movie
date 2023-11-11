import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;


export const moveUpDown = keyframes`
  0%, 100% {
    bottom: 30%;
  }
  50% {
    bottom: 27%;
  }
`