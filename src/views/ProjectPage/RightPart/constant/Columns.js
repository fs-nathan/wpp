import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ColumnNameGroup from "components/WPReactTable/components/ColumnNameGroup";
import { AddHeading } from "components/WPReactTable/components/HeadingColumn";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export const IconDrag = () => (
  <svg
    viewBox="0 0 24 24"
    role="presentation"
    style={{
      width: "1.5rem",
      height: "1.5rem",
    }}
  >
    <path
      d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"
      style={{ fill: "currentcolor" }}
    />
  </svg>
);

const CellItemGroup = ({
  value,
  row,
  isNewRow = false,
  dragHandle = {},
  onSubmitAdd = () => {},
  onBlur = () => {},
  isFocus = true,
}) => {
  const refText = useRef(null);
  const refFocus = useRef(false);
  const [name, setName] = React.useState(isNewRow ? "" : value);

  useEffect(() => {
    isNewRow ? setName("") : setName(value);
  }, [value, isNewRow]);

  const _handleSubmit = async () => {
    if (isNewRow) return onSubmitAdd(name);
    try {
      const config = {
        url: "/task/update-name-description",
        method: "PUT",
        data: {
          task_id: row?.original?.id || null,
          name,
        },
      };
      await apiService(config);
      refFocus.current = true;
      refText.current.blur();
    } catch (error) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };

  useEffect(() => {
    if (isFocus && isNewRow) {
      setTimeout(() => {
        refText.current.focus();
      }, 0);
    }
  }, [isFocus, isNewRow]);

  const _handleKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      _handleSubmit();
      if (isNewRow) refText.current.value = "";
    }
  };

  const _handleBlur = (e) => {
    if (!refFocus.current) {
      onBlur(e);
      _handleSubmit();
      refFocus.current = false;
    }
    const columnHTML = e.target.closest(".td");
    columnHTML.classList.remove("focus");
  };

  const _handleFocus = (e) => {
    const columnHTML = e.target.closest(".td");
    columnHTML.classList.add("focus");
  };

  const _handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <WrapperItemName>
      <div style={{ width: "30px" }} />
      <WrapperIconDrag className="drag-icon" {...dragHandle}>
        <IconDrag />
      </WrapperIconDrag>

      <TextAreaCustom
        ref={refText}
        placeholder={"Write a task name"}
        rows="1"
        tabindex="-1"
        wrap="off"
        value={name}
        defaultValue={isNewRow ? "" : value}
        onFocus={_handleFocus}
        onKeyPress={_handleKeyPress}
        onChange={_handleChange}
        onBlur={_handleBlur}
        style={{
          marginLeft: 0,
          width: "calc(100% - 140px)",
        }}
      />

      <WrapperDetailInfo className="detail-info">
        <div className="wp-wrapper-button">
          <MoreVertIcon sx={{ fontSize: 16 }} />
        </div>

        <div className="detail">
          <span>Chi tiết</span> <ChevronRightIcon sx={{ fontSize: 16 }} />
        </div>
      </WrapperDetailInfo>
    </WrapperItemName>
  );
};

const CellNameTask = ({ row, value, ...props }) => {
  if (row.depth === 0 && !props.isNewRow) {
    return (
      <ColumnNameGroup
        row={row}
        value={value}
        dragHandle={props.dragHandle}
        onVisibleAddRow={props.onVisibleAddRow}
        {...props}
      />
    );
  }
  return (
    <CellItemGroup
      row={row}
      value={value}
      isNewRow={props.isNewRow}
      dragHandle={props.dragHandle}
      {...props}
    />
  );
};

export const COLUMNS_TASK_TABLE = [
  {
    id: "name",
    Header: "Tên công việc",
    headerClassName: "sticky",
    minWidth: 420,
    maxWidth: 620,
    sticky: "left",
    accessor: "name",
    Cell: CellNameTask,
  },
  {
    id: "add-column",
    Header: (props) => <AddHeading props={props} />,
    width: 50,
  },
];

const WrapperIconDrag = styled.div`
  position: absolute;
  top: 50%;
  height: 19.5px;
  transform: translateY(-50%);
  visibility: hidden;
  position: absolute;
  left: 8px;
`;
const WrapperDetailInfo = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 2;
  cursor: pointer;
  height: 100%;
  padding: 0 15px;
  visibility: hidden;
  .detail {
    span {
      font-size: 11px;
      font-weight: 400;
    }
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: #f9f8f8;
  }
`;
const WrapperItemName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  &:hover {
    ${WrapperIconDrag} {
      visibility: visible;
    }
  }
`;

export const TextAreaCustom = styled.textarea`
  white-space: pre;
  background: transparent;
  border-radius: 1.5px;
  display: block;
  outline: 0;
  overflow: hidden;
  resize: none;
  width: calc(100% - 160px);
  margin-left: 5px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  min-width: 20px;
  padding: 0 5px;
  text-rendering: optimizeSpeed;
  color: #1e1f21;
  ${(props) => {
    if (props.isGroup) {
      return {
        fontWeight: 500,
        fontSize: 16,
        padding: 5,
        borderColor: "#edeae9",
      };
    }
  }}
  &:hover {
    border: 1px solid #edeae9;
  }
  &:focus {
    border-color: ${(props) => (props.isGroup ? "#edeae9" : "transparent")};
  }
`;
