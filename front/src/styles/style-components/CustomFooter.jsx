import styled, { css } from "styled-components";

const CustomFooter = styled.footer`
  ${({ theme }) => {
    return css`
      padding: 0.5rem;
      line-height: 1rem;
      width: 100%;
      height: 1rem;
      background-color: ${theme.colors.grey};
      bottom: 0px;
      position: absolute;
    `;
  }}
`;

export default CustomFooter;
