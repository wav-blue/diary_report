import styled from "styled-components";

const TextArea = styled.textarea`
  width: 70%;
  height: 6.25em;
  resize: none;
  color: ${(props) => props.inputColor || "palevioletred"};
`;

export { TextArea };
