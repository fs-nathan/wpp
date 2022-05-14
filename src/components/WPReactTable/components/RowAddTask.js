import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import { getCellStyle } from "../utils";

const RowAddTask = ({ id, cells = [], ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  useImperativeHandle(ref, () => ({ _toggle: () => setIsVisible(!isVisible) }));

  if (!isVisible) return null;
  return (
    <WrapperRow id={id} className="tr row-add" {...props}>
      {cells.map((cell, index) => {
        return (
          <div
            {...cell.getCellProps()}
            style={{ ...getCellStyle(cell.getCellProps()) }}
            className="td row-add-task"
          >
            {index === 0 ? <CellAdd /> : cell.render("Cell")}
          </div>
        );
      })}
    </WrapperRow>
  );
};

const CellAdd = () => {
  return (
    <WrapperAddCell>
      <StyledIconAdd style={{ width: 15, height: 16 }} />
      Thêm công việc
    </WrapperAddCell>
  );
};

const WrapperRow = styled.div``;
const WrapperAddCell = styled.div`
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: #9e939e;
  font-weight: 400;
  font-size: 13px;
`;
const StyledIconAdd = styled(AddOutlinedIcon)`
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentcolor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 16px;
  margin-right: 5px;
`;

export default forwardRef(RowAddTask);
