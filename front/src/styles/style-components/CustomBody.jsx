import styled, { css } from "styled-components";

const CustomBody = styled.header`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.pureWhite};
      margin: 0 auto;
      width: 35vw;
      height: 93vh;
    `;
  }}
`;

export default CustomBody;
