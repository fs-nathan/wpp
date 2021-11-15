import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

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
                      {...provided.dragHandleProps}
                      className="tr"
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        row.getRowProps().style
                      )}
                    >
                      {row.cells.map((cell) => {
                        return <ContentColumn cell={cell} />;
                      })}
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

const ContentColumn = ({ cell }) => {
  return (
    <div {...cell.getCellProps()} className="td">
      {cell.render("Cell")}
    </div>
  );
};

export default ServiceCommandUnit;
