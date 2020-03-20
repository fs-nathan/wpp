import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    height: "5rem",
    background: "rgb(0, 156, 243)",
    color: "white",
    borderRadius: "0.3rem"
  },
  label: {
    fontSize: "1.1rem",
    paddingLeft: "1rem"
  },
  count: {
    fontWeight: "bold",
    fontSize: "3rem"
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
    <ButtonBase
      focusRipple
      className={classes.root}
      focusVisibleClassName={classes.focusVisible}
      {...props}
    >
      <div className={classes.count}>{count}</div>
      <div className={classes.label}>{label}</div>
    </ButtonBase>
  );
}
