import classNames from "classnames";
import React from "react";

const ContentTable = ({ data = [], prepareRow = () => {} }) => {
  console.log("@Pham_Tinh_Console:", data);

  return data.map((item) => (
    <Item key={item.original.id} prepareRow={prepareRow} {...item} />
  ));
};

const Item = ({ cells = [], prepareRow }) => {
  console.log("@Pham_Tinh_Console:", cells);
  prepareRow();
  return (
    <div className="tr">
      {cells.map((cell) => (
        <ContentColumn
          cell={cell}
          //   dragHandle={{ ...provided.dragHandleProps }}
        />
      ))}
    </div>
  );
};

const ContentColumn = ({ cell, dragHandle = {} }) => {
  const canDragColumn = cell?.column?.id === "name";
  const cellProps = cell?.getCellProps();
  const styleProps = cellProps.style;

  return (
    <div
      {...cellProps}
      style={{ ...styleProps, maxWidth: styleProps.width }}
      className={classNames("td", {
        "column-align-right": cell?.column?.id === "progress",
        "column-align-center":
          cell?.column?.id === "start_date" || cell?.column?.id === "end_date",
      })}
    >
      {cell.render("Cell", {
        dragHandle: canDragColumn ? dragHandle : {},
      })}
    </div>
  );
};

export default ContentTable;
