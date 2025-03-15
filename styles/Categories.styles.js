import Link from "next/link";
import styled from "styled-components";


export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const CategoryTitle = styled.div`
  display:flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color:#555;
    display: inline-block;
  }
`;
export const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

export const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items:center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;