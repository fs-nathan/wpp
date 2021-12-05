import { ListItem, ListItemIcon } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AvatarCircleList from "components/AvatarCircleList";
import CustomAvatar from "components/CustomAvatar";
import CustomBadge from "components/CustomBadge";
import { ChartInfoBox } from "components/CustomDonutChart";
import ImprovedSmallProgressBar from "components/ImprovedSmallProgressBar";
import { LightTooltip, TooltipWrapper } from "components/LightTooltip";
import { StateBox } from "components/TableComponents";
import { statusTaskColors } from "constants/colors";
import { decodePriorityCode } from "helpers/project/commonHelpers";
import { get } from "lodash";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { IconDrag } from "views/ProjectPage/RightPart/constant/Columns";

const CellLabel = ({ props, value, onEdit = () => {} }) => {
  const project = props.row.original;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(value);
  const labelsProject = useSelector(
    ({ projectLabels }) => projectLabels.listProjectLabels
  );
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _renderSelected = () => {
    if (!selected)
      return (
        <Typography className="default_tag" style={{ marginLeft: 5 }}>
          —
        </Typography>
      );
    return (
      <Label
        style={{ background: selected.color, maxWidth: 85 }}
        onClick={handleClick}
      >
        {selected.name}
      </Label>
    );
  };

  return (
    <>
      <BoxColLabel onClick={handleClick}>
        {_renderSelected()}
        <KeyboardArrowDownIcon className="icon" />
      </BoxColLabel>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          style={{ width: 200, color: "#666" }}
          onClick={() => setSelected(null)}
        >
          <DoneIcon
            style={{
              marginRight: 10,
              color: "#666",
              visibility: !selected ? "visible" : "hidden",
            }}
          />
          <Typography>—</Typography>
        </MenuItem>
        {labelsProject.data?.projectLabels?.map((item) => (
          <MenuItem style={{ width: 200 }} onClick={() => setSelected(item)}>
            <DoneIcon
              style={{
                marginRight: 10,
                color: "#666",
                visibility: selected?.id === item.id ? "visible" : "hidden",
              }}
            />
            <Typography
              style={{
                background: item.color,
                padding: "5px 15px",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "12px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              nowrap
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#666",
            borderTop: "1px solid#e8ecee",
          }}
        >
          <ListItem onClick={() => onEdit(project)}>
            <ListItemIcon style={{ minWidth: 20 }}>
              <EditIcon />
            </ListItemIcon>
            <span style={{ marginLeft: "5px" }}>Chỉnh sửa</span>
          </ListItem>
        </div>
      </Menu>
    </>
  );
};

const CellProgressDay = ({ value }) => {
  if (!value) return null;
  const startDate = moment(value, "DD/MM/YYYY");
  const currentDay = moment().startOf("day");
  return `${currentDay.diff(startDate, "days")} ngày`;
};

const CellNameProject = ({ props, onEdit = () => {} }) => {
  const row = props.row.original;
  const isDisplayUpdate =
    !get(row, "can_update", false) || !get(row, "can_delete", false);

  return (
    <WrapperCellName>
      <div className="drag-icon" {...props.dragHandle}>
        <IconDrag style={{ cursor: "pointer" }} />
      </div>

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
        style={{
          maxWidth: "calc(100% - 65px)",
          width: "calc(100% - 65px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}
      >
        {props.value}
      </Link>
      {!isDisplayUpdate && (
        <div
          className="wp-wrapper-button"
          onClick={(evt) => onEdit(evt.currentTarget, row)}
        >
          <MoreVertIcon />
        </div>
      )}
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

export const COLUMNS_PROJECT_TABLE = ({
  onEdit = () => {},
  onOpenEditModal = () => {},
}) => {
  return [
    {
      Header: "Bảng việc",
      accessor: "name",
      headerClassName: "sticky",
      minWidth: 420,
      maxWidth: 620,
      sticky: "left",
      Cell: (props) => <CellNameProject props={props} onEdit={onEdit} />,
    },
    {
      Header: "Nhãn",
      accessor: "project_label",
      Cell: (props) => (
        <CellLabel value={props.value} props={props} onEdit={onOpenEditModal} />
      ),
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

const WrapperCellName = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  justify-content: flex-start;
  width: 100%;

  .drag-icon {
    height: 19.5px;
  }
  .drag-icon,
  .star-icon,
  .wp-wrapper-button {
    opacity: 0;
  }
  &:hover {
    .drag-icon,
    .star-icon,
    .wp-wrapper-button {
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
const BoxColLabel = styled(Box)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  .default_tag,
  .icon {
    visibility: hidden;
  }
  &:hover {
    .default_tag,
    .icon {
      visibility: visible;
    }
  }
`;
