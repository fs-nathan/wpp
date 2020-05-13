import React from "react";
export const OfferPageContext = React.createContext({
  expand: false,
  quickTask: undefined,
  setQuickTask: () => {
    console.error("setQuickTask");
  },
  handleExpand: () => {
    console.error("handleExpand");
  },
  setMenulist : () =>{},
  setTitle : () =>{},
  setOpenModalOfferByGroup : () =>{}
});
