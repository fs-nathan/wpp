import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  mdiCalendarRange,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiChevronLeft,
  mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useFilters, useTimes } from "components/CustomPopover";
import { includes, isArray } from "lodash";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { listProjectLabel } from "actions/projectLabels/listProjectLabels";
import { useDispatch, useSelector } from "react-redux";

export const FilterDrawerAllGroup = forwardRef(
  (
    {
      filterType,
      timeType,
      onFilter = () => {},
      onCloseMainMenu = () => {},
      onSetTimeRangeAnchor = () => {},
    },
    ref
  ) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const times = useTimes();
    const [isOpen, setIsOpen] = useState(false);
    const filters = useFilters();
    const labelsProject = useSelector(
      ({ projectLabels }) => projectLabels.listProjectLabels
    );

    const dispatch = useDispatch();

    useEffect(() => {
      if (labelsProject.firstTime) dispatch(listProjectLabel());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const DRAWER_MENU_ITEMS = [
      {
        text: t("VIEW_OFFER_LABEL_FILTER_BY_TIME"),
        icon: mdiCalendarRange,
        subText: times[timeType].title,
        hasDivider: true,
        onClick: (e) => {
          onSetTimeRangeAnchor(e);
          onCloseMainMenu();
          setIsOpen(false);
        },
      },
    ];

    useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Box
        className={classNames(classes.drawerWrapper, { isCollapsed: isOpen })}
      >
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
          <Divider />
          {filters.map((item, index) => {
            const isActive = includes(
              !isArray(filterType) ? [filterType] : filterType,
              index
            );
            return (
              <ItemMenuFilter
                key={index}
                isActive={isActive}
                text={item.title}
                isCheckType
                onClick={() => onFilter(index)}
              />
            );
          })}
          <Divider />

          {labelsProject.data?.labels?.map((item) => {
            return <ItemLabelFilter key={item.id} {...item} />;
          })}
        </List>
      </Box>
    );
  }
);

const ItemLabelFilter = ({ isActive, color, name, onClick = () => {} }) => {
  const classes = useStyles();
  return (
    <ListItem button className={[classes.menuItem]} onClick={(e) => onClick(e)}>
      <ListItemIcon className={classes.menuIcon}>
        {isActive ? (
          <Icon path={mdiCheckboxMarked} color="#11A159" size={1} />
        ) : (
          <Icon path={mdiCheckboxBlankOutline} size={1} />
        )}
      </ListItemIcon>
      <div className={classNames(classes.menuTextWrapper, "labelText")}>
        <ListItemText
          style={{
            background: color,
            padding: "5px 10px",
            borderRadius: "15px",
            color: "#fff!important",
          }}
          className={classes.menuText}
          primary={name}
        />
      </div>
    </ListItem>
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
    "&.labelText span": { color: "#fff" },
  },
});
