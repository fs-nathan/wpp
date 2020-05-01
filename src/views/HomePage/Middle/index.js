import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { routes } from "../contant/routes";

// export default () => {
//   return (
//     <Switch>
//       <Route {...routes.postDetail}></Route>

//       {/* mặc định phải dc nhét ở cuối */}
//       <Route {...routes.home}></Route>
//     </Switch>
//   );
// };

export default () => {
  return (
    <Switch>
      <Route {...routes.search}></Route>
      <Route {...routes.postDetail}></Route>
      <Route {...routes.home}></Route>
      <Route path="/" render={() => <Redirect to={routes.home.path} />}></Route>
    </Switch>
  );
};
