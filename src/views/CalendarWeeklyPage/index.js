import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import { listScheduleOfWeek } from "actions/calendar/weeklyCalendar/listScheduleOfWeek";
///import { listWeeksInYear } from "actions/calendar/weeklyCalendar/listWeeksInYear";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CalendarWeeklyLeftPart from "./LeftPart";
import CalendarWeeklyRightPart from "./RightPart";
import { calendarsSelector, listWeeksInYearSelector, scheduleOfWeekSelector } from "./selectors";

function CalendarWeeklyPage({
  doListSchedule, calendars,
  doListScheduleOfWeek, scheduleOfWeek,
}) {

  const params = useParams();
  const [year, setYear] = React.useState(params.year ?? new Date().getFullYear());

  React.useEffect(() => {
    doListSchedule({ year }, false);
  }, [doListSchedule, year]);

  React.useEffect(() => {
    doListScheduleOfWeek({ year, week: params.week });
  }, [doListScheduleOfWeek, year, params])

  function handleOnCloseModal() {
    doListSchedule({ year }, false);
    doListScheduleOfWeek({ year, week: params.week });
  }

  return (
    <TwoColumnsLayout
      leftRenders={[
        () => <CalendarWeeklyLeftPart
          calendars={calendars}
          handleOnCloseModal={handleOnCloseModal}
          scheduleOfWeek={scheduleOfWeek}
        />
      ]}
      rightRender={
        () => (
          <CalendarWeeklyRightPart
            year={year} handleYearChanged={year => setYear(year)}
            scheduleOfWeek={scheduleOfWeek}
            calendar={calendars.data.find(item => item.week === parseInt(params.week, 10))}
          />
        )
      }
    />
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doListSchedule: ({ year }, quite) => dispatch(listSchedule({ year }, quite)),
    doListScheduleOfWeek: ({ year, week }, quite) => dispatch(listScheduleOfWeek({ year, week }, quite)),
  };
};

const mapStateToProps = state => {
  return {
    calendars: calendarsSelector(state),
    scheduleOfWeek: scheduleOfWeekSelector(state),
    listWeeksInYear: listWeeksInYearSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeeklyPage);