import React from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const RowAddGroup = ({ row, width, onAddNewGroup = () => {} }) => {
  const { t } = useTranslation();
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
              width,
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

export default RowAddGroup;
