import classNames from "classnames";
import React from "react";
import { getCellStyle, getRowStyle } from "../utils";
import ItemRow from "./ItemRow";

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

  console.log("@Pham_Tinh_Console:", width);

  return (
    <>
      <div
        ref={provided.innerRef}
        id={row.id}
        className="tr"
        {...rowProps}
        {...provided.draggableProps}
        style={{
          display: "flex",
          ...finalStyle,
        }}
      >
        {ListCells()}
      </div>

      {isVisible && row.isExpanded && (
        <ItemRow id={row.original.id} width={width} subRows={row.subRows} />
      )}
    </>
  );
};

export const getClassName = (id) => ({
  "column-align-right": id === "progress",
  "column-align-center": id === "start_date" || id === "end_date",
});

export default Row;
