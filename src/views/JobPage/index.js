import React, { Suspense, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { times } from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { useLocalStorage } from "../../hooks";
import { useMultipleSelect } from "./hooks/useMultipleSelect";
import { JobPageContext } from "./JobPageContext";
import TabList from "./LeftPart_new/TabList";
import routes from "./routes";
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
      piority_low: {
        label: "Ưu tiên thấp",
        value: "piority_low"
      },
      piority_medium: {
        label: "Ưu tiên trung bình",
        value: "piority_medium"
      },
      piority_hight: {
        label: "Ưu tiên cao",
        value: "piority_hight"
      }
    },
    orders: ["piority_low", "piority_medium", "piority_hight"]
  }
];
export const defaultStatusFilter = {
  all: false,
  waiting: false,
  doing: false,
  complete: false,
  expired: false,
  stop: false
};
function JobPage() {
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
  useEffect(() => {
    setLocalOptions({
      ...localOptions,
      timeType
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeType]);
  const [timeRange, settimeRange] = React.useState(() => {
    const [timeStart, timeEnd] = times[1].option();
    return {
      timeStart,
      timeEnd
    };
  });
  const [
    statusFilter,
    setstatusFilter,
    handleRemovestatusFilter
  ] = useMultipleSelect(defaultStatusFilter, true, true);
  return (
    <TwoColumnsLayout
      leftRenders={[() => <TabList />]}
      rightRender={({ expand, handleExpand, handleSubSlide }) => (
        <Provider
          value={{
            expand,
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
            handleRemovestatusFilter
          }}
        >
          <div>
            <Suspense fallback={<LoadingBox />}>
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
            </Suspense>
          </div>
        </Provider>
      )}
    />
  );
}

export default JobPage;
