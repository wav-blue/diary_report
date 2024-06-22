import styled, { css } from "styled-components";

const DiaryContainer = styled.div`
  ${({ theme }) => {
    return css`
      margin: 0 auto;
      width: 90%;
      background-color: ${theme.colors.pureWhite};
      border: ${theme.colors.grey} 3.5px solid;
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
    `;
  }}
`;

export default DiaryContainer;
