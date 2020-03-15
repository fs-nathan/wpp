import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "5rem",
    justifyContent: "space-between",
    padding: "0 1rem",
    borderRadius: "0.3rem",
    border: "1px solid #f1f1f1"
  },
  circle: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
    width: "44px",
    height: "44px",
    borderRadius: "100%",
    textAlign: "center",
    fontWeight: "bold",
    border: "1px solid currentColor"
    // "&::after": {

    // }
  },
  circleBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    opacity: "0.2",
    background: "currentColor"
  },
  label: {
    fontSize: "1rem",
    color: "#545454",
    fontWeight: "bold"
  },
  right: {
    paddingLeft: "2rem",
    textAlign: "right"
  },
  count: {
    fontWeight: "bolder",
    fontSize: "1.4rem",
    marginBottom: "0.2rem"
  }
}));

export default function AnalyticButton({
  count = 104,
  color = "rgb(0, 156, 243)",
  label = "cong viec duoc thuc hien",
  circleText
}) {
  const classes = useStyles();
  return (
    <ButtonBase
      focusRipple
      className={classes.root}
      style={{ color }}
      focusVisibleClassName={classes.focusVisible}
    >
      <div className={classes.circle}>
        <div className={classes.circleBackground}></div>
        <div>{circleText}</div>
      </div>
      <div className={classes.right}>
        <div className={classes.count}>{count}</div>
        <div className={classes.label}>{label}</div>
      </div>
    </ButtonBase>
  );
}
