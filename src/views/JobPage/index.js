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
  return (
    <TwoColumnsLayout
      leftRenders={[() => <TabList />]}
      rightRender={({
        expand,
        handleExpand,
        quickTask,
        setQuickTask,
        handleSubSlide
      }) => (
        <Provider value={{ expand, handleExpand, handleSubSlide }}>
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
        </Provider>
      )}
    />
  );
}

export default JobPage;
