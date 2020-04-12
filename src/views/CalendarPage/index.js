import TwoColumnsLayout from 'components/TwoColumnsLayout';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useLocalStorage } from '../../hooks';
import CalendarTypes from './LeftPart/CalendarTypes';
import CalendarListTable from './RightPart/CalendarListTable';
import { routeSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

function CalendarPage({
  route
}) {

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_CALENDAR_OPTIONS', {
    timeType: 5,
  });
  const [timeRange, setTimeRange] = React.useState({});

  return (
    <Provider value={{
      setTimeRange,
      localOptions, setLocalOptions,
    }}>
      <Route
        path={route}
        render={({ match: { url } }) => (
          <Switch>
            <Route
              path={`${url}`}
              exact
              render={props => (
                <TwoColumnsLayout
                  leftRenders={[
                    () =>
                      <CalendarTypes
                        {...props}
                      />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand }) => <CalendarListTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                  }
                />
              )}
            />
          </Switch>
        )}
      />
    </Provider>
  )
};

export default connect(
  state => ({
    route: routeSelector(state),
  }),
)(CalendarPage);