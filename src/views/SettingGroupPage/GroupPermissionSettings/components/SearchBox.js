import { InputBase, makeStyles } from "@material-ui/core";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import classnames from "classnames";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
    position: "relative",
    lineHeight: 1.3,
    height: "35px",
  },
  icon: {
    position: "absolute",
    top: "7px",
    left: "7px",
    zIndex: "10",
  },
  searchBoxBase: {
    position: "relative",
    top: "0",
    left: "0",
    padding: ".175rem .65rem .175rem 2.35rem",
    fontWeight: "400",
    lineHeight: "1.3",
    height: "35px",
    backgroundClip: "padding-box",
    backgroundColor: "#f6f6f6",
    borderRadius: "999px",
    width: "100%",
  },
});

function SearchBox({ className, ...rest }) {
  const classes = useStyles();
  return (
    <div classes={classes} className={className}>
      <Icon
        classes={classes.icon}
        path={mdiMagnify}
        size={1}
        color="rgba(0,0,0,.3)"
      />
      <InputBase classes={classes.searchBoxBase} {...rest} />
    </div>
  );
}

const useStyles2 = makeStyles({
  container: {
    width: "100%",
    position: "relative",
    lineHeight: 1.3,
  },
  icon: {
    position: "absolute",
    top: "15px",
    left: "10px",
    zIndex: "10",
  },
  searchBoxBase: {
    position: "relative",
    top: "0",
    height: "50px",
    left: "0",
    padding: ".175rem .65rem .175rem 40px",
    fontWeight: "400",
    lineHeight: "1.3",
    backgroundClip: "padding-box",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    borderRadius: "4px",
    width: "100%",
  },
});
export function RoundSearchBox({ className, ...rest }) {
  const classes = useStyles2();
  return (
    <div className={classnames(classes.container, className)}>
      <Icon
        className={classes.icon}
        path={mdiMagnify}
        size={1}
        color="rgba(0,0,0,.3)"
      />
      <InputBase className={classes.searchBoxBase} {...rest} />
    </div>
  );
}
export default SearchBox;
