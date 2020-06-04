import DateFnsUtils from "@date-io/date-fns";
import { IconButton, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { mdiSquareEditOutline } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { default as React, useEffect, useRef, useState } from "react";
import { changeTaskduration } from "../../actions/gantt";

const EditCell = ({
  taskId,
  top = 0,
  left = 0,
  type,
  width = 100,
  component,
  defaultValue,
  canEdit,
  gird,
  start_date,
  end_date,
  fetchNewDataSource,
  setProcessDatasource,
  index,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [dataComplete, setDataComplete] = useState(defaultValue);
  const [data, setData] = useState(
    new moment(defaultValue, "DD/MM/YYYY HH:mm").isValid()
      ? new moment(defaultValue, "DD/MM/YYYY HH:mm").toDate()
      : new moment(defaultValue, "DD/MM/YYYY").toDate()
  );
  const containerRef = useRef();
  useEffect(() => {
    if (showEdit) {
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keyup", handleClickOutSide);
    }
  }, [showEdit]);
  const handleOnChange = (date) => {
    setData(new moment(date).format("YYYY-MM-DD"));
  };
  const postDataToServer = async () => {
    await changeTaskduration({
      task_id: taskId,
      start_date: new moment(start_date, "DD/MM/YYYY HH:mm").isValid()
        ? new moment(start_date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD")
        : new moment(start_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      end_date: new moment(end_date, "DD/MM/YYYY HH:mm").isValid()
        ? new moment(end_date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD")
        : new moment(end_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      [type]: new moment(data).format("YYYY-MM-DD"),
    });
    fetchNewDataSource();
  };
  const handleClickOutSide = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (type !== "complete") {
        postDataToServer();
      } else {
        console.log(type, "sdfdsfds");
        setProcessDatasource(dataComplete, index);
      }
      document.removeEventListener("keyup", handleClickOutSide);
      document.removeEventListener("click", handleClickOutSide);
      setShowEdit(false);
    }
    if (e.keyCode) return;
    if (containerRef.current && containerRef.current.contains(e.target)) return;
    if (type !== "complete") {
      postDataToServer();
    } else {
      console.log(type, "sdfdsfds");
      setProcessDatasource(dataComplete, index);
    }
    document.removeEventListener("keyup", handleClickOutSide);
    document.removeEventListener("click", handleClickOutSide);
    setShowEdit(false);
    document.removeEventListener("click", handleClickOutSide);
    document.removeEventListener("keyup", handleClickOutSide);
  };
  return (
    <React.Fragment>
      <div
        onMouseEnter={() => canEdit && setShowEditIcon(true)}
        onMouseLeave={() => canEdit && setShowEditIcon(false)}
        className="gantt--edit-cell__container"
        ref={containerRef}
      >
        {!showEdit && component}
        {showEdit &&
          (type !== "complete" ? (
            <div className="gantt--edit-cell__input-date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  disableUnderline={true}
                  value={data}
                  onChange={handleOnChange}
                  format="dd/MM/yyyy"
                  margin="normal"
                  variant="outlined"
                  id="date-picker-inline"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                left,
                top: 0,
                width,
                zIndex: 1000,
              }}
            >
              <TextField
                type="number"
                style={{
                  height: 37,
                  width: "100%",
                }}
                fullWidth={true}
                defaultValue={defaultValue}
                disableUnderline={true}
                value={dataComplete}
                onChange={(e) => setDataComplete(e.target.value)}
                classes={{
                  root: "gantt--input-number",
                }}
                variant="outlined"
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 0,
                  },
                }}
              />
            </div>
          ))}
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
