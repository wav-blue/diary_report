import styled, { css } from "styled-components";

const LightGreenCardContainer = styled.div`
  ${({ theme }) => {
    return css`
      margin: 5px;
      display: flex;
      justify-content: center;
      width: 80%;
      background-color: ${theme.colors.lightGreen};
      border-radisu: 7px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

export default LightGreenCardContainer;
