import styled, { css } from "styled-components";

const HoverBigImage = styled.div`
  ${({ theme }) => {
    return css`
      &:hover {
        border: white 1px;
        transition: 0.5s;
      }
    `;
  }}
`;

export { HoverBigImage };
