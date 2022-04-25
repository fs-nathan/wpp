import classNames from "classnames";
import React from "react";

const ContentColumn = ({
  cell,
  dragHandle = {},
  isGroupColumn = false,
  hasSub = false,
  ...props
}) => {
  const canDragColumn = cell?.column?.id === "name";
  const cellProps = cell.getCellProps();

  return (
    <div
      {...cellProps}
      style={{
        ...cellProps.style,
        maxWidth: cellProps.style.width,
      }}
      className={classNames("td", { isGroupColumn, hasSub })}
    >
      {cell.render("Cell", {
        dragHandle: canDragColumn ? dragHandle : {},
        ...props,
      })}
    </div>
  );
};

export default ContentColumn;
