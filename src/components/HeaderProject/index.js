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
import { detailProject } from "actions/project/detailProject";
import {
  detailStatus,
  getProjectSetting,
} from "actions/project/setting/detailStatus";
import { updatePinBoardSetting } from "actions/project/setting/updatePinBoardSetting";
import Avatar from "components/CustomAvatar";
import { get, isNil } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { statusSelector } from "views/ProjectGroupPage/Modals/ProjectSetting/selectors";
import SearchButton from "views/ProjectGroupPage/RightPart/AllProjectTable/components/SearchButton";
import DrawerFilter from "./components/DrawerFilter";
import { useStyles } from "./styles";

const HeaderProject = ({
  view = "list",
  project,
  status,
  valueSearch,
  onSearch = () => {},
  onExpand = () => {},
  onOpenCreateModal = () => {},
  onUpdatePinBoardSetting = () => {},
  onAddColumns = () => {},
  onHideColumn = () => {},
  setItemLocation = () => {},
  onReOrderColumns = () => {},
  doDetailStatus,
  ...props
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const refFilter = useRef(null);
  const refID = useRef();

  const [isPinned, setIsPinned] = useState(false);
  const [defaultView, setDefaultView] = useState(null);
  const refIsFirstTime = useRef(true);
  const { pathname } = useLocation();
  const projectId = pathname.split("/")[3];
  const total =
    get(project, "task_doing", 0) +
    get(project, "task_complete", 0) +
    get(project, "task_expired", 0) +
    get(project, "task_waiting", 0);
  const percentComplete = Math.round(
    (get(project, "task_complete", 0) / (total || 1)) * 100
  );

  const NAV_BARS_LIST = [
    {
      id: 0,
      title: "Todo list",
      to: `/projects/task-table/${projectId}`,
    },
    {
      id: 1,
      title: "Kanban",
      to: `/projects/task-kanban/${projectId}`,
    },
    {
      id: 2,
      title: "Gantt",
      to: `/projects/task-gantt/${projectId}`,
    },
    {
      id: 3,
      title: "Chat",
      to: `/projects/task-chat/${projectId}`,
    },
    {
      id: 4,
      title: "T???ng quan",
      to: `/projects/dashboard/${projectId}`,
    },
    {
      id: 5,
      title: "B??o c??o",
      to: `/projects/report/${projectId}`,
    },
  ];

  React.useEffect(() => {
    if (projectId && projectId !== refID.current) {
      dispatch(detailProject({ projectId }, true));
      refID.current = projectId;

      const fetchSetting = async (projectId) => {
        const { data } = await getProjectSetting(projectId);
        setDefaultView(data.task_view);
      };

      fetchSetting(projectId);
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project && !isNil(get(project, "id"))) {
      doDetailStatus({
        projectId: get(project, "id"),
      });
    }
  }, [project, doDetailStatus]);

  useEffect(() => {
    if (status?.status && refIsFirstTime.current) {
      setIsPinned(status?.status?.is_pin_on_personal_board || false);
      refIsFirstTime.current = false;
    }
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
    <div id="project-topbar" className={classes.topbar}>
      <div className={classes.burger} onClick={onExpand}>
        <Icon path={mdiMenu} size={1.2} />
      </div>
      <div className={classes.header}>
        <div className={classes.logo}>
          <Avatar
            alt="Logo"
            src={get(project, "group_icon", "")}
            style={{ width: 40, height: 40 }}
          />
        </div>
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
                  ??ang l??m ({percentComplete}%)
                </span>
              </div>
            </div>

            <div className={classes.rightWrapper}>
              <SearchButton valueSearch={valueSearch} onSearch={onSearch} />
              <div
                className={classes.wrapperButton}
                onClick={_toggleDrawerMenu}
              >
                <Icon path={mdiDotsHorizontal} size={1} />
                <span style={{ marginLeft: 5 }}>Hi???n menu</span>
              </div>
              <div
                className={classes.wrapperButton}
                onClick={onOpenCreateModal}
              >
                <Icon path={mdiPlus} size={1} />
                <span style={{ marginLeft: 5 }}>T???o m???i</span>
              </div>
            </div>
          </div>
          <div className={classes.navMenuRow}>
            <div className={classes.navBar}>
              <nav className={classes.tabNavBar}>
                <ul>
                  {NAV_BARS_LIST.map((item) => (
                    <ItemNav
                      key={item.id}
                      defaultView={defaultView}
                      {...item}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <DrawerFilter
        ref={refFilter}
        view={view}
        project={project}
        isProjectVisible={get(project, "visibility")}
        isShareProject={get(project, "is_shared")}
        valueSearch={valueSearch}
        onSearch={onSearch}
        onReOrderColumns={onReOrderColumns}
        onAddColumns={onAddColumns}
        onHideColumn={onHideColumn}
        setItemLocation={setItemLocation}
        {...props}
      />
    </div>
  );
};

const ItemNav = ({ to, id, title, defaultView }) => {
  const classes = useStyles();
  return (
    <li style={{ marginLeft: id === 0 ? 0 : 24 }}>
      <NavLink to={to} className={classes.link}>
        {defaultView === id && (
          <Icon path={mdiStarOutline} size={1} style={{ marginRight: 5 }} />
        )}
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
