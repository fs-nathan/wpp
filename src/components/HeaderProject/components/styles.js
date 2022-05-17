import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  drawerWrapper: {
    position: "fixed",
    bottom: 0,
    right: -400,
    backgroundColor: "#fff",
    height: "calc(100% - 55px)",
    width: 350,
    transition: "0.3s all ease-in-out",
    boxShadow: "0 5px 20px 0 rgb(109 110 111 / 8%)",
    "&.isCollapsed": {
      right: 0,
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
  menuText: {
    "& span": { fontWeight: 400, color: "#666" },
    "&.is-delete span": { color: "red" },
  },
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
    fontWeight: 500,
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
