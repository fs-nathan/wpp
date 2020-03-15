import {
  mdiCalendar,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiSettingsOutline
} from "@mdi/js";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { TimeRangePopover, times } from "../../../components/CustomPopover";
import {
  CustomTableLayout,
  CustomTableProvider
} from "../../../components/CustomTable";
import LoadingBox from "../../../components/LoadingBox";
import { bgColorSelector } from "../../ProjectGroupPage/RightPart/AllProjectTable/selectors";
import { JobPageContext } from "../JobPageContext";
import loginlineFunc from "../utils";
import "./Layout.css";
function Layout({ children, title, bgColor }) {
  const { t } = useTranslation();
  const { expand, handleExpand } = useContext(JobPageContext);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(0);
  const [timeRange, settimeRange] = React.useState(null);
  console.log({ expand, timeAnchor, timeType, timeRange });
  return (
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
  );
}
const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state)
  };
};
export default connect(mapStateToProps)(Layout);
