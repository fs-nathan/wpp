import {
  mdiBookmark,
  mdiBookmarkOutline,
  mdiCircleSmall,
  mdiDotsHorizontal,
  mdiMenu,
  mdiPlus,
  mdiStarOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Button, IconButton, Typography } from "@mui/material";
import { getDetailTemplate } from "actions/project/getDetailTemplate";
import { detailStatus } from "actions/project/setting/detailStatus";
import { updatePinBoardSetting } from "actions/project/setting/updatePinBoardSetting";
import Avatar from "components/CustomAvatar";
import { get, isNil } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { statusSelector } from "views/ProjectGroupPage/Modals/ProjectSetting/selectors";
import SearchButton from "views/ProjectGroupPage/RightPart/AllProjectTable/components/SearchButton";
import DrawerFilter from "./components/DrawerFilter";
import { useStyles } from "./styles";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useLocalStorage } from "react-use";
import { Popover } from "@material-ui/core";
import DialogUsing from "views/ProjectGroupPage/RightPart/ProjectsTemplate/components/SingleAction/DialogUsing";
import { actionToast } from "actions/system/system";
import { useTemplate } from "actions/project/useTemplate";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";

const TemplateHeader = ({ view = "list", projectId, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.project.getDetailTemplate.data);

  const fetchData = useCallback(async () => {
    try {
      if (projectId)
        await dispatch(getDetailTemplate({ template_id: projectId }));
    } catch (error) {}
  }, [projectId, getDetailTemplate, dispatch]);

  useEffect(() => {
    localStorage.setItem("WPS_COLLAPSED_DEFAULT", false);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const NAV_BARS_LIST = [
    {
      id: 1,
      title: "Todo list",
      to: `/projects/template/${projectId}/preview/task-table/${projectId}`,
    },
    {
      id: 2,
      title: "Kanban",
      to: `/projects/template/${projectId}/preview/task-kanban/${projectId}`,
    },
    {
      id: 3,
      title: "Gantt",
      to: `/projects/template/${projectId}/preview/task-gantt/${projectId}`,
    },
  ];
  const [anchorUsingEl, setAnchorUsingEl] = useState(null);
  const history = useHistory();
  const handleUsingClick = () => {
    const event = document.getElementById("using-button");
    console.log(event);
    if (event) {
      setAnchorUsingEl(event);
    }
  };

  const handleUsingClose = () => {
    setAnchorUsingEl(null);
  };

  const openUsing = Boolean(anchorUsingEl);
  const usingId = openUsing ? "using-popover" : undefined;

  const handleToast = (type, message) => {
    dispatch(actionToast(type, message));
    setTimeout(() => {
      dispatch(actionToast("", null));
    }, 2000);
  };
  async function handleUsing({ name, curProjectGroupId, startDate }) {
    try {
      await dispatch(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useTemplate({
          template_id: projectId,
          name,
          project_group_id: curProjectGroupId,
          day_start: startDate
            ? moment(startDate).format("YYYY-MM-DD")
            : undefined,
        })
      );
    } catch (error) {}
  }

  function onClosePreview() {
    history.push("/projects/template/" + projectId);
  }
  return (
    <div className={classes.topbar}>
      <div className={classes.header}>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "100%",
            overflow: "hidden",
          }}
        >
          <Avatar
            alt={template.user_share_name}
            src={template.user_share_avatar}
            sx={{
              width: "100%",
              height: "100%",
              border: "2px solid white",
            }}
          />
        </div>
        <div className={classes.titleAndNav}>
          <div className={classes.titleRow}>
            <div className={classes.leftWrapper}>
              <Link>{get(template, "name", "")}</Link>
            </div>
          </div>
          {/*//  TODO: Template Detail */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Chia sẻ bởi @{template.user_share_name}
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <ContentCopyRoundedIcon />
              <Typography variant="body2" color="text.secondary">
                {template.total_use} lần sao chép
              </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <RemoveRedEyeIcon />
              <Typography variant="body2" color="text.secondary">
                {template.total_view} lượt xem
              </Typography>
            </div>
          </div>

          <div className={classes.navMenuRow}>
            <div className={classes.navBar}>
              <nav className={classes.tabNavBar}>
                <ul>
                  {NAV_BARS_LIST.map((item) => (
                    <ItemNav key={item.id} {...item} />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div>
            <Button
              aria-describedby={usingId}
              variant="contained"
              color="primary"
              id="using-button"
              onClick={handleUsingClick}
            >
              Sử dụng mẫu
            </Button>
            <Popover
              id={usingId}
              open={openUsing}
              anchorEl={anchorUsingEl}
              onClose={handleUsingClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <DialogUsing onClose={handleUsingClose} onOk={handleUsing} />
            </Popover>
          </div>
          <IconButton color="inherit" onClick={onClosePreview}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const ItemNav = ({ to, id, title, icon }) => {
  const classes = useStyles();
  return (
    <li style={{ marginLeft: id === 1 ? 0 : 24 }}>
      <NavLink to={to} className={classes.link}>
        {icon && <Icon path={icon} size={1} style={{ marginRight: 5 }} />}
        {title}
      </NavLink>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    status: statusSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePinBoardSetting: ({ projectId, status }) =>
      dispatch(updatePinBoardSetting({ projectId, status })),
    doDetailStatus: ({ projectId }) => dispatch(detailStatus({ projectId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateHeader);