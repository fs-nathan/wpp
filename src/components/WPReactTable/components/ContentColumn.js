import React from "react";

const ContentColumn = ({ cell, dragHandle = {}, ...props }) => {
  const canDragColumn = cell?.column?.id === "name";
  return (
    <div {...cell.getCellProps()} className="td">
      {cell.render("Cell", {
        dragHandle: canDragColumn ? dragHandle : {},
        ...props,
      })}
    </div>
  );
};

export default React.memo(ContentColumn);
