import styled, { css } from "styled-components";

const CenterColumnContainer = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      justify-content: center;
      padding: 50px 0;
      flex-direction: column;
    `;
  }}
`;
export default CenterColumnContainer;
