import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  mdiCalendarRange,
  mdiChevronLeft,
  mdiClose,
  mdiDeleteOutline,
  mdiDownload,
  mdiFilter,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

export const FilterDrawerAllGroup = forwardRef((props, ref) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const DRAWER_MENU_ITEMS = [
    {
      text: t("VIEW_OFFER_LABEL_FILTER_BY_TIME"),
      icon: mdiCalendarRange,
      subText: "Tất cả",
      hasDivider: true,
    },
    { text: "Xuất dữ liệu", icon: mdiDownload },
    { text: "Thùng rác", icon: mdiDeleteOutline, isDeleteItem: true },
  ];

  useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box className={classNames(classes.drawerWrapper, { isCollapsed: isOpen })}>
      <div className={classes.drawerHeader}>
        <Icon
          path={mdiChevronLeft}
          size={1}
          style={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        />
        <Typography
          variant="h3"
          component="h3"
          style={{ fontSize: 20, fontWeight: 500 }}
        >
          {t("LABEL_FILTER_WORKING_BOARD")}
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
          <ItemMenuFilter key={index} {...item} />
        ))}
      </List>
    </Box>
  );
});

const ItemMenuFilter = ({
  text,
  icon,
  subText,
  hasDivider = false,
  onClick = () => {},
}) => {
  const classes = useStyles();
  return (
    <>
      <ListItem button className={classes.menuItem} onClick={onClick}>
        <ListItemIcon className={classes.menuIcon}>
          <Icon path={icon} size={1} />
        </ListItemIcon>
        <div className={classes.menuTextWrapper}>
          <ListItemText className={classes.menuText} primary={text} />
          <Typography>{subText}</Typography>
        </div>
      </ListItem>
      {hasDivider && <Divider />}
    </>
  );
};

const useStyles = makeStyles({
  drawerWrapper: {
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    height: "calc(100% - 55px)",
    width: 300,
    transform: "translateX(100%)",
    transition: "0.3s all ease-in-out",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
    "&.isCollapsed": {
      transform: "translateX(0)",
    },
    svg: { color: "rgba(0, 0, 0, 0.87)" },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    padding: 18.5,
    fontSize: 21,
  },
  menuItem: { fontWeight: 500 },
  menuText: { "& span": { fontWeight: 400, color: "#666" } },
  menuIcon: { minWidth: 35 },
  menuTextWrapper: {
    display: "flex",
    flexDirection: "column",
    color: "#666",
    "& p": { fontSize: 11 },
  },
});
