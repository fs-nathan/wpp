import AddIcon from "@mui/icons-material/Add";
import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useBlockLayout,
  useExpanded,
  useResizeColumns,
  useTable,
} from "react-table";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";
import ItemClone from "../ItemClone";
import { getCellStyle, getRowStyle } from "../utils";
import HeaderColumn from "./HeaderColumn";
import Row from "./Row";
import { scrollbarWidth } from "./Table";

const getTableHeight = () => {
  const rootDocument = document.getElementById("root");
  const height = rootDocument.offsetHeight;
  const headerTableNav = document.getElementById("project-topbar");
  return height - ((headerTableNav?.offsetHeight || 0) + 37);
};

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
  onDragEnd = () => {},
  onHideColumn = () => {},
  onSortColumn = () => {},
  onEditColumn = () => {},
  onDeleteColumn = () => {},
  onAddNewColumns = () => {},
  onAddNewGroup = () => {},
  ...props
}) => {
  const { t } = useTranslation();
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
  const { projectId } = useParams();
  const [dataRows, setDataRows] = React.useState([]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = table;

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
  const scrollTableHeight = React.useMemo(() => getTableHeight(), []);

  React.useEffect(() => {
    setDataRows(data);
  }, [data]);

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

  const _handleDragEnd = (result) => {
    console.log("@Pham_Tinh_Console:", result);
  };

  const _renderRowAddGroup = (row) => {
    if (!row) return null;
    const rowProps = row.getRowProps();
    return (
      <div className="tr row-add row-add-group" {...rowProps}>
        {row.cells.map((item, index) => {
          if (index !== 0) return null;
          const cellProps = item.getCellProps();
          return (
            <div
              {...cellProps}
              style={{
                ...cellProps.style,
                width: totalColumnsWidth + scrollBarSize + 50,
              }}
              className="td add-cell"
            >
              <CellAddGroup onClick={onAddNewGroup}>
                <AddIcon sx={{ fontSize: 18, marginRight: "5px" }} />
                <div>{t("add_group")}</div>
              </CellAddGroup>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div {...getTableProps()} className="table">
      {/* Header table */}
      <div
        id="header-row"
        className="wrapper-row-header"
        style={{ position: "sticky", top: 0, zIndex: 350 }}
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
        <Droppable droppableId="droppable-table">
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
                        />
                      );
                    }}
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
  );
};

const CellAddGroup = styled.div`
  font-size: 16px;
  padding: 0 8px;
  align-items: center;
  background-color: #00000000;
  border-radius: 6px;
  box-sizing: border-box;
  color: #6d6e6f;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-weight: 500;
  height: 36px;
  justify-content: center;
  line-height: 36px;
  transition-duration: 0.2s;
  transition-property: background, border, box-shadow, color, fill;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    background-color: #37171708;
    border-color: #00000000;
    color: #1e1f21;
    fill: #1e1f21;
  }
`;

export default WPTableGroup;
