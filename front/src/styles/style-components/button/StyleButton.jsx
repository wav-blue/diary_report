import styled, { css } from "styled-components";

const StyleButton = styled.button`
  ${({ theme }) => {
    return css`
      &:hover {
        cursor: pointer;
        transition: 0.5s;
    `;
  }}
`;

export { StyleButton };
