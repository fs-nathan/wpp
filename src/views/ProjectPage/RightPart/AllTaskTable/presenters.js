import { ButtonBase } from "@material-ui/core";
import { listColumns } from "actions/columns/listColumns";
import { addNewGroupTask } from "actions/task/listTask";
import AlertModal from "components/AlertModal";
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
import {
  cloneDeep,
  find,
  flattenDeep,
  get,
  isNil,
  join,
  uniqueId,
} from "lodash";
import React, { useEffect, useReducer, useRef } from "react";
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
  handleExpand,
  showHidePendings,
  handleSubSlide,
  tasks,
  project,
  handleShowOrHideProject,
  handleSortTask,
  handleOpenModal,
  handleReload,
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
  const isLoading = useSelector(({ task }) => task?.listTask?.loading);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [itemLocation, setItemLocation] = React.useState({
    id: "",
    startIndex: 0,
    endIndex: 0,
  });
  const [state, dispatchState] = useReducer(reducer, {
    ...initialState,
    columnsFields: fields,
  });
  const refEdit = useRef(null);
  const refAlert = useRef(null);
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

  const _handleReOrderColumn = (id) => {
    console.log("aaaa", id);
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
            onReOrderColumns={_handleReOrderColumn}
            onAddColumns={_handleAddNewColumns}
            onHideColumn={_handleHideColumn}
            setItemLocation={setItemLocation}
          />

          <WPReactTable
            isGroup
            isCollapsed={expand}
            columns={columns}
            data={tasks.tasks}
            onReload={handleReload}
            onAddNewGroup={_handleAddNewGroup}
            onAddNewColumns={_handleAddNewColumns}
            onDragEnd={handleSortTask}
            onEditColumn={_handleEditColumn}
            onDeleteColumn={_handleDeleteColumn}
            onHideColumn={_handleHideColumn}
            onSortColumn={_handleSortColumn}
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
  onHideColumn,
  setItemLocation,
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
      onHideColumn={onHideColumn}
      setItemLocation={setItemLocation}
    />
  );
};

export default AllTaskTable;
