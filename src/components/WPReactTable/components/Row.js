import classNames from "classnames";
import React from "react";
import { getCellStyle, getRowStyle } from "../utils";

const Row = ({ row, provided, rowProps, snapshot }) => {
  const finalStyle = getRowStyle(
    rowProps,
    provided.draggableProps,
    snapshot.isDragging
  );

  const ListCells = () => {
    return row.cells.map((cell) => {
      const idCell = cell?.column?.id;
      return (
        <div
          {...cell.getCellProps()}
          style={{ ...getCellStyle(cell.getCellProps()) }}
          className={classNames("td isGroupColumn", getClassName(idCell))}
        >
          {cell.render("Cell", {
            dragHandle: idCell === "name" ? provided.dragHandleProps : {},
          })}
        </div>
      );
    });
  };

  return (
    <div
      ref={provided.innerRef}
      className="tr"
      {...rowProps}
      style={{ display: "flex", ...finalStyle }}
      {...provided.draggableProps}
    >
      {ListCells()}
    </div>
  );
};

const getClassName = (id) => ({
  "column-align-right": id === "progress",
  "column-align-center": id === "start_date" || id === "end_date",
});

export default Row;
