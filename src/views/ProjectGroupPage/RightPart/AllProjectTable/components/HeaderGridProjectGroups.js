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
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { CustomTableContext } from "components/CustomTable";
import { Routes } from "constants/routes";
import { get } from "lodash";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import "../styles/header-table.scss";
import ExportTaskGroupData from "./ExportTaskGroupData";
import { FilterDrawerAllGroup } from "./FilterDrawerAllGroup";
import SearchButton from "./SearchButton";
import { TitleTable } from "./TitleTable";

const HeaderGridProjectGroups = ({
  currentGroup,
  expand,
  onExpand,
  typeData,
  onOpenCreateModal = () => {},
  onFilterType = () => {},
  onSearch = () => {},
  onSetTimeRangeAnchor = () => {},
  isDisplayGroupGrid,
  ...props
}) => {
  const classes = useStyles();
  const refMenuDrawer = useRef(null);
  const TableContext = React.useContext(CustomTableContext);

  const _toggleDrawerMenu = () => refMenuDrawer.current._toggle();

  return (
    <div
      id="header-table-group"
      className={`AllGroup__header--wrapper  isAllGroup`}
    >
      <div className="AllGroup__header--wrapper-inner">
        {
          <TitleTable
            // don't show tilte when click on info icon
            currentGroup={!isDisplayGroupGrid && currentGroup}
            expand={expand}
            typeData={typeData}
          />
        }
        <div
          id="AllGroup__searchBox--isAllGroup"
          className={`AllGroup__header--right isAllGroup`}
        >
          <SearchButton
            valueSearch={get(TableContext?.options, "search.patern", "")}
            onSearch={(value) => onSearch(value)}
          />
          <div className={classes.wrapperButton} onClick={onOpenCreateModal}>
            <Icon path={mdiPlus} size={1} />
          </div>
          <MenuDrawer
            ref={refMenuDrawer}
            onFilterType={onFilterType}
            onSetTimeRangeAnchor={onSetTimeRangeAnchor}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

const MenuDrawer = forwardRef(
  (
    {
      anchor = "right",
      filterType,
      labelType,
      timeType,
      onFilterType = () => {},
      onFilterLabel = () => {},
      onExportData = () => {},
      onSetTimeRangeAnchor = () => {},
    },
    ref
  ) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const refFilter = useRef(null);
    const refExport = useRef(null);

    useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

    const DRAWER_MENU_ITEMS = [
      {
        text: "L???c b???ng vi???c",
        icon: mdiFilter,
        onClick: () => refFilter.current._toggle(),
      },
      {
        text: t("EXPORT_DATA"),
        icon: mdiDownload,
        onClick: () => refExport.current._toggle(),
      },
      {
        text: t("TRASH"),
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

        <FilterDrawerAllGroup
          ref={refFilter}
          filterType={filterType}
          labelType={labelType}
          timeType={timeType}
          onFilter={onFilterType}
          onFilterLabel={onFilterLabel}
          onCloseMainMenu={() => setIsOpen(false)}
          onSetTimeRangeAnchor={onSetTimeRangeAnchor}
        />
        <ExportTaskGroupData ref={refExport} onExportData={onExportData} />
      </>
    );
  }
);

const useStyles = makeStyles({
  wrapperButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#ebedef",
    color: "#adaeba",
    marginLeft: 10,
    fontWeight: 500,
    padding: "10px 14px",
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

export default HeaderGridProjectGroups;
