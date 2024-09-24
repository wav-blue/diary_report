import styled, { css } from "styled-components";

const BackgroundBody = styled.header`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.white};
    `;
  }}
`;

export default BackgroundBody;
