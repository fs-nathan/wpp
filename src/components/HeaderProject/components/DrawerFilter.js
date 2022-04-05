import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  mdiAccountSupervisor,
  mdiCalendarRange,
  mdiCalendarText,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiClose,
  mdiCogs,
  mdiDelete,
  mdiDownload,
  mdiEye,
  mdiEyeOff,
  mdiFilter,
  mdiFlagTriangle,
  mdiPencil,
  mdiViewGridPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import DeleteProjectModal from "views/ProjectGroupPage/Modals/DeleteProject/index.js";
import EditProjectModal from "views/ProjectGroupPage/Modals/EditProject/index.js";
import ExportTaskGroupData from "views/ProjectGroupPage/RightPart/AllProjectTable/components/ExportTaskGroupData";
import ManageTableData from "./ManageTableData";
import { useStyles } from "./styles";

const pathMonitorEye =
  "M3 4V16H21V4H3M3 2H21C22.1 2 23 2.89 23 4V16C23 16.53 22.79 17.04 22.41 17.41C22.04 17.79 21.53 18 21 18H14V20H16V22H8V20H10V18H3C2.47 18 1.96 17.79 1.59 17.41C1.21 17.04 1 16.53 1 16V4C1 2.89 1.89 2 3 2M10.84 8.93C11.15 8.63 11.57 8.45 12 8.45C12.43 8.46 12.85 8.63 13.16 8.94C13.46 9.24 13.64 9.66 13.64 10.09C13.64 10.53 13.46 10.94 13.16 11.25C12.85 11.56 12.43 11.73 12 11.73C11.57 11.73 11.15 11.55 10.84 11.25C10.54 10.94 10.36 10.53 10.36 10.09C10.36 9.66 10.54 9.24 10.84 8.93M10.07 12C10.58 12.53 11.28 12.82 12 12.82C12.72 12.82 13.42 12.53 13.93 12C14.44 11.5 14.73 10.81 14.73 10.09C14.73 9.37 14.44 8.67 13.93 8.16C13.42 7.65 12.72 7.36 12 7.36C11.28 7.36 10.58 7.65 10.07 8.16C9.56 8.67 9.27 9.37 9.27 10.09C9.27 10.81 9.56 11.5 10.07 12M6 10.09C6.94 7.7 9.27 6 12 6C14.73 6 17.06 7.7 18 10.09C17.06 12.5 14.73 14.18 12 14.18C9.27 14.18 6.94 12.5 6 10.09Z";

const DrawerFilter = forwardRef(
  (
    {
      project = {},
      view = "list",
      disableShowHide,
      isProjectVisible = false,
      canUpdateProject = false,
      onOpenFilterKanban = () => {},
      onOpenGranttConfig = () => {},
      onMilestoneClick = () => {},
      onUpdateMember = () => {},
      onUpdateTime = () => {},
      onUpdateVisible = () => {},
      onUpdateSetting = () => {},
      onExportData = () => {},
      onOpenExportData = null,
      onAddColumns = () => {},
      onHideColumn = () => {},
      setItemLocation = () => {},
      onReOrderColumns = () => {},
    },
    ref
  ) => {
    const classes = useStyles();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { t } = useTranslation();
    const refManageTableData = useRef(null);
    const refExport = useRef(null);

    useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

    const MORE_MENU_ITEMS = {
      list: [
        {
          text: "Quản lý bảng dữ liệu",
          icon: mdiViewGridPlus,
          onClick: (e) => {
            refManageTableData.current._toggle();
          },
        },
        {
          text: "Xuất dữ liệu",
          icon: mdiDownload,
          onClick: (e) => refExport.current._toggle(),
        },
      ],
      kanban: [
        {
          text: "Lọc bảng dữ liệu",
          icon: mdiFilter,
          onClick: (e) => onOpenFilterKanban(),
        },
      ],
      grantt: [
        {
          text: "Thiết lập trục thời gian",
          icon: mdiCalendarRange,
          onClick: (e) => onOpenGranttConfig(true, "TIME"),
        },
        {
          text: "Thiết lập giao diện",
          icon: pathMonitorEye,
          onClick: (e) => onOpenGranttConfig(true, "COMMON"),
        },
        {
          text: "Tiến độ đến ngày hôm nay",
          icon: mdiFlagTriangle,
          onClick: (e) => onMilestoneClick(t("GANTT_NOT_INCLUDE_PROJECT")),
        },
        {
          text: "Xuất dữ liệu",
          icon: mdiDownload,
          onClick: (e) => onOpenExportData && onOpenExportData(true),
        },
      ],
      chat: [],
    };

    const DRAWER_MENU_ITEMS = [
      {
        title: "Todo List",
        hasDivider: true,
        items: [...MORE_MENU_ITEMS[view]],
      },
      {
        title: "Bảng việc",
        hasDivider: false,
        items: [
          {
            text: "Chỉnh sửa bảng việc",
            icon: mdiPencil,
            onClick: (e) => setIsOpenEditGroup(true),
          },
          {
            text: "Thành viên bảng việc",
            icon: mdiAccountSupervisor,
            onClick: (e) => onUpdateMember(),
            canDisplay: canUpdateProject && view !== "grantt",
          },
          {
            text: "Lịch làm việc",
            icon: mdiCalendarText,
            onClick: (e) => onUpdateTime(),
          },
          {
            text: "Cài đặt bảng việc",
            icon: mdiCogs,
            onClick: (e) => onUpdateSetting(),
          },
          {
            text: isProjectVisible ? "Ẩn bảng việc" : "Hiện bảng việc",
            icon: isProjectVisible ? mdiEyeOff : mdiEye,
            onClick: (e) => !disableShowHide && onUpdateVisible(),
          },
          {
            text: "Xoá bảng việc",
            icon: mdiDelete,
            onClick: (e) => _handleDeleteProject(project.id),
            isDeleteItem: true,
          },
        ],
      },
    ];

    const _handleDeleteProject = (id) => {
      setOpenAlert(true);
    };

    const _handleDeleted = (id) => {
      if (project)
        history.replace(`/projects?groupID=${project.group_project_id}`);
    };

    return (
      <>
        <Box
          className={classNames(classes.drawerWrapper, { isCollapsed: isOpen })}
        >
          <div className={classes.drawerHeader}>
            <Typography
              variant="h3"
              component="h3"
              style={{ fontSize: 20, fontWeight: 500 }}
            >
              {t("Menu")}
            </Typography>
            <Icon
              path={mdiClose}
              size={1}
              style={{ cursor: "pointer" }}
              onClick={toggleDrawer}
            />
          </div>

          <List>
            {DRAWER_MENU_ITEMS.map((item, index) => (
              <GroupFilter key={index} {...item} />
            ))}
          </List>
        </Box>

        <DeleteProjectModal
          open={openAlert}
          setOpen={setOpenAlert}
          projectGroupId={project?.id}
          selectedProject={project}
          doAfterSuccess={_handleDeleted}
        />
        <EditProjectModal
          open={isOpenEditGroup}
          setOpen={setIsOpenEditGroup}
          {...{ curProject: project }}
        />
        <ExportTaskGroupData ref={refExport} onExportData={onExportData} />
        <ManageTableData
          ref={refManageTableData}
          onReOrderColumns={onReOrderColumns}
          onAddColumns={onAddColumns}
          onHideColumn={onHideColumn}
          setItemLocation={setItemLocation}
        />
      </>
    );
  }
);

