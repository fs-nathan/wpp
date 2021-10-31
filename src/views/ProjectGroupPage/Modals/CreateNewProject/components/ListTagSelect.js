import { makeStyles } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export const ListTagSelect = ({ title = "Thêm lựa chọn" }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapperAdd}>
        <AddIcon sx={{ fontSize: 18 }} />
        <p> {title}</p>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  wrapperAdd: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
  },
});
