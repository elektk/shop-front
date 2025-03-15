import styled from "styled-components";

export const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;

  time {
    font-size: 1rem;
    color: #555;
  }
`;

export const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

export const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;
