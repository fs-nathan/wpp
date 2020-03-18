import React from "react";
import { colors } from "../contants/attrs";
import InlineBadge from "./InlineBadge";

const statusColorMap = {
  "0": colors.task_waiting,
  "1": colors.task_doing,
  "3": colors.task_expired,
  "4": colors.task_stop,
  "5": colors.task_complete
};
function InlineStatusBadge({ status, ...props }) {
  return <InlineBadge color={statusColorMap[status]} {...props} />;
}

export default InlineStatusBadge;
