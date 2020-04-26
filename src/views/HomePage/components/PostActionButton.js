import { Button } from "@material-ui/core";
import React from "react";
import "./PostActionButton.css";
const classes = {
  root: "comp_PostActionButton",
  label: "comp_PostActionButton__labbel",
};
export const PostActionButton = ({ active, color, ...props }) => {
  return (
    <Button
      classes={classes}
      style={active ? { color } : {}}
      {...props}
    ></Button>
  );
};
