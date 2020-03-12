import React from "react";
import { Route } from "react-router-dom";
import TabList from "./LeftPart_new/TabList";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import routes from "./routes";

export const Context = React.createContext();
const { Provider } = Context;

function JobPage() {
  return (
    <Provider value={{}}>
      <TwoColumnsLayout
        leftRenders={[() => <TabList />]}
        rightRender={() =>
          routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })
        }
      />
    </Provider>
  );
}

export default JobPage;
