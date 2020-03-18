import { ClickAwayListener, Drawer, makeStyles } from "@material-ui/core";
import { mdiCalendar, mdiFullscreen, mdiFullscreenExit, mdiSettingsOutline } from "@mdi/js";
import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { TimeRangePopover, times } from "../../../components/CustomPopover";
import { CustomTableLayout, CustomTableProvider } from "../../../components/CustomTable";
import LoadingBox from "../../../components/LoadingBox";
import { bgColorSelector } from "../../ProjectGroupPage/RightPart/AllProjectTable/selectors";
import { JobPageContext } from "../JobPageContext";
import { loginlineFunc } from "../utils";
import "./Layout.css";
const drawerWidth = 400;
const useStyles = makeStyles(theme => ({
  layoutWrapper: {
    position: "relative",
    display: "flex"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
    // marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    top: "70px",
    height: "calc(100% - 70px)",
    position: "absolute",
    width: drawerWidth,
    boxShadow: "-18px 8px 24px -10px rgba(0, 0, 0, 0.2)"
  }
}));
function Layout({ children, title, bgColor }) {
  const { t } = useTranslation();
  const {
    timeAnchor,
    setTimeAnchor,
    quickTask,
    setQuickTask,
    timeType,
    setTimeType,
    timeRange,
    settimeRange,
    expand,
    handleExpand
  } = useContext(JobPageContext);

  console.log({ expand, timeAnchor, timeType, timeRange });
  const classes = useStyles();
  const open = !!quickTask;
  return (
    <div className={classes.layoutWrapper}>
      <div className={classes.content}>
        <CustomTableProvider
          value={{
            options: {
              title,
              subActions: [
                {
                  label: times[timeType].title,
                  iconPath: mdiCalendar,
                  onClick: loginlineFunc(evt => setTimeAnchor(evt.target))
                },
                {
                  label: t(expand ? "Thu gọn" : "Mở rộng"),
                  iconPath: expand ? mdiFullscreenExit : mdiFullscreen,
                  onClick: () => handleExpand(!expand)
                },
                {
                  label: "setting",
                  iconPath: mdiSettingsOutline,
                  onClick: loginlineFunc
                }
              ],
              mainAction: {
                label: "+ Tạo công việc",
                onClick: loginlineFunc
              },
              search: {
                patern: "",
                onChange: loginlineFunc
              },

              grouped: {
                bool: true,
                id: "id",
                label: loginlineFunc,
                item: "tasks"
              },

              draggable: {
                bool: true,
                onDragEnd: result => {}
              },

              loading: {
                bool: false,
                component: () => <LoadingBox />
              },
              row: {
                id: "id"
              }
            }
          }}
        >
          <CustomTableLayout>{children}</CustomTableLayout>
          <TimeRangePopover
            bgColor={bgColor}
            anchorEl={timeAnchor}
            setAnchorEl={setTimeAnchor}
            timeOptionDefault={timeType}
            handleTimeRange={(timeType, startDate, endDate) => {
              setTimeType(timeType);
              settimeRange({ startDate, endDate });
            }}
          />
        </CustomTableProvider>
      </div>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        disableBackdropClick={false}
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
        closeAfterTransition
        onClose={() => setQuickTask(undefined)}
      >
        {open && (
          <ClickAwayListener
            onClickAway={() => {
              setQuickTask(undefined);
            }}
          >
            <Scrollbars>
              {quickTask}
            </Scrollbars>
          </ClickAwayListener>
        )}
      </Drawer>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state)
  };
};
export default connect(mapStateToProps)(Layout);
