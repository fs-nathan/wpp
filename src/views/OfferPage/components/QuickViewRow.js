import React from "react";
import "./QuickViewRow.css";
export const QuickViewRow = ({ title, children, actions }) => {
  return (
    <div className="comp_QuickViewRow__wrapper">
      <div className="comp_QuickViewRow__header">
        <div className="comp_QuickViewRow__title">{title}</div>
        {actions}
      </div>
      <div className="comp_QuickViewRow__body">{children}</div>
    </div>
  );
};
