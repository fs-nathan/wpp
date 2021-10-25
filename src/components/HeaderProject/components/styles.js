import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  drawerWrapper: {
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    height: "calc(100% - 55px)",
    width: 300,
    transform: "translateX(100%)",
    transition: "0.3s all ease-in-out",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
    "&.isCollapsed": {
      transform: "translateX(0)",
    },
    maxHeight: "calc(100vh - 54px)",
    svg: { color: "rgba(0, 0, 0, 0.87)" },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    padding: 18.5,
    fontSize: 21,
  },
  menuItem: { fontWeight: 500 },
  menuText: { "& span": { fontWeight: 400, color: "#666" } },
  menuIcon: { minWidth: 35 },
  menuTextWrapper: {
    display: "flex",
    flexDirection: "column",
    color: "#666",
    "& p": { fontSize: 11 },
    "&.labelText span": { color: "#fff" },
  },
  addButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  wrapperHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 16px 8px 16px",
    color: "#666",
  },
  wrapperManageData: { maxHeight: "calc(100% - 60px)", overflow: "auto" },
  wrapperOption: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    color: "#666",
    fontWeight: 500,
  },
});
