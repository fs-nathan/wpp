import React from "react";
import Icon from "@mdi/react";

import {
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import LoadingBox from "../../../../components/LoadingBox";
import ErrorBox from "../../../../components/ErrorBox";
import LeftSideContainer from "../../../../components/LeftSideContainer";
import { StyledList, StyledListItem } from "../../../../components/CustomList";
import { map, get } from "lodash";
import { connect } from "react-redux";
import "./style.scss";
import { Routes } from "../../contants/routes";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Link } from "react-router-dom";
import MailIcon from "@material-ui/icons/Mail";
const TaskPrimary = ({ tab, className = "", ...props }) => (
  <ListItem button key={get(tab, "name")} {...props}>
    <Link
      to={get(tab, "path")}
      className={`view_Job_Tablist_new__task-primary ${className}`}
    >
      <ListItemIcon>{get(tab, "icon", null)}</ListItemIcon>
      <div>{get(tab, "name")}</div>
    </Link>
  </ListItem>
);
const TaskSub = ({ tab, className = "", ...props }) => (
  <ListItem button key={get(tab, "name")} {...props}>
    <Link
      to={get(tab, "path")}
      className={`view_Job_Tablist_new__task-sub ${className}`}
    >
      <ListItemIcon>{get(tab, "icon", null)}</ListItemIcon>
      <div>{get(tab, "name")}</div>
    </Link>
  </ListItem>
);
const tabs = [
  {
    path: Routes.OVERVIEW,
    name: "overview",
    task_count: 0,
    icon: <InboxIcon />,
    iconColor: "#ffa900"
  },
  {
    path: Routes.DUE,
    name: "due",
    task_count: 0,
    icon: <InboxIcon />,
    iconColor: "#ffa900"
  },
  {
    group: "mission",
    path: Routes.MISSION,
    name: "mission",
    icon: <InboxIcon />,
    iconColor: "#ffa900",
    children: [
      {
        group: "giving",
        path: Routes.MISSION_GIVING,
        name: "giving",
        task_count: 0,
        icon: null,
        iconColor: "#ffa900"
      },
      {
        group: "given",
        path: Routes.MISSION_GIVEN,
        name: "given",
        task_count: 0,
        icon: null,
        iconColor: "#ffa900"
      },
      {
        group: "self giving",
        path: Routes.MISSION_SELFGIVING,
        name: "self giving",
        task_count: 0,
        icon: null,
        iconColor: "#ffa900"
      }
    ]
  },
  {
    path: Routes.ROLE,
    name: "mission",
    icon: <InboxIcon />,
    iconColor: "#ffa900",
    children: [
      {
        path: Routes.ROLE_RUNNING,
        name: "giving",
        task_count: 0,
        icon: null,
        iconColor: "#ffa900"
      },
      {
        path: Routes.ROLE_MONITOR,
        name: "monitor",
        task_count: 0,
        icon: null,
        iconColor: "#ffa900"
      },
      {
        path: Routes.ROLE_COORDINATION,
        name: "coordination",
        task_count: 0,
        icon: null,
        iconColor: "#ffa900"
      }
    ]
  }
];

function ProjectList() {
  const loading = false;
  const error = null;

  return (
    <>
      {error !== null && <ErrorBox />}
      {error === null && (
        <LeftSideContainer
          title="Công việc của bạn"
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
          <List>
            {map(tabs, (tab, index) => [
              <TaskPrimary tab={tab} key={index} />,
              ...get(tab, "children", []).map((subTab, subindex) => (
                <TaskSub tab={subTab} key={`${index}_${subindex}`} />
              ))
            ])}
          </List>
        </LeftSideContainer>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
