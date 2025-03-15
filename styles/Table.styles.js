import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }

  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px;
  }

  @media screen and (max-width: 400px) {
    th {
      font-size: 0.6rem;
    }

    td {
      font-size: 0.8rem;
      padding: 5px;
    }
  }
`;
