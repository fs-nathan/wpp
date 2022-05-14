import classNames from "classnames";
import React from "react";
import { getCellStyle, getRowStyle } from "../utils";
import ItemRow from "./ItemRow";
import RowAddTask from "./RowAddTask";

const Row = ({
  row,
  width,
  provided,
  rowProps,
  snapshot,
  isVisible = true,
}) => {
  const finalStyle = getRowStyle(
    rowProps,
    provided.draggableProps,
    snapshot.isDragging,
    width
  );

  const style = { display: "flex", ...finalStyle };

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
    <>
      <div
        ref={provided.innerRef}
        id={row.id}
        className="tr"
        {...rowProps}
        {...provided.draggableProps}
        style={style}
      >
        {ListCells()}
      </div>

      {isVisible && row.isExpanded && (
        <ItemRow id={row.original.id} width={width} subRows={row.subRows} />
      )}

      <RowAddTask id={row.id} cells={row.cells} {...rowProps} style={style} />
    </>
  );
};

export const getClassName = (id) => ({
  "column-align-right": id === "progress",
  "column-align-center": id === "start_date" || id === "end_date",
});

export default Row;
