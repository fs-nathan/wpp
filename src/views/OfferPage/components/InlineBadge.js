import Icon from "@mdi/react";
import React from "react";
import CustomBadge from "../../../components/CustomBadge";
import "./InlineBadge.css";
function InlineBadge({ icon, children, ...props }) {
  return (
    <CustomBadge className="comp_InlineBadge__wrap" {...props}>
      {icon && (
        <Icon
          className="comp_InlineBadge__icon"
          color={"currentColor"}
          path={icon}
        />
      )}
      {children}
    </CustomBadge>
  );
}

export default InlineBadge;
