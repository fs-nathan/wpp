import { listSchedule } from "actions/calendar/weeklyCalendar/listSchedule";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import "./WeekSelectMenu.css";
class ScrollbarsMenu extends React.Component {
  render() {
    return <Scrollbars {...this.props} />;
  }
}
export const WeekSelectMenu = ({
  onEntering,
  menuAnchor,
  options,
  handItemClick,
  setMenuAnchor,
}) => {
  return (
    <ItemMenu
      className="comp_WeekSelectMenu home-week-schedule-select"
      onEntering={onEntering}
      onItemClick={handItemClick}
      menuAnchor={menuAnchor}
      options={options}
      onClose={() => setMenuAnchor(null)}
      PaperProps={{
        style: {
          maxHeight: 300,
          maxWidth: 300,
        },
        component: ScrollbarsMenu,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    ></ItemMenu>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    doListWeeksScheduleInYear: ({ year }, quite) =>
      dispatch(listSchedule({ year }, quite)),
  };
};

const mapStateToProps = (state) => {
  return {
    weeks: state.calendar.listSchedule.data.calendars,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    doListWeeksScheduleInYear,
    anchorEl,
    onItemClick,
    year = 2020,
    weeks = [],
    ...props
  }) => {
    const { t } = useTranslation();
    const onEntering = () => {
      doListWeeksScheduleInYear({ year }, false);
    };
    const options = weeks.map((week) => ({
      key: week.id,
      label: `<b>${week.name}</b><span>${t("IDS_WP_WEEK")} ${week.week} (${week.start} - ${week.end})</span>`,
    }));

    return (
      <WeekSelectMenu
        {...props}
        options={options}
        handItemClick={(scheduleId) => {
          onItemClick(weeks.find(e => e.id === scheduleId))
        }}
        anchorEl={anchorEl}
        onEntering={onEntering}
      />
    );
  }
);
