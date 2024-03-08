import styled, { css } from "styled-components";

const LoginPageContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 50%;
      padding: 5% 10%;
      border: ${theme.colors.grey} 3.5px solid;
      display: flex;
      flex-direction: column;
      background-color: white;
    `;
  }}
`;

export default LoginPageContainer;
