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
  onDeleteColumn = () => {},
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
          {headerGroups.map((headerGroup, index) => {
            const headerProps = headerGroup.getHeaderGroupProps();
            const listHeaders = headerGroup.headers;

            return (
              <div
                {...headerProps}
                style={{
                  ...headerProps.style,
                  width: `calc(${headerProps.style.width} - 20px)`,
                }}
                key={`header_group_${index}`}
                className="tr header"
              >
                {listHeaders.map((column, index) => {
                  const key = column?.original?.id || index;
                  return (
                    <HeaderColumn
                      key={`column_header_${key}`}
                      zIndex={listHeaders.length - index}
                      isSticky={!index}
                      length={listHeaders.length}
                      column={column}
                      isFirstColumn={index === 0}
                      isLastColumn={index === listHeaders.length - 1}
                      onAddNewColumns={onAddNewColumns}
                      onHideColumn={onHideColumn}
                      onSortColumn={onSortColumn}
                      onEditColumn={onEditColumn}
                      onDeleteColumn={onDeleteColumn}
                    />
                  );
                })}
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
                  /* Just a debugging tool. */
                  {
                    /* console.log(row); */
                  }
                  prepareRow(row);
                  if (row.depth !== 0) return null;
                  return (
                    <Draggable
                      key={row.original.id}
                      draggableId={row.original.id}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <GroupColumn
                          key={row.original.id}
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
