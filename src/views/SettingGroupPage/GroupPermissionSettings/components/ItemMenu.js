import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { emptyArray } from "views/JobPage/contants/defaultValue";
export const ItemMenu = ({
  menuAnchor,
  onClose,
  onItemClick,
  keepMounted,
  options = emptyArray,
  ...props
}) => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={menuAnchor}
      keepMounted={keepMounted}
      open={Boolean(menuAnchor)}
      onClose={onClose}
      transformOrigin={{
        vertical: -30,
        horizontal: "right",
      }}
      {...props}
    >
      {options.map(({ key, label }) => (
        <MenuItem
          key={key}
          onClick={(evt) => {
            onItemClick(key);
            onClose();
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: label,
            }}
          ></div>
        </MenuItem>
      ))}
    </Menu>
  );
};
