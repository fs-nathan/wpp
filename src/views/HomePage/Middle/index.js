import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../contant/routes";

export default () => {
  return (
    <Switch>
      <Route {...routes.postDetail}></Route>

      {/* mặc định phải dc nhét ở cuối */}
      <Route {...routes.home}></Route>
    </Switch>
  );
};
