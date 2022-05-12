import { width } from "@mui/system";
import React, { useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useBlockLayout,
  useExpanded,
  useResizeColumns,
  useTable,
} from "react-table";
import { useSticky } from "react-table-sticky";
import HeaderColumn from "./HeaderColumn";
import { scrollbarWidth } from "./Table";
import TableBody, { getTableHeight } from "./TableBody";

export function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const WPTableGroup = ({
  columns,
  data,
  displayAddColumn = false,
  onHideColumn = () => {},
  onSortColumn = () => {},
  onEditColumn = () => {},
  onDeleteColumn = () => {},
  onAddNewColumns = () => {},
  onAddNewGroup = () => {},
  onReorderData = () => {},
  ...props
}) => {
  const { projectId } = useParams();

  const refMousePosition = useRef({ x: 0, y: 0 });

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

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

  const expanded = getInitialExpand();

  const table = useTable(
    {
      columns,
      data,
      getSubRows,
      initialState: { expanded },
      onReorderData,
    },
    useBlockLayout,
    useResizeColumns,
    useSticky,
    useExpanded
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
    state,
  } = table;

  const isColumnResizing = !!state.columnResizing.isResizingColumn;

  React.useLayoutEffect(() => {
    const _handleMouseUpdate = (event) => {
      refMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    document.addEventListener("mousemove", _handleMouseUpdate, false);
    document.addEventListener("mouseenter", _handleMouseUpdate, false);

    return () => {
      document.removeEventListener("mousemove", _handleMouseUpdate, false);
      document.removeEventListener("mouseenter", _handleMouseUpdate, false);
    };
  }, []);

  React.useLayoutEffect(() => {
    const tbody = document.querySelectorAll(".tbody")[0];
    const header = document.getElementById("header-row");
    if (tbody) {
      tbody.addEventListener("scroll", (e) => _handleSyncScroll(e, header));
    }
  }, []);

  const _handleSyncScroll = (e, scrollSync) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    scrollSync.scrollLeft = scrollLeft;
  };

  const scrollTableHeight = React.useMemo(() => getTableHeight(), []);

  return (
    <div {...getTableProps()} className="table">
      {/* Header table */}
      <div
        id="header-row"
        className="wrapper-row-header"
        style={{ position: "sticky", top: 0, zIndex: 350, overflow: "hidden" }}
      >
        {headerGroups.map((headerGroup, index) => {
          const headerProps = headerGroup.getHeaderGroupProps();
          const listHeaders = headerGroup.headers;

          return (
            <div
              {...headerProps}
              style={{
                ...headerProps.style,
                width: totalColumnsWidth + scrollBarSize + 50,
              }}
              key={`header_group_${index}`}
              className="tr header"
            >
              {listHeaders.map((column, index) => {
                const key = column?.original?.id || index;
                return (
                  <HeaderColumn
                    key={`column_header_${key}`}
                    projectId={projectId}
                    zIndex={listHeaders.length - index}
                    isSticky={!index}
                    length={listHeaders.length}
                    column={column}
                    isFirstColumn={index === 0}
                    isLastColumn={index === listHeaders.length - 1}
                    scrollTableHeight={scrollTableHeight}
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

      <TableBody
        rows={rows}
        width={width}
        prepareRow={prepareRow}
        getTableBodyProps={getTableBodyProps}
        isColumnResizing={isColumnResizing}
        scrollTableHeight={scrollTableHeight}
        onReorderData={onReorderData}
      />
    </div>
  );
};

export default WPTableGroup;
