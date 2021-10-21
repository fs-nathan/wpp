import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  mdiClose,
  mdiDeleteOutline,
  mdiDotsHorizontal,
  mdiDownload,
  mdiFilter,
  mdiMagnify,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { Routes } from "constants/routes";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router";
import "../styles/header-table.scss";
import { FilterDrawerAllGroup } from "./FilterDrawerAllGroup";
import { TitleTable } from "./TitleTable";

const HeaderTableAllGroup = ({
  currentGroup,
  expand,
  onExpand,
  typeData,
  onOpenCreateModal,
}) => {
  const classes = useStyles();
  const refMenuDrawer = useRef(null);

  const _toggleDrawerMenu = () => refMenuDrawer.current._toggle();

  return (
    <div className="AllGroup__header--wrapper">
      <TitleTable
        currentGroup={currentGroup}
        expand={expand}
        onExpand={onExpand}
        typeData={typeData}
      />
      <div className="AllGroup__header--right">
        <div className={classes.wrapperButton}>
          <Icon path={mdiMagnify} size={1} />
        </div>
        <div className={classes.wrapperButton} onClick={_toggleDrawerMenu}>
          <Icon path={mdiDotsHorizontal} size={1} />
          <span style={{ marginLeft: 5 }}>Hiện menu</span>
        </div>
        <div className={classes.wrapperButton} onClick={onOpenCreateModal}>
          <Icon path={mdiPlus} size={1} />
          <span style={{ marginLeft: 5 }}>Tạo mới</span>
        </div>
        <MenuDrawer ref={refMenuDrawer} />
      </div>
    </div>
  );
};

const MenuDrawer = forwardRef(({ anchor = "right" }, ref) => {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const refFilter = useRef(null);

  useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const DRAWER_MENU_ITEMS = [
    {
      text: "Lọc bảng việc",
      icon: mdiFilter,
      onClick: () => refFilter.current._toggle(),
    },
    {
      text: "Xuất dữ liệu",
      icon: mdiDownload,
      onClick: () => refFilter.current._toggle(),
    },
    {
      text: "Thùng rác",
      icon: mdiDeleteOutline,
      onClick: () => history.push(`${Routes.PROJECTS}/deleted`),
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
            Menu
          </Typography>
          <Icon
            path={mdiClose}
            size={1}
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer}
          />
        </div>

        <List>
          {DRAWER_MENU_ITEMS.map(
            ({ text, icon, onClick = () => {} }, index) => (
              <ListItem
                button
                key={text}
                className={classes.menuItem}
                onClick={onClick}
              >
                <ListItemIcon className={classes.menuIcon}>
                  <Icon path={icon} size={1} />
                </ListItemIcon>
                <ListItemText className={classes.menuText} primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Box>
      <FilterDrawerAllGroup ref={refFilter} />
    </>
  );
});

const useStyles = makeStyles({
  wrapperButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    color: "#666",
    marginLeft: 10,
    fontWeight: 500,
    padding: "7.75px 9.5px",
    borderRadius: 3,
    transition: "0.3s all ease-in-out",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
  },
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
});

export default React.memo(HeaderTableAllGroup);
