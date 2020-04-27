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
  const post_id = useSearchParam("post_id");
  return (
    <>
      {!!post_id && <routes.postDetail.component id={post_id} />}

      {/* mặc định phải dc nhét ở cuối */}
      {!post_id && <routes.home.component></routes.home.component>}
    </>
  );
};
