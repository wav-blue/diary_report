import styled, { css } from "styled-components";

const CenterContainer = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      justify-content: center;
      padding: 50px 0;
    `;
  }}
`;

export default CenterContainer;
