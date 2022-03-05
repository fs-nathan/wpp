import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ContentColumn from "./ContentColumn";
import ListContentColumn from "./ListContentColumn";
import ServiceCommandUnit from "./ServiceCommandUnit";
import { createTask } from "actions/taskDetail/taskDetailActions";
import moment from "moment";
import styled from "styled-components";

const getItemStyle = (isDragging, draggableStyle, isDraggingOver) => ({
  ...draggableStyle,
  ...(isDragging && {}),
});

const GroupColumn = ({ row, provided, snapshot, ...props }) => {
  const { t } = useTranslation();
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
    const currentDate = moment().format("YYYY-MM-DD");
    dispatch(
      createTask({
        data: {
          name,
          group_task: groupTask,
          type_assign: 2,
          priority: 2,
          project_id: projectId,
          description: "",
          end_date: currentDate,
          end_time: "17:00",
          from_view: "Table",
          schedule_id: "5edda26e6701cf16239a4341",
          start_date: currentDate,
          start_time: "08:00",
          type: 2,
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
      {...row.getRowProps()}
      {...provided.draggableProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        snapshot.isDraggingOver
      )}
    >
      <div className="tr" {...row.getRowProps()}>
        <ListContentColumn
          data={row.cells}
          onVisibleAddRow={_handleAddNewTask}
          dragHandle={{ ...provided.dragHandleProps }}
          isGroupColumn
          {...props}
        />
      </div>

      {row.isExpanded && (
        <ServiceCommandUnit id={row.original.id} data={row.subRows} />
      )}

      <RowNew
        ref={refD}
        data={row.cells}
        row={{ ...row.getRowProps() }}
        onSubmit={_handleSubmit}
      />

      {(isVisibleAddRow || (row.isExpanded && !!row.subRows.length)) && (
        <div className="tr row-add" {...row.getRowProps()}>
          {row.cells.map((item, index) => (
            <div
              {...item.getCellProps()}
              style={{
                ...item.getCellProps().style,
                maxWidth: item.getCellProps().style.width,
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
          ))}
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
