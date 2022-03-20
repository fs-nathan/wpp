import classNames from "classnames";
import React, { useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import HeaderColumn from "./HeaderColumn";
import HeadingColumn from "./HeadingColumn";

const getItemStyle = (isDragging, draggableStyle, rowStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  ...(isDragging && {}),
  ...rowStyle,
});

const WPTable = ({
  columns,
  data,
  selectedSort = null,
  displayAddColumn = false,
  onDragEnd = () => {},
  onSort = () => {},
}) => {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 120,
      width: 150,
      maxWidth: 450,
    }),
    []
  );

  const table = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useSticky
  );

  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <div>
      <div {...getTableProps()} className="table">
        {/* Header table */}
        <div style={{ position: "sticky", top: 0, zIndex: 350 }}>
          {headerGroups.map((headerGroup) => {
            const headerProps = headerGroup.getHeaderGroupProps();
            const listHeaders = headerGroup.headers;

            return (
              <div
                {...headerProps}
                style={{
                  ...headerProps.style,
                  width: `calc(${headerProps.style.width} - 20px)`,
                }}
                className="tr header"
              >
                {listHeaders.map((column, index) => (
                  <HeaderColumn
                    zIndex={listHeaders.length - index}
                    isSticky={!index}
                    length={listHeaders.length}
                    column={column}
                    isFirstColumn={index === 0}
                    selectedSort={selectedSort}
                    typeMenu="default"
                    onSortColumn={onSort}
                  />
                ))}
              </div>
            );
          })}
        </div>
        {/*End header table */}

        {/* Body of table */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="table-body">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="tbody"
                style={{
                  maxHeight: "calc(100vh - 37px - 60px - 55px - 15px)",
                  overflow: "visible",
                }}
              >
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Draggable
                      key={row.id}
                      draggableId={row.original.id}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div>
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
                            {row.cells.map((cell) => {
                              return (
                                <ContentColumn
                                  cell={cell}
                                  dragHandle={{ ...provided.dragHandleProps }}
                                />
                              );
                            })}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* End body of table */}
      </div>
    </div>
  );
};

const ContentColumn = ({ cell, dragHandle = {} }) => {
  const canDragColumn = cell?.column?.id === "name";
  const cellProps = cell.getCellProps();
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

export default WPTable;
