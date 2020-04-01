import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { JobPageContext } from "../JobPageContext";
import "./QuickView.css";

function QuickView({ title, children, bottom }) {
  const { handleClose } = useContext(JobPageContext);

  return (
    // <ClickAwayListener onClickAway={handleClose}>
    <div className="comp_QuickViewWrapper">
      <div className="comp_QuickViewHeader">
        <div className="comp_QuickViewHeaderLeft">{title}</div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton onClick={handleClose}>
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
