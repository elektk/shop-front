import styled from "styled-components";

export const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StyledTab = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  ${({ active }) => active ? `
    color: black;
    border-bottom: 2px solid black;
  ` : `
    color: #999;
  `}
`;