import styled from "styled-components";

export const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

export const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

export const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

export const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;

  h3 {
    margin: 3px 0;
    font-size: 1rem;
    color: #333;
    font-weight: normal;
  }

  p {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #555;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;

  time {
    font-size: 12px;
    color: #aaa;
  }
`;
