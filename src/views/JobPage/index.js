import { mdiAccountSwitch, mdiAccountTie, mdiAlarm, mdiViewDashboard } from "@mdi/js";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useTimes } from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { useLocalStorage } from "../../hooks";
import { labels, roleAttrs, statistic } from "./contants/attrs";
import { emptyArray } from "./contants/defaultValue";
import { Routes } from "./contants/routes";
import { useMultipleSelect } from "./hooks/useMultipleSelect";
import { JobPageContext } from "./JobPageContext";
import TabList from "./LeftPart_new/TabList";
import { loadTaskPage } from "./redux/actions";
import { TASK_OVERVIEW_STATISTIC } from "./redux/types";
import routes from "./routes";
import { formatTime, get } from "./utils";
const { Provider } = JobPageContext;
const filterConfig = [
  {
    title: "LỌC THEO TRẠNG THÁI CÔNG VIỆC",
    subTitle: "Chọn/bỏ chọn trạng thái để lọc công việc",
    optionEntities: {
      waiting: {
        label: "Đang chờ",
        value: "waiting"
      },
      doing: {
        label: "Đang làm",
        value: "doing"
      },
      complete: {
        label: "Hoàn thành",
        value: "complete"
      },
      expired: {
        label: "Quá hạn",
        value: "expired"
      },
      stop: {
        label: "Tạm dừng",
        value: "stop"
      }
    },
    orders: ["waiting", "doing", "complete", "expired", "stop"]
  },
  {
    title: "LỌC THEO MỨC ĐỘ ƯU TIÊN",
    subTitle: "Chọn/bỏ chọn mức độ ưu tiên để lọc công việc",
    optionEntities: {
      priority_low: {
        label: "Ưu tiên thấp",
        value: "priority_low"
      },
      priority_medium: {
        label: "Ưu tiên trung bình",
        value: "priority_medium"
      },
      priority_hight: {
        label: "Ưu tiên cao",
        value: "priority_hight"
      }
    },
    orders: ["priority_low", "priority_medium", "priority_hight"]
  }
];
export const defaultStatusFilter = {
  waiting: true,
  doing: true,
  complete: true,
  expired: true,
  stop: true
};
export const defaultPriorityFilter = {
  priority_low: true,
  priority_medium: true,
  priority_hight: true
};

export const defaultFilter = {
  ...defaultStatusFilter,
  ...defaultPriorityFilter
};
function JobPage() {
  const { t } = useTranslation();
  const [keyword, setkeyword] = useState("");
  const [localOptions, setLocalOptions] = useLocalStorage(
    "LOCAL_PROJECT_OPTIONS",
    {
      filterType: 1,
      timeType: 5
    }
  );
  const [quickTask, setQuickTask] = useState();
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  const times = useTimes();
  useEffect(() => {
    setLocalOptions({
      ...localOptions,
      timeType
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeType]);
  const [timeRange, settimeRange] = React.useState(() => {
    const [startDate, endDate] = times[1].option();
    return {
      startDate,
      endDate
    };
  });
  const [
    statusFilter,
    setstatusFilter,
    handleRemovestatusFilter
  ] = useMultipleSelect(defaultFilter, true, true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadTaskPage({
        timeStart: formatTime(timeRange.startDate),
        timeEnd: formatTime(timeRange.endDate)
      })
    );
  }, [dispatch, timeRange.startDate, timeRange.endDate]);
  const roles = useSelector(state => {
    return get(
      state.taskPage[TASK_OVERVIEW_STATISTIC],
      statistic.roles,
      emptyArray
    );
  });
  const listMenu = [
    {
      title: t(labels.overview),
      url: Routes.OVERVIEW,
      color: "#7d99a6",
      icon: mdiViewDashboard
    },
    {
      title: t(labels.due),
      url: Routes.DUE,
      color: "#FF9800",
      icon: mdiAlarm
    },
    {
      title: t(labels.mission),
      icon: mdiAccountSwitch,
      color: "#03a9f4",
      sub: [
        {
          name: t(labels.mission_giving),
          url: Routes.MISSION.replace(":typeAssign", "0")
        },
        {
          name: t(labels.mission_given),
          url: Routes.MISSION.replace(":typeAssign", "1")
        },
        {
          name: t(labels.self_giving),
          url: Routes.MISSION.replace(":typeAssign", "2")
        }
      ]
    },

    {
      title: t(labels.role),
      icon: mdiAccountTie,
      color: "#f44336",
      sub: roles.map(role => ({
        name: t(get(role, roleAttrs.name)),
        url: Routes.ROLE.replace(":roleId", get(role, roleAttrs.id))
      }))
    }
  ];
  const [pin, setPin] = useState(false);
  const handleClose = () => {
    !pin && setQuickTask(undefined);
  };
  return (
    <TwoColumnsLayout
      leftRenders={[() => <TabList {...{ listMenu }} />]}
      rightRender={({ expand, handleExpand, handleSubSlide }) => (
        <Provider
          value={{
            expand,
            setPin,
            handleClose,
            listMenu,
            filterConfig,
            handleExpand,
            quickTask,
            setQuickTask,
            handleSubSlide,
            timeAnchor,
            setTimeAnchor,
            timeType,
            setTimeType,
            timeRange,
            settimeRange,
            statusFilter,
            setstatusFilter,
            handleRemovestatusFilter,
            keyword,
            setkeyword
          }}
        >
          <div>
            <Suspense fallback={<LoadingBox />}>
              <Switch>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </Suspense>
          </div>
        </Provider>
      )}
    />
  );
}

export default JobPage;
