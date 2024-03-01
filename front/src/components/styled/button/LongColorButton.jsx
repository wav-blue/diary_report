import styled, { css } from "styled-components";
import { StyleButton } from "./StyleButton";

const LongButton = styled(StyleButton)`
  width: 90%;
  padding: 8px 0px;
  margin: 6px;
  border: 0px solid;
`;

const LongGreenButton = styled(LongButton)`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.green};
      &:hover {
        background-color: ${theme.colors.lightGreen};
        transition: 0.5s;
        cursor: pointer;
      }
    `;
  }}
`;

export { LongGreenButton };
