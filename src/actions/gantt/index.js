import {
  CHANGE_CALENDAR_PERMISSTION, CHANGE_COLUMN_INDEX,
  CHANGE_CONTENT_PREVIEW_PDF,
  CHANGE_FILTER_EXPORT_PDF,
  CHANGE_INSTANCE_GIRD,
  CHANGE_PROJECT_INFO,
  CHANGE_PROJECT_SCHEDULE, CHANGE_RENDER_FULL_DAY,
  CHANGE_ROW_HOVER,
  CHANGE_SCHEDULE_DETAIL_GANTT,
  CHANGE_TIMELINE_COLOR,
  CHANGE_VISIBLE,
  FETCH_PROJECT_SCHEDULE, GANTT_SHOW_FULL_CHART,
  GANTT_SHOW_HEADER,
  SCROLL_GANTT
} from "../../constants/actions/gantt";
import { apiService } from "../../constants/axiosInstance";

const typeColorGanttSetting = {
  total: "color_total_duration",
  group: "color_group_task",
  task: "color_task",
  duration: "color_duration_task",
};

const typeVisibleGanttSetting = {
  total: "state_total_duration",
  group: "state_group_task",
  task: "state_task",
  duration: "state_duration_task",
  date: "state_start_end",
  name: "state_label_name_of_task",
  numberDuration: "state_label_number_of_duration",
  numberComplete: "state_label_number_of_complete",
};

export const changeShowFullChart = (flag) => {
  return {
    type: GANTT_SHOW_FULL_CHART,
    payload: flag,
  };
};

export const changeShowHeader = (flag) => ({
  type: GANTT_SHOW_HEADER,
  payload: flag,
});

export const changeRowHover = (index) => ({
  type: CHANGE_ROW_HOVER,
  payload: index,
});

export const changeTimelineColor = (type, color, dataObject = {}) => ({
  type: CHANGE_TIMELINE_COLOR,
  payload: {
    type,
    color,
    dataObject,
  },
});

export const changeColumnIndex = (indexes) => ({
  type: CHANGE_COLUMN_INDEX,
  payload: indexes,
});

export const changeCalendarPermisstion = (permisstions) => ({
  type: CHANGE_CALENDAR_PERMISSTION,
  payload: permisstions,
});

export const changeVisible = (visible, section, type, dataObject = {}) => ({
  type: CHANGE_VISIBLE,
  payload: {
    visible,
    type,
    section,
    dataObject,
  },
});

export const changePreviewContent = (values) => ({
  type: CHANGE_CONTENT_PREVIEW_PDF,
  payload: values,
});

export const changeRenderFullDay = (flag) => ({
  type: CHANGE_RENDER_FULL_DAY,
  payload: flag,
});

export const changeFilterExportPdf = (start, end) => ({
  type: CHANGE_FILTER_EXPORT_PDF,
  payload: {
    start,
    end,
  },
});

export const changeInstanceGird = (gird) => {
  localStorage.setItem("timeUnitGantt", gird)
  return {
    type: CHANGE_INSTANCE_GIRD,
    payload: gird,
  }
};

export const scrollGantt = (flag) => ({
  type: SCROLL_GANTT,
  payload: flag,
});

export const changeScheduleDetailGantt = (detail) => ({
  type: CHANGE_SCHEDULE_DETAIL_GANTT,
  payload: detail,
});

export const actionChangeColorGanttSetting = (project_id, type, color) => {
  const data = {
    [typeColorGanttSetting[type]]: color,
    project_id,
  };
  const config = {
    url: "/gantt/setting",
    method: "post",
    data,
  };
  return apiService(config);
};

export const actionChangeCompleteTask = (task_id, complete) => {
  const config = {
    url: "task/update-complete",
    method: "put",
    data: {
      task_id,
      complete,
    },
  };
  return apiService(config);
};


export const changeProjectSchedule = (schedules) => ({
  type: CHANGE_PROJECT_SCHEDULE,
  payload: schedules
})

export const changeFlagFetchProjectSchedules = (flag) => ({
  type: FETCH_PROJECT_SCHEDULE,
  payload: flag
})
export const actionChangeTimeTask = ({
  task_id,
  start_date,
  start_time,
  end_date,
  end_time,
}) => {
  const config = {
    url: "task/update-time-duration",
    method: "put",
    data: {
      task_id,
      start_date,
      start_time,
      end_date,
      end_time,
    },
  };
  return apiService(config);
};

export const changeProjectInfo = ({ id, name, group_icon }) => ({
  type: CHANGE_PROJECT_INFO,
  payload: {
    id,
    name,
    group_icon,
  },
});

export const actionChangeVisibaleGanttSetting = (project_id, type, state) => {
  const data = {
    [typeVisibleGanttSetting[type]]: state ? 1 : 0,
    project_id,
  };
  const config = {
    url: "/gantt/setting",
    method: "post",
    data,
  };
  return apiService(config);
};

export const changeTaskduration = async ({
  task_id,
  start_date,
  start_time,
  end_date,
  end_time,
}) => {
  try {
    const config = {
      url: "task/update-time-duration",
      method: "put",
      data: {
        task_id,
        start_date,
        start_time,
        end_date,
        end_time,
      },
    };
    const result = await apiService(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const changeTaskComplete = async ({ task_id, complete }) => {
  try {
    const config = {
      url: "task/update-complete",
      method: "put",
      data: {
        task_id,
        complete,
      },
    };
    const result = await apiService(config);
  } catch (err) {
    console.log(err);
  }
};

export const sortTask = async (task_id, group_task, project_id, sort_index) => {
  try {
    const config = {
      url: "task/sort",
      method: "post",
      data: {
        task_id,
        group_task,
        project_id,
        sort_index
      },
    };
    const result = await apiService(config);
  } catch (err) {
    console.log(err);
  }
}

export const sortGroupTask = async (group_task_id, sort_index) => {
  try {
    const config = {
      url: "group-task/sort",
      method: "post",
      data: {
        group_task_id,
        sort_index
      },
    };
    const result = await apiService(config);
  } catch (err) {
    console.log(err);
  }
}