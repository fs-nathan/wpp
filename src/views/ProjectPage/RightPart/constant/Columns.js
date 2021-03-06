import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ColumnNameGroup from "components/WPReactTable/components/ColumnNameGroup";
import { AddHeading } from "components/WPReactTable/components/HeadingColumn";
import NameInput from "components/WPReactTable/components/NameInput";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  projectId,
  isNewRow = false,
  dragHandle = {},
  onSubmitAdd = () => {},
  onBlur = () => {},
  isFocus = true,
}) => {
  const refFocus = useRef(false);
  const refNameInput = useRef(null);
  const [name, setName] = React.useState(isNewRow ? "" : value);

  useEffect(() => {
    isNewRow ? setName("") : setName(value);
  }, [value, isNewRow]);

  useEffect(() => {
    if (isNewRow) {
      setTimeout(() => {
        refNameInput.current && refNameInput.current.focus();
      }, 0);
    }
  }, [isNewRow]);

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
    } catch (error) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(error, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };

  const _handleKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      if (e.target.value !== value) {
        _handleSubmit();
        onBlur(e);
      }
    }
  };

  const _handleBlur = (e) => {
    onBlur(e);
    if (e.target.value !== value) _handleSubmit();
    refFocus.current = false;
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

      <NameInput
        ref={refNameInput}
        defaultValue={isNewRow ? "" : value}
        onFocus={_handleFocus}
        onKeyPress={_handleKeyPress}
        onChange={_handleChange}
        onBlur={_handleBlur}
      />

      <WrapperDetailInfo className="detail-info">
        <div className="wp-wrapper-button">
          <MoreVertIcon sx={{ fontSize: 16 }} />
        </div>

        <Link
          to={`/projects/task-chat/${projectId}?task_id=${row?.original?.id}`}
          className="detail"
          style={{ color: "#000" }}
        >
          <span>Chi ti???t</span> <ChevronRightIcon sx={{ fontSize: 16 }} />
        </Link>
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
        onMouseDown={props.onMouseDown}
        onToggleAdd={props.handleToggleAdd}
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
    Header: "T??n c??ng vi???c",
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
    padding: 5px 8px;
    border-radius: 5px;
    span {
      font-size: 11px;
      font-weight: 400;
    }
    display: flex;
    align-items: center;
    &:hover {
      background: #f0eeef;
    }
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
