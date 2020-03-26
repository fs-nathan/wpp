import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0 1em",
    height: "4.4em",
    minWidth: "150px",
    background: "rgb(0, 156, 243)",
    color: "white",
    borderRadius: "0.3em"
  },
  label: {
    fontSize: "1.1em",
    paddingLeft: "1rem"
  },
  subLabel: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#dadada"
  },
  count: {
    fontWeight: "bold",
    fontSize: "3em"
  }
}));

export default function PrimaryButton({
  count = 104,
  color,
  subLabel,
  label = "cong viec duoc thuc hien",
  ...props
}) {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      <div className={classes.count}>{count}</div>
      <div className={classes.label}>
        <div>{label}</div>
        {subLabel && <div className={classes.subLabel}>{subLabel}</div>}
      </div>
    </div>
  );
}
