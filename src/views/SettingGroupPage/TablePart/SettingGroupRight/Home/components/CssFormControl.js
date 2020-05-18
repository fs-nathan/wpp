import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { useField } from "formik";
import React from "react";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { loginlineParams } from "views/JobPage/utils";
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
      {label && (
        <Typography gutterBottom>
          <b>{label}</b>
        </Typography>
      )}
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
export const BindedCssFormControl = ({ name, children, ...props }) => {
  const [field, meta] = useField({ name });
  const error = meta.error;
  return (
    <CssFormControl {...props} errorMessage={error}>
      {children(field, meta)}
    </CssFormControl>
  );
};
export const InputFormControl = ({ name, inputProps, ...props }) => {
  const [field, meta] = useField({ name });
  const error = meta.error;
  return (
    <CssFormControl {...props} errorMessage={error}>
      <TextField
        error={!!error}
        {...field}
        variant="outlined"
        fullWidth
        {...inputProps}
      ></TextField>
    </CssFormControl>
  );
};
export const MultilineInputFormControl = ({ name, ...props }) => {
  const [field, meta] = useField({ name });
  const error = meta.error;
  return (
    <CssFormControl {...props} errorMessage={error}>
      <TextField
        error={!!error}
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
export const GroupCheckBoxFormControl = ({
  options = emptyArray,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name });
  const error = meta.error;
  return (
    <CssFormControl {...props} errorMessage={error}>
      <FormGroup
        onChange={loginlineParams}
        className="comp_QuickViewFilter__FormGroup"
        {...field}
      >
        {options.map(({ label, value }) => (
          <FormControlLabel
            className="comp_QuickViewFilter__FormControlLabel"
            key={value}
            control={<Checkbox color="primary" name={value} />}
            label={label}
          />
        ))}
      </FormGroup>
    </CssFormControl>
  );
};
export const RadioGroupFormControl = ({
  name,
  options = emptyArray,
  ...props
}) => {
  const [field, meta] = useField({ name });
  const { value, ...rest } = field;
  const error = meta.error;
  return (
    <CssFormControl {...props} errorMessage={error}>
      <RadioGroup aria-label={name} name={name} value={"" + value} {...rest}>
        {options.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            value={"" + value}
            control={<Radio color="primary" />}
            label={label}
          />
        ))}
      </RadioGroup>
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
  const [field, meta] = useField({ name });
  const error = meta.error;
  return (
    <CssFormControl label={label} {...props} errorMessage={error}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <AddButton onClick={onClick} label={addLabel}></AddButton>
        {field.value && <Avatar src={field.value}></Avatar>}
      </Box>
    </CssFormControl>
  );
};

export default CssFormControl;
