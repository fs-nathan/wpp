import {
  mdiBookmark,
  mdiBookmarkOutline,
  mdiCircleSmall,
  mdiDotsHorizontal,
  mdiMenu,
  mdiPlus,
  mdiStarOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { detailStatus } from "actions/project/setting/detailStatus";
import { updatePinBoardSetting } from "actions/project/setting/updatePinBoardSetting";
import Avatar from "components/CustomAvatar";
import { get, isNil } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { statusSelector } from "views/ProjectGroupPage/Modals/ProjectSetting/selectors";
import DrawerFilter from "./components/DrawerFilter";
import { useStyles } from "./styles";

const HeaderProject = ({
  project,
  status,
  onExpand = () => {},
  onOpenCreateModal = () => {},
  onUpdatePinBoardSetting = () => {},
  doDetailStatus,
  ...props
}) => {
  const classes = useStyles();
  const refFilter = useRef(null);
  const [isPinned, setIsPinned] = useState(false);
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

  useEffect(() => {
    if (project && !isNil(get(project, "id"))) {
      doDetailStatus({
        projectId: get(project, "id"),
      });
    }
  }, [project, doDetailStatus]);

  useEffect(() => {
    setIsPinned(status?.status?.is_pin_on_personal_board || false);
  }, [status]);

  const _toggleDrawerMenu = () => {
    refFilter.current._toggle();
  };

  const _handleUpdatePinBoard = () => {
    setIsPinned(!isPinned);
    onUpdatePinBoardSetting({
      projectId: get(project, "id"),
      status: isPinned,
    });
  };

  return (
    <div className={classes.topbar}>
      <div className={classes.burger} onClick={onExpand}>
        <Icon path={mdiMenu} size={1.2} />
      </div>
      <div className={classes.header}>
        <Avatar
          alt="Logo"
          src={get(project, "group_icon", "")}
          style={{ width: 40, height: 40 }}
        />
        <div className={classes.titleAndNav}>
          <div className={classes.titleRow}>
            <div className={classes.leftWrapper}>
              <Link to={`/projects/information/${projectId}`}>
                {get(project, "name", "")}
              </Link>

              <Icon
                className={classes.iconHeader}
                path={isPinned ? mdiBookmark : mdiBookmarkOutline}
                size={1}
                onClick={_handleUpdatePinBoard}
              />

              <div className={classes.progressTitle}>
                <Icon path={mdiCircleSmall} size={2} color="#009143" />
                <span style={{ marginLeft: -10 }}>
                  Đang làm ({percentComplete}%)
                </span>
              </div>
            </div>

            <div className={classes.rightWrapper}>
              <div
                className={classes.wrapperButton}
                onClick={_toggleDrawerMenu}
              >
                <Icon path={mdiDotsHorizontal} size={1} />
                <span style={{ marginLeft: 5 }}>Hiện menu</span>
              </div>
              <div
                className={classes.wrapperButton}
                onClick={onOpenCreateModal}
              >
                <Icon path={mdiPlus} size={1} />
                <span style={{ marginLeft: 5 }}>Tạo mới</span>
              </div>
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

      <DrawerFilter
        ref={refFilter}
        project={project}
        isProjectVisible={get(project, "visibility")}
        {...props}
      />
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

const mapStateToProps = (state) => {
  return {
    status: statusSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePinBoardSetting: ({ projectId, status }) =>
      dispatch(updatePinBoardSetting({ projectId, status })),
    doDetailStatus: ({ projectId }) => dispatch(detailStatus({ projectId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProject);