const GroupFilter = React.memo(({ title, hasDivider = false, items = [] }) => {
  return (
    <>
      <p style={{ padding: "0 16px", color: "#666", fontSize: 14 }}>{title}</p>
      {items.map((item, index) => (
        <ItemMenuFilter key={index} {...item} />
      ))}
      {hasDivider && <Divider />}
    </>
  );
});

const ItemMenuFilter = ({
  text,
  icon,
  subText,
  valueSearch,
  canDisplay = true,
  isSearchItem = false,
  isCheckType = false,
  isActive = false,
  isDeleteItem = false,
  onClick = () => {},
  onSearch = () => {},
}) => {
  const classes = useStyles();

  if (!canDisplay) return null;
  if (isSearchItem)
    return (
      <ItemSearch
        text={text}
        icon={icon}
        onClick={onClick}
        valueSearch={valueSearch}
        onSearch={onSearch}
      />
    );

  return (
    <>
      <ListItem button className={classes.menuItem} onClick={(e) => onClick(e)}>
        <ListItemIcon className={classes.menuIcon}>
          {isActive ? (
            <Icon path={mdiCheckboxMarked} color="#11A159" size={1} />
          ) : (
            <Icon
              path={isCheckType ? mdiCheckboxBlankOutline : icon}
              size={1}
            />
          )}
        </ListItemIcon>
        <div className={classes.menuTextWrapper}>
          <ListItemText
            className={classNames(classes.menuText, {
              "is-delete": isDeleteItem,
            })}
            primary={text}
          />
          <Typography>{subText}</Typography>
        </div>
      </ListItem>
    </>
  );
};

const ItemSearch = ({ icon, valueSearch, text, onSearch = () => {} }) => {
  const classes = useStyles();

  const [isFocus, setIsFocus] = useState(false);
  const refInput = useRef(null);

  const _handleFocus = () => {
    setIsFocus(true);
    setTimeout(() => {
      refInput.current.focus();
    }, 0);
  };

  const _handleBlur = () => {
    if (!refInput.current.value.length) {
      setIsFocus(false);
    }
  };

  return (
    <ListItem button className={classes.menuItem} onClick={_handleFocus}>
      <ListItemIcon className={classes.menuIcon}>
        <Icon path={icon} size={1} />
      </ListItemIcon>
      <div className={classes.menuTextWrapper}>
        {isFocus ? (
          <>
            <input
              ref={refInput}
              type="text"
              className={classes.inputSearch}
              placeholder="Nhập nội dung cần tìm"
              onBlur={_handleBlur}
              value={valueSearch}
              onChange={onSearch}
              style={{
                border: 0,
                background: "transparent",
                outline: "none",
                height: 25,
              }}
            />
          </>
        ) : (
          <ListItemText className={classes.menuText} primary={text} />
        )}
      </div>
    </ListItem>
  );
};

export default DrawerFilter;
