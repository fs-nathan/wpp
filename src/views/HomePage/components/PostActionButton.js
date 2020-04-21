import { Button } from "@material-ui/core";
import React from "react";
import "./PostActionButton.css";
export const PostActionButton = (props) => {
  const classes = {
    root: "comp_PostActionButton",
    label: "comp_PostActionButton__labbel",
  };
  return <Button classes={classes} {...props}></Button>;
};
