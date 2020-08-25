import { listPersonalRemindCategory } from "actions/calendar/alarmCalendar/listPersonalRemindCategory";
import { sortPersonalRemindCategory } from "actions/calendar/alarmCalendar/sortPersonalRemindCategory";
import { listCalendarPermission } from "actions/calendar/permission/listPermission";
import LoadingBox from "components/LoadingBox";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import { CREATE_PERSONAL_REMIND_CATEGORY, CustomEventDispose, CustomEventListener, DELETE_PERSONAL_REMIND_CATEGORY, SORT_PERSONAL_REMIND_CATEGORY } from "constants/events";
import { get } from "lodash";
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { useMountedState } from "react-use";
import CalendarAlramLeftPart from "./LeftPart";
import routes from "./routes";
import { personalRemindCategoriesSelector } from "./selectors";

export const Context = React.createContext();
const { Provider } = Context;

function CalendarAlarmPage({
  doListPersonalRemindCategory, personalRemindCategories,
  doSortPersonalRemindCategory, doListPermission, permissions
}) {

  function handleSortPersonalAlarm(result) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }
    let category = personalRemindCategories.data[result.source.index];
    let sort_index = result.destination.index;
    doSortPersonalRemindCategory({ category_id: get(category, "id"), sort_index }, false);
  }

  React.useEffect(() => {
    doListPersonalRemindCategory(false);
    const reloadListPersonalRemindCategory = () => {
      doListPersonalRemindCategory(false);
    }

    CustomEventListener(SORT_PERSONAL_REMIND_CATEGORY, reloadListPersonalRemindCategory);
    CustomEventListener(CREATE_PERSONAL_REMIND_CATEGORY, reloadListPersonalRemindCategory);
    CustomEventListener(DELETE_PERSONAL_REMIND_CATEGORY, reloadListPersonalRemindCategory);
    return () => {
      CustomEventDispose(SORT_PERSONAL_REMIND_CATEGORY, reloadListPersonalRemindCategory);
      CustomEventDispose(CREATE_PERSONAL_REMIND_CATEGORY, reloadListPersonalRemindCategory);
      CustomEventDispose(DELETE_PERSONAL_REMIND_CATEGORY, reloadListPersonalRemindCategory);
    }
  }, [doListPersonalRemindCategory])

  React.useEffect(() => {
    doListPermission(false);
  }, [doListPermission, useMountedState()]);

  return (
    <TwoColumnsLayout
      leftRenders={[
        () =>
          <CalendarAlramLeftPart
            personalRemindCategories={personalRemindCategories}
            handleSortPersonalAlarm={handleSortPersonalAlarm}
            permissions={permissions}
          />
      ]}
      rightRender={({ expand, handleExpand }) => (
        <Provider
          value={{
            expand, handleExpand, permissions
          }}
        >
          <div>
            <Suspense fallback={<LoadingBox />}>
              <Switch>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </Suspense>
          </div>
        </Provider>
      )}
    />
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doListPersonalRemindCategory: (quite) => dispatch(listPersonalRemindCategory(quite)),
    doSortPersonalRemindCategory: ({ category_id, sort_index }, quite) => dispatch(sortPersonalRemindCategory({ category_id, sort_index }, quite)),
    doListPermission: (quite) => dispatch(listCalendarPermission(quite)),
  };
};

const mapStateToProps = state => {
  return {
    personalRemindCategories: personalRemindCategoriesSelector(state),
    permissions: state.calendar.listCalendarPermission.data.permissions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAlarmPage);