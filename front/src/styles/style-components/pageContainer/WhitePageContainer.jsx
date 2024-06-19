import styled, { css } from "styled-components";

const WhitePageContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 80%;
      padding: 5%;
      border: ${theme.colors.grey} 3.5px solid;
      display: flex;
      flex-direction: column;
      background-color: white;
    `;
  }}
`;

export default WhitePageContainer;
