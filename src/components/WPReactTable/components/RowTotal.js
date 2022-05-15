import React from "react";
import styled from "styled-components";
import { getCellStyle } from "../utils";
import { scrollbarHeight } from "./Table";

const RowTotal = ({ row, scrollBarSize }) => {
  if (!row) return null;

  return (
    <WrapperRowTotal
      id="row-total-group"
      scrollbarHeight={scrollbarHeight()}
      scrollBarWidth={scrollBarSize}
      className="tr"
      {...row.getRowProps()}
    >
      {row.cells.map((cell, index) => {
        return (
          <div className="td" style={{ ...getCellStyle(cell.getCellProps()) }}>
            {index === 0 ? (
              <CellTotal>Tổng hợp</CellTotal>
            ) : (
              cell.render("Cell", { isRowTotal: true })
            )}
          </div>
        );
      })}
    </WrapperRowTotal>
  );
};

const WrapperRowTotal = styled.div`
  background: #f1f2f4 !important;
  z-index: 352;
  height: 48px !important;
  min-height: 48px !important;

  max-width: ${(props) => `calc(100% - ${props.scrollBarWidth}px)`} !important;

  overflow-x: auto;
  overflow-y: hidden;

  position: absolute;
  left: 0;
  bottom: ${({ scrollbarHeight }) => scrollbarHeight}px;

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  .td {
    background: #f1f2f4 !important;
    border-bottom: 0 !important;

    font-weight: 700;
    font-size: 15px;

    &:hover {
      border-color: #edeae9 !important;
    }
  }
`;

const CellTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
`;

export default RowTotal;
