import styled, { css } from "styled-components";
import { StyleButton } from "./StyleButton";

const BigBorderButton = styled(StyleButton)`
  ${({ theme }) => {
    return css`
  margin: 12px;
  padding: 6px 24px;
  background-color: ${theme.colors.white};
  font-size: ${theme.fonts.size.sLarge};
  font-weight: ${theme.fonts.weight.bold}
  border: 3.5px solid;`;
  }}
`;

const BigGreenBorderButton = styled(BigBorderButton)`
  ${({ theme }) => {
    return css`
      border: ${theme.colors.green}
      &:hover {
        background-color: ${theme.colors.green};
      }
    `;
  }}
`;

export { BigGreenBorderButton };
