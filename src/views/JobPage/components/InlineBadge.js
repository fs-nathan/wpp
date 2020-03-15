import { makeStyles } from "@material-ui/core";
import Icon from "@mdi/react";
import React from "react";
import CustomBadge from "../../../components/CustomBadge";
const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    lineHeight: "1.2"
  },
  icon: {
    verticalAlign: "top",
    width: "1em"
  }
}));
function InlineBadge({ icon, children, ...props }) {
  const classes = useStyles();
  return (
    <CustomBadge className={classes.root} {...props}>
      {icon && (
        <Icon className={classes.icon} color={"currentColor"} path={icon} />
      )}
      {children}
    </CustomBadge>
  );
}

export default InlineBadge;
