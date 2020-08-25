import styled from "styled-components";
export const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    ${props => {
      switch (true) {
        case props.small:
          return `margin-top: 0.5em`;
        case props.large:
          return `margin-top: 2em`;
        case !!props.space:
          return `margin-top: ${props.space}`;
        default:
          return `margin-top: 1em`;
      }
    }}
  }
`;
