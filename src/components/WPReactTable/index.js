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
      height: 37px;
      padding-right: 24px;
      transition: box-shadow 100ms ease-in-out;
      contain: style;
      margin-bottom: -1px;
      margin-top: -1px;
      line-height: normal;
      &:hover {
        background-color: #f9f8f8;
      }
      &.header {
        background-color: #f1f2f4;
        box-sizing: border-box;
        flex: 0 0 auto;
        height: 37px;
      }
    }

    .td {
      background-color: #fff;
      border: 1px solid #edeae9;
      box-sizing: border-box;
      padding: 0 8px;
      z-index: 0;
      align-items: center;
      display: flex;
      height: 37px;
      overflow: hidden;
      justify-content: space-between;
      margin-left: -1px;
      &[data-sticky-td="true"] {
        z-index: 300;
        border-left: 0;
        padding: 0 4px 0 24px;
        justify-content: space-between;
        flex: 1 1 auto;
        min-width: 1px;
        box-shadow: none;
        max-width: 420px;
      }
    }
  }
`;

export default WPReactTable;
