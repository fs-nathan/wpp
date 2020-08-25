import React from "react";
export const JobPageContext = React.createContext({
  expand: false,
  quickTask: undefined,
  setQuickTask: () => {
    console.error("setQuickTask");
  },
  handleExpand: () => {
    console.error("handleExpand");
  }
});
