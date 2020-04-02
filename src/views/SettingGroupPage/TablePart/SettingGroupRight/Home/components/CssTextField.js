import { TextField } from "@material-ui/core";
import React from "react";
import "./CssTextField.css";
export const CssTextField = ({ ...props }) => {
  return (
    <TextField
      InputProps={{
        className: "comp_CssTextField"

        // usually you dont need className, the classes object will be sufficient
        //  but wanted to show that you can also use it (this will put your class on div of the InputBase)
      }}
      InputLabelProps={{ className: "comp_CssTextField__label", shrink: true }}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};
