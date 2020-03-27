import React from "react";
import { colors } from "../contants/attrs";
import InlineBadge from "./InlineBadge";

const colorMap = {
  default: colors.task_waiting,
  "0": colors.task_hight_priority,
  "1": colors.task_medium_priority,
  "3": colors.task_low_priority
};
function InlinePiorityBadge({ status, ...props }) {
  return (
    <InlineBadge color={colorMap[status] || colorMap.default} {...props} />
  );
}

export default InlinePiorityBadge;
