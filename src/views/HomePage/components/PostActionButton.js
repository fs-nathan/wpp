import { Button } from "@material-ui/core";
import React from "react";
import "./PostActionButton.css";
const classes = {
  root: "comp_PostActionButton",
  label: "comp_PostActionButton__labbel",
};
export const PostActionButton = ({ active, ...props }) => {
  return <Button classes={classes} data-active={active} {...props}></Button>;
};
