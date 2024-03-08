import styled, { css } from "styled-components";

const CustomBody = styled.header`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.beige};
      margin: 10px auto;
      width: 100%;
      height: 100%;
    `;
  }}
`;

export default CustomBody;
