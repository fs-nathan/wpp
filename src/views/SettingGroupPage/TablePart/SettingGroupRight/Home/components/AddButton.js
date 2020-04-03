import { Chip } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React from "react";
import "./AddButton.css";
function AddButton({ label, onClick }) {
  return (
    <Chip
      onClick={onClick}
      className="comp_AddButton"
      icon={<AddCircle className="comp_AddButton__icon" />}
      label={label}
    />
  );
}
export default AddButton;
