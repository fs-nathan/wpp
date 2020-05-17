import { Drawer } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import QuickViewTaskDetailContainer from "./QuickViewTaskDetail";
const sample = {
  id: "5e9dcfe4fc288bb413acaad8",
  project: "5e9dceb4fc288bb413acaad6",
  name: "Công việc 2",
  description: "",
  group_task: null,
  group_task_name: "Default group",
  complete: 0,
  updated_complete_at: "",
  is_ghim: false,
  is_turn_of_notification: false,
  complete_with_time: 0,
  state_code: 0,
  state_name: "Waiting",
  priority_code: 0,
  priority_name: "Hight",
  assign_code: 0,
  assign_name: "Assigned",
  duration_value: 0,
  duration_unit: "hours",
  time_implement: 0,
  start_time: "",
  start_date: "",
  end_time: "",
  end_date: "",
  total_subtask: 1,
  total_subtask_complete: 0,
  total_remind: 0,
  total_file: 0,
  total_img: 1,
  total_link: 0,
  total_location: 0,
  total_offer: 0,
  total_offer_approved: 0,
  total_command: 0,
  members: [
    {
      id: "5e9dafd0fc288bb413acaab1",
      name: "WorkPlus Demo",
      avatar: "https://appapi.workplus.vn/avatars/1587394163666-filename",
      roles: [],
      position: "",
      room: "Default group",
    },
    {
      id: "5e9e6de71debafe22ffea4a5",
      name: "Nguyễn Hữu Thành",
      avatar: "https://appapi.workplus.vn/images_default/avatar.png",
      roles: [],
      position: "",
      room: "Default group",
    },
    {
      id: "5e9daa565575e7b376174710",
      name: "Thái Khắc Điệp",
      avatar: "https://appapi.workplus.vn/avatars/1587392153510-filename",
      roles: [],
      position: "",
      room: "Default group",
    },
  ],
  user_create: {
    id: "5e9dafd0fc288bb413acaab1",
    name: "WorkPlus Demo",
    avatar: "https://appapi.workplus.vn/avatars/1587394163666-filename",
    roles: [],
    position: "",
    room: "Default group",
  },
  date_create: "20/04/2020",
  permissions: {
    view_task: true,
    update_task: true,
    delete_task: true,
    stop_task: true,
    update_complete: true,
    update_duration: true,
    manage_member: true,
    manage_chat: true,
    manage_sub_task: true,
    manage_remind: true,
    manage_offer: true,
    manage_command_decision: true,
  },
};
const QuickViewTaskDetailDrawer = ({
  defaultTask = sample,
  onClose,
  taskId,
  className,
  showHeader,
  ...props
}) => {
  const open = !!taskId;
  return (
    <Drawer
      className={classnames("comp_JobPageLayout__drawer", className)}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: `comp_JobPageLayout__drawerPaper ${
          !showHeader
            ? "gantt__comp_JobPageLayout__drawerPaper__showHeader"
            : "gantt__comp_JobPageLayout__drawerPaper"
        }`,
      }}
      onClose={onClose}
      {...props}
    >
      <QuickViewTaskDetailContainer
        taskId={taskId}
        onClose={onClose}
        defaultTaskDetail={defaultTask}
      />
    </Drawer>
  );
};
export default QuickViewTaskDetailDrawer;
