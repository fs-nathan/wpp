import React from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import "./TasksScrollbar.css";
function TasksScrollbar(props) {
  return (
    <Scrollbars
      className="TasksScrollbar"
      autoHide
      autoHideTimeout={500}
      {...props}
    ></Scrollbars>
  );
}

export default TasksScrollbar;
