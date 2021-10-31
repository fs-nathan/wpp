import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiChevronLeft,
  mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Box } from "@mui/system";
import { includes } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

function FilterSlider({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  handleCloseClick,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  const status = React.useMemo(
    () => [
      t("LABEL_CHAT_TASK_DANG_CHO"),
      t("LABEL_CHAT_TASK_DANG_LAM"),
      t("LABEL_CHAT_TASK_HOAN_THANH"),
      t("LABEL_CHAT_TASK_DA_QUA_HAN"),
      t("LABEL_CHAT_TASK_TAM_DUNG"),
    ],
    [t]
  );
  const priority = React.useMemo(
    () => [
      t("LABEL_CHAT_TASK_UU_TIEN_THAP"),
      t("LABEL_CHAT_TASK_UU_TIEN_TRUNG_BINH"),
      t("LABEL_CHAT_TASK_UU_TIEN_CAO"),
    ],
    [t]
  );

  return (
    <>
      <Box className={classes.drawerWrapper}>
        <div className={classes.drawerHeader}>
          <Icon
            path={mdiChevronLeft}
            size={1}
            style={{ cursor: "pointer" }}
            onClick={handleCloseClick}
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
            onClick={handleCloseClick}
          />
        </div>

        <List>
          {status.map((value, index) => (
            <ListItem
              button
              className={classes.menuItem}
              onClick={(evt) => setStatusFilter(index)}
            >
              <ListItemIcon className={classes.menuIcon}>
                {includes(statusFilter, index) ? (
                  <Icon path={mdiCheckboxMarked} color="#11A159" size={1} />
                ) : (
                  <Icon path={mdiCheckboxBlankOutline} size={1} />
                )}
              </ListItemIcon>
              <div className={classes.menuTextWrapper}>
                <ListItemText className={classes.menuText} primary={value} />
              </div>
            </ListItem>
          ))}

          <Divider />

          {priority.map((value, index) => (
            <ListItem
              button
              className={classes.menuItem}
              onClick={(evt) => setPriorityFilter(index)}
            >
              <ListItemIcon className={classes.menuIcon}>
                {includes(priorityFilter, index) ? (
                  <Icon path={mdiCheckboxMarked} color="#11A159" size={1} />
                ) : (
                  <Icon path={mdiCheckboxBlankOutline} size={1} />
                )}
              </ListItemIcon>
              <div className={classes.menuTextWrapper}>
                <ListItemText className={classes.menuText} primary={value} />
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  drawerWrapper: {
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    height: "calc(100% - 55px)",
    width: 420,
    transition: "0.3s all ease-in-out",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
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
    "&.labelText span": { color: "#fff" },
  },
});

export default FilterSlider;
