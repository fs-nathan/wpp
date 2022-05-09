import { ButtonBase } from "@material-ui/core";
import { listColumns } from "actions/columns/listColumns";
import { sortGroupTask } from "actions/groupTask/sortGroupTask";
import { addNewGroupTask } from "actions/task/listTask";
import { sortTask } from "actions/task/sortTask";
import AlertModal from "components/AlertModal";
import { CustomLayoutContext } from "components/CustomLayout";
import { TimeRangePopover } from "components/CustomPopover";
import { Container } from "components/TableComponents";
import WPReactTable from "components/WPReactTable";
import EditColumnModal from "components/WPReactTable/components/EditColumnModal";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { cloneDeep, get, uniqueId } from "lodash";
import React, { useContext, useReducer, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  tasks,
  project,
  handleOpenModal,
  handleReload,
  bgColor,
  timeType,
  handleTimeType,
  handleReloadListTask,
}) {
  const { itemLocation } = useContext(CustomLayoutContext);
  const { projectId } = useParams();
  const fields = useSelector(({ columns }) => columns?.listColumns?.data || []);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [state, dispatchState] = useReducer(reducer, {
    ...initialState,
    columnsFields: fields,
  });
  const refEdit = useRef(null);
  const refAlert = useRef(null);
  const refIsFirstTime = useRef(true);
  const dispatch = useDispatch();
  const { columnsFields } = state;
  /* Cloning the state.arrColumns array and storing it in the columns variable. */
  const columns = React.useMemo(() => {
    return cloneDeep(state.arrColumns);
  }, [state.arrColumns]);

  /* When the projectId changes, dispatch the listColumns action. */
  React.useEffect(() => {
    dispatch(listColumns({ project_id: projectId }));
    return () => {
      refIsFirstTime.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  /* The useEffect hook is used to run a function when the component is mounted.
  /* In this case, the function is used to convert the fields array into a table.
  /* The function is passed to the convertFieldsToTable function, which returns an array of columns.
  /* The columns are then passed to the dispatchState function, which sets the state. */
  React.useEffect(() => {
    if (columnsFields.length) {
      const result = [...columnsFields];
      if (itemLocation.id) {
        const [removed] = result.splice(itemLocation.startIndex, 1);
        result.splice(itemLocation.endIndex, 0, removed);
      }
      const moreColumns = convertFieldsToTable(
        result,
        _handleEditColumn,
        handleReload
      );

      dispatchState({
        arrColumns: moreColumns,
        isSetted: true,
        isLoading: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnsFields,
    fields,
    itemLocation.startIndex,
    itemLocation.endIndex,
    itemLocation.id,
  ]);

  /* When the fields array changes, update the state.columnsFields. */
  React.useEffect(() => {
    if (fields.length) dispatchState({ columnsFields: fields });
  }, [fields, state.isSetted]);

  /* This code is checking to see if the tasks array is empty. If it is, then it will dispatch the state to set isEmpty to true. */
  React.useEffect(() => {
    dispatchState({
      isEmpty: tasks.tasks.length === 0,
      tasksData: tasks.tasks,
    });
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
      arrColumns: convertFieldsToTable(
        newColumnsFields,
        _handleEditColumn,
        handleReload
      ),
      isSetted: true,
    });
  };

  const _handleDeleteFieldSuccess = (data) => {
    const newColumnsFields = state.arrColumns.filter(
      (item) => item.id !== data.project_field_id
    );
    /* Creating a new array of columns and setting it to the state. */
    dispatchState({
      arrColumns: convertFieldsToTable(
        newColumnsFields,
        _handleEditColumn,
        handleReload
      ),
      isSetted: true,
    });
  };

  const _handleHideColumn = async (idHide, statusUpdate = 0, index) => {
    /* Filtering the array of columns and removing the column with the id of the column that is hidden. */
    const newColumnsFields = state.arrColumns.filter(({ id }) => id !== idHide);
    const columnHidden =
      (!!statusUpdate && fields.filter(({ id }) => id === idHide)) || [];
    if (columnHidden.length) {
      newColumnsFields.splice(index, 0, { ...columnHidden[0], is_show: true });
    }
    dispatchState({
      arrColumns: convertFieldsToTable(
        newColumnsFields,
        _handleEditColumn,
        handleReload
      ),
      isSetted: true,
    });
    await apiService({
      data: {
        project_field_id: idHide,
        project_id: projectId,
        status: statusUpdate,
      },
      url: "/project-field/set-status",
      method: "POST",
    });
  };

  const _handleSortColumn = async (id, method) => {
    try {
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
      if (status === 200) handleReloadListTask();
    } catch (error) {}
  };

  const _handleDeleteColumn = (data) => {
    refAlert.current._open(data);
  };

  const _handleConfirmDelete = async (dataDelete) => {
    try {
      const { status } = await apiService({
        data: dataDelete,
        url: "/project-field/delete",
        method: "POST",
      });

      if (status === 200) {
        _handleDeleteFieldSuccess(dataDelete);
        SnackbarEmitter(
          SNACKBAR_VARIANT.SUCCESS,
          DEFAULT_MESSAGE.MUTATE.SUCCESS
        );
      }
    } catch (error) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, DEFAULT_MESSAGE.MUTATE.ERROR);
    }
  };

  const _handleAddNewGroup = () => {
    const result = cloneDeep(columns);
    result.splice(0, 1);
    result.splice(result.length - 1, 1);
    dispatch(
      addNewGroupTask({
        projectId,
        name: "Untitled Section",
        id: uniqueId(),
        tasks: [],
        data: result,
      })
    );
  };

  const _handleReorderData = (
    result = {},
    isSameList = false,
    isBetweenGroup = false
  ) => {
    const { destination, source } = result;
    const finalTasks = cloneDeep(state.tasksData);

    const startIndex = source.index;
    const endIndex = destination.index;

    if (isSameList) {
      const index = finalTasks.findIndex(({ id }) => id === source.droppableId);
      if (index === -1) return;
      const tasks = _handleReorderList(
        finalTasks[index].tasks,
        source.index,
        destination.index
      );

      finalTasks[index].tasks = tasks;

      dispatch(
        sortTask({
          projectId,
          taskId: result.draggableId,
          groupTask: destination.droppableId,
          sortIndex: endIndex,
        })
      );
      dispatchState({ tasksData: cloneDeep(finalTasks) });
      return;
    }

    if (isBetweenGroup) {
      let indexSource = -1;
      let indexDestination = -1;
      const newTasksData = cloneDeep(finalTasks);

      [...newTasksData].forEach((element, index) => {
        if (element.id === source.droppableId) indexSource = index;
        if (element.id === destination.droppableId) indexDestination = index;
      });

      if (indexSource === -1 || indexDestination === -1) return;

      const row = newTasksData[indexSource].tasks[source.index];
      const sourceRow = newTasksData[indexSource];
      const destinationRow = newTasksData[indexDestination];

      // 1. Remove item from source row
      const newSourceRow = {
        ...sourceRow,
        tasks: [...sourceRow.tasks],
      };
      newSourceRow.tasks.splice(result.source.index, 1);
      newTasksData[indexSource] = newSourceRow;

      // 2. Insert into destination row
      const newDestinationRow = {
        ...destinationRow,
        tasks: [...destinationRow.tasks],
      };
      newDestinationRow.tasks.splice(destination.index, 0, row);
      newTasksData[indexDestination] = newDestinationRow;

      dispatch(
        sortTask({
          projectId,
          taskId: result.draggableId,
          groupTask: destination.droppableId,
          sortIndex: endIndex,
        })
      );
      dispatchState({ tasksData: [...newTasksData] });
      return;
    }

    const tasksReordered = _handleReorderList(finalTasks, startIndex, endIndex);
    const options = { groupTaskId: result.draggableId, sortIndex: endIndex };

    dispatch(sortGroupTask(options));
    dispatchState({ tasksData: tasksReordered });
  };

  const _handleReorderList = (list, startIndex, endIndex) => {
    const newData = cloneDeep(list);
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    return newData;
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
          <WPReactTable
            isGroup
            isCollapsed={expand}
            columns={columns}
            data={state.tasksData}
            onReload={handleReload}
            onAddNewGroup={_handleAddNewGroup}
            onAddNewColumns={_handleAddNewColumns}
            onEditColumn={_handleEditColumn}
            onDeleteColumn={_handleDeleteColumn}
            onHideColumn={_handleHideColumn}
            onSortColumn={_handleSortColumn}
            onReorderData={_handleReorderData}
          />

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
      <ModalAlert ref={refAlert} onConfirm={_handleConfirmDelete} />
    </Container>
  );
}

const ModalAlert = React.forwardRef(({ onConfirm = () => {} }, ref) => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [dataDelete, setDataDelete] = React.useState({});

  React.useImperativeHandle(ref, () => ({
    _open: (data) => {
      setOpen(true);
      setDataDelete(data);
    },
  }));

  return (
    <AlertModal
      setOpen={setOpen}
      onConfirm={() => onConfirm({ ...dataDelete, project_id: projectId })}
      open={open}
      customFooter={({ bg }) => (
        <ButtonBase
          style={{ color: bg }}
          className="comp_AlertModal___accept-button"
          onClick={() => setOpen(false)}
        >
          {t("CLOSE")}
        </ButtonBase>
      )}
      content={t("alert_delete_fields")}
    />
  );
});

export default AllTaskTable;
