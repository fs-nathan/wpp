import { CircularProgress, Menu, MenuItem } from "@material-ui/core";
import { TimeRangePopover } from "components/CustomPopover";
import WPReactTable from "components/WPReactTable";
import { exportToCSV } from "helpers/utils/exportData";
import { find, get, isNil, isObject, join, remove, size, slice } from "lodash";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingBox from "../../../../components/LoadingBox";
import { Container } from "../../../../components/TableComponents";
import HeaderTableAllGroup from "./components/HeaderTableAllGroup";
import ProjectGroupGrid from "./components/PropjectGroupGrid";
import { COLUMNS_PROJECT_TABLE } from "./constants/Columns";
import EmptyPersonalBoard from "./Intro/EmptyPersonalBoard";
import EmptyWorkingBoard from "./Intro/EmptyWorkingBoard";
import EmptyWorkingGroup from "./Intro/EmptyWorkingGroup";
import "./styles/style.scss";
import { _sortByAscGroupTable, _sortByDescGroupTable } from "./utils";

const KEY_LOCAL_STORAGE_SORT = "sort_project_table";

function AllProjectTable({
  expand,
  handleExpand,
  projects,
  filterType,
  labelType,
  handleFilterType,
  handleSearch,
  handleFilterLabel,
  timeType,
  handleTimeType,
  handleSortType,
  type_data = null,
  handleShowOrHideProject,
  handleSortProject,
  handleSortProjectGroup,
  handleUpdateProjectGroup,
  handleOpenModal,
  bgColor,
  showHidePendings,
  projectGroup,
  groupID,
  isFiltering,
  setIsFiltering,
  doReloadList,
  activeLoading,
  setActiveLoading,
  canModifyProjectGroup = false,
}) {
  const dataSort = localStorage.getItem(KEY_LOCAL_STORAGE_SORT);
  const sortLocal = JSON.parse(dataSort);
  const { t } = useTranslation();
  const [data, setData] = React.useState(projects?.projects || []);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [curProject, setCurProject] = React.useState(null);
  const [showHideDisabled, setShowHideDisabled] = React.useState(false);
  const [, setProjectSummary] = React.useState({});
  const [currentGroup, setCurrentGroup] = React.useState(null);
  const [selectedSort, setSelectedSort] = React.useState(sortLocal || null);
  const isDisplayGroupGrid = !groupID;
  const history = useHistory();

  const canDelete = isDisplayGroupGrid
    ? canModifyProjectGroup
    : get(curProject, "can_delete", false);

  const refData = useRef([]);
  const dispatch = useDispatch();

  function doOpenMenu(anchorEl, project) {
    setMenuAnchor(anchorEl);
    setCurProject(project);
  }

  const _handleSort = (key, idSort, array = null) => {
    switch (key) {
      case "ASC":
        localStorage.setItem(
          KEY_LOCAL_STORAGE_SORT,
          JSON.stringify({ key, idSort })
        );
        setSelectedSort({ key, idSort });

        return !array
          ? setData((prevState) => _sortByAscGroupTable(prevState, idSort))
          : _sortByAscGroupTable(array, idSort);
      case "DECS":
        localStorage.setItem(
          KEY_LOCAL_STORAGE_SORT,
          JSON.stringify({ key, idSort })
        );
        setSelectedSort({ key, idSort });
        return !array
          ? setData((prevState) => _sortByDescGroupTable(prevState, idSort))
          : _sortByDescGroupTable(array, idSort);
      default:
        setData(refData.current);
        setSelectedSort(null);
        localStorage.setItem(KEY_LOCAL_STORAGE_SORT, null);
        break;
    }
  };

  const _handleDragEnd = (resultSort) => {
    const sortData = resultSort.map((item, index) => ({
      id: item.id,
      sort_index: index,
    }));
    handleSortProject(sortData);
  };

  React.useEffect(() => {
    if (projects) {
      const newData = projects?.projects || [];
      isObject(sortLocal)
        ? setData(() => _handleSort(sortLocal.key, sortLocal.idSort, newData))
        : setData(newData);
      refData.current = newData;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    [handleOpenModal]
  );

  const onEdit = (evt, project) => doOpenMenu(evt, project);

  const onOpenEditModal = (curProject) =>
    handleOpenModal("UPDATE", {
      curProject,
    });

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

  function _handleSetDefault(value) {
    if (value) dispatch(defaultGroupTask(value));
  }

  const _filterType = (index) => {
    handleFilterType(index);
    setIsFiltering(true);
  };

  const _filterLabel = (labelId) => {
    handleFilterLabel(labelId);
    setIsFiltering(true);
  };

  const _setTimeRangeAnchor = (e) => {
    setTimeAnchor(e.currentTarget);
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

  const MenuProject = () => {
    return (
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
          <>
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
            <MenuItem
              onClick={(evt) => {
                setMenuAnchor(null);
                handleOpenModal("UPDATE", {
                  curProject,
                });
              }}
            >
              <span>
                <ModeEditOutlineOutlinedIcon />
                {t("DMH.VIEW.PGP.RIGHT.ALL.EDIT")}
              </span>
            </MenuItem>
            <MenuItem
              onClick={(evt) => {
                setMenuAnchor(null);
                handleOpenModal("UPDATE", {
                  curProject,
                });
              }}
            >
              <span>
                <ModeEditOutlineOutlinedIcon />
                {t("DMH.VIEW.PGP.RIGHT.ALL.EDIT")}
              </span>
            </MenuItem>
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
          </>
        )}
        {get(curProject, "can_delete", false) && (
          <MenuItem
            onClick={(evt) => {
              setMenuAnchor(null);
              handleOpenModal("DELETE_GROUP", {
                selectedProject: curProject,
              });
            }}
          >
            <span className="task-group__menu-item--delete">
              <DeleteOutlineOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.DEL")}
            </span>
          </MenuItem>
        )}
      </Menu>
    );
  };

  const MenuProjectGroup = () => {
    return (
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
        {canModifyProjectGroup && (
          <MenuItem
            onClick={(evt) => {
              setMenuAnchor(null);
              handleOpenModal("UPDATE", {
                updatedProjectGroup: currentGroup,
              });
            }}
          >
            <span>
              <ModeEditOutlineOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.EDIT")}
            </span>
          </MenuItem>
        )}

        {canModifyProjectGroup && (
          <MenuItem
            onClick={(evt) => {
              setMenuAnchor(null);
              history.push(`/projects?groupID=${currentGroup.id}&createTask`);
            }}
          >
            <span>
              <AddCircleOutlineOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.ADD_TABLE_TASKS")}
            </span>
          </MenuItem>
        )}
        {canModifyProjectGroup && (
          <MenuItem
            onClick={(evt) => {
              setMenuAnchor(null);
              handleOpenModal("COLOR_PICKER", {
                projectGroup_id: currentGroup.id,
                projectGroupColor: currentGroup.color,
                handleUpdateProjectGroup: handleUpdateProjectGroup,
                setActiveLoading: setActiveLoading,
              });
            }}
          >
            <span>
              <PaletteOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.CHANGE_COLOR")}
            </span>
          </MenuItem>
        )}
        {canModifyProjectGroup && (
          <MenuItem
            onClick={(evt) => {
              setMenuAnchor(null);
              handleOpenModal("LOGO", {
                doSelectIcon: (icon) =>
                  handleUpdateProjectGroup({
                    projectGroupId: currentGroup.id,
                    icon: icon.url_sort,
                  }),
                currentGroup: currentGroup,
              });
            }}
          >
            <span>
              <InsertEmoticonOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.CHANGE_ICON")}
            </span>
          </MenuItem>
        )}
        {canModifyProjectGroup && (
          <MenuItem
            onClick={(evt) => {
              evt.stopPropagation();
              _handleSetDefault(`?groupID=${currentGroup.id}`);
              setMenuAnchor(null);
            }}
          >
            <span>
              <FlagOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.SET_DEFAULT")}
            </span>
          </MenuItem>
        )}
        {canModifyProjectGroup && (
          <MenuItem
            onClick={(evt) => {
              setMenuAnchor(null);
              handleOpenModal("DELETE_GROUP", {
                selectedProjectGroup: currentGroup,
              });
            }}
          >
            <span className="task-group__menu-item--delete">
              <DeleteOutlineOutlinedIcon />
              {t("DMH.VIEW.PGP.RIGHT.ALL.DEL")}
            </span>
          </MenuItem>
        )}
      </Menu>
    );
  };

  return (
    <div>
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
          labelType={labelType}
          timeType={timeType}
          onSearch={handleSearch}
          onFilterType={_filterType}
          onFilterLabel={_filterLabel}
          onExportData={_exportData}
          onSetTimeRangeAnchor={_setTimeRangeAnchor}
          onOpenCreateModal={(evt) =>
            isDisplayGroupGrid
              ? handleOpenModal("UPDATE")
              : handleOpenModal("CREATE")
          }
          isDisplayGroupGrid={isDisplayGroupGrid}
        />
        {projects.loading && <LoadingBox />}

        {(size(projects) > 0 || isFiltering) && !projects.loading && (
          <div>
            {isDisplayGroupGrid ? (
              <ProjectGroupGrid
                projectGroups={projectGroup}
                onEdit={onEdit}
                handleDragEnd={_handleDragEnd}
                handleSortProjectGroup={handleSortProjectGroup}
                setCurrentGroup={setCurrentGroup}
                doReloadList={doReloadList}
                setActiveLoading={setActiveLoading}
                activeLoading={activeLoading}
                onOpenCreateModal={(evt) => handleOpenModal("UPDATE")}
              />
            ) : (
              <WPReactTable
                isCollapsed={expand}
                columns={columns || []}
                data={data}
                selectedSort={selectedSort}
                onDragEnd={_handleDragEnd}
                onSort={_handleSort}
              />
            )}

            {isDisplayGroupGrid && <MenuProjectGroup />}
            {!isDisplayGroupGrid && <MenuProject />}
          </div>
        )}
      </Container>

      <TimeRangePopover
        className="time-range-popover"
        bgColor={bgColor}
        anchorEl={timeAnchor}
        setAnchorEl={setTimeAnchor}
        timeOptionDefault={timeType}
        handleTimeRange={(timeType, startDate, endDate) => {
          handleTimeType(timeType);
          // handleTimeRange(startDate, endDate);
        }}
      />
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
