import React from "react";
import styled from "styled-components";
import WPTable from "./components/Table";
import WPTableGroup from "./components/TableGroup";

const WPReactTable = ({
  isCollapsed = false,
  columns,
  data,
  isGroup = false,
  onDragEnd = () => {},
  onAddNewColumns = () => {},
  ...props
}) => {
  return (
    <Styles isCollapsed={isCollapsed}>
      {isGroup ? (
        <WPTableGroup
          data={data}
          columns={columns}
          onDragEnd={onDragEnd}
          onAddNewColumns={onAddNewColumns}
          {...props}
        />
      ) : (
        <WPTable
          data={data}
          columns={columns}
          onDragEnd={onDragEnd}
          {...props}
        />
      )}
    </Styles>
  );
};

const Styles = styled.div`
  display: block;

  .table {
    border-spacing: 0;
    overflow: auto;
    max-width: ${({ isCollapsed }) =>
      !isCollapsed ? "calc(100vw - 370px)" : "calc(100vw - 70px)"};

    .thead {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100vh;
    }

    .tr {
      display: flex;
      height: 47px;
      contain: style;
      margin-bottom: -1px;
      margin-top: -1px;
      &:hover {
        background-color: #f9f8f8;
        .td {
          background-color: #f9f8f8;
        }
      }

      &.row-add {
        .td {
          border-right: 1px solid #edeae9 !important;
          border-top: 1px solid #edeae9 !important;
          z-index: 201;
          &:last-child {
            border-right: 0 !important;
          }
        }

        .td:not(:first-child) {
          border: 0;
        }
      }

      &.header {
        background-color: #f1f2f4;
        box-sizing: border-box;
        flex: 0 0 auto;
        height: 37px;
      }
      .td:last-child {
        border-right-color: transparent;
      }
    }

    .td {
      background-color: #fff;
      border: 1px solid #edeae9;
      box-sizing: border-box;
      padding: 0 8px;
      z-index: 0;
      align-items: center;
      display: inline-flex !important;
      height: 47px;
      overflow: hidden;
      justify-content: flex-start;
      margin-right: -1px;

      &[data-sticky-td="true"] {
        z-index: 300 !important;
        border: 1px solid #edeae9;
        padding: 0 4px 0 24px;
        justify-content: space-between;
        flex: 1 1 auto;
        min-width: 1px;
        &:hover {
          border: 1px solid #edeae9;
        }
        &.isGroupColumn {
          border-right: 1px solid #edeae9;
        }
      }

      .icon_add {
        visibility: hidden;
      }

      &.isGroupColumn {
        border: 0;
        &:hover {
          border: 0;
          .drag-icon {
            visibility: visible !important;
          }
        }
      }

      &:hover {
        border: 1px solid #edeae9;
        overflow: unset;
        z-index: 201;

        .canHide,
        .default_tag,
        .icon,
        .icon_add {
          visibility: visible;
        }
      }

      &.focus {
        z-index: 200;
        border-color: #4573d2 !important;
      }
    }
  }
`;

export default WPReactTable;
