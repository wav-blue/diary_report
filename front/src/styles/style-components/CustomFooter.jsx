import styled, { css } from "styled-components";

const CustomFooter = styled.footer`
  ${({ theme }) => {
    return css`
      height: 3vh;
      position: fixed;
      transform: translateY(0%);
      width: 100vw;

      display: flex;
      align-items: center;
      background-color: ${theme.colors.grey};
      bottom: 0px;
    `;
  }}
`;

export default CustomFooter;
