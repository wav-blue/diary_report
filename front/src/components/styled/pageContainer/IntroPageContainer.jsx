import styled, { css } from "styled-components";
import { StylePage } from "./StylePage";

const IntroPageContainer = styled(StylePage)`
  ${({ theme }) => {
    return css`
      border: ${theme.colors.grey} 3.5px solid;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
  }}
`;

export default IntroPageContainer;
