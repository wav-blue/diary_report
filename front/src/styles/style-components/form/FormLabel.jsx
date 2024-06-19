import styled, { css } from "styled-components";
import { StyleLabel } from "./StyleLabel";

const FormLabel = styled(StyleLabel)`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.base};
      font-weight: ${theme.fonts.weight.bold};
    `;
  }}
`;
export { FormLabel };
