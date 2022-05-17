import React, { useRef } from "react";
import Popper from "@mui/material/Popper";
import styled from "styled-components";

const ResizeHeaderDiv = ({ column, scrollTableHeight }) => {
  const anchorEl = useRef(null);

  const open = Boolean(column.isResizing);
  const id = open ? column.id : undefined;

  return (
    <>
      <ResizeDiv
        ref={anchorEl}
        {...column.getResizerProps()}
        isResizing={column.isResizing}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl.current}
        style={{ zIndex: 99999, position: "fixed" }}
      >
        <LineDiv style={{ height: scrollTableHeight }} />
      </Popper>
    </>
  );
};

const LineDiv = styled.div`
  width: 1px;
  background: #008ce3;
  z-index: 99999;
  position: fixed;
`;

const ResizeDiv = styled.div`
  height: 100%;
  position: absolute;
  right: -5px;
  top: 0;
  width: 10px;
  z-index: 999;

  ${({ isResizing }) => ({
    background: !isResizing ? "transparent" : "#008ce3",
  })}
  &:hover {
    background: #008ce3;
  }
`;

export default ResizeHeaderDiv;
