import styled from "styled-components";
import Link from "next/link";

export const ProductWrapper = styled.div`
  button {
    width: 150px;
    text-align: center;
    justify-content: center;
  }
`;

export const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 110px;
  }
`;

export const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
  height: 50px;
  display: block;
`;

export const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

export const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 0px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color: red;
  ` : `
    color: black;
  `}
  svg {
    width: 16px;
  }
`;
