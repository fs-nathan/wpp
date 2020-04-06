import TwoColumnsLayout from "components/TwoColumnsLayout";
import React, { useState } from "react";
import Left from "./Left.js";
import Right from "./Right/index.js";
export const GroupPermissionSettingsCotnext = React.createContext({});
const GroupPermissionSettings = () => {
  const [select, setSelect] = useState();
  const [modal, setModal] = useState(null);
  return (
    <GroupPermissionSettingsCotnext.Provider
      value={{ select, setSelect, modal, setModal }}
    >
      <>
        <TwoColumnsLayout
          leftRenders={[() => <Left />]}
          rightRender={() => <Right />}
        ></TwoColumnsLayout>
        {modal}
      </>
    </GroupPermissionSettingsCotnext.Provider>
  );
};

export default GroupPermissionSettings;
