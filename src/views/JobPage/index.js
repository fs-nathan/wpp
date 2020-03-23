import React, { Suspense, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { times } from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { useLocalStorage } from "../../hooks";
import { JobPageContext } from "./JobPageContext";
import TabList from "./LeftPart_new/TabList";
import routes from "./routes";
const { Provider } = JobPageContext;

function JobPage() {
  const [localOptions, setLocalOptions] = useLocalStorage(
    "LOCAL_PROJECT_OPTIONS",
    {
      filterType: 1,
      timeType: 5
    }
  );
  const [quickTask, setQuickTask] = useState();
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  useEffect(() => {
    setLocalOptions({
      ...localOptions,
      timeType
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeType]);
  const [timeRange, settimeRange] = React.useState(() => {
    const [timeStart, timeEnd] = times[1].option();
    return {
      timeStart,
      timeEnd
    };
  });

  return (
    <TwoColumnsLayout
      leftRenders={[() => <TabList />]}
      rightRender={({ expand, handleExpand, handleSubSlide }) => (
        <Provider
          value={{
            expand,
            handleExpand,
            quickTask,
            setQuickTask,
            handleSubSlide,
            timeAnchor,
            setTimeAnchor,
            timeType,
            setTimeType,
            timeRange,
            settimeRange
          }}
        >
          <div>
            <Suspense fallback={<LoadingBox />}>
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
            </Suspense>
          </div>
        </Provider>
      )}
    />
  );
}

export default JobPage;
