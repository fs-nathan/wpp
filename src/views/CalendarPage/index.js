import { mdiCalendarClock, mdiCalendarMonth, mdiCalendarText } from '@mdi/js';
import moment from "moment";
import React, { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Route, Switch } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { useLocalStorage } from "../../hooks";
import { Routes } from "./constants/routes";
import routes from "./routes";
import './style.scss';
import TabList from "./views/LeftPart/TabList";

export const Context = React.createContext();
const { Provider } = Context;

function CalendarPage({

}) {
  const { t } = useTranslation();
  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_CALENDAR_OPTIONS', {
    timeType: 3
  });
  const [timeRange, setTimeRange] = React.useState({
    startDate: moment().startOf("isoWeek").toDate(),
    endDate: moment().endOf("isoWeek").toDate()
  });

  const listMenu = [
    {
      title: t('IDS_WP_WEEKLY_CALENDAR'),
      url: Routes.WEEKLY,
      icon: mdiCalendarMonth,
    },
    {
      title: t('IDS_WP_PROJECT_CALENDAR'),
      url: Routes.PROJECT,
      icon: mdiCalendarText,
    },
    {
      title: t('IDS_WP_ALARM_CALENDAR'),
      url: Routes.ALARM_RECENTLY,
      icon: mdiCalendarClock,
      subtile: t('IDS_WP_ALARM_CALENDAR_SUB_TITLE')
    },
  ];

  return (
    <TwoColumnsLayout
      leftRenders={[() => <TabList {...{ listMenu }} />]}
      rightRender={({ expand, handleExpand }) => (
        <Provider
          value={{
            expand, handleExpand,
            setTimeRange, timeRange,
            localOptions, setLocalOptions,
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


export default CalendarPage;