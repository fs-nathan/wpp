import AddIcon from "@mui/icons-material/Add";
import { createTask } from "actions/taskDetail/taskDetailActions";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import ContentColumn from "./ContentColumn";
import ListContentColumn from "./ListContentColumn";
import ServiceCommandUnit from "./ServiceCommandUnit";

const getItemStyle = (isDragging, draggableStyle, isDraggingOver) => ({
  ...draggableStyle,
  ...(isDragging && {}),
});

const GroupColumn = ({ row, provided, snapshot, ...props }) => {
  const { t } = useTranslation();
  const rowProps = row.getRowProps();
  const { projectId } = useParams();
  const [isVisibleAddRow, setIsVisibleAddRow] = useState(false);
  const [isVisibleNewRow, setIsVisibleNewRow] = useState(false);
  const dispatch = useDispatch();
  const refD = React.useRef(null);

  const _handleAddNewRow = () => {
    setIsVisibleNewRow(true);
    refD.current._set(!isVisibleNewRow);
  };

  const _handleSubmit = (name) => {
    const groupTask = provided.draggableProps["data-rbd-draggable-id"];
    dispatch(
      createTask({
        data: {
          description: "",
          from_view: "Table",
          group_task: groupTask,
          name,
          priority: 2,
          project_id: projectId,
          schedule_id: "5edda26e6701cf16239a4341",
          type: 0,
        },
        projectId,
      })
    );
  };

  const _handleAddNewTask = () => {
    setIsVisibleAddRow(true);
    setIsVisibleNewRow(true);
  };

  return (
    <div
      ref={provided.innerRef}
      {...rowProps}
      {...provided.draggableProps}
      key={row.original.id}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        snapshot.isDraggingOver
      )}
    >
      <div className="tr" {...rowProps} key={row.original.id}>
        <ListContentColumn
          data={row.cells}
          onVisibleAddRow={_handleAddNewTask}
          dragHandle={{ ...provided.dragHandleProps }}
          isGroupColumn
          hasSub={!!row.subRows.length}
          {...props}
        />
      </div>

      {row.isExpanded && !snapshot.isDragging && (
        <ServiceCommandUnit
          id={row.original.id}
          data={row.subRows}
          onReload={props.onReload}
        />
      )}

      <RowNew
        ref={refD}
        data={row.cells}
        row={{ ...rowProps }}
        onSubmit={_handleSubmit}
      />

      {(isVisibleAddRow || (row.isExpanded && !!row.subRows.length)) &&
        !snapshot.isDragging && (
          <div className="tr row-add" {...rowProps}>
            {row.cells.map((item, index) => {
              if (index !== 0) return null;
              const cellProps = item.getCellProps();
              return (
                <div
                  {...cellProps}
                  style={{
                    ...cellProps.style,
                    maxWidth: cellProps.style.width,
                  }}
                  className="td add-cell"
                >
                  {index === 0 && (
                    <CellAddIcon onClick={_handleAddNewRow}>
                      <div style={{ minWidth: "30px" }} />
                      <AddIcon sx={{ fontSize: 16, marginRight: "5px" }} />
                      <div>{t("ADD_NEW_TASK")}</div>
                    </CellAddIcon>
                  )}
                </div>
              );
            })}
          </div>
        )}

      {provided.placeholder}
    </div>
  );
};

const RowNew = React.forwardRef(
  ({ data = [], row = {}, onSubmit = () => {} }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    React.useImperativeHandle(ref, (va) => ({
      _set: () => setIsVisible(!isVisible),
    }));

    if (!isVisible) return null;

    return (
      <div className="tr" {...row}>
        {data.map((cell, index) => {
          return (
            <ContentColumn
              key={index}
              cell={cell}
              isNewRow
              isFocus
              onSubmitAdd={onSubmit}
              onBlur={() => {
                setIsVisible(!isVisible);
              }}
            />
          );
        })}
      </div>
    );
  }
);

const CellAddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  cursor: pointer;
  color: #9e939e;
`;

export default GroupColumn;
