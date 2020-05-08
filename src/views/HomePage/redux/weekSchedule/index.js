import { combineReducers, createAction } from "@reduxjs/toolkit";
import {
  createAsyncAction,
  createSimpleAsyncReducer,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "weekSchedule";
const types = {
  LIST_OF_WEEK_NOW: `workSchedule.LIST_OF_WEEK_NOW`,
};

const listOfWeekNowUpdated = createAction(types.LIST_OF_WEEK_NOW);
//
const initialListOfWeekNow = {
  state: true,
  data: [
    {
      date: "03/05/2020",
      date_original: "2020-05-03",
      day_of_week: "Sunday",
      is_date_now: false,
      schedules: [],
    },
    {
      date: "04/05/2020",
      date_original: "2020-05-04",
      day_of_week: "Monday",
      is_date_now: true,
      schedules: [
        {
          id: "5ead3db9738ab072c01aecee",
          time: "08:30",
          title: "Test lịch tuần 19",
          content: "Test lịch tuần 19",
        },
      ],
    },
    {
      date: "05/05/2020",
      date_original: "2020-05-05",
      day_of_week: "Tuesday",
      is_date_now: false,
      schedules: [],
    },
    {
      date: "06/05/2020",
      date_original: "2020-05-06",
      day_of_week: "Wednesday",
      is_date_now: false,
      schedules: [],
    },
    {
      date: "07/05/2020",
      date_original: "2020-05-07",
      day_of_week: "Thursday",
      is_date_now: false,
      schedules: [],
    },
    {
      date: "08/05/2020",
      date_original: "2020-05-08",
      day_of_week: "Friday",
      is_date_now: false,
      schedules: [],
    },
    {
      date: "09/05/2020",
      date_original: "2020-05-09",
      day_of_week: "Saturday",
      is_date_now: false,
      schedules: [],
    },
  ],
};

const {
  load: loadListSchedule,
  selector: listOfWeekNowSelector,
  reducer: listOfWeekNowReducer,
} = createSimpleAsyncReducer(
  // start_date: String format YYYY-MM-DD required
  // end_date: String format YYYY-MM-DD required
  () =>
    createAsyncAction({
      config: {
        url: `/work-schedule/list-of-week-now`,
      },
    }),
  listOfWeekNowUpdated,
  initialListOfWeekNow
);
//

export const weekScheduleModule = {
  selectors: { listOfWeekNowSelector },
  actions: { loadListSchedule },
  key: rootPath,
  reducer: combineReducers({
    [types.LIST_SCHEDULE]: listOfWeekNowReducer,
  }),
};
