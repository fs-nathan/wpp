import classNames from "classnames";
import React, { useRef } from "react";
import { getCellStyle, getRowStyle } from "../utils";
import ItemRow from "./ItemRow";
import RowAddTask from "./RowAddTask";

const Row = ({
  row,
  width,
  provided,
  rowProps,
  snapshot,
  projectId,
  isVisible = true,
}) => {
  const refAddRow = useRef(null);

  const finalStyle = getRowStyle(
    rowProps,
    provided.draggableProps,
    snapshot.isDragging,
    width
  );

  const style = { display: "flex", ...finalStyle };

  const _handleToggleAdd = () => {
    refAddRow.current._toggle();
  };

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
            handleToggleAdd: _handleToggleAdd,
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
        <ItemRow
          id={row.original.id}
          width={width}
          subRows={row.subRows}
          projectId={projectId}
        />
      )}

      {isVisible && row.isExpanded && (
        <RowAddTask
          ref={refAddRow}
          id={`row_add_task_id_${row.id}`}
          cells={row.cells}
          {...rowProps}
          indexGroup={row.index}
          groupId={row.original.id}
          projectId={projectId}
          key={`row_add_task_key_${rowProps.key}`}
          style={style}
        />
      )}
    </>
  );
};

export const getClassName = (id) => ({
  "column-align-right": id === "progress",
  "column-align-center": id === "start_date" || id === "end_date",
});

export default React.memo(Row);
