import DateFnsUtils from "@date-io/date-fns";
import { IconButton, TextField } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { mdiSquareEditOutline } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { default as React, useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
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
  girdType
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [dataComplete, setDataComplete] = useState(null);
  const [data, setData] = useState(null);
  const containerRef = useRef();
  useEffect(() => {
    setData(
      new moment(defaultValue, "DD/MM/YYYY HH:mm").isValid()
        ? new moment(defaultValue, "DD/MM/YYYY HH:mm").toDate()
        : new moment(defaultValue, "DD/MM/YYYY").toDate()
    );
    setDataComplete(defaultValue);
  }, [defaultValue, showEdit]);
  const handleClickOutSide = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (type !== "complete") {
        postDataToServer();
      } else {
        setDataComplete(dataComplete ? parseInt(dataComplete) : 0)
        setProcessDatasource(dataComplete ? parseInt(dataComplete) : 0, index);
      }
      setShowEdit(false);
    }
    if (e.keyCode) return;
    if (containerRef.current && containerRef.current.contains(e.target)) return;
    if (type !== "complete") {
      postDataToServer();
    } else {
      setDataComplete(dataComplete ? parseInt(dataComplete) : 0)
      setProcessDatasource(dataComplete ? parseInt(dataComplete) : 0, index);
    }
    setShowEdit(false);
  };

  useEffect(() => {
    if (showEdit) {
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keyup", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keyup", handleClickOutSide);
    };
  }, [showEdit, dataComplete, data]);

  const handleOnChange = (date) => {
    if (!date) {
      setData(data);
    }
    setData(new moment(date).format("YYYY-MM-DD HH:mm"));
  };
  const postDataToServer = async () => {
    const fieldChange = type === "start_date" ? "start_time" : "end_time"
    const startEndTime = girdType === 'HOUR' ? {
      start_time: new moment(start_date, "DD/MM/YYYY HH:mm").format("HH:mm"),
      end_time: new moment(end_date, "DD/MM/YYYY HH:mm").format("HH:mm"),
      [fieldChange]: new moment(data).format("HH:mm")
    } : {}
    await changeTaskduration({
      task_id: taskId,
      start_date: new moment(start_date, "DD/MM/YYYY HH:mm").isValid()
        ? new moment(start_date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD")
        : new moment(start_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      end_date: new moment(end_date, "DD/MM/YYYY HH:mm").isValid()
        ? new moment(end_date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD")
        : new moment(end_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      [type]: new moment(data).format("YYYY-MM-DD"),
      ...startEndTime
    });
    fetchNewDataSource();
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
          (type !== "complete" ? girdType === 'HOUR' ? <div className="gantt--edit-cell__input-date">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                disableToolbar
                disableUnderline={true}
                value={data}
                onChange={handleOnChange}
                format={"dd/MM/yyyy HH:mm"}
                margin="normal"
                variant="outlined"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              /> </MuiPickersUtilsProvider></div> : (
              <div className="gantt--edit-cell__input-date">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    disableToolbar
                    disableUnderline={true}
                    value={data}
                    onChange={handleOnChange}
                    format={"dd/MM/yyyy"}
                    margin="normal"
                    variant="outlined"
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
                  width: '100%',
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
                  onChange={(e) => {
                    if (e.target.value > 100) {
                      setDataComplete(100)
                      return
                    }
                    if (e.target.value < 0) {
                      setDataComplete(0)
                      return
                    }
                    setDataComplete(e.target.value)
                  }}
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
              right: '50%',
              transform: "translateX(50%)",
              top: 0,
              background: '#fffae6',
              height: "37px",
              width: "100%"
            }}
          >
            <IconButton
              className="MuiButtonBase-root MuiButton-root MuiButton-text comp_CustomTable_HeaderButtonGroup___button MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedText MuiButtonGroup-groupedTextHorizontal MuiButtonGroup-groupedText MuiButton-textSizeSmall MuiButton-sizeSmall"
              aria-controls="simple-menu"
              style={{ padding: 0 }}
              onClick={() => setShowEdit(true)}
              aria-haspopup="true"
              style={{
                background: "#fffae6",
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

const mapStateToProps = (state) => ({
  girdType: state.gantt.girdType,
});
export default
  connect(mapStateToProps)(EditCell)
  ;