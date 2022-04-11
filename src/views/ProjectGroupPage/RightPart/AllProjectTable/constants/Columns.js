import { ListItem, ListItemIcon } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { updatePinBoardSetting } from "actions/project/setting/updatePinBoardSetting";
import CustomAvatar from "components/CustomAvatar";
import { ChartInfoBox } from "components/CustomDonutChart";
import ImprovedSmallProgressBar from "components/ImprovedSmallProgressBar";
import { LightTooltip, TooltipWrapper } from "components/LightTooltip";
import { StateBox } from "components/TableComponents";
import ColumnMembers from "components/WPReactTable/components/ColumnMembers.js";
import ColumnOptionsGroup from "components/WPReactTable/components/ColumnOptionsGroup";
import { apiService } from "constants/axiosInstance";
import { statusTaskColors } from "constants/colors";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IconDrag } from "views/ProjectPage/RightPart/constant/Columns";

export const CellLabel = ({ props, value, onEdit = () => {} }) => {
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const projectId = params.get("groupID");
  const project = props.row.original;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(value);
  const labelsProject = useSelector(
    ({ projectLabels }) => projectLabels.listProjectLabels
  );
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleSelect = (item) => {
    setSelected(item);

    _handleUpdateProject({
      project_id: project.id,
      project_group_id: projectId,
      name: project.name,
      description: project.description,
      priority: project.priority_code,
      project_label_id: item?.id || null,
    });
  };

  const _handleUpdateProject = async (data) => {
    try {
      await apiService({
        url: "/project/update",
        method: "PUT",
        data,
      });
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    } catch (error) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(error, "messaage", DEFAULT_MESSAGE.MUTATE.ERROR)
      );
    }
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
        {labelsProject.data?.projectLabels?.map((item, index) => (
          <MenuItem
            key={index}
            style={{ width: 200 }}
            onClick={() => _handleSelect(item)}
          >
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
  if (!value.trim().length) return null;
  const startDate = moment(value, "YYYY/MM/DD");
  const currentDay = moment().startOf("day");
  return `${currentDay.diff(startDate, "days")} ngày`;
};

const CellNameProject = ({ props, onEdit = () => {} }) => {
  const row = props.row.original;
  const isDisplayUpdate =
    !get(row, "can_update", false) || !get(row, "can_delete", false);
  const dispatch = useDispatch();

  const _handlePin = () => {
    dispatch(updatePinBoardSetting({ projectId: row.id, status: 0 }));
  };

  return (
    <WrapperCellName>
      <div className="drag-icon" {...props.dragHandle}>
        <IconDrag style={{ cursor: "pointer" }} />
      </div>

      <StarOutlineRoundedIcon
        className="star-icon"
        onClick={_handlePin}
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

const CellTotalTask = ({ value }) => {
  if (!value.total_task) return null;
  return (
    <WrapperCellTotal>
      <DonutSmallIcon />
      <span>{value.total_task}</span>
    </WrapperCellTotal>
  );
};

const CellPriority = ({ value, props }) => {
  const row = props.row.original;
  const options = [
    { id: 1, _id: 1, name: "Thấp", value: 0, color: "#03C30B" },
    { id: 2, _id: 2, name: "Trung bình", value: 1, color: "#FF9800" },
    { id: 3, _id: 3, name: "Cao", value: 2, color: "#ff0000" },
  ];
  const selected =
    options.find((item) => item.value === row.priority_code) || {};
  return <ColumnOptionsGroup defaultSelected={selected} options={options} project={row} />;
};

export const COLUMNS_PROJECT_TABLE = ({
  onEdit = () => {},
  onOpenEditModal = () => {},
}) => {
  return [
    {
      id: "name",
      Header: "Bảng việc",
      accessor: "name",
      headerClassName: "sticky",
      minWidth: 420,
      maxWidth: 620,
      sticky: "left",
      Cell: (props) => <CellNameProject props={props} onEdit={onEdit} />,
    },
    {
      id: "label",
      Header: "Nhãn",
      accessor: "project_label",
      Cell: (props) => (
        <CellLabel value={props.value} props={props} onEdit={onOpenEditModal} />
      ),
    },
    {
      id: "progress",
      Header: "Tiến độ",
      accessor: "date_start",
      Cell: CellProgressDay,
    },
    {
      id: "start_date",
      Header: "Bắt đầu",
      accessor: "date_start",
    },
    { id: "end_date", Header: "Kết thúc", accessor: "date_end" },
    {
      id: "status",
      Header: "Trạng thái",
      accessor: "status",
      Cell: (props) => <CellStatus props={props} />,
    },
    {
      id: "count_task",
      Header: "Công việc",
      accessor: "statistic",
      Cell: CellTotalTask,
    },
    {
      id: "completed",
      Header: "Hoàn thành",
      accessor: (row) => {
        return row.name;
      },
      Cell: (props) => <CellProgressSuccess props={props} />,
    },
    {
      id: "priority",
      Header: "Ưu tiên",
      accessor: "priority_name",
      Cell: (props) => <CellPriority props={props} />,
    },
    {
      id: "members",
      Header: "Thành viên",
      accessor: "members",
      Cell: (props) => {
        const valueCell = props.row.original;
        return <ColumnMembers dataCell={valueCell} value={props.value} />;
      },
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
    position: absolute;
    left: 5px;
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
