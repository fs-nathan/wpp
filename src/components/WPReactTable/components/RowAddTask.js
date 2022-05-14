import React from "react";
import styled from "styled-components";

const RowAddTask = ({ width }) => {
  return <WrapperRow width={width}>RowAddTask</WrapperRow>;
};

const WrapperRow = styled.div`
  width: ${(props) => props.width}px;
`;

export default RowAddTask;
