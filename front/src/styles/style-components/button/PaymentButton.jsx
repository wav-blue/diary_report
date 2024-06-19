import styled, { css } from "styled-components";
import { StyleButton } from "./StyleButton";

const PaymentButton = styled(StyleButton)`
  ${({ theme }) => {
    return css`
      padding: ${theme.paddings.small};
      width: 30%;
    `;
  }}
`;

export { PaymentButton };
