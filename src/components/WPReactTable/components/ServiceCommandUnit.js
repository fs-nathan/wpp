import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ListContentColumn from "./ListContentColumn";

const getItemStyle = (isDragging, draggableStyle, rowStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  ...(isDragging && {}),
  ...rowStyle,
});

const ServiceCommandUnit = ({ id, data = [] }) => {
  return (
    <Droppable droppableId={id} type={`droppableSubItem`}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {data.map((row, i) => {
            return (
              <Draggable key={row.id} draggableId={row.original.id} index={i}>
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...row.getRowProps()}
                      {...provided.draggableProps}
                      className="tr"
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        row.getRowProps().style
                      )}
                    >
                      <ListContentColumn
                        data={row.cells}
                        dragHandle={{ ...provided.dragHandleProps }}
                      />
                    </div>
                    {provided.placeholder}
                  </>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ServiceCommandUnit;
