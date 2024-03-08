import styled, { css } from "styled-components";
import { StyleForm } from "./StyleForm";

const StyleLoginForm = styled(StyleForm)`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.beige};
    `;
  }}
`;

export { StyleLoginForm };
