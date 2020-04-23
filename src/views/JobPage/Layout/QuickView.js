import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./QuickView.css";

function QuickView({ title, onClose, children, bottom }) {
  return (
    // <ClickAwayListener onClickAway={handleClose}>
    <div className="comp_QuickViewWrapper">
      <div className="comp_QuickViewHeader">
        <div className="comp_QuickViewHeaderLeft">{title}</div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <Scrollbars styled={{ flex: 1 }}>
        <div className="comp_QuickViewBody">{children}</div>
      </Scrollbars>

      {bottom && <div className="comp_QuickViewFooter">{bottom}</div>}
    </div>
    // </ClickAwayListener>
  );
}

export default QuickView;
