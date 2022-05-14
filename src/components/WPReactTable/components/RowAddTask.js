import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import styled from "styled-components";
import { getCellStyle } from "../utils";
import RowTaskNew from "./RowTaskNew";

const RowAddTask = (
  { id, groupId, projectId, indexGroup, cells = [], ...props },
  ref
) => {
  const refRowTaskNew = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useImperativeHandle(ref, () => ({ _toggle: () => setIsVisible(!isVisible) }));

  const _handleAddNewTask = () => {
    refRowTaskNew.current._open({
      groupTask: groupId,
      description: "",
      name: "",
      priority: 2,
      projectId: projectId,
      type: 0,
      indexGroup,
    });
  };

  if (!isVisible) return null;
  return (
    <>
      <RowTaskNew ref={refRowTaskNew} cells={cells} {...props} />
      <WrapperRow
        className="tr row-add"
        onClick={_handleAddNewTask}
        {...props}
        key={`row_add_task_key_${props.key}`}
      >
        {cells.map((cell, index) => {
          return (
            <div
              {...cell.getCellProps()}
              key={`key_add_row_cell${cell.getCellProps().key}`}
              style={{ ...getCellStyle(cell.getCellProps()) }}
              className="td"
            >
              {index === 0 ? <CellAdd /> : cell.render("Cell")}
            </div>
          );
        })}
      </WrapperRow>
    </>
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
