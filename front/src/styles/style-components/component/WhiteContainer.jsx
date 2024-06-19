import styled, { css } from "styled-components";

const WhiteContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      background-color: white;
      display: flex;
      justify-content: space-around;
    `;
  }}
`;

export default WhiteContainer;
