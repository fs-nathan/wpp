import styled from "styled-components";
export const Space = styled.div`
  width: 100%;
  heigth: 10px;
  ${(props) => {
    switch (true) {
      case props.small:
        return `height: 0.5em`;
      case props.large:
        return `height: 2em`;
      case !!props.height:
        return `height: ${props.height}`;
      default:
        return `height: 1em`;
    }
  }}
`;
