import { ChartInfoBox } from "components/CustomDonutChart";
import { LightTooltip, TooltipWrapper } from "components/LightTooltip";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { statusTaskColors } from "constants/colors";
import ImprovedSmallProgressBar from "components/ImprovedSmallProgressBar";
import { get } from "lodash";
import { StateBox } from "components/TableComponents";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { decodePriorityCode } from "helpers/project/commonHelpers";
import CustomBadge from "components/CustomBadge";
import AvatarCircleList from "components/AvatarCircleList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import CustomAvatar from "components/CustomAvatar";

const CellLabel = ({ value }) => {
  if (!value) return null;
  return (
    <Label style={{ background: value.color, maxWidth: 85 }}>
      {value.name}
    </Label>
  );
};

const CellProgressDay = ({ value }) => {
  if (!value) return null;
  const startDate = moment(value, "DD/MM/YYYY");
  const currentDay = moment().startOf("day");
  return `${currentDay.diff(startDate, "days")} ngày`;
};

const CellNameProject = ({ props }) => {
  return (
    <WrapperCellName>
      <DragIndicatorIcon className="drag-icon" style={{ cursor: "pointer" }} />

      <StarOutlineRoundedIcon
        className="star-icon"
        style={{ cursor: "pointer", margin: "0 5px" }}
      />
      <CustomAvatar
        style={{ width: 25, height: 25 }}
        className="avatar"
        src={props.row.original.icon}
        alt="avatar"
      />
      <Link
        to={props.row.original.url_redirect}
        className={"view_ProjectGroup_Table_All_title_bold"}
      >
        {props.value}
      </Link>
    </WrapperCellName>
  );
};

const CellProgressSuccess = ({ props }) => {
  const { t } = useTranslation();
  const data = props.row.original;
  return (
    <LightTooltip
      className={"view_ProjectGroup_Table_All___progress"}
      placement="top"
      title={
        <ChartInfoBox
          className="view_ProjectGroup_Table_All___tooltip"
          title={t("DMH.VIEW.PGP.RIGHT.ALL.STATS.TOTAL")}
          data={[
            {
              color: statusTaskColors.waiting,
              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.WAITING"),
              value: get(data, "statistic.waiting", 0),
            },
            {
              color: statusTaskColors.doing,
              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.DOING"),
              value: get(data, "statistic.doing", 0),
            },
            {
              color: statusTaskColors.complete,
              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.COMPLETE"),
              value: get(data, "statistic.complete", 0),
            },
            {
              color: statusTaskColors.expired,
              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.EXPIRED"),
              value: get(data, "statistic.expired", 0),
            },
            {
              color: statusTaskColors.stoped,
              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.STOP"),
              value: get(data, "statistic.stop", 0),
            },
          ]}
        />
      }
    >
      <TooltipWrapper>
        <ImprovedSmallProgressBar
          data={[
            {
              color: "#ff9800",
              value: get(data, "statistic.waiting", 0),
            },
            {
              color: "#03a9f4",
              value: get(data, "statistic.doing", 0),
            },
            {
              color: "#f44336",
              value: get(data, "statistic.expired", 0),
            },
            {
              color: "#03c30b",
              value: get(data, "statistic.complete", 0),
            },
            {
              color: "#607d8b",
              value: get(data, "statistic.stop", 0),
            },
          ]}
          color={"#05b50c"}
          percentDone={get(data, "complete", 0)}
        />
      </TooltipWrapper>
    </LightTooltip>
  );
};

const CellStatus = ({ props }) => {
  const { t } = useTranslation();
  const row = props.row.original;
  return (
    <StateBox stateCode={get(row, "state_code")}>
      <div className="project_state_wrapper">
        <span>&#11044;</span>
        <span>
          {get(row, "state_code") === 5
            ? t("DMH.VIEW.PGP.RIGHT.ALL.HIDE")
            : get(row, "state_name")}
        </span>
      </div>
      {get(row, "state_code") === 3 && get(row, "day_expired", 0) !== 0 ? (
        <small>
          {t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DATE", {
            date: get(row, "day_expired", 0),
          })}
        </small>
      ) : null}
    </StateBox>
  );
};

const CellPriority = ({ props }) => {
  const row = props.row.original;
  return (
    <CustomBadge
      color={decodePriorityCode(get(row, "priority_code", 0)).color}
      background={decodePriorityCode(get(row, "priority_code", 0)).background}
    >
      {get(row, "priority_name", "")}
    </CustomBadge>
  );
};

const CellTotalTask = ({ value }) => {
  if (!value.total_task) return null;
  return (
    <WrapperCellTotal>
      <DonutSmallIcon />
      <span>{value.total_task}</span>
    </WrapperCellTotal>
  );
};

const CellMembers = ({ value = [] }) => {
  return (
    <AvatarCircleList
      users={value.map((member) => ({
        name: get(member, "name"),
        avatar: get(member, "avatar"),
      }))}
      display={3}
    />
  );
};

const CellEdit = ({ props, onEdit }) => {
  const row = props.row.original;
  if (!get(row, "can_update", false) || !get(row, "can_delete", false))
    return null;
  return (
    <WrapperAdd>
      <MoreVertIcon onClick={(evt) => onEdit(evt.currentTarget, row)} />
    </WrapperAdd>
  );
};

export const COLUMNS_PROJECT_TABLE = ({ onEdit = () => {} }) => {
  return [
    {
      Header: "Bảng việc",
      accessor: "name",
      headerClassName: "sticky",
      minWidth: 420,
      maxWidth: 620,
      sticky: "left",
      Cell: (props) => <CellNameProject props={props} />,
    },
    {
      Header: "Nhãn",
      accessor: "project_label",
      Cell: CellLabel,
    },
    {
      Header: "Tiến độ",
      accessor: "date_start",
      Cell: CellProgressDay,
    },
    {
      id: "start_date",
      Header: "Bắt đầu",
      accessor: "date_start",
    },
    {
      Header: "Kết thúc",
      accessor: "date_end",
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      Cell: (props) => <CellStatus props={props} />,
    },
    {
      Header: "Công việc",
      accessor: "statistic",
      Cell: CellTotalTask,
    },
    {
      Header: "Hoàn thành",
      accessor: (row) => {
        return row.name;
      },
      Cell: (props) => <CellProgressSuccess props={props} />,
    },
    {
      Header: "Ưu tiên",
      accessor: "priority_name",
      Cell: (props) => <CellPriority props={props} />,
    },
    {
      Header: "Thành viên",
      accessor: "members",
      Cell: CellMembers,
    },
    {
      Header: "",
      accessor: "project_group",
      width: 50,
      maxWidth: 50,
      minWidth: 50,
      Cell: (props) => <CellEdit props={props} onEdit={onEdit} />,
    },
  ];
};

const Label = styled.div`
  padding: 5px 10px;
  border-radius: 15px;
  color: #fff;
  max-width: 100%;
  margin: 5px 10px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WrapperCellTotal = styled.div`
  display: flex;
  align-items: center;
  color: #6f7782;
  span {
    margin-left: 10px;
  }
`;

const WrapperAdd = styled.div`
  display: flex;
  align-items: center;
  color: #6f7782;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

const WrapperCellName = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  justify-content: flex-start;
  width: 100%;
  .drag-icon {
    opacity: 0;
  }
  &:hover {
    .drag-icon {
      opacity: 1;
    }
  }
  .star-icon:hover {
    color: #05b50c;
  }
  a {
    color: #666;
    display: inline-flex;
    margin-left: 8px;
    font-weight: 400 !important;
    &:hover {
      color: #666;
    }
  }
`;
