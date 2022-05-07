import classNames from "classnames";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getCellStyle, getRowStyle } from "../utils";
import { getClassName } from "./Row";

const ItemRow = ({ id, isVisible = true, subRows = [] }) => {
  const ListCells = (row, provided) => {
    return row.cells.map((cell) => {
      const idCell = cell?.column?.id;
      return (
        <div
          {...cell.getCellProps()}
          style={{ ...getCellStyle(cell.getCellProps()) }}
          className={classNames("td", getClassName(idCell))}
        >
          {cell.render("Cell", {
            dragHandle: idCell === "name" ? provided.dragHandleProps : {},
          })}
        </div>
      );
    });
  };

  const getStyleWrapper = (isDraggingOver) => {
    if (isDraggingOver) return { height: subRows.length * 48 };
    return {};
  };

  return (
    <Droppable droppableId={id} type="sub-row">
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            className="wrapper-sub-rows"
            {...provided.droppableProps}
            style={getStyleWrapper(snapshot.isDraggingOver)}
          >
            {subRows.map((row) => {
              return (
                <Draggable
                  draggableId={row.original.id}
                  key={row.original.id}
                  index={row.index}
                >
                  {(provided, snapshot) => {
                    if (typeof row?.getRowProps !== "function") return null;
                    const rowProps = row.getRowProps();
                    const finalStyle = getRowStyle(
                      rowProps,
                      provided.draggableProps,
                      snapshot.isDragging
                    );
                    return (
                      <div
                        ref={provided.innerRef}
                        className="tr"
                        {...rowProps}
                        style={finalStyle}
                        {...provided.draggableProps}
                      >
                        {ListCells(row, provided)}
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
          </div>
        );
      }}
    </Droppable>
  );
};

export default ItemRow;
