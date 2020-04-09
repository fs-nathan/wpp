import { Chip } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React from "react";
import "./AddButton.css";
function AddButton({ label, onClick, ...props }) {
  return (
    <Chip
      onClick={onClick}
      className="comp_AddButton"
      icon={<AddCircle className="comp_AddButton__icon" />}
      label={label}
      {...props}
    />
  );
}
export default AddButton;
