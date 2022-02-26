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
    overflow: scroll;
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
      transition: box-shadow 100ms ease-in-out;
      contain: style;

      line-height: normal;
      &:hover {
        background-color: #f9f8f8;
        .td {
          background-color: #f9f8f8;
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
      box-shadow: inset 0 0 0 0.5px #edeae9;
      box-sizing: border-box;
      padding: 0 8px;
      z-index: 0;
      align-items: center;
      height: 47px;
      overflow: hidden;
      display: inline-flex !important;
      justify-content: flex-start;

      &[data-sticky-td="true"] {
        z-index: 300 !important;
        border-left: 0;
        padding: 0 4px 0 24px;
        justify-content: space-between;
        flex: 1 1 auto;
        min-width: 1px;
        max-width: 420px;
        box-shadow: inset 0 0 0 0.5px #edeae9;
        &:hover {
          box-shadow: inset 0 0 0 1px #edeae9;
        }
      }

      .icon_add {
        visibility: hidden;
      }

      &.isGroupColumn {
        box-shadow: inset 0 0 0 0.5px #edeae9;
        &:hover {
          box-shadow: inset 0 0 0 1px #edeae9;
          .drag-icon {
            visibility: visible !important;
          }
        }
      }

      &:hover {
        box-shadow: inset 0 0 0 0.75px #afabac;
        overflow: unset;
        z-index: 201;
        border: 0;

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
