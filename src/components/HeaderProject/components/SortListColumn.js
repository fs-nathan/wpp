import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BasicSwitch from "./BasicSwitch";

const fakeItems = [
  { id: "item-1", primary: "Nhóm" },
  { id: "item-2", primary: "Tiến độ" },
  { id: "item-3", primary: "Trạng thái" },
  { id: "item-4", primary: "Ghi chú thêm" },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  ...(isDragging && {}),
  paddingLeft: 16,
  paddingRight: 0,
  borderRadius: 5,
  border: "1px solid rgba(0, 0, 0, 0.1)",
  color: "#666",
  marginBottom: 10,
  "& > div": {
    paddingLeft: 0,
  },
});

const getListStyle = (isDraggingOver) => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 0,
});

const SortListColumn = () => {
  const [items, setItems] = useState(fakeItems);

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
                      <ListItemIcon style={{ minWidth: 36 }}>
                        <DragIndicatorIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.primary} />
                      <BasicSwitch
                        defaultChecked
                        style={{ margin: 0, marginRight: "-10px" }}
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
};

export default SortListColumn;
