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
  mdiMagnify,
  mdiPencil,
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
import EditProjectModal from "views/ProjectGroupPage/Modals/EditProject/index.js";
import ExportTaskGroupData from "views/ProjectGroupPage/RightPart/AllProjectTable/components/ExportTaskGroupData";
import ManageTableData from "./ManageTableData";
import { useStyles } from "./styles";

const DrawerFilter = forwardRef(
  (
    {
      project = {},
      disableShowHide,
      isProjectVisible = false,
      canUpdateProject = false,
      hasMemberId = false,
      onUpdateMember = () => {},
      onUpdateTime = () => {},
      onUpdateVisible = () => {},
      onUpdateSetting = () => {},
      onExportData = () => {},
      onFilter = () => {},
    },
    ref
  ) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
    const { t } = useTranslation();
    const refManageTableData = useRef(null);
    const refExport = useRef(null);

    useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

    const DRAWER_MENU_ITEMS = [
      {
        title: "Todo List",
        hasDivider: true,
        items: [
          {
            text: "Tìm kiếm công việc",
            icon: mdiMagnify,
            isSearchItem: true,
            onClick: (e) => {},
          },
          {
            text: "Lọc công việc",
            icon: mdiFilter,
            onClick: (e) => {},
          },
          {
            text: "Quản lý bảng dữ liệu",
            icon: mdiCalendarRange,
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
            canDisplay: canUpdateProject,
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
            onClick: (e) => {},
          },
        ],
      },
    ];

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

        <EditProjectModal
          open={isOpenEditGroup}
          setOpen={setIsOpenEditGroup}
          {...{ curProject: project }}
        />
        <ExportTaskGroupData ref={refExport} onExportData={onExportData} />
        <ManageTableData ref={refManageTableData} />
      </>
    );
  }
);

const GroupFilter = ({ title, hasDivider = false, items = [] }) => {
  return (
    <>
      <p style={{ padding: "0 16px", color: "#666", fontSize: 14 }}>{title}</p>
      {items.map((item, index) => (
        <ItemMenuFilter key={index} {...item} />
      ))}
      {hasDivider && <Divider />}
    </>
  );
};

const ItemMenuFilter = ({
  text,
  icon,
  subText,
  isSearchItem = false,
  isCheckType = false,
  isActive = false,
  onClick = () => {},
}) => {
  const classes = useStyles();

  if (isSearchItem)
    return <ItemSearch text={text} icon={icon} onClick={onClick} />;

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
          <ListItemText className={classes.menuText} primary={text} />
          <Typography>{subText}</Typography>
        </div>
      </ListItem>
    </>
  );
};

const ItemSearch = ({ icon, text }) => {
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
