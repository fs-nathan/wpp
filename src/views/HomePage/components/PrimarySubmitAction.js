import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { bgColorSelector } from "components/LoadingOverlay/selectors";
import { FormikContext } from "formik";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
export const usePrimarySubmitActionStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
export const PrimarySubmitAction = ({ loading, ...props }) => {
  const { color } = useSelector(bgColorSelector);
  const { handleSubmit, isValid } = useContext(FormikContext);
  const classes = usePrimarySubmitActionStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        disabled={!isValid || loading}
        onClick={handleSubmit}
        className="common-btn-modal"
        style={!(!isValid || loading) ? { color } : {}}
        {...props}
      ></Button>
      {loading && (
        <CircularProgress
          size={24}
          style={{ color }}
          className={classes.buttonProgress}
        />
      )}
    </div>
  );
};
