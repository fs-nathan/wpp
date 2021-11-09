const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles({
  topbar: {
    alignItems: "center",
    background: "#fff",
    boxSizing: "border-box",
    display: "flex",
    flexShrink: 0,
    minHeight: "72px",
    padding: "0 24px",
    position: "relative",
    zIndex: 200,
    borderBottom: " 1px solid rgb(232, 232, 232)",
  },
  burger: {
    display: "flex",
    justifyContent: "center",
    marginRight: "18px",
    maxWidth: "43px",
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.54)",
  },
  header: {
    display: "inline-flex",
    flex: "1 1 auto",
    minWidth: "1px",
    alignItems: "center",
  },
  headerAvatar: { alignSelf: "center", marginRight: "16px" },
  titleAndNav: {
    alignItems: "flex-start",
    boxSizing: "border-box",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    minWidth: "1px",
    marginLeft: 15,
  },
  iconHeader: {
    // padding: 5,
    color: "rgba(0, 0, 0, 0.54)",
    cursor: "pointer",
  },
  progressTitle: {
    display: "flex",
    alignItems: "center",
    color: "#666",
    marginLeft: -10,
  },
  titleRow: {
    alignItems: "center",
    display: "flex",
    marginTop: "8px",
    maxWidth: "100%",
    minHeight: "32px",
    width: "100%",
    "& a": {
      fontSize: "20px",
      fontWeight: "500",
      lineHeight: "28px",
      alignItems: "center",
      color: "#44485e",
      flex: "0 1 auto",
      marginRight: "4px",
      minWidth: "1px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      transition: "color 200ms ease-in-out",
      whiteSpace: "nowrap",
      maxWidth: 300,
    },
  },
  navMenuRow: {
    alignItems: "flex-end",
    alignSelf: "stretch",
    display: "flex",
    flex: "1 0 auto",
    justifyContent: "flex-start",
    maxWidth: "100%",
  },
  navBar: {
    flex: 1,
    minWidth: "1px",
    position: "relative",
    whiteSpace: "nowrap",
  },
  tabNavBar: {
    display: "flex",
    "& ul": {
      display: "flex",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& li": {
        display: "flex",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "normal",
        minWidth: "1px",
        transitionDuration: ".2s",
        transitionProperty: "box-shadow,color",
        whiteSpace: "nowrap",
        flex: "0 1 auto",
        color: "#666",
        cursor: "pointer",
        marginLeft: "24px",
        transition: "0.3s all ease-in-out",
        "&:hover > $link": {
          borderColor: "#009143",
        },
      },
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "normal",
    minWidth: "1px",
    transitionDuration: ".2s",
    transitionProperty: "box-shadow,color",
    whiteSpace: "nowrap",
    flex: "0 1 auto",
    color: "#666",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    paddingBottom: "5px",
    "&.active": { borderColor: "#009143", color: "#009143", fontWeight: 500 },
  },
  rightWrapper: {
    alignItems: "center",
    display: "flex",
    flex: "0 0 auto",
    marginLeft: "auto",
    paddingLeft: "8px",
  },
  leftWrapper: { display: "flex", alignItems: "center" },
  wrapperButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "#666",
    marginLeft: 10,
    fontWeight: 500,
    padding: "7.75px 9.5px",
    borderRadius: 3,
    transition: "0.5s all ease-in-out",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
    "&.isExpand": {
      width: 230,
      "& $inputSearch": { display: "block" },
      "& $buttonClose": { display: "block" },
    },
    "& $inputSearch": { display: "none" },
    "& $buttonClose": { display: "none" },
  },
});