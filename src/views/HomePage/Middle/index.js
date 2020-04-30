import React from "react";
import useSearchParam from "react-use/lib/useSearchParam";
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
  const path = useSearchParam("path");
  return (
    <>
      {path === "search" && <routes.search.component />}
      {path === "post" && <routes.postDetail.component />}
      {!(!!path || path !== null) && (
        <div hidden={!!path || path !== null}>
          <routes.home.component></routes.home.component>
        </div>
      )}
    </>
  );
};
