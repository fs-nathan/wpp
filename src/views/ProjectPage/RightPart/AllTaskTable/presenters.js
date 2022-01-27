import { Box, CircularProgress } from "@material-ui/core";
import { listColumns } from "actions/columns/listColumns";
import { TimeRangePopover } from "components/CustomPopover";
import { CustomTableContext } from "components/CustomTable";
import HeaderProject from "components/HeaderProject";
import { Container } from "components/TableComponents";
import WPReactTable from "components/WPReactTable";
import EditColumnModal from "components/WPReactTable/components/EditColumnModal";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { exportToCSV } from "helpers/utils/exportData";
import { cloneDeep, find, flattenDeep, get, isNil, join } from "lodash";
import React, { useReducer, useRef } from "react";
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
  isLoading: false,
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
  const fields = useSelector(({ columns }) => columns?.listColumns?.data || []);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [state, dispatchState] = useReducer(reducer, {
    ...initialState,
    columnsFields: fields,
  });
  const refEdit = useRef(null);
  const dispatch = useDispatch();
  const { columnsFields } = state;

  /* Cloning the state.arrColumns array and storing it in the columns variable. */
  const columns = React.useMemo(() => {
    return cloneDeep(state.arrColumns);
  }, [state.arrColumns]);

  /* When the projectId changes, dispatch the listColumns action. */
  React.useEffect(() => {
    dispatch(listColumns({ project_id: projectId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  /* The useEffect hook is used to run a function when the component is mounted.
  /* In this case, the function is used to convert the fields array into a table.
  /* The function is passed to the convertFieldsToTable function, which returns an array of columns.
  /* The columns are then passed to the dispatchState function, which sets the state. */
  React.useEffect(() => {
    if (columnsFields.length) {
      const moreColumns = convertFieldsToTable(
        columnsFields,
        _handleEditColumn
      );

      dispatchState({
        arrColumns: moreColumns,
        isSetted: true,
        isLoading: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsFields, fields]);

  /* When the fields array changes, update the state.columnsFields. */
  React.useEffect(() => {
    if (fields.length) dispatchState({ columnsFields: fields });
  }, [fields, state.isSetted]);

  /* This code is checking to see if the tasks array is empty. If it is, then it will dispatch the state to set isEmpty to true. */
  React.useEffect(() => {
    dispatchState({ isEmpty: tasks.tasks.length === 0 });
  }, [tasks.tasks]);

  const _handleEditColumn = (type, data) => {
    let data_type = 3;

    switch (type) {
      case 1:
        data_type = "text";
        break;
      case 2:
        data_type = "number";
        break;
      case 3:
        data_type = "list";
        break;
      default:
        break;
    }

    refEdit.current._open(data_type, data);
  };

  /**
   * It takes a dataColumn object as an argument, and then dispatches an action to the Redux store.
   * @returns The list of columns.
   */
  const _handleAddNewColumns = (dataColumn) => {
    if (!dataColumn) return;
    /* Dispatching an action to the Redux store. */
    dispatch(listColumns({ project_id: projectId }));
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

  const _handleUpdateFieldSuccess = (data) => {
    const newColumnsFields = state.arrColumns.map((item) => {
      if (item.id === data.project_field_id) {
        const newItem = { ...item, name: data.name };
        if (data.data_type === 3) {
          newItem["options"] = data.options.map((item) => ({
            ...item,
            _id: item.id,
          }));
        }

        return newItem;
      }
      return item;
    });

    /* Creating a new array of columns and setting it to the state. */
    dispatchState({
      arrColumns: convertFieldsToTable(newColumnsFields, _handleEditColumn),
      isSetted: true,
    });
  };

  const _handleDeleteFieldSuccess = (data) => {
    const newColumnsFields = state.arrColumns.filter(
      (item) => item.id !== data.project_field_id
    );
    /* Creating a new array of columns and setting it to the state. */
    dispatchState({
      arrColumns: convertFieldsToTable(newColumnsFields, _handleEditColumn),
      isSetted: true,
    });
  };

  const _handleHideColumn = async (idHide) => {
    /* Filtering the array of columns and removing the column with the id of the column that is hidden. */
    const newColumnsFields = state.arrColumns.filter(({ id }) => id !== idHide);
    dispatchState({
      arrColumns: convertFieldsToTable(newColumnsFields, _handleEditColumn),
      isSetted: true,
    });

    const { status } = await apiService({
      data: {
        project_field_id: idHide,
        project_id: projectId,
        status: 0,
      },
      url: "/project-field/set-status",
      method: "POST",
    });

    if (status === 200) {
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    }
  };

  const _handleSortColumn = async (id, method) => {
    try {
      dispatchState({ isLoading: true });
      /* Filtering the array of columns and removing the column with the id of the column that is hidden. */
      const { status } = await apiService({
        data: {
          project_field_id: id,
          project_id: projectId,
          method,
        },
        url: "/project-field/set-sort-method",
        method: "POST",
      });

      /* Fetching the list of columns from the server. */
      if (status === 200) dispatch(listColumns({ project_id: projectId }));
    } catch (error) {}
  };

  const _handleReOrderColumn = () => {};

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
            onReOrderColumns={_handleReOrderColumn}
            onAddColumns={_handleAddNewColumns}
          />

          {state.isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <WPReactTable
              isCollapsed={expand}
              columns={columns}
              data={tasks.tasks}
              isGroup
              onAddNewColumns={_handleAddNewColumns}
              onDragEnd={handleSortTask}
              onEditColumn={_handleEditColumn}
              onHideColumn={_handleHideColumn}
              onSortColumn={_handleSortColumn}
            />
          )}

          <EditColumnModal
            ref={refEdit}
            onUpdateSuccess={_handleUpdateFieldSuccess}
            onDeleteSuccess={_handleDeleteFieldSuccess}
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
  onReOrderColumns,
  onAddColumns,
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
      onReOrderColumns={onReOrderColumns}
      onAddColumns={onAddColumns}
    />
  );
};

export default AllTaskTable;
