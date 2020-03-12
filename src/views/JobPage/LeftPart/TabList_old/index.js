import React from "react";
import Icon from "@mdi/react";
import {
  mdiAccountSettingsOutline,
  mdiClockOutline,
  mdiAccountArrowLeft,
  mdiAccountArrowRight,
  mdiAccountCheck,
  mdiHeartBox,
  mdiCircleSlice3
} from "@mdi/js";
import { ListItemText } from "@material-ui/core";
import LoadingBox from "../../../../components/LoadingBox";
import ErrorBox from "../../../../components/ErrorBox";
import LeftSideContainer from "../../../../components/LeftSideContainer";
import { StyledList, StyledListItem } from "../../../../components/CustomList";
import { map, get } from "lodash";
import { connect } from "react-redux";

import "./style.scss";

const LabelListItem = ({ className = "", ...props }) => (
  <StyledListItem
    className={`view_Job_Tablist___label-list-item ${className}`}
    {...props}
  />
);

const LabelPrimary = ({ className = "", ...props }) => (
  <span
    className={`view_Job_Tablist___label-primary ${className}`}
    {...props}
  />
);

const TaskPrimary = ({ className = "", ...props }) => (
  <div className={`view_Job_Tablist___task-primary ${className}`} {...props} />
);

const tabs = [
  {
    group: "Gần đây",
    tasks: [
      {
        name: "Công việc của bạn",
        task_count: 0,
        iconPath: mdiClockOutline,
        iconColor: "#ffb400"
      }
    ]
  },
  {
    group: "Trạng thái",
    tasks: [
      {
        name: "Công việc đến hạn",
        task_count: 0,
        iconPath: mdiCircleSlice3,
        iconColor: "#ffa900"
      },
      {
        name: "Công việc quá hạn",
        task_count: 0,
        iconPath: mdiCircleSlice3,
        iconColor: "#ff0000"
      },
      {
        name: "Công việc đang chờ",
        task_count: 0,
        iconPath: mdiCircleSlice3,
        iconColor: "#a5a5a5"
      },
      {
        name: "Công việc hoàn thành",
        task_count: 0,
        iconPath: mdiCircleSlice3,
        iconColor: "#0cd716"
      }
    ]
  },
  {
    group: "Nhiệm vụ",
    tasks: [
      {
        name: "Giao việc",
        task_count: 0,
        iconPath: mdiAccountArrowRight,
        iconColor: "#ff0000"
      },
      {
        name: "Công việc được giao",
        task_count: 0,
        iconPath: mdiAccountArrowLeft,
        iconColor: "#1691f2"
      },
      {
        name: "Công việc tự đề xuất",
        task_count: 0,
        iconPath: mdiAccountCheck,
        iconColor: "#9c00ff"
      }
    ]
  },
  {
    group: "Ưu tiên",
    tasks: [
      {
        name: "Ưu tiên cao",
        task_count: 0,
        iconPath: mdiHeartBox,
        iconColor: "#ff0000"
      },
      {
        name: "Ưu tiên trung bình",
        task_count: 0,
        iconPath: mdiHeartBox,
        iconColor: "#ffa900"
      },
      {
        name: "Ưu tiên thấp",
        task_count: 0,
        iconPath: mdiHeartBox,
        iconColor: "#0cd716"
      }
    ]
  },
  {
    group: "Vai trò",
    tasks: [
      {
        name: "Giám sát",
        task_count: 0,
        iconPath: mdiAccountSettingsOutline,
        iconColor: "#a5a5a5"
      },
      {
        name: "Quản lý",
        task_count: 0,
        iconPath: mdiAccountSettingsOutline,
        iconColor: "#a5a5a5"
      },
      {
        name: "Thực hiện",
        task_count: 0,
        iconPath: mdiAccountSettingsOutline,
        iconColor: "#a5a5a5"
      }
    ]
  }
];

function ProjectList() {
  const loading = false;
  const error = null;

  return (
    <>
      {error !== null && <ErrorBox />}
      {error === null && (
        <LeftSideContainer
          title="Công việc của bạn"
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
          <StyledList>
            {map(tabs, (tab, index) => (
              <>
                <LabelListItem key={index}>
                  <ListItemText
                    primary={
                      <LabelPrimary>{get(tab, "group", "")}</LabelPrimary>
                    }
                  />
                </LabelListItem>
                {map(get(tab, "tasks", []), (task, _index) => (
                  <StyledListItem key={`${index}-${_index}`}>
                    <ListItemText
                      primary={
                        <TaskPrimary>
                          <Icon
                            path={get(task, "iconPath")}
                            size={1}
                            color={get(task, "iconColor")}
                          />
                          <span>{get(task, "name", "")}</span>
                          <small>({get(task, "task_count", 0)})</small>
                        </TaskPrimary>
                      }
                    />
                  </StyledListItem>
                ))}
              </>
            ))}
          </StyledList>
        </LeftSideContainer>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
