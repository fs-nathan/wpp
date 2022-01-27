import React, { useCallback, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  useBlockLayout,
  useExpanded,
  useResizeColumns,
  useTable,
} from "react-table";
import { useSticky } from "react-table-sticky";
import GroupColumn from "./GroupColumn";
import HeaderColumn from "./HeaderColumn";

const WPTableGroup = ({
  columns,
  data,
  displayAddColumn = false,
  onDragEnd = () => {},
  onHideColumn = () => {},
  onSortColumn = () => {},
  onEditColumn = () => {},
  onAddNewColumns = () => {},
  ...props
}) => {
  const getSubRows = useCallback((row) => {
    return row.tasks || [];
  }, []);

  const getInitialExpand = useMemo(
    () => () => {
      const result = {};
      for (let index = 0; index < data.length; index++) {
        result[`${index}`] = true;
      }
      return result;
    },
    [data.length]
  );

  const table = useTable(
    {
      columns,
      data,
      getSubRows,
      initialState: {
        expanded: getInitialExpand(),
      },
    },
    useBlockLayout,
    useResizeColumns,
    useSticky,
    useExpanded
  );

  const { getTableProps, headerGroups, rows, prepareRow } = table;

  const _handleDragEnd = (result) => {
    onDragEnd(
      result?.draggableId,
      result?.destination?.droppableId,
      result?.destination?.index
    );
  };

  return (
    <div>
      <div {...getTableProps()} className="table">
        {/* Header table */}
        <div style={{ position: "sticky", top: 0, zIndex: 350 }}>
          {headerGroups.map((headerGroup) => {
            const headerProps = headerGroup.getHeaderGroupProps();
            return (
              <div
                {...headerProps}
                style={{
                  ...headerProps.style,
                  width: `calc(${headerProps.style.width} - 20px)`,
                }}
                className="tr header"
              >
                {headerGroup.headers.map((column, index) => (
                  <HeaderColumn
                    isSticky={!index}
                    column={column}
                    isLastColumn={index === headerGroup.headers.length - 1}
                    onAddNewColumns={onAddNewColumns}
                    onHideColumn={onHideColumn}
                    onSortColumn={onSortColumn}
                    onEditColumn={onEditColumn}
                  />
                ))}
              </div>
            );
          })}
        </div>
        {/*End header table */}

        {/* Body of table */}
        <DragDropContext onDragEnd={_handleDragEnd}>
          <Droppable droppableId="table-body-group">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="tbody"
                style={{
                  maxHeight: "calc((((100vh - 55px) - 60px) - 55px) - 12px)",
                  overflow: "visible",
                }}
              >
                {rows.map((row, i) => {
                  prepareRow(row);
                  if (row.depth !== 0) return null;
                  return (
                    <Draggable
                      key={row.id}
                      draggableId={row.original.id}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <GroupColumn
                          row={row}
                          provided={provided}
                          snapshot={snapshot}
                          {...props}
                        />
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

export default WPTableGroup;
