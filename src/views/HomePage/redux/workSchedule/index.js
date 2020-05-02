import { combineReducers, createAction } from "@reduxjs/toolkit";
import { encodeQueryData } from "views/JobPage/utils";
import {
  createAsyncAction,
  createSimpleAsyncReducer,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "workSchedule";
const types = {
  LIST_SCHEDULE: `workSchedule.LIST_SCHEDULE`,
  LIST_WEEK: `workSchedule.LIST_WEEK`,
};

const listScheduleUpdated = createAction(types.LIST_SCHEDULE);
const listWeekUpdated = createAction(types.LIST_WEEK);
//
const initialScheduleList = {
  state: true,
  data: [
    {
      id: "5e9421a94d765b19bca33873",
      title: "Liên Hoan",
      content: "Họp bàn về chính sách abc",
      user_create_avatar:
        "https://appapi.workplus.vn/avatars/1586430794068-filename",
      user_create_name: "Demo Workplus",
      created_at: "13/04/2020",
      members_assign: [
        {
          id: "5e8ef8a707cb4c341c6b7971",
          avatar: "https://appapi.workplus.vn/avatars/1586429707259-filename",
          name: "Thái Khắc Điệp",
        },
        {
          id: "5e9001250dc7457b5025e87d",
          avatar: "https://appapi.workplus.vn/avatars/1586495968654-filename",
          name: "Thành Nguyễn",
        },
      ],
      week: "19",
      year: "2020",
      label_week: "19/2020",
      from_time: "04/05/2020",
      to_time: "10/05/2020",
    },
  ],
  paging: {
    total_page: 1,
    page: 1,
  },
};

const {
  load: loadListSchedule,
  selector: listScheduleSelector,
  reducer: listScheduleReducer,
} = createSimpleAsyncReducer(
  // start_date: String format YYYY-MM-DD required
  // end_date: String format YYYY-MM-DD required
  ({ start_date = "2020-01-01", end_date = "2020-05-01" } = {}) =>
    createAsyncAction({
      config: {
        url: `/work-schedule/get-list?${encodeQueryData({
          start_date,
          end_date,
        })}`,
      },
    }),
  listScheduleUpdated,
  initialScheduleList
);
//
const initialWeekList = {
  state: true,
  data: [
    {
      week: 1,
      start: "30/12/2019",
      end: "05/02/2020",
    },
    {
      week: 2,
      start: "06/01/2020",
      end: "12/01/2020",
    },
    {
      week: 3,
      start: "13/01/2020",
      end: "19/01/2020",
    },
    {
      week: 4,
      start: "20/01/2020",
      end: "26/01/2020",
    },
    {
      week: 5,
      start: "27/01/2020",
      end: "02/02/2020",
    },
    {
      week: 6,
      start: "03/02/2020",
      end: "09/02/2020",
    },
    {
      week: 7,
      start: "10/02/2020",
      end: "16/02/2020",
    },
    {
      week: 8,
      start: "17/02/2020",
      end: "23/02/2020",
    },
    {
      week: 9,
      start: "24/02/2020",
      end: "01/03/2020",
    },
    {
      week: 10,
      start: "02/03/2020",
      end: "08/03/2020",
    },
    {
      week: 11,
      start: "09/03/2020",
      end: "15/03/2020",
    },
    {
      week: 12,
      start: "16/03/2020",
      end: "22/03/2020",
    },
    {
      week: 13,
      start: "23/03/2020",
      end: "29/03/2020",
    },
    {
      week: 14,
      start: "30/03/2020",
      end: "06/05/2020",
    },
    {
      week: 15,
      start: "06/04/2020",
      end: "12/04/2020",
    },
    {
      week: 16,
      start: "13/04/2020",
      end: "19/04/2020",
    },
    {
      week: 17,
      start: "20/04/2020",
      end: "26/04/2020",
    },
    {
      week: 18,
      start: "27/04/2020",
      end: "03/05/2020",
    },
    {
      week: 19,
      start: "04/05/2020",
      end: "10/05/2020",
    },
    {
      week: 20,
      start: "11/05/2020",
      end: "17/05/2020",
    },
    {
      week: 21,
      start: "18/05/2020",
      end: "24/05/2020",
    },
    {
      week: 22,
      start: "25/05/2020",
      end: "31/05/2020",
    },
    {
      week: 23,
      start: "01/06/2020",
      end: "07/06/2020",
    },
    {
      week: 24,
      start: "08/06/2020",
      end: "14/06/2020",
    },
    {
      week: 25,
      start: "15/06/2020",
      end: "21/06/2020",
    },
    {
      week: 26,
      start: "22/06/2020",
      end: "28/06/2020",
    },
    {
      week: 27,
      start: "29/06/2020",
      end: "04/08/2020",
    },
    {
      week: 28,
      start: "06/07/2020",
      end: "12/07/2020",
    },
    {
      week: 29,
      start: "13/07/2020",
      end: "19/07/2020",
    },
    {
      week: 30,
      start: "20/07/2020",
      end: "26/07/2020",
    },
    {
      week: 31,
      start: "27/07/2020",
      end: "02/08/2020",
    },
    {
      week: 32,
      start: "03/08/2020",
      end: "09/08/2020",
    },
    {
      week: 33,
      start: "10/08/2020",
      end: "16/08/2020",
    },
    {
      week: 34,
      start: "17/08/2020",
      end: "23/08/2020",
    },
    {
      week: 35,
      start: "24/08/2020",
      end: "30/08/2020",
    },
    {
      week: 36,
      start: "31/08/2020",
      end: "07/10/2020",
    },
    {
      week: 37,
      start: "07/09/2020",
      end: "13/09/2020",
    },
    {
      week: 38,
      start: "14/09/2020",
      end: "20/09/2020",
    },
    {
      week: 39,
      start: "21/09/2020",
      end: "27/09/2020",
    },
    {
      week: 40,
      start: "28/09/2020",
      end: "04/10/2020",
    },
    {
      week: 41,
      start: "05/10/2020",
      end: "11/10/2020",
    },
    {
      week: 42,
      start: "12/10/2020",
      end: "18/10/2020",
    },
    {
      week: 43,
      start: "19/10/2020",
      end: "25/10/2020",
    },
    {
      week: 44,
      start: "26/10/2020",
      end: "01/11/2020",
    },
    {
      week: 45,
      start: "02/11/2020",
      end: "08/11/2020",
    },
    {
      week: 46,
      start: "09/11/2020",
      end: "15/11/2020",
    },
    {
      week: 47,
      start: "16/11/2020",
      end: "22/11/2020",
    },
    {
      week: 48,
      start: "23/11/2020",
      end: "29/11/2020",
    },
    {
      week: 49,
      start: "30/11/2020",
      end: "05/01/2021",
    },
    {
      week: 50,
      start: "07/12/2020",
      end: "13/12/2020",
    },
    {
      week: 51,
      start: "14/12/2020",
      end: "20/12/2020",
    },
    {
      week: 52,
      start: "21/12/2020",
      end: "27/12/2020",
    },
    {
      week: 53,
      start: "28/12/2020",
      end: "03/01/2021",
    },
  ],
};

const {
  load: loadListWeek,
  selector: listWeekSelector,
  reducer: listWeekReducer,
} = createSimpleAsyncReducer(
  // year: Int required
  ({ year = "2020" } = {}) =>
    createAsyncAction({
      config: {
        url: `/work-schedule/get-list-week?${encodeQueryData({
          year,
        })}`,
      },
    }),
  listWeekUpdated,
  initialWeekList
);
export const workScheduleModule = {
  selectors: { listScheduleSelector, listWeekSelector },
  actions: { loadListSchedule, loadListWeek },
  key: rootPath,
  reducer: combineReducers({
    [types.LIST_SCHEDULE]: listScheduleReducer,
    [types.LIST_WEEK]: listWeekReducer,
  }),
};
