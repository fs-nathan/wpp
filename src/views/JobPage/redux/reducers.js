import { merge } from "../utils";
import { TASK_OVERVIEW_RECENT, TASK_OVERVIEW_STATISTIC } from "./types";

// export const initialState = {
//   [TASK_OVERVIEW_STATISTIC]: {
//     state: false,
//     update: 0,
//     static: {
//       task_of_me: 0,
//       task_waiting: 0,
//       task_doing: 0,
//       task_complete: 0,
//       task_stop: 0,
//       task_will_expire: 0,
//       task_expired: 0,
//       task_hight_priority: 0,
//       task_medium_priority: 0,
//       task_low_priority: 0,
//       task_me_assign: 0,
//       task_assign_to_me: 0,
//       task_me_offer: 0,
//       roles: []
//     }
//   },
//   [TASK_OVERVIEW_RECENT]: {
//     state: false,
//     summary: { waiting: 5, doing: 1, complete: 0, expired: 6, stop: 1 },
//     tasks: [
//       {
//         id: "5e6bc31cab3161f136e28c8e",
//         project_id: "5e634565cb73c30a19d9baf3",
//         name: "Công việc 1",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 0,
//         status_name: "Waiting",
//         complete: 0,
//         number_member: 1,
//         duration_unit: "Hours",
//         duration_value: 0,
//         time_end: "Invalid date",
//         haveNewChat: false
//       },
//       {
//         id: "5e6bc376ab3161f136e28c92",
//         project_id: "5e634565cb73c30a19d9baf3",
//         name: "Công việc 2",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 0,
//         status_name: "Waiting",
//         complete: 0,
//         number_member: 1,
//         duration_unit: "Hours",
//         duration_value: 0,
//         time_end: "Invalid date",
//         haveNewChat: false
//       },
//       {
//         id: "5e63097ccb73c30a19d9baea",
//         project_id: "5e5f76527c8297d8d735782e",
//         name: "Bảo trì bảo dưỡng hệ thống tòa nhà",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 3,
//         status_name: "Expired 8 days",
//         complete: 62,
//         number_member: 3,
//         duration_unit: "Hours",
//         duration_value: 10,
//         time_end: "07/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e5f76527c8297d8d7357834",
//         project_id: "5e5f76527c8297d8d735782e",
//         name: "Lập dự án đầu tư",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 3,
//         status_name: "Expired 1 hours",
//         complete: 0,
//         number_member: 4,
//         duration_unit: "Days",
//         duration_value: 0,
//         time_end: "16/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e5f76527c8297d8d7357833",
//         project_id: "5e5f76527c8297d8d735782e",
//         name: "Phân tích dự án đầu tư",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 3,
//         status_name: "Expired 9 days",
//         complete: 0,
//         number_member: 4,
//         duration_unit: "Days",
//         duration_value: 0,
//         time_end: "07/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e5e25061e1763bff85c0dd4",
//         project_id: "5e5e22771e1763bff85c0dcd",
//         name: "Lập dự án đầu tư",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 4,
//         status_name: "Stop",
//         complete: 25,
//         number_member: 1,
//         duration_unit: "Days",
//         duration_value: 6,
//         time_end: "",
//         haveNewChat: false
//       },
//       {
//         id: "5e5e25f41e1763bff85c0dd8",
//         project_id: "5e5e22771e1763bff85c0dcd",
//         name: "Khai trương tòa nhà",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 1,
//         status_name: "Doing",
//         complete: 43,
//         number_member: 3,
//         duration_unit: "Days",
//         duration_value: 2,
//         time_end: "17/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e5e24251e1763bff85c0dd2",
//         project_id: "5e5e22771e1763bff85c0dcd",
//         name: "Phân tích dự án đầu tư",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 3,
//         status_name: "Expired 11 days",
//         complete: 0,
//         number_member: 4,
//         duration_unit: "Days",
//         duration_value: 0,
//         time_end: "04/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e6bc357ab3161f136e28c90",
//         project_id: "5e5f76527c8297d8d735782e",
//         name: "Cv1",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 0,
//         status_name: "Waiting",
//         complete: 0,
//         number_member: 1,
//         duration_unit: "Days",
//         duration_value: 9,
//         time_end: "22/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e6babb9308cbbec75063242",
//         project_id: "5e6204b544f49bfc470c7f77",
//         name: "Cv1",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 0,
//         status_name: "Waiting",
//         complete: 0,
//         number_member: 1,
//         duration_unit: "Hours",
//         duration_value: 0,
//         time_end: "Invalid date",
//         haveNewChat: false
//       },
//       {
//         id: "5e5e25c01e1763bff85c0dd6",
//         project_id: "5e5e22771e1763bff85c0dcd",
//         name: "Thi công móng hầm",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 0,
//         status_name: "Waiting",
//         complete: 0,
//         number_member: 4,
//         duration_unit: "Days",
//         duration_value: 0,
//         time_end: "30/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e5f76527c8297d8d7357835",
//         project_id: "5e5f76527c8297d8d735782e",
//         name: "Thi công móng hầm",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 3,
//         status_name: "Expired 2 days",
//         complete: 0,
//         number_member: 4,
//         duration_unit: "Days",
//         duration_value: 0,
//         time_end: "14/03/2020",
//         haveNewChat: false
//       },
//       {
//         id: "5e5f76527c8297d8d7357836",
//         project_id: "5e5f76527c8297d8d735782e",
//         name: "Khai trương tòa nhà",
//         user_create: {
//           avatar:
//             "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//           name: "Thành Nguyễn"
//         },
//         created_at: "16/03/2020",
//         status_code: 3,
//         status_name: "Expired 1 days",
//         complete: 0,
//         number_member: 4,
//         duration_unit: "Days",
//         duration_value: 0,
//         time_end: "15/03/2020",
//         haveNewChat: false
//       }
//     ]
//   }
// };
export const initialState = {
  [TASK_OVERVIEW_STATISTIC]: {
    state: false,
    updated: 0,
    static: {
      task_of_me: 0,
      task_waiting: 0,
      task_doing: 0,
      task_complete: 0,
      task_stop: 0,
      task_will_expire: 0,
      task_expired: 0,
      task_hight_priority: 0,
      task_medium_priority: 0,
      task_low_priority: 0,
      task_me_assign: 0,
      task_assign_to_me: 0,
      task_me_offer: 0,
      roles: []
    }
  },
  [TASK_OVERVIEW_RECENT]: {
    state: false,
    summary: { waiting: 5, doing: 1, complete: 0, expired: 6, stop: 1 },
    updated: 0,
    tasks: []
  }
};
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case TASK_OVERVIEW_STATISTIC:
    case TASK_OVERVIEW_RECENT:
      return merge({}, state, {
        [action.type]: { ...action.payload, updated: Date.now() }
      });
    default:
      return state;
  }
}

export default taskReducer;
