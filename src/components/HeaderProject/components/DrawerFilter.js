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
import ManageTableData from "./ManageTableData";
import { useStyles } from "./styles";

const DrawerFilter = forwardRef(({ onFilter = () => {} }, ref) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const refManageTableData = useRef(null);
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
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Lọc công việc",
          icon: mdiFilter,
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Quản lý bảng dữ liệu",
          icon: mdiCalendarRange,
          hasDivider: true,
          onClick: (e) => {
            refManageTableData.current._toggle();
          },
        },
        {
          text: "Xuất dữ liệu",
          icon: mdiDownload,
          hasDivider: true,
          onClick: (e) => {},
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
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Thành viên bảng việc",
          icon: mdiAccountSupervisor,
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Lịch làm việc",
          icon: mdiCalendarText,
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Cài đặt bảng việc",
          icon: mdiCogs,
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Ẩn bảng việc",
          icon: mdiEyeOff,
          hasDivider: true,
          onClick: (e) => {},
        },
        {
          text: "Xoá bảng việc",
          icon: mdiDelete,
          hasDivider: true,
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

      <ManageTableData ref={refManageTableData} />
    </>
  );
});

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
  isCheckType = false,
  isActive = false,
  onClick = () => {},
}) => {
  const classes = useStyles();
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

export default DrawerFilter;
