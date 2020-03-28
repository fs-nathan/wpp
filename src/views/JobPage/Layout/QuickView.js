import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { JobPageContext } from "../JobPageContext";

export const CloseButton = () => {
  const { setQuickTask } = useContext(JobPageContext);
  return (
    <IconButton onClick={() => setQuickTask(undefined)}>
      <CloseIcon />
    </IconButton>
  );
};
function QuickView({ title, children, bottom }) {
  return (
    <div className="comp_QuickViewWrapper">
      <div className="comp_QuickViewHeader">
        <div className="comp_QuickViewHeaderLeft">{title}</div>
        <div className="comp_QuickViewHeaderRight">
          <CloseButton />
        </div>
      </div>
      <Scrollbars styled={{ flex: 1 }}>
        <div className="comp_QuickViewBody">{children}</div>
      </Scrollbars>

      {bottom && <div className="comp_QuickViewFooter">{bottom}</div>}
    </div>
  );
}

export default QuickView;
