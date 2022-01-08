import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  useBlockLayout,
  useExpanded,
  useResizeColumns,
  useTable,
} from "react-table";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";
import GroupColumn from "./GroupColumn";

const WPTableGroup = ({
  columns,
  data,
  displayAddColumn = false,
  onDragEnd = () => {},
  onAddNewColumns = () => {},
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
        <div style={{ position: "sticky", top: 0, zIndex: 9 }}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr header">
              {headerGroup.headers.map((column, index) => (
                <HeaderColumn
                  isSticky={!index}
                  column={column}
                  isLastColumn={index === headerGroup.headers.length - 1}
                  onAddNewColumns={onAddNewColumns}
                />
              ))}
            </div>
          ))}
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

const HeaderColumn = ({
  column,
  isSticky = false,
  isLastColumn = false,
  onAddNewColumns = () => {},
}) => {
  return (
    <HeaderColumnWrapper
      {...column.getHeaderProps()}
      isLastColumn={isLastColumn}
      className={classNames({ isSticky })}
    >
      <LeftStructure isLastColumn={isLastColumn}>
        <Heading>{column.render("Header", { onAddNewColumns })}</Heading>
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

const HeaderColumnWrapper = styled.div`
  align-items: center;
  background-color: #f1f2f4;
  border-right: 1px solid #edeae9;
  border-top: 1px solid #edeae9;
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  z-index: 0;
  margin: 0;
  color: #6d6e6f;
  margin-right: -1px;
  position: relative;

  &[data-sticky-td="true"] {
    z-index: 3;
  }
`;
const LeftStructure = styled.div`
  cursor: pointer;
  align-items: stretch;
  color: #666;
  display: flex;
  flex: 1 0 auto;
  font-size: 12px;
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
  height: 100%;
  position: absolute;
  right: -5px;
  top: 0;
  width: 10px;
  z-index: 100;

  &:hover {
    background: #008ce3;
    &:after {
      content: "";
    }
  }
  &:after {
    content: none;
    position: absolute;
    height: 100vh;
    background: ${(props) => (!props.isResizing ? "#008ce3" : "#008ce3")};
    width: 1px;
    left: 4px;
    z-index: 3;
  }
`;

const Heading = styled.div``;

export default WPTableGroup;
