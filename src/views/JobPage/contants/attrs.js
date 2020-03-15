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
export const labels = {
  pageTitle: "công việc của bạn",
  task_of_me: "static.task_of_me",
  task_waiting: "waiting",
  task_doing: "doing",
  task_complete: "complete",
  task_stop: "stop",
  task_will_expire: "will_expire",
  task_expired: "expired",
  task_hight_priority: "hight",
  task_medium_priority: "medium",
  task_low_priority: "low",
  task_me_assign: "static.task_me_assign",
  task_assign_to_me: "static.task_assign_to_me",
  task_me_offer: "static.task_me_offer",
  roles: "static.roles",
  overview: "overview",
  due: "due",
  mission: "mission",
  mission_giving: "giving",
  mission_given: "given",
  self_giving: "self giving",
  role: "role",
  role_doing: "doing",
  role_monitor: "monitor",
  role_coordination: "coordination"
};
export const colors = {
  task_of_me: cls.orange[0],
  task_waiting: cls.orange[0],
  task_doing: cls.blue[0],
  task_complete: cls.green[0],
  task_stop: "static.task_stop",
  task_will_expire: "static.task_will_expire",
  task_expired: cls.pink[0],
  task_hight_priority: cls.pink[0],
  task_medium_priority: cls.orange[0],
  task_low_priority: cls.green[0],
  task_me_assign: "static.task_me_assign",
  task_assign_to_me: "static.task_assign_to_me",
  task_me_offer: "static.task_me_offer"
};
