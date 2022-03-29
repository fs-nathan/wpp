import classNames from "classnames";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import { FixedSizeList } from "react-window";
import ItemClone, { getStyle } from "../ItemClone";
import HeaderColumn from "./HeaderColumn";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function Item({ provided, item, style, isDragging }) {
  if (!item) return null;
  return (
    <div
      className="tr"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging,
      })}
    >
      {item.cells.map((cell) => {
        return (
          <ContentColumn
            cell={cell}
            dragHandle={{ ...provided.dragHandleProps }}
          />
        );
      })}
    </div>
  );
}

const WPTable = ({
  columns,
  data,
  selectedSort = null,
  displayAddColumn = false,
  onDragEnd = () => {},
  onSort = () => {},
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 120,
      width: 150,
      maxWidth: 450,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useSticky
  );

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const RenderRow = React.useCallback(
    function Row(props) {
      const { data: items, index, style } = props;
      const item = items[index];
      prepareRow(item);
      return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
          {(provided) => <Item provided={provided} item={item} style={style} />}
        </Draggable>
      );
    },
    [prepareRow]
  );

  const _handleDragEnd = (e) => {};

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

        <DragDropContext onDragEnd={_handleDragEnd}>
          <Droppable
            droppableId="droppable-table"
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
              <ItemClone
                provided={provided}
                isDragging={snapshot.isDragging}
                item={rows[rubric.source.index].original}
              />
            )}
          >
            {(provided) => (
              <div {...getTableBodyProps()}>
                <FixedSizeList
                  className="tbody"
                  style={{ overflow: "visible" }}
                  itemCount={rows.length}
                  itemSize={47}
                  height={800}
                  outerRef={provided.innerRef}
                  itemData={rows}
                  width={totalColumnsWidth + scrollBarSize}
                >
                  {RenderRow}
                </FixedSizeList>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
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

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute(
    "style",
    "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export default WPTable;
