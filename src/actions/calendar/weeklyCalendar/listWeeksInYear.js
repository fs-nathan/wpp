import { LIST_WEEKS_IN_YEAR, LIST_WEEKS_IN_YEAR_SUCCESS, SCHEDULE_OF_WEEK_LIST_FAIL } from '../../../constants/actions/calendar/weeklyCalendar';

export const listWeeksInYear = ({ year }, quite = false) => ({
  type: LIST_WEEKS_IN_YEAR,
  quite,
  options: {
    year
  },
});

export const listWeeksInYearSuccess = ({ weeks }, options) => ({
  type: LIST_WEEKS_IN_YEAR_SUCCESS,
  options,
  data: {
    weeks
  }
});

export const listWeeksInYearFail = (error, options) => ({
  type: SCHEDULE_OF_WEEK_LIST_FAIL,
  options,
  error,
});