import styled, { css } from "styled-components";

const CustomHeader = styled.header`
  ${({ theme }) => {
    return css`
      padding: 0.5rem;
      background-color: ${theme.colors.default};
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4vh;
    `;
  }}
`;

export default CustomHeader;
