import React, { useState } from "react";
import ListContentColumn from "./ListContentColumn";
import ServiceCommandUnit from "./ServiceCommandUnit";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import ContentColumn from "./ContentColumn";

const getItemStyle = (isDragging, draggableStyle, isDraggingOver) => ({
  ...draggableStyle,
  ...(isDragging && {}),
});

const GroupColumn = ({ row, provided, snapshot }) => {
  const { t } = useTranslation();
  const [isVisibleAddRow, setIsVisibleAddRow] = useState(false);
  const [isVisibleNewRow, setIsVisibleNewRow] = useState(false);

  const _handleAddNewRow = () => {
    setIsVisibleNewRow(true);
  };

  return (
    <div
      ref={provided.innerRef}
      {...row.getRowProps()}
      {...provided.draggableProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        snapshot.isDraggingOver
      )}
    >
      <div className="tr" {...row.getRowProps()}>
        <div className="drag-placeholder" />
        <ListContentColumn
          data={row.cells}
          onVisibleAddRow={() => setIsVisibleAddRow(!isVisibleAddRow)}
          dragHandle={{ ...provided.dragHandleProps }}
        />
      </div>

      {isVisibleNewRow && (
        <div style={{ display: "flex" }} className="tr">
          {row.cells.map((cell, index) => (
            <ContentColumn key={index} cell={cell} isNewRow />
          ))}
        </div>
      )}

      {row.isExpanded && (
        <ServiceCommandUnit id={row.original.id} data={row.subRows} />
      )}

      {isVisibleAddRow && (
        <div style={{ display: "flex" }} className="tr">
          {row.cells.map((item, index) => (
            <div {...item.getCellProps()} className="td add-cell">
              {index === 0 && (
                <div onClick={_handleAddNewRow}>
                  <AddIcon sx={{ fontSize: 16, marginRight: "5px" }} />
                  <div>{t("ADD_NEW_TASK")}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {provided.placeholder}
    </div>
  );
};

export default GroupColumn;
