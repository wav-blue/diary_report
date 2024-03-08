import styled, { css } from "styled-components";

const DiaryContainer = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      justify-content: center;
      width: 80%;
      background-color: ${theme.colors.pureWhite};
      border: ${theme.colors.grey} 3.5px solid;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

export default DiaryContainer;
