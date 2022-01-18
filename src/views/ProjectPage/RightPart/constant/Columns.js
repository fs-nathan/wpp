import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomBadge from "components/CustomBadge";
import { StateBox } from "components/TableComponents";
import { get } from "lodash";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { decodePriorityCode } from "../../../../helpers/project/commonHelpers";
import { AddHeading } from "components/WPReactTable/components/HeadingColumn";

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

const CellMainGroup = ({
  row,
  value,
  dragHandle = {},
  onVisibleAddRow = () => {},
}) => {
  return (
    <WrapperMainGroup {...dragHandle}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "calc(100% - 72px)",
        }}
      >
        <WrapperButton {...row.getToggleRowExpandedProps()}>
          {!row.isExpanded ? (
            <ArrowRightRoundedIcon sx={{ fontSize: 28 }} />
          ) : (
            <ArrowDropDownRoundedIcon sx={{ fontSize: 28 }} />
          )}
        </WrapperButton>
        <WrapperName>
          <TextEllipsis>{value}</TextEllipsis>
        </WrapperName>
      </div>
      <div
        className="wrapper-right"
        style={{
          alignItems: "center",
        }}
      >
        <WrapperButton className="right-side" onClick={onVisibleAddRow}>
          <AddRoundedIcon />
        </WrapperButton>
        <WrapperButton className="right-side">
          <MoreHorizRoundedIcon />
        </WrapperButton>
      </div>
    </WrapperMainGroup>
  );
};

const CellItemGroup = React.memo(
  ({
    value,
    row,
    isNewRow = false,
    dragHandle = {},
    onSubmitAdd = () => {},
    isFocus = true,
  }) => {
    const isDisplayReminder = row.original.status_code === 3;
    const refText = useRef(null);

    const _handleSubmit = () => {
      onSubmitAdd(refText.current.value);
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
        refText.current.value = "";
      }
    };

    return (
      <WrapperItemName>
        <div style={{ width: "30px" }} />
        <WrapperIconDrag className="drag-icon" {...dragHandle}>
          <IconDrag />
        </WrapperIconDrag>

        {isDisplayReminder && (
          <AccessTimeRoundedIcon sx={{ fontSize: 16, color: "#6d6e6f" }} />
        )}

        <TextAreaCustom
          ref={refText}
          placeholder={"Write a task name"}
          rows="1"
          tabindex="-1"
          wrap="off"
          defaultValue={isNewRow ? "" : value}
          onKeyPress={_handleKeyPress}
          style={{
            marginLeft: isDisplayReminder ? "5px" : 0,
            width: isDisplayReminder
              ? "calc(100% - 160px)"
              : "calc(100% - 140px)",
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
  }
);

const CellNameTask = ({ row, value, ...props }) => {
  if (row.depth === 0 && !props.isNewRow) {
    return (
      <CellMainGroup
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

const CellStatus = ({ props }) => {
  const { t } = useTranslation();

  const row = props.row.original;
  if (!row.status_code) return null;
  return (
    <StateBox stateCode={get(row, "status_code")}>
      <div className="project_state_wrapper">
        <span>&#11044;</span>
        <span>
          {get(row, "status_code") === 5
            ? t("DMH.VIEW.PGP.RIGHT.ALL.HIDE")
            : get(row, "status_name")}
        </span>
      </div>
      {get(row, "status_code") === 3 && get(row, "day_expired", 0) !== 0 ? (
        <small>
          {t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DATE", {
            date: get(row, "day_expired", 0),
          })}
        </small>
      ) : null}
    </StateBox>
  );
};

const CellProgressUnit = ({ props }) => {
  const row = props.row.original;
  return (
    <div>
      {row?.duration_value} {row?.duration_unit}
    </div>
  );
};

const CellStartTime = ({ props }) => {
  const row = props.row.original;

  return (
    <WrapperTime>
      <TimeUnit>{row?.start_time}</TimeUnit>
      <DurationUnit>{row?.start_date}</DurationUnit>
    </WrapperTime>
  );
};

const CellEndTime = ({ props }) => {
  const row = props.row.original;

  return (
    <WrapperTime>
      <TimeUnit>{row?.end_time}</TimeUnit>
      <DurationUnit>{row?.end_date}</DurationUnit>
    </WrapperTime>
  );
};

const CellPriority = ({ props }) => {
  const row = props.row.original;
  if (!row.priority_code) return null;
  return (
    <CustomBadge
      color={decodePriorityCode(get(row, "priority_code", 0)).color}
      background={decodePriorityCode(get(row, "priority_code", 0)).background}
    >
      {get(row, "priority_name", "")}
    </CustomBadge>
  );
};

const CellCompleted = ({ props }) => {
  const row = props.row.original;

  if (!row.data["pfd-complete"]) return null;
  return (
    <WrapperCompleted>
      {row.data["pfd-complete"].value} {row.data["pfd-complete"].format}
    </WrapperCompleted>
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
  // {
  //   Header: "Trạng thái",
  //   accessor: "status_code",
  //   Cell: (props) => <CellStatus props={props} />,
  // },`

  // {
  //   id: "progress_unit",
  //   Header: "Tiến độ",
  //   Cell: (props) => <CellProgressUnit props={props} />,
  // },
  // {
  //   id: "start_column",
  //   Header: "Bắt đầu",
  //   Cell: (props) => <CellStartTime props={props} />,
  // },
  // {
  //   id: "end_column",
  //   Header: "Kết thúc",
  //   Cell: (props) => <CellEndTime props={props} />,
  // },
  // {
  //   id: "complete",
  //   Header: "Hoàn thành",
  //   Cell: (props) => <CellCompleted props={props} />,
  // },
  // {
  //   id: "priority",
  //   Header: "Ưu tiên",
  //   Cell: (props) => <CellPriority props={props} />,
  // },
  {
    id: "add-column",
    Header: (props) => <AddHeading props={props} />,
    width: 50,
  },
];

const WrapperMainGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  .wrapper-right {
    display: none;
  }
  &:hover {
    .wrapper-right {
      display: flex;
    }
  }
`;

const WrapperButton = styled.div`
  height: 28px;
  min-height: 28px;
  min-width: 28px;
  width: 28px;
  border-radius: 6px;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #6f7782;

  &.right-side {
    margin-left: 4px;
  }
  &:hover {
    background: #1507260a;
    fill: #151b26;
    cursor: pointer;
  }
`;

const WrapperName = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-left: 0;
  min-width: 1px;
  outline: none;
`;

const WrapperTime = styled.div`
  display: flex;
  flex-direction: column;
`;
const TimeUnit = styled.div`
  font-size: 12px;
`;
const DurationUnit = styled.div`
  color: #333;
  margin-top: 4px;
`;
const WrapperIconDrag = styled.div`
  position: absolute;
  top: 50%;
  height: 19.5px;
  transform: translateY(-50%);
  visibility: hidden;
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
const WrapperCompleted = styled.div`
  display: flex;
  align-items: center;
  color: #4caf50;
`;

const TextEllipsis = styled.span`
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #44485e;
  max-width: 100%;
  display: block;
`;
const TextAreaCustom = styled.textarea`
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
  padding: 0 4px;
  text-rendering: optimizeSpeed;
  color: #1e1f21;
  &:hover {
    border: 1px solid #edeae9;
  }
  &:focus {
    border-color: transparent;
  }
`;
