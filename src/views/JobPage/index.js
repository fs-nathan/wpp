import React, { Suspense, useState } from "react";
import { Route } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { JobPageContext } from "./JobPageContext";
import TabList from "./LeftPart_new/TabList";
import routes from "./routes";
const { Provider } = JobPageContext;

function JobPage() {
  const [quickTask, setQuickTask] = useState();
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(0);
  const [timeRange, settimeRange] = React.useState(null);
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
