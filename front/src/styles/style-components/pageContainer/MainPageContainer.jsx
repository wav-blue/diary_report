import styled, { css } from "styled-components";
import { StylePage } from "./StylePage";

const MainPageContainer = styled(StylePage)`
  ${({ theme }) => {
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
  }}
`;

export default MainPageContainer;
