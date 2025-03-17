import styled from "styled-components";

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1{
    font-size:1.5em;
  }
`;
export const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
export const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color:#444;
  select{
    background-color:transparent;
    border:0;
    font-size:inherit;
    color:#444;
  }
`;