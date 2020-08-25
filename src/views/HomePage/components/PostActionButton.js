import { Button } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import "./PostActionButton.css";
const classes = {
  root: "comp_PostActionButton",
  active: "comp_PostActionButton__active",
};
export const PostActionButton = ({ active, color, children, ...props }) => {
  return (
    <Button
      className={classnames(classes.root, active && classes.active)}
      style={{ color }}
      {...props}
    >
      <div className="comp_PostActionButton-label">{children}</div>
    </Button>
  );
};
