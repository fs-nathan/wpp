import React from "react";
import styled from "styled-components";
import WPTable from "./components/Table";
import WPTableGroup from "./components/TableGroup";

const WPReactTable = ({
  columns,
  data,
  isGroup = false,
  onDragEnd = () => {},
  ...props
}) => {
  return (
    <Styles>
      {isGroup ? (
        <WPTableGroup
          data={data}
          columns={columns}
          onDragEnd={onDragEnd}
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
      &:hover {
        .td,
        .add-cell {
          background-color: #f9f8f8;
        }
      }
    }

    .td {
      background-color: #fff;
      border-bottom: 1px solid #e8ecee;
      box-sizing: border-box;
      padding: 0 8px;
      flex-shrink: 0;
      z-index: 0;
      align-items: center;
      display: flex !important;
      height: 50px;
      overflow: hidden;
      justify-content: space-between;
      color: #666;
      &.add-cell {
        height: 35px;
        padding-left: 30px;
        > div {
          font-size: 13px;
          line-height: 22px;
          color: #666;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
      }
      &:hover {
        .drag-icon,
        .detail-info {
          visibility: visible;
        }
      }
    }
    [data-sticky-td] {
      position: sticky;
    }

    [data-sticky-last-left-td] {
      box-shadow: 0 1px 4px 0 rgba(21, 7, 38, 0.08);
    }
  }
`;

export default WPReactTable;
