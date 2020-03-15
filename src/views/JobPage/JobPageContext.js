import React from "react";
export const JobPageContext = React.createContext({
  expand: false,
  handleExpand: () => {
    console.error("handleExpand");
  }
});
