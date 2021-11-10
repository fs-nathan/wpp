import React, { useState } from "react";
import styled from "styled-components";
import WPTable from "./components/Table";

const WPReactTable = ({ columns, data, onDragEnd = () => {} }) => {
  return (
    <Styles>
      <WPTable data={data} columns={columns} onDragEnd={onDragEnd} />
    </Styles>
  );
};

const Styles = styled.div`
  display: block;
  overflow: auto;

  .table {
    border-spacing: 0;

    .thead {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100vh;
    }

    .td {
      background-color: #fff;
      border-bottom: 1px solid #e8ecee;
      box-sizing: border-box;
      padding: 0 8px;
      z-index: 0;
      align-items: center;
      display: flex !important;
      height: 50px;
      overflow: hidden;
      justify-content: space-between;
      color: #666;
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
