import {
  Box,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { mdiChevronLeft, mdiClose, mdiDownload } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

const ExportTaskGroupData = forwardRef(({ onExportData = () => {} }, ref) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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
          {t("EXPORT_DATA")}
        </Typography>
        <Icon
          path={mdiClose}
          size={1}
          style={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        />
      </div>

      <Box>
        <p
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            marginBottom: 0,
            color: "#666",
          }}
        >
          Xuất dữ liệu theo các điều kiện lọc hiện tại ra các định dạng dưới đây
        </p>

        <List>
          <ListItem button className={classes.menuItem} onClick={onExportData}>
            <ListItemIcon className={classes.menuIcon}>
              <Icon path={mdiDownload} color="#666" size={1} />
            </ListItemIcon>
            <div className={classes.menuTextWrapper}>
              <ListItemText
                className={classes.menuText}
                primary={"Xuất dữ liệu ra file .xsl"}
              />
            </div>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
});

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

export default ExportTaskGroupData;
