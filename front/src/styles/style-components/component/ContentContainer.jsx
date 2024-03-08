import styled, { css } from "styled-components";

const ContentContainer = styled.div`
  ${({ theme }) => {
    return css`
      margin: 5px;
      padding: 0.5rem;
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

export default ContentContainer;
