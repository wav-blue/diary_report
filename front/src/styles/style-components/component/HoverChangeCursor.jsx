import styled, { css } from "styled-components";

const HoverChangeCursor = styled.a`
  ${({ theme }) => {
    return css`
      &:hover {
        cursor: pointer;
      }
    `;
  }}
`;

export { HoverChangeCursor };
