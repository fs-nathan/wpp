// const statistic = {
//   state: true,
//   static: {
//     task_of_me: 0,
//     task_waiting: 0,
//     task_doing: 0,
//     task_complete: 0,
//     task_stop: 0,
//     task_will_expire: 0,
//     task_expired: 0,
//     task_hight_priority: 0,
//     task_medium_priority: 0,
//     task_low_priority: 0,
//     task_me_assign: 0,
//     task_assign_to_me: 0,
//     task_me_offer: 0,
//     roles: []
//   }

import cls from "../../../helpers/colorPalette";

// };
export const statistic = {
  success: "state",
  error: "msg",
  task_of_me: "static.task_of_me",
  task_waiting: "static.task_waiting",
  task_doing: "static.task_doing",
  task_complete: "static.task_complete",
  task_stop: "static.task_stop",
  task_will_expire: "static.task_will_expire",
  task_expired: "static.task_expired",
  task_hight_priority: "static.task_hight_priority",
  task_medium_priority: "static.task_medium_priority",
  task_low_priority: "static.task_low_priority",
  task_me_assign: "static.task_me_assign",
  task_assign_to_me: "static.task_assign_to_me",
  task_me_offer: "static.task_me_offer",
  roles: "static.roles"
};
export const recent = {
  success: "state",
  error: "msg",
  summary: "summary",
  waiting: "summary.waiting",
  doing: "summary.doing",
  complete: "summary.complete",
  expired: "summary.expired",
  stop: "summary.stop",
  updated: "summary.updated",
  tasks: "tasks"
};
export const taskAtrrs = {
  id: "id",
  project_id: "project_id",
  name: "name",
  user_create_avatar: "user_create.avatar",
  user_create_name: "user_create.name",
  created_at: "created_at",
  status_code: "status_code",
  status_name: "status_name",
  complete: "complete",
  number_member: "number_member",
  duration_unit: "duration_unit",
  duration_value: "duration_value",
  time_end: "time_end",
  haveNewChat: "haveNewChat"
};
export const labels = {
  pageTitle: "Công việc của bạn",
  task_of_me: "Công việc của bạn",
  task_waiting: "Đang chờ",
  task_doing: "Đang làm",
  task_complete: "Hoàn thành",
  task_stop: "Kết thúc",
  task_will_expire: "Sắp hết hạn",
  task_expired: "Hết hạn",
  task_hight_priority: "Cao",
  task_medium_priority: "Trung bình",
  task_low_priority: "Thấp",
  task_me_assign: "Giao viêc cho nhân viên",
  task_assign_to_me: "Được giao việc",
  task_me_offer: "Tự đề xuất công việc",
  roles: "Vai trò",
  overview: "Tổng quan",
  due: "Đến hạn",
  mission: "Nhiệm vụ",
  mission_giving: "Giao viêc cho nhân viên",
  mission_given: "Được giao việc",
  self_giving: "Tự đề xuất công việc",
  role: "Vai trò",
  role_doing: "Thực hiện",
  role_monitor: "Giám sát",
  role_coordination: "Phối hợp"
};

// [{
//   color: '#ff9800',
//   title: 'Công việc đang chờ',
//   value: get(group.group, 'statistics.task_waiting', 0),
// }, {
//   color: '#03a9f4',
//   title: 'Công việc đang làm',
//   value: get(group.group, 'statistics.task_doing', 0),
// }, {
//   color: '#f44336',
//   title: 'Công việc quá hạn',
//   value: get(group.group, 'statistics.task_expired', 0),
// }, {
//   color: '#03c30b',
//   title: 'Công việc hoàn thành',
//   value: get(group.group, 'statistics.task_complete', 0),
// }, {
//   color: '#20194d',
//   title: 'Công việc ẩn',
//   value: get(group.group, 'statistics.task_hidden', 0),
// }, {
//   color: '#000',
//   title: 'Công việc dừng',
//   value: get(group.group, 'statistics.task_stop', 0),
// }]
export const colors = {
  task_of_me: cls.orange[0],
  task_waiting: "#ff9800",
  task_doing: "#03a9f4",
  task_complete: "#03c30b",
  task_stop: "#000",
  task_will_expire: "static.task_will_expire",
  task_expired: "#f44336",
  task_hight_priority: cls.pink[0],
  task_medium_priority: cls.orange[0],
  task_low_priority: cls.green[0],
  task_me_assign: "static.task_me_assign",
  task_assign_to_me: "static.task_assign_to_me",
  task_me_offer: "static.task_me_offer"
};
