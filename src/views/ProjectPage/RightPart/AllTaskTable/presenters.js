import { listColumns } from "actions/columns/listColumns";
import { TimeRangePopover } from "components/CustomPopover";
import { CustomTableContext } from "components/CustomTable";
import HeaderProject from "components/HeaderProject";
import { Container } from "components/TableComponents";
import WPReactTable from "components/WPReactTable";
import { exportToCSV } from "helpers/utils/exportData";
import { cloneDeep, find, flattenDeep, get, isNil, join } from "lodash";
import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { COLUMNS_TASK_TABLE } from "../constant/Columns";
import EmptyTasksIntro from "../Intro/EmptyTasksIntro";
import { convertFieldsToTable } from "../utils";
import "./style.scss";

const reducer = (state, action) => {
  return { ...state, ...action };
};

const initialState = {
  arrColumns: COLUMNS_TASK_TABLE,
  isEmpty: true,
  isSetted: false,
};

function AllTaskTable({
  expand,
  handleExpand,
  showHidePendings,
  handleSubSlide,
  tasks,
  project,
  handleShowOrHideProject,
  handleSortTask,
  handleOpenModal,
  handleRemoveMemberFromTask,
  bgColor,
  timeType,
  handleAddMemberToTask,
  handleTimeType,
  memberID,
  memberTask,
  isShortGroup,
  canUpdateProject,
  canCreateTask,
  handleSortGroupTask,
}) {
  const { projectId } = useParams();
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const columnsStore = useSelector(
    ({ columns }) => columns?.listColumns?.data || []
  );
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => cloneDeep(state.arrColumns),
    [state.arrColumns]
  );

  React.useEffect(() => {
    dispatch(listColumns({ project_id: projectId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  React.useEffect(() => {
    if (columnsStore.length && !state.isSetted) {
      const result = cloneDeep(state.arrColumns);
      const moreColumns = convertFieldsToTable(columnsStore);
      console.log(moreColumns, "data");
      result.splice(result.length - 1, 0, ...moreColumns);
      dispatchState({
        arrColumns: result,
        isSetted: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsStore]);

  React.useEffect(() => {
    dispatchState({ isEmpty: tasks.tasks.length === 0 });
  }, [tasks.tasks]);

  const _handleAddNewColumns = (dataColumn) => {
    if (!dataColumn) return;
    const result = cloneDeep(state.arrColumns);
    result.splice(result.length - 1, 0, dataColumn);
    dispatchState({ arrColumns: result });
  };

  const disableShowHide = !isNil(
    find(
      showHidePendings.pendings,
      (pending) => pending === get(project.project, "id")
    )
  );

  const _exportData = () => {
    const data = flattenDeep(
      tasks.tasks.map((groupTask) =>
        get(groupTask, "tasks", []).map((task) => ({
          id: get(task, "id", ""),
          groupTask: get(groupTask, "name", ""),
          name: get(task, "name", ""),
          status: get(task, "status_name", ""),
          duration:
            get(task, "duration_value", 0) +
            " " +
            get(task, "duration_unit", ""),
          start_time: get(task, "start_time", ""),
          start_date: get(task, "start_date", ""),
          end_time: get(task, "end_time", ""),
          end_date: get(task, "end_date", ""),
          progress: get(task, "complete", 0) + "%",
          priority: get(task, "priority_name", ""),
          members: join(
            get(task, "members", []).map((member) => get(member, "name")),
            ","
          ),
        }))
      )
    );

    exportToCSV(data, "tasks");
  };

  return (
    <Container>
      {state.isEmpty && (
        <EmptyTasksIntro
          handleOpenModal={handleOpenModal}
          projectName={get(project.project, "name")}
          work_type={get(project.project, "work_type")}
          projectID={get(project.project, "id")}
        />
      )}
      {!state.isEmpty && (
        <>
          <HeaderTableCustom
            project={project}
            memberID={memberID}
            canUpdateProject={canUpdateProject}
            disableShowHide={disableShowHide}
            handleOpenModal={handleOpenModal}
            handleShowOrHideProject={handleShowOrHideProject}
            _exportData={_exportData}
            handleExpand={handleExpand}
          />
          <WPReactTable
            isCollapsed={expand}
            columns={columns}
            data={tasks.tasks}
            isGroup
            onAddNewColumns={_handleAddNewColumns}
            onDragEnd={handleSortTask}
          />
          <TimeRangePopover
            bgColor={bgColor}
            className="time-range-popover"
            anchorEl={timeAnchor}
            setAnchorEl={setTimeAnchor}
            timeOptionDefault={timeType}
            handleTimeRange={(timeType) => {
              handleTimeType(timeType);
            }}
          />
        </>
      )}
    </Container>
  );
}

const HeaderTableCustom = ({
  project,
  memberID,
  canUpdateProject,
  disableShowHide,
  handleOpenModal,
  handleShowOrHideProject,
  _exportData,
  handleExpand,
}) => {
  const TableContext = React.useContext(CustomTableContext);
  return (
    <HeaderProject
      project={project.project}
      valueSearch={get(TableContext?.options, "search.patern", "")}
      onSearch={(value) =>
        get(TableContext?.options, "search.onChange", () => null)(value)
      }
      hasMemberId={isNil(memberID)}
      canUpdateProject={canUpdateProject && isNil(memberID)}
      disableShowHide={disableShowHide}
      onUpdateMember={() => handleOpenModal("SETTING_MEMBER")}
      onUpdateTime={() => handleOpenModal("CALENDAR", {})}
      onUpdateVisible={() => handleShowOrHideProject(project.project)}
      onUpdateSetting={() =>
        handleOpenModal("SETTING", {
          curProject: project.project,
          canChange: {
            date: canUpdateProject,
            copy: canUpdateProject,
            view: true,
          },
        })
      }
      onExportData={_exportData}
      onOpenCreateModal={() => handleOpenModal("MENU_CREATE")}
      onExpand={handleExpand}
    />
  );
};

export default AllTaskTable;
