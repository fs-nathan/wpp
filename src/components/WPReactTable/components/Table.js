import classNames from "classnames";
import React, { useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";

const getItemStyle = (isDragging, draggableStyle, rowStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  ...(isDragging && {}),
  ...rowStyle,
});

const WPTable = ({
  columns,
  data,
  displayAddColumn = false,
  onDragEnd = () => {},
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
        <div style={{ position: "sticky", top: 0, zIndex: 9 }}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column, index) => (
                <HeaderColumn
                  column={column}
                  isLastColumn={index === headerGroup.headers.length - 1}
                />
              ))}
            </div>
          ))}
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
                  maxHeight: "calc(100vh - 37px - 60px - 55px - 17px)",
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

const HeaderColumn = ({ column, isSticky = false, isLastColumn = false }) => {
  return (
    <HeaderColumnWrapper
      {...column.getHeaderProps()}
      isLastColumn={isLastColumn}
      className={classNames({ isSticky })}
    >
      <LeftStructure isLastColumn={isLastColumn}>
        <Heading>{column.render("Header")}</Heading>
      </LeftStructure>
      {!isLastColumn && (
        <ResizeDiv
          {...column.getResizerProps()}
          isResizing={column.isResizing}
        />
      )}
    </HeaderColumnWrapper>
  );
};

const ContentColumn = ({ cell, dragHandle = {} }) => {
  const canDragColumn = cell?.column?.id === "name";
  return (
    <div {...cell.getCellProps()} className="td">
      {cell.render("Cell", {
        dragHandle: canDragColumn ? dragHandle : {},
      })}
    </div>
  );
};

const HeaderColumnWrapper = styled.div`
  align-items: stretch;
  background-color: #f1f2f4;
  display: flex;
  flex-direction: column;
  height: 37px;
  left: 0;
  position: absolute;
  border-right: ${(props) => (props.isLastColumn ? "0" : "1px solid #e8ecee")};
  border-bottom: 1px solid #e8ecee;
  &.isSticky {
    position: sticky !important;
  }
`;
const LeftStructure = styled.div`
  cursor: pointer;
  align-items: stretch;
  color: #666;
  display: flex;
  flex: 1 0 auto;
  font-size: 12px;
  margin-right: -1px;
  padding-left: 24px;
  height: 100%;
  position: relative;
  align-items: center;
  border-right: ${(props) => (props.isLastColumn ? "0" : "1px solid #e8ecee")};
  justify-content: ${(props) => (props.isLastColumn ? "center" : "start")};

  &:hover {
    background-color: #f6f8f9;
    color: #151b26;
    fill: #151b26;
  }
`;

const ResizeDiv = styled.div`
  display: inline-block;
  background: transparent;
  width: 8px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 3;
  touch-action: none;
  &:hover {
    background: #008ce3;
  }
  &:after {
    content: "";
    position: absolute;
    height: 100vh;
    background: ${(props) => (!props.isResizing ? "transparent" : "#008ce3")};
    width: 1px;
    left: 50%;
    transform: translateX(50%);
    z-index: 3;
  }
`;

const Heading = styled.div``;

export default WPTable;
