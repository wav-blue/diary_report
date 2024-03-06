import styled, { css } from "styled-components";
import { StyleButton } from "./StyleButton";

const SmallButton = styled(StyleButton)`
  ${({ theme }) => {
    return css`
      margin: ${theme.margins.small};
      padding: ${theme.paddings.xsmall};
      border-radius: ${theme.shapes.radius.small};
      border: 0px solid;
    `;
  }}
`;

const SmallGreyButton = styled(SmallButton)`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.grey};
    `;
  }}
`;

export { SmallGreyButton };
