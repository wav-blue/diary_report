import styled, { css } from "styled-components";
import { StyleForm } from "./StyleForm";

const StyleDiaryEditForm = styled(StyleForm)`
  ${({ theme }) => {
    return css`
      padding: 50px 20px;
      margin-left: 30px;
    `;
  }}
`;

export { StyleDiaryEditForm };
