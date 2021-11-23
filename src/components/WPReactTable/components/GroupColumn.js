import React, { useState } from "react";
import ListContentColumn from "./ListContentColumn";
import ServiceCommandUnit from "./ServiceCommandUnit";
import AddIcon from "@mui/icons-material/Add";

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  ...(isDragging && {}),
});

const GroupColumn = ({ row, provided, snapshot }) => {
  const [isVisibleAddRow, setIsVisibleAddRow] = useState(false);

  return (
    <div
      ref={provided.innerRef}
      {...row.getRowProps()}
      {...provided.draggableProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <div className="tr" {...row.getRowProps()}>
        <div className="drag-placeholder" />
        <ListContentColumn
          data={row.cells}
          onVisibleAddRow={() => setIsVisibleAddRow(!isVisibleAddRow)}
          dragHandle={{ ...provided.dragHandleProps }}
        />
      </div>

      {row.isExpanded && (
        <ServiceCommandUnit id={row.original.id} data={row.subRows} />
      )}

      {isVisibleAddRow && (
        <div style={{ display: "flex" }} className="tr">
          {row.cells.map((item, index) => (
            <div {...item.getCellProps()} className="td add-cell">
              {index === 0 && (
                <div>
                  <AddIcon sx={{ fontSize: 16, marginRight: "5px" }} />
                  <span contentEditable>Thêm công việc</span>
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
