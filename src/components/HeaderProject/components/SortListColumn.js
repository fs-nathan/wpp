import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@material-ui/core";
import { isArray } from "lodash";
import RootRef from "@material-ui/core/RootRef";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { listColumns } from "actions/columns/listColumns";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SortListColumn = React.forwardRef((props, ref) => {
  const { projectId } = useParams();
  const fields = useSelector(({ columns }) => columns?.listColumns?.data || []);
  const [items, setItems] = useState(fields);
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({ _addColumns }));

  React.useEffect(() => {
    setItems(fields);
  }, [fields]);

  const _addColumns = (dataColumn) => {
    if (!dataColumn) return;
    /* Dispatching an action to the Redux store. */
    dispatch(listColumns({ project_id: projectId }));
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) return;

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  if (!isArray(items)) return null;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
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
                        <DragIndicatorIcon
                          style={{
                            width: "18px",
                            height: "18px",
                            fill: "#6d6e6f",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        style={{ color: "#1e1f21" }}
                      />
                      <AntSwitch
                        defaultChecked={item.is_show}
                        style={{ marginRight: 5 }}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
});

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

export default SortListColumn
