import styled from "styled-components";
import { primary } from "@/lib/colors";

export const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  align-items: center;
`;

export const StarWrapper = styled.button`
  ${({ size }) => size === "md" && `
    height: 1.4rem;
    width: 1.4rem;
  `}

  ${({ size }) => size === "sm" && `
    height: 1rem;
    width: 1rem;
  `}

  ${({ disabled }) => !disabled && `
    cursor: pointer;
  `}

  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;