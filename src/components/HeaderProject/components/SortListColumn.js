import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { listColumns } from "actions/columns/listColumns";
import EditColumnModal from "components/WPReactTable/components/EditColumnModal";
import { isArray } from "lodash";
import React, { useReducer, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { COLUMNS_TASK_TABLE } from "views/ProjectPage/RightPart/constant/Columns";
import { convertFieldsToTable } from "views/ProjectPage/RightPart/utils";
import { get } from "lodash";
import "./index.scss";
import { useTimes } from "components/CustomPopover";
import { localOptionSelector } from "views/ProjectGroupPage/selectors";
import { listTask } from "actions/task/listTask";
import { listGroupTask } from "actions/groupTask/listGroupTask";
import moment from "moment";

const initialState = {
  arrColumns: COLUMNS_TASK_TABLE,
  isEmpty: true,
  isLoading: false,
  isSetted: false,
};

const initialStatePopup = { openMenu: false, anchorEl: null };

const reducer = (state, action) => {
  return { ...state, ...action };
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SortListColumn = React.forwardRef(
  ({ onReOrderColumns, localOption, onHideColumn, setItemLocation }, ref) => {
    const times = useTimes();
    const { projectId } = useParams();
    const fields = useSelector(
      ({ columns }) => columns?.listColumns?.data || []
    );
    const { pathname } = useLocation();
    const [, , , id] = pathname.split("/");
    const { timeType } = localOption;
    const timeRange = React.useMemo(() => {
      const [timeStart, timeEnd] = times[timeType].option();
      return {
        timeStart,
        timeEnd,
      };
    }, [timeType]);

    const [items, setItems] = useState(fields);
    const [state, dispatchState] = useReducer(reducer, {
      ...initialState,
      columnsFields: fields,
    });
    const refEdit = useRef(null);
    const dispatch = useDispatch();

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

    const reloadListTaskAndGroupTask = () => {
      dispatch(listColumns({ project_id: projectId || id }));
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
          reloadListTaskAndGroupTask()
        ),
        isSetted: true,
      });
    };

    const _handleEditField = (column) => {
      dispatchState(initialStatePopup);
      _handleEditColumn(column.data_type, {
        dataType: column.data_type,
        idType: column.id,
        name: column.name,
        optionsType: column.options || [],
      });
    };

    React.useImperativeHandle(ref, () => ({ _addColumns }));

    React.useEffect(() => {
      setItems(fields);
    }, [fields]);

    const _addColumns = (dataColumn) => {
      if (!dataColumn) return;
      /* Dispatching an action to the Redux store. */
      dispatch(listColumns({ project_id: projectId }));
    };
    const onChangeCheck = (e, id, index) => {
      const statusUpdate = e.target.checked ? 1 : 0;
      onHideColumn(id, statusUpdate, index);
    };
    const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) return;
      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );

      setItemLocation({
        id: items[result.source.index].id,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      });
      setItems(newItems);
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
          reloadListTaskAndGroupTask()
        ),
        isSetted: true,
      });
    };

    if (!isArray(items)) return null;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List
                className="list_data_management"
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={
                        item?.is_default && item.id === "pfd-name"
                      }
                    >
                      {(provided, snapshot) => {
                        return (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <ListItemIcon style={{ minWidth: "20px" }}>
                              <DragIndicatorIcon style={iconStyle} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.name}
                              style={{ color: "#1e1f21" }}
                            />
                            {!item?.is_default && (
                              <ListItemIcon
                                onClick={() => _handleEditField(item)}
                                className="icon_edit"
                                style={{ minWidth: "20px" }}
                              >
                                <ModeEditIcon style={iconStyle} />
                              </ListItemIcon>
                            )}
                            <AntSwitch
                              onChange={(e) => onChangeCheck(e, item.id, index)}
                              defaultChecked={item.is_show}
                              style={{ marginRight: 5 }}
                              inputProps={{ "aria-label": "ant design" }}
                              disabled={item?.is_default}
                            />
                          </ListItem>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
        <EditColumnModal
          ref={refEdit}
          onUpdateSuccess={_handleUpdateFieldSuccess}
          onDeleteSuccess={_handleDeleteFieldSuccess}
        />
      </DragDropContext>
    );
  }
);

const iconStyle = { width: "18px", height: "18px", fill: "#6d6e6f" };

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  ...(isDragging && {}),
  borderRadius: 5,
  border: "1px solid rgba(0, 0, 0, 0.1)",
  color: "#666",
  marginBottom: 10,
  "& > div": {
    paddingLeft: 0,
  },
  boxShadow: "0 0 0 1px #edeae9, 0 1px 4px 0 rgb(109 110 111 / 8%)",
  borderColor: "#fff",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "8px",
  padding: "8px 4px",
});

const getListStyle = (isDraggingOver) => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 0,
});

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const mapStateToProps = (state) => {
  return {
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doListTask: ({ projectId, timeStart, timeEnd }, quite) =>
      dispatch(listTask({ projectId, timeStart, timeEnd }, quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortListColumn);
