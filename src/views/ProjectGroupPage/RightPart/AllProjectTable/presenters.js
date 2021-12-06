import { CircularProgress, Menu, MenuItem } from "@material-ui/core";
import WPReactTable from "components/WPReactTable";
import { exportToCSV } from "helpers/utils/exportData";
import { find, get, isNil, join, remove, size, slice } from "lodash";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import LoadingBox from "../../../../components/LoadingBox";
import { Container } from "../../../../components/TableComponents";
import HeaderTableAllGroup from "./components/HeaderTableAllGroup";
import { COLUMNS_PROJECT_TABLE } from "./constants/Columns";
import EmptyPersonalBoard from "./Intro/EmptyPersonalBoard";
import EmptyWorkingBoard from "./Intro/EmptyWorkingBoard";
import EmptyWorkingGroup from "./Intro/EmptyWorkingGroup";
import "./styles/style.scss";
import { _sortByAscGroupTable, _sortByDescGroupTable } from "./utils";

function AllProjectTable({
  expand,
  handleExpand,
  projects,
  filterType,
  handleFilterType,
  timeType,
  handleTimeType,
  handleSortType,
  type_data = null,
  handleShowOrHideProject,
  handleSortProject,
  handleOpenModal,
  bgColor,
  showHidePendings,
  projectGroup,
  groupID,
  isFiltering,
  setIsFiltering,
}) {
  const { t } = useTranslation();
  const [data, setData] = React.useState(projects?.projects || []);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [curProject, setCurProject] = React.useState(null);
  const [showHideDisabled, setShowHideDisabled] = React.useState(false);
  const [projectSummary, setProjectSummary] = React.useState({});
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const refData = useRef([]);

  function doOpenMenu(anchorEl, project) {
    setMenuAnchor(anchorEl);
    setCurProject(project);
  }
  React.useEffect(() => {
    if (projects) {
      const newData = projects?.projects || [];
      setData(newData);
      refData.current = newData;
    }
  }, [projects]);

  React.useEffect(() => {
    setShowHideDisabled(
      !isNil(
        find(
          showHidePendings.pendings,
          (pending) => pending === get(curProject, "id")
        )
      )
    );
  }, [showHidePendings, curProject]);
  React.useEffect(() => {
    setCurProject((oldProject) =>
      find(projects.projects, { id: get(oldProject, "id") })
    );
    setProjectSummary(projects.summary);
  }, [projects]);
  React.useEffect(() => {
    setCurrentGroup(find(projectGroup, { id: groupID }));
  }, [groupID, projectGroup]);

  const columns = React.useMemo(
    () =>
      COLUMNS_PROJECT_TABLE({
        onEdit: (evt, project) => doOpenMenu(evt, project),
        onOpenEditModal: (curProject) => {
          handleOpenModal("UPDATE", {
            curProject,
          });
        },
      }),
    []
  );

  function renderEmptyView() {
    switch (type_data) {
      case 2:
        return <EmptyPersonalBoard />;
      default:
        if (!isNil(groupID)) {
          return <EmptyWorkingBoard groupID={groupID} projects={projects} />;
        } else return <EmptyWorkingGroup />;
    }
  }

  const _filterType = (index) => {
    handleFilterType(index);
    setIsFiltering(true);
  };

  const _setTimeRangeAnchor = (e) => {
    setTimeAnchor(e.currentTarget);
  };

  const _handleSort = (key, idSort) => {
    switch (key) {
      case "ASC":
        setData((prevState) => _sortByAscGroupTable(prevState, idSort));
        break;
      case "DECS":
        setData((prevState) => _sortByDescGroupTable(prevState, idSort));
        break;
      default:
        setData(refData.current);
        break;
    }
  };

  const _handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let sortData = [...projects.projects];
    const indexes = sortData.map((data) => get(data, "sort_index"));
    let removed = remove(sortData, { id: draggableId });
    sortData = [
      ...slice(sortData, 0, destination.index),
      ...removed,
      ...slice(sortData, destination.index),
    ].map((data, index) => ({
      ...data,
      sort_index: indexes[index],
    }));
    handleSortProject(sortData);
  };

  const _exportData = () => {
    const data = projects.projects.map((project) => ({
      id: get(project, "id", ""),
      icon: get(project, "icon", ""),
      name: get(project, "name", ""),
      status: get(project, "state_name", ""),
      task_count:
        get(project, "statistic.waiting", 0) +
        get(project, "statistic.doing", 0) +
        get(project, "statistic.expired", 0) +
        get(project, "statistic.complete", 0) +
        get(project, "statistic.stop", 0),
      progress: `${get(project, "complete", 0)}%`,
      duration: get(project, "duration")
        ? `${get(project, "duration")} ngày (${get(
            project,
            "date_start"
          )} - ${get(project, "date_end")})`
        : "",
      priority: get(project, "priority_name", ""),
      members: join(
        get(project, "members", []).map((member) => get(member, "name")),
        ","
      ),
    }));

    exportToCSV(data, "projects");
  };

  return (
    <>
      <Container>
        {size(projects.projects) === 0 &&
          !projects.loading &&
          !isFiltering &&
          renderEmptyView()}
        <HeaderTableAllGroup
          currentGroup={currentGroup}
          expand={expand}
          onExpand={handleExpand}
          typeData={type_data}
          filterType={filterType}
          timeType={timeType}
          onFilterType={_filterType}
          onExportData={_exportData}
          onSetTimeRangeAnchor={_setTimeRangeAnchor}
          onOpenCreateModal={(evt) => handleOpenModal("CREATE")}
        />
        {projects.loading && <LoadingBox />}
        {(size(projects.projects) > 0 || isFiltering) && !projects.loading && (
          <React.Fragment>
            <WPReactTable
              columns={columns || []}
              data={data}
              onDragEnd={_handleDragEnd}
              onSort={_handleSort}
            />

            <Menu
              id="simple-menu"
              anchorEl={menuAnchor}
              keepMounted
              open={Boolean(menuAnchor)}
              onClose={(evt) => setMenuAnchor(null)}
              transformOrigin={{
                vertical: -30,
                horizontal: "right",
              }}
            >
              {get(curProject, "can_update", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleOpenModal("SETTING", {
                      curProject,
                      canChange: {
                        date: true,
                        copy: true,
                        view: true,
                      },
                    });
                  }}
                >
                  {t("DMH.VIEW.PGP.RIGHT.ALL.SETTING")}
                </MenuItem>
              )}
              {get(curProject, "can_update", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleOpenModal("UPDATE", {
                      curProject,
                    });
                  }}
                >
                  {t("DMH.VIEW.PGP.RIGHT.ALL.EDIT")}
                </MenuItem>
              )}
              {get(curProject, "can_update", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleShowOrHideProject(curProject);
                  }}
                  disabled={showHideDisabled}
                >
                  {showHideDisabled && (
                    <CircularProgress
                      size={16}
                      className="margin-circular"
                      color="white"
                    />
                  )}
                  {get(curProject, "visibility", false)
                    ? t("DMH.VIEW.PGP.RIGHT.ALL.HIDE")
                    : t("DMH.VIEW.PGP.RIGHT.ALL.SHOW")}
                </MenuItem>
              )}
              {get(curProject, "can_delete", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleOpenModal("ALERT", {
                      selectedProject: curProject,
                    });
                  }}
                >
                  {t("DMH.VIEW.PGP.RIGHT.ALL.DEL")}
                </MenuItem>
              )}
            </Menu>
          </React.Fragment>
        )}
      </Container>
    </>
  );
}
export default connect(
  (state) => ({
    projectGroup: get(
      state.projectGroup.listProjectGroup.data,
      "projectGroups",
      []
    ),
  }),
  {}
)(AllProjectTable);
