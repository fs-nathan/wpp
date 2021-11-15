import AddIcon from "@mui/icons-material/Add";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CustomBadge from "components/CustomBadge";
import { StateBox } from "components/TableComponents";
import { get } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { decodePriorityCode } from "../../../../helpers/project/commonHelpers";

const CellMainGroup = ({ row, value }) => {
  return (
    <WrapperMainGroup>
      <WrapperButton {...row.getToggleRowExpandedProps()}>
        {!row.isExpanded ? (
          <ArrowRightRoundedIcon sx={{ fontSize: 28 }} />
        ) : (
          <ArrowDropDownRoundedIcon sx={{ fontSize: 28 }} />
        )}
      </WrapperButton>
      <WrapperName>{value}</WrapperName>
      <WrapperButton className="right-side">
        <AddRoundedIcon />
      </WrapperButton>
      <WrapperButton className="right-side">
        <MoreHorizRoundedIcon />
      </WrapperButton>
    </WrapperMainGroup>
  );
};

const CellItemGroup = ({ value, row }) => {
  return (
    <WrapperItemName>
      <div style={{ width: "30px" }} />
      {row.original.status_code === 3 && <AccessTimeRoundedIcon />}

      <span style={{ marginLeft: "5px" }}> {value}</span>
    </WrapperItemName>
  );
};

const CellNameTask = ({ row, value, ...props }) => {
  if (row.depth === 0) {
    return <CellMainGroup row={row} value={value} />;
  }
  return <CellItemGroup row={row} value={value} />;
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

export const COLUMNS_TASK_TABLE = [
  {
    Header: "Tên công việc",
    headerClassName: "sticky",
    minWidth: 420,
    maxWidth: 620,
    sticky: "left",
    accessor: "name",
    Cell: CellNameTask,
  },
  {
    Header: "Trạng thái",
    accessor: "status_code",
    Cell: (props) => <CellStatus props={props} />,
  },

  {
    id: "progress_unit",
    Header: "Tiến độ",
    Cell: (props) => <CellProgressUnit props={props} />,
  },
  {
    id: "start_column",
    Header: "Bắt đầu",
    Cell: (props) => <CellStartTime props={props} />,
  },
  {
    id: "end_column",
    Header: "Kết thúc",
    Cell: (props) => <CellEndTime props={props} />,
  },
  {
    id: "complete",
    Header: "Hoàn thành",
    Cell: (props) => <CellEndTime props={props} />,
  },
  {
    id: "priority",
    Header: "Ưu tiên",
    Cell: (props) => <CellPriority props={props} />,
  },

  {
    Header: (props) => <AddIcon {...props} />,
    accessor: "add",
  },
];

const WrapperMainGroup = styled.div`
  display: flex;
  align-items: center;
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
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #44485e;
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
const WrapperItemName = styled.div`
  display: flex;
  align-items: center;
`;
