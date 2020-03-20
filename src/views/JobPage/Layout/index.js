import { ClickAwayListener, Drawer, SvgIcon } from "@material-ui/core";
import {
  mdiCalendar,
  mdiFilterOutline,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiSettingsOutline
} from "@mdi/js";
import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { TimeRangePopover, times } from "../../../components/CustomPopover";
import {
  CustomTableLayout,
  CustomTableProvider
} from "../../../components/CustomTable";
import LoadingBox from "../../../components/LoadingBox";
import { bgColorSelector } from "../../ProjectGroupPage/RightPart/AllProjectTable/selectors";
import { QuickViewTaskDetailHeaderWrap } from "../components/QuickViewTaskDetail";
import RedirectModal from "../components/RedirectModal";
import { JobPageContext } from "../JobPageContext";
import { loginlineFunc } from "../utils";
import "./Layout.css";
import QuickView from "./QuickView";

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
  const open = !!quickTask;
  const [openModalDirect, setOopenModalDirect] = useState();
  return (
    <div className="comp_JobPageLayoutWrapper">
      <div className="comp_JobPageLayout__content">
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
                  label: "Lọc",
                  iconPath: mdiFilterOutline,
                  onClick: () =>
                    setQuickTask(
                      <QuickView
                        title={
                          <QuickViewTaskDetailHeaderWrap>
                            <SvgIcon>{mdiSettingsOutline}</SvgIcon>
                          </QuickViewTaskDetailHeaderWrap>
                        }
                      ></QuickView>
                    )
                }
              ],
              mainAction: {
                label: "+ Tạo công việc",
                onClick: () => setOopenModalDirect(true)
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
        className="comp_JobPageLayout__drawer"
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: "comp_JobPageLayout__drawerPaper"
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
            <Scrollbars>{quickTask}</Scrollbars>
          </ClickAwayListener>
        )}
      </Drawer>
      {openModalDirect && (
        <RedirectModal onClose={() => setOopenModalDirect(false)} />
      )}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state)
  };
};
export default connect(mapStateToProps)(Layout);
