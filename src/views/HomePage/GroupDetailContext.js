import React from "react";

const GroupDetailContext = React.createContext({});
const {
  Provider: GroupDetailProvider,
  Consumer: GroupDetailConsumer,
} = GroupDetailContext;
export { GroupDetailProvider, GroupDetailConsumer };
export default GroupDetailContext;
