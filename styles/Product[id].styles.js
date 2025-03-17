import styled from "styled-components";

export const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
export const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
export const Price = styled.span`
  font-size: 1.4rem;
`;

export const Description = styled.p`
  white-space: pre-line;
`;
