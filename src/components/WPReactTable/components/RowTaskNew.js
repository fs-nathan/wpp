import { addNewTaskTemp } from "actions/task/listTask";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCellStyle } from "../utils";

const RowTaskNew = ({ cells = [], ...props }, ref) => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const refTempId = useRef(null);
  const refData = useRef({});

  useImperativeHandle(ref, () => ({
    _toggle: () => {
      refTempId.current = `${new Date().getTime()}`;
      setIsVisible(!isVisible);
    },
    _open: (data) => {
      refTempId.current = `${new Date().getTime()}`;
      refData.current = data;
      setIsVisible(true);
    },
  }));

  const _handleBlur = (e) => {
    if (!e.target.value) {
      refTempId.current = null;
      setIsVisible(!isVisible);
      return;
    }

    setIsVisible(false);
    dispatch(addNewTaskTemp({ ...refData.current, name: e.target.value }));
  };

  if (!isVisible) return null;
  return (
    <WrapperRow id={refTempId.current} className="tr" {...props}>
      {cells.map((cell, index) => {
        return (
          <div
            {...cell.getCellProps()}
            key={`key_row_add_new_cell${cell.getCellProps().key}`}
            style={{ ...getCellStyle(cell.getCellProps()) }}
            className="td"
          >
            {cell.render("Cell", { isNewRow: true, onBlur: _handleBlur })}
          </div>
        );
      })}
    </WrapperRow>
  );
};

const WrapperRow = styled.div``;

export default forwardRef(RowTaskNew);
