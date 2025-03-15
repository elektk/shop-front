import styled from "styled-components";

export const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;

  p {
    margin: 5px;
  }

  @media screen and (max-width: 572px) {
    grid-template-columns: 1fr;
  }
`;

export const CityHolder = styled.div`
  display: flex;
  gap: 5px;

  @media screen and (max-width: 572px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media screen and (max-width: 572px) {
    grid-template-columns: 1fr;
  }
`;
