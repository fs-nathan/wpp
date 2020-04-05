import TwoColumnsLayout from "components/TwoColumnsLayout";
import React, { useState } from "react";
import Left from "./Left.js";
import Right from "./Right/index.js";
export const GroupPermissionSettingsCotnext = React.createContext({});
const GroupPermissionSettings = () => {
  const [select, setSelect] = useState();

  return (
    <GroupPermissionSettingsCotnext.Provider value={{ select, setSelect }}>
      <TwoColumnsLayout
        leftRenders={[() => <Left />]}
        rightRender={() => <Right />}
      ></TwoColumnsLayout>
    </GroupPermissionSettingsCotnext.Provider>
  );
};

export default GroupPermissionSettings;
