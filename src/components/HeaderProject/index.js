import { makeStyles } from "@material-ui/core";
import {
  mdiBookmarkOutline,
  mdiCircleSmall,
  mdiInformationOutline,
  mdiMenu,
  mdiStarOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Avatar from "components/CustomAvatar";
import { get } from "lodash";
import React from "react";
import { NavLink } from "react-router-dom";

const HeaderProject = ({ project, onExpand = () => {} }) => {
  const classes = useStyles();
  const projectId = get(project, "id", "");
  const total =
    get(project, "task_doing", 0) +
    get(project, "task_complete", 0) +
    get(project, "task_expired", 0) +
    get(project, "task_waiting", 0);
  const percentComplete =
    (get(project, "task_complete", 0) / (total || 1)) * 100;

  const NAV_BARS_LIST = [
    {
      id: 1,
      title: "Todo list",
      to: `/projects/task-table/${projectId}`,
    },
    {
      id: 2,
      title: "Kanban",
      to: `/projects/task-kanban/${projectId}`,
    },
    {
      id: 3,
      title: "Gantt",
      to: `/projects/task-gantt/${projectId}`,
    },
    {
      id: 4,
      title: "Chat",
      to: `/projects/task-chat/${projectId}`,
      icon: mdiStarOutline,
    },
  ];

  return (
    <div className={classes.topbar}>
      <div className={classes.burger} onClick={onExpand}>
        <Icon path={mdiMenu} size={1.2} />
      </div>
      <div className={classes.header}>
        <Avatar
          alt="Logo"
          src={get(project, "group_project_icon", "")}
          style={{ width: 40, height: 40 }}
        />
        <div className={classes.titleAndNav}>
          <div className={classes.titleRow}>
            <h1>{get(project, "name", "")}</h1>
            <Icon
              className={classes.iconHeader}
              path={mdiInformationOutline}
              size={1}
            />
            <Icon
              className={classes.iconHeader}
              path={mdiBookmarkOutline}
              size={1}
            />

            <div className={classes.progressTitle}>
              <Icon path={mdiCircleSmall} size={2} color="#009143" />
              <span style={{ marginLeft: -10 }}>
                Đang làm ({percentComplete}%)
              </span>
            </div>
          </div>
          <div className={classes.navMenuRow}>
            <div className={classes.navBar}>
              <nav className={classes.tabNavBar}>
                <ul>
                  {NAV_BARS_LIST.map((item) => (
                    <ItemNav key={item.id} {...item} />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemNav = ({ to, id, title, icon }) => {
  const classes = useStyles();
  return (
    <li style={{ marginLeft: id === 1 ? 0 : 24 }}>
      <NavLink to={to} className={classes.link}>
        {icon && <Icon path={icon} size={1} style={{ marginRight: 5 }} />}
        {title}
      </NavLink>
    </li>
  );
};

const useStyles = makeStyles({
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
    padding: 5,
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
    "& h1": {
      margin: 0,
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#44485e",
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
        borderBottom: "2px solid transparent",
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
});

export default HeaderProject;
