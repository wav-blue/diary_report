import styled, { css } from "styled-components";

const TitleCardContainer = styled.div`
  ${({ theme }) => {
    return css`
      margin: 5px;
      display: flex;
      justify-content: center;
      width: 80%;
      background-color: ${theme.colors.pureWhite};
      border: grey 2px solid;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

export default TitleCardContainer;
