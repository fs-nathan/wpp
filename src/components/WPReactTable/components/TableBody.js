import React, { useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Row from "./Row";

const TableBody = ({
  rows,
  width,
  getTableBodyProps,
  scrollTableHeight,
  prepareRow,
  projectId,
  onReorderData = () => {},
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const refDroppableIdOver = useRef(null);

  const _handleDragEnd = (result) => {
    setIsVisible(true);
    const { destination, source, type } = result;
    if (refDroppableIdOver.current) {
      const stringQuery = `[data-rbd-droppable-id='${refDroppableIdOver.current.id}']`;
      const divWrapper = document.querySelector(stringQuery);

      divWrapper.style.height = `${refDroppableIdOver.current.oldHeight}px`;
      refDroppableIdOver.current = null;
    }

    // Saving data
    if (!destination) return;

    const isSameGroup = destination.droppableId === source.droppableId;
    const isSamePosition = destination.index === source.index;
    if (isSameGroup && isSamePosition) return;

    // Is group reorder
    if (type === "group") {
      onReorderData(result);
      return;
    }

    // Reordering in same list
    if (source.droppableId === destination.droppableId) {
      onReorderData(result, true);
      return;
    }

    // moving between Groups
    onReorderData(result, false, true);
  };

  const _handleBeforeCapture = (result) => {
    const draggableId = result?.draggableId || "";
    const index = rows.findIndex(
      (row) => row.original.id === draggableId && row.depth === 0
    );
    if (index >= 0) {
      setIsVisible(false);
    }
  };

  const _handleDragStart = (result) => {};

  const _handleDragUpdate = (result) => {
    const { destination, source } = result;
    const droppableIdWrapper = destination?.droppableId;

    if (droppableIdWrapper && droppableIdWrapper !== source?.droppableId) {
      const stringQuery = `[data-rbd-droppable-id='${droppableIdWrapper}']`;
      const divWrapper = document.querySelector(stringQuery);

      if (divWrapper) {
        const wrap = rows.find(
          ({ original }) => original.id === droppableIdWrapper
        );

        refDroppableIdOver.current = {
          id: droppableIdWrapper,
          oldHeight: divWrapper.clientHeight,
        };
        divWrapper.style.height = `${wrap?.subRows?.length * 48 + 48}px`;
      }
    }
  };

  return (
    <DragDropContext
      onBeforeCapture={_handleBeforeCapture}
      onDragStart={_handleDragStart}
      onDragEnd={_handleDragEnd}
      onDragUpdate={_handleDragUpdate}
    >
      <Droppable droppableId="droppable-table" type="group">
        {(provided) => (
          <div
            className="tbody"
            ref={provided.innerRef}
            {...getTableBodyProps()}
            {...provided.droppableProps}
            style={{
              maxHeight: scrollTableHeight,
              height: scrollTableHeight,
              overflow: "auto",
            }}
          >
            {rows.map((row, i) => {
              prepareRow(row);
              if (row.depth !== 0) return null;

              return (
                <Draggable
                  draggableId={row.original.id}
                  key={row.original.id}
                  index={row.index}
                >
                  {(provided, snapshot) => {
                    const rowProps = row.getRowProps();

                    return (
                      <Row
                        key={rowProps.key}
                        row={row}
                        provided={provided}
                        rowProps={rowProps}
                        snapshot={snapshot}
                        isVisible={isVisible}
                        projectId={projectId}
                        width={width}
                      />
                    );
                  }}
                </Draggable>
              );
            })}

            {/* <RowAddGroup
                row={rows[0]}
                width={totalColumnsWidth + scrollBarSize + 50}
              /> */}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const getTableHeight = () => {
  const rootDocument = document.getElementById("root");
  const height = rootDocument.offsetHeight;
  const headerTableNav = document.getElementById("project-topbar");
  return height - ((headerTableNav?.offsetHeight || 0) + 37);
};

//React.memo with custom function to prevent render lag when resizing
export default React.memo(
  TableBody,
  (prevProps, nextProps) => nextProps.isColumnResizing
);
