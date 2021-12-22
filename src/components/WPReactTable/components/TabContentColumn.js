import React from "react";
import TabNumber from "./TabNumber";

const TabContentColumn = ({ type, ...props }) => {
  if (type === "number") return <TabNumber {...props} />;
  return null;
};

export default TabContentColumn;
