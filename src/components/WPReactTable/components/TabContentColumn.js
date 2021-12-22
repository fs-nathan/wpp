import React from "react";
import TabNumber from "./TabNumber";

const TabContentColumn = ({ type }) => {
  if (type === "number") return <TabNumber />;
  return null;
};

export default TabContentColumn;
