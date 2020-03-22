import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0 1em",
    height: "4.4em",
    background: "rgb(0, 156, 243)",
    color: "white",
    borderRadius: "0.3em"
  },
  label: {
    fontSize: "1.1em",
    paddingLeft: "1em"
  },
  count: {
    fontWeight: "bold",
    fontSize: "3em"
  }
}));

export default function PrimaryButton({
  count = 104,
  color,
  label = "cong viec duoc thuc hien",
  ...props
}) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      focusVisibleClassName={classes.focusVisible}
      {...props}
    >
      <div className={classes.count}>{count}</div>
      <div className={classes.label}>{label}</div>
    </div>
  );
}
