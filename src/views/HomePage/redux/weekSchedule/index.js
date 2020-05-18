import {
  createAsyncAction,
  createSimpleAsyncReducer,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "listOfWeekNow";

//
const initialListOfWeekNow = {
  state: true,
  data: [],
};

const {
  load: loadListSchedule,
  selector: listOfWeekNowSelector,
  reducer: listOfWeekNowReducer,
} = createSimpleAsyncReducer(
  // start_date: String format YYYY-MM-DD required
  // end_date: String format YYYY-MM-DD required
  (_blank, options) =>
    createAsyncAction({
      config: {
        url: `/work-schedule/list-of-week-now`,
      },
      ...options,
    }),
  rootPath,
  initialListOfWeekNow
);
//

export const weekScheduleModule = {
  selectors: { listOfWeekNowSelector },
  actions: { loadListSchedule },
  key: rootPath,
  reducer: listOfWeekNowReducer,
};
