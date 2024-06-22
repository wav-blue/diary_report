import styled, { css } from "styled-components";

const ContentPaddingContainer = styled.div`
  ${({ theme }) => {
    return css`
      margin: 5px;
      padding: 3rem;
      display: flex;
      justify-content: center;
      width: 80%;
      background-color: ${theme.colors.pureWhite};
      border-radius: 5px;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

export default ContentPaddingContainer;
