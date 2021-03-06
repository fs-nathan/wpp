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
    <Styles className="not-group-table" isCollapsed={isCollapsed}>
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

  &.not-group-table {
    .table {
      overflow: hidden !important;
      .wrapper-row-header {
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        scrollbar-width: none; /* for Firefox */
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none; /* for Chrome, Safari, and Opera */
        }
      }
    }
    .tbody {
      max-width: 100% !important;
    }
  }

  .table {
    border-spacing: 0;
    overflow: auto;

    max-width: ${({ isCollapsed }) =>
      !isCollapsed ? "calc(100vw - 370px)" : "calc(100vw - 70px)"};

    &.has-total {
      position: relative;
    }

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
          border-right: 0 !important;
          border-left: 0 !important;
          border-top: 1px solid #edeae9 !important;
          border-bottom: 0;
          z-index: 201;
          cursor: pointer;
          &:hover {
            border-bottom: 0;
          }

          &:first-child {
            border-right: 1px solid #edeae9 !important;
          }
          &:last-child {
            border-right: 0 !important;
          }
        }

        .td:not(:first-child) {
          border: 0;
        }

        &.row-add-group {
          .td {
            border: 0 !important;
          }
          &:hover {
            background-color: transparent;
            .td {
              background-color: transparent;
            }
          }
        }
      }

      &.header {
        background-color: #f1f2f4;
        box-sizing: border-box;
        flex: 0 0 auto;
        height: 37px;
        & > div {
          border-top: 0 !important;
        }
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
      overflow: hidden;
      justify-content: flex-start;
      margin-right: -1px;
      margin-bottom: -1px;

      &[data-sticky-td="true"] {
        z-index: 300 !important;
        border: 1px solid #edeae9;
        padding: 0 4px 0 24px;
        justify-content: space-between;
        flex: 1 1 auto;
        min-width: 1px;
        &:hover {
          border: 1px solid #afabac;
          z-index: 500 !important;
        }
        &.isGroupColumn {
          border-color: transparent !important;
          &.focus {
            z-index: 999 !important;
            border: 1px solid #4573d2 !important;
          }
          &:first-child {
            border-right: 1px solid #edeae9 !important;
          }
        }
        &.focus {
          z-index: 999 !important;
          border-color: #4573d2 !important;
        }
      }

      .icon_add {
        visibility: hidden;
      }

      &.column-align-left {
        justify-content: flex-start;
      }
      &.column-align-right {
        justify-content: flex-end;
      }
      &.column-align-center {
        justify-content: center;
      }

      &.add-cell {
        &:hover {
          border-color: #edeae9 !important;
        }
      }

      &.isGroupColumn {
        border-color: transparent !important;
        &.hasSub {
          &:hover {
            border-bottom: 1px solid #edeae9 !important;
          }
        }
        &:hover {
          border-color: transparent !important;
          .drag-icon {
            visibility: visible !important;
          }
        }
      }

      &:hover {
        border: 1px solid #afabac;
        overflow: unset;
        z-index: 202;

        .canHide,
        .default_tag,
        .icon,
        .icon_add,
        .drag-icon,
        .detail-info {
          visibility: visible !important;
        }
      }

      &.focus {
        z-index: 202;
        border-color: #4573d2 !important;
      }
    }
  }
`;

export default WPReactTable;
