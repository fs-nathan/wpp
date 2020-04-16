import React from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";

function TasksScrollbar(props) {
  return <Scrollbars autoHide autoHideTimeout={500} {...props}></Scrollbars>;
}

export default TasksScrollbar;
