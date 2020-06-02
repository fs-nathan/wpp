import DateFnsUtils from "@date-io/date-fns";
import { IconButton } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { mdiSquareEditOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { default as React, useEffect, useRef, useState } from "react";

const EditCell = ({
  taskId,
  top = 0,
  left = 0,
  type,
  width = 100,
  component,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const containerRef = useRef();
  useEffect(() => {
    if (showEdit) {
      document.addEventListener("click", handleClickOutSide);
    }
  });
  const handleClickOutSide = (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) return;
    setShowEdit(false);
    document.removeEventListener("click", handleClickOutSide);
  };
  return (
    <React.Fragment>
      <div
        onMouseEnter={() => setShowEditIcon(true)}
        onMouseLeave={() => setShowEditIcon(false)}
        className="gantt--edit-cell__container"
        ref={containerRef}
      >
        {!showEdit && component}
        {showEdit && (
          <div style={{ position: "absolute", left, top, width, zIndex: 1000 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        )}
        {showEditIcon && !showEdit && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <IconButton
              className="MuiButtonBase-root MuiButton-root MuiButton-text comp_CustomTable_HeaderButtonGroup___button MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedText MuiButtonGroup-groupedTextHorizontal MuiButtonGroup-groupedText MuiButton-textSizeSmall MuiButton-sizeSmall"
              aria-controls="simple-menu"
              style={{ padding: 0 }}
              onClick={() => setShowEdit(true)}
              aria-haspopup="true"
              style={{
                background: "grey",
                width: 20,
                height: 36,
              }}
              size="small"
            >
              <div>
                <Icon
                  style={{ fill: "rgba(0, 0, 0, 0.54)" }}
                  path={mdiSquareEditOutline}
                  size={1}
                />
              </div>
            </IconButton>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default EditCell;
