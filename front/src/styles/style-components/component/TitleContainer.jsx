import styled, { css } from "styled-components";

const TitleContainer = styled.div`
  ${({ theme }) => {
    return css`
      margin: 0.1rem;
    `;
  }}
`;

export default TitleContainer;
