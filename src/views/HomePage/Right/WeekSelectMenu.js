import { listWeeksInYear } from "actions/calendar/weeklyCalendar/listWeeksInYear";
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
      className="comp_WeekSelectMenu"
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
    doListWeeksInYear: ({ year }, quite) =>
      dispatch(listWeeksInYear({ year }, quite)),
  };
};

const mapStateToProps = (state) => {
  return {
    weeks: state.calendar.listWeeksInYear.data.weeks,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    doListWeeksInYear,
    anchorEl,
    onItemClick,
    year = 2020,
    weeks = [],
    ...props
  }) => {
    const { t } = useTranslation();
    const onEntering = () => {
      doListWeeksInYear({ year }, false);
    };
    const options = weeks.map((week) => ({
      key: week.week,
      label: `${t("IDS_WP_WEEK")} ${week.week} (${week.start} - ${week.end})`,
    }));

    return (
      <WeekSelectMenu
        {...props}
        options={options}
        handItemClick={onItemClick}
        anchorEl={anchorEl}
        onEntering={onEntering}
      />
    );
  }
);
