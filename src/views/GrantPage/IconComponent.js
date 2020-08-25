import { IconButton } from "@material-ui/core";
import Icon from "@mdi/react";
import React from "react";

const IconComponent = ({ path, title, size, onClick }) => {
  return (
    <React.Fragment>
      <div className="gantt-right-header__wapper">
        <IconButton
          onClick={(e) => onClick(e)}
          className="MuiButtonBase-root MuiButton-root MuiButton-text comp_CustomTable_HeaderButtonGroup___button MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedText MuiButtonGroup-groupedTextHorizontal MuiButtonGroup-groupedText MuiButton-textSizeSmall MuiButton-sizeSmall"
          aria-controls="simple-menu"
          aria-haspopup="true"
          size="small"
        >
          <div>
            <Icon
              style={{ fill: "rgba(0, 0, 0, 0.54)" }}
              path={path}
              size={size || 1}
            />
          </div>
          <span>{title}</span>
        </IconButton>
      </div>
    </React.Fragment>
  );
};
export default IconComponent;
