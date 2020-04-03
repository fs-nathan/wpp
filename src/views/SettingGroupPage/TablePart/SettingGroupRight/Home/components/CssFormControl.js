import { Avatar, Box, TextField, Typography } from "@material-ui/core";
import { useField } from "formik";
import React from "react";
import AddButton from "./AddButton";
import "./CssFormControl.css";

export const CssFormControl = ({
  children,
  label,
  errorMessage,
  color,
  textHelper,
  ...props
}) => {
  return (
    <div>
      <Typography gutterBottom>{label}</Typography>
      {children}
      {textHelper && (
        <Typography className="comp_CssFormControl__textHelper">
          {textHelper}
        </Typography>
      )}
      {errorMessage && (
        <Typography className="comp_CssFormControl__error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
export const InputFormControl = ({ name, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const error = meta.touched && meta.error;
  return (
    <CssFormControl {...props} errorMessage={meta.touched && meta.error}>
      <TextField
        error={error}
        {...field}
        variant="outlined"
        fullWidth
      ></TextField>
    </CssFormControl>
  );
};
export const MultilineInputFormControl = ({ name, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const error = meta.touched && meta.error;
  return (
    <CssFormControl {...props} errorMessage={meta.touched && meta.error}>
      <TextField
        error={error}
        {...field}
        multiline
        rowsMax={6}
        rows={3}
        variant="outlined"
        fullWidth
      ></TextField>
    </CssFormControl>
  );
};
export const SelecIconInputFormControl = ({
  name,
  label,
  addLabel,
  icon,
  onClick,
  ...props
}) => {
  const [field, meta, helpers] = useField({ name });
  const error = meta.touched && meta.error;
  return (
    <CssFormControl
      label={label}
      {...props}
      errorMessage={meta.touched && meta.error}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <AddButton onClick={onClick} label={addLabel}></AddButton>
        {field.value && <Avatar src={field.value}></Avatar>}
      </Box>
    </CssFormControl>
  );
};
export default CssFormControl;
