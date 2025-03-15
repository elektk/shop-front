import styled from "styled-components";

export const Wrapper = styled.div`
  ${({ fullWidth }) => fullWidth ? `
    display: flex;
    justify-content: center;
  ` : `
    border: 5px solid blue;
  `}
`;
