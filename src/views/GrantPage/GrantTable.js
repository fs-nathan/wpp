import { IconButton } from "@material-ui/core";
import {
  mdiAccount,
  mdiClockOutline,
  mdiDragVertical,
  mdiFileTree,
  mdiMenuDown,
  mdiMenuRight,
  mdiPageNextOutline,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import { changeKeyword } from "actions/gantt";
import { changeVisibleExportPdfDrawer } from "actions/system/system";
import { changeVisibleConfigGantt } from "actions/system/system.js";
import { Table } from "antd";
import "antd/lib/grid/style/index.css";
import "antd/lib/table/style/index.css";
import CustomModal from "components/CustomModalGantt";
import "components/Drawer/DrawerPDF/drawerpdf.css";
import LoadingBox from "components/LoadingBox";
import "components/PreviewModal/previewModal.css";
import update from "immutability-helper";
import { get } from "lodash";
import moment from "moment";
import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Resizable } from "react-resizable";
import { withRouter } from "react-router-dom";
import CalendarProjectPage from "views/CalendarProjectPageClone";
import MenuCreateNew from "views/JobDetailPage/ListPart/ListHeader/MenuCreateNew";
import "views/JobPage/components/QuickViewFilter.css";
import "views/JobPage/Layout/QuickView.css";
import ProjectSettingModal from "views/ProjectGroupPage/Modals/ProjectSetting";
import {
  changeCalendarPermisstion,
  changePreviewContent,
  changeProjectInfo,
  changeScheduleDetailGantt,
  changeTaskComplete,
  changeTaskduration,
  changeTimelineColor,
  changeVisible,
  scrollGantt,
  sortGroupTask,
  sortTask,
} from "../../actions/gantt";
import {
  changeDetailSubtaskDrawer,
  changeVisibleSubtaskDrawer,
} from "../../actions/system/system";
import {
  getListGroupTask,
  getListTaskDetail,
  getProjectListBasic,
  getStaticTask,
} from "../../actions/taskDetail/taskDetailActions";
import CustomBadge from "../../components/CustomBadge";
import ConfigGanttDrawer from "../../components/Drawer/DrawerConfigGantt";
import ExportPDFDrawer from "../../components/Drawer/DrawerPDF";
import SubTaskDrawer from "../../components/Drawer/SubTaskDrawer";
import { apiService } from "../../constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "../../constants/snackbarController";
import "../../views/JobDetailPage/index.scss";
import CreateJobModal from "../../views/JobDetailPage/ListPart/ListHeader/CreateJobModal";
import ListProject from "../../views/JobDetailPage/ListPart/ListProjectGantt";
import QuickViewTaskDetailDrawer from "../../views/JobPage/components/GanttQuickViewTaskDetailDrawer";
import CreateProject from "../../views/ProjectPage/Modals/CreateGroupTask";
import DragableBodyRow from "./DragableBodyRow";
import DragTable from "./DragableHOC";
import EditCell from "./EditCell";
import "./table.css";

let haveError = false;
let checkTimeOut = null;
Array.prototype.insertArray = function (index, items) {
  this.splice.apply(this, [index, 0].concat(items));
};
const MAX_DAY_DEFAULT = 80;

const RenderJobModal = React.memo(
  (props) => <CreateJobModal {...props} />,
  (prevProps, nextProps) => {
    return false;
  }
);

const RenderDrawers = React.memo((props) => (
  <React.Fragment>
    <ConfigGanttDrawer height={props.height} />
    <SubTaskDrawer height={props.height} />
    <ExportPDFDrawer dataSource={props.dataSource} height={props.height} />
  </React.Fragment>
));

const RenderDragTable = React.memo((props) => {
  return <DragTable {...props} />;
});

const RenderQuickViewTaskDetailDrawer = React.memo(
  (props) => <QuickViewTaskDetailDrawer {...props} />,
  () => false
);
function getFormatStartStringFromObject(data) {
  try {
    const { start_hour, start_date, start_month, start_year, start_minute } =
      data;
    return `${start_date}/${start_month}/${start_year} ${start_hour}:${start_minute}`;
  } catch (e) {
    return null;
  }
}

function getFormatEndStringFromObject(data) {
  try {
    const { end_date, end_month, end_year, end_hour, end_minute } = data;
    return `${end_date}/${end_month}/${end_year} ${end_hour}:${end_minute}`;
  } catch (e) {
    return null;
  }
}
function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 2:
      return {
        color: "#ffffff",
        background: "#4caf50",
        name: "Th???p",
      };
    case 1:
      return {
        color: "#ffffff",
        background: "#ff9800",
        name: "Trung b??nh",
      };
    case 0:
      return {
        color: "#ffffff",
        background: "#fe0707",
        name: "Cao",
      };
    case "WAIT":
      return {
        color: "#ffffff",
        background: "#ff9800",
        name: "Cao",
      };
    case "DOING":
      return {
        color: "#ffffff",
        background: "#03a9f4",
        name: "Cao",
      };
    case "DONE":
      return {
        color: "#ffffff",
        background: "#03c30b",
        name: "Cao",
      };
    case "EXPIRE":
      return {
        color: "#ffffff",
        background: "#f44336",
        name: "Cao",
      };
    case "MEMBER":
      return {
        color: "#ffffff",
        background: "rgb(207 30 237)",
        name: "Cao",
      };
    default:
      return {
        color: "#53d7fc",
        name: "Th???p",
      };
  }
}

function decodeStatusCode(statusCode) {
  switch (statusCode) {
    case 0:
      return {
        color: "#ffffff",
        background: "rgb(255,152,0)",
      };
    case 1:
      return {
        color: "#ffffff",
        background: "#03a9f4",
      };
    case 2:
      return {
        color: "#ffffff",
        background: "rgb(3,195,11)",
      };
    case 3:
      return {
        color: "#ffffff",
        background: "#f44336",
      };

    case 4:
      return {
        color: "#ffffff",
        background: "#607d8b",
      };
    case "WAIT":
      return {
        color: "#ffffff",
        background: "#ff9800",
      };
    case "DOING":
      return {
        color: "#ffffff",
        background: "#03a9f4",
      };
    case "DONE":
      return {
        color: "#ffffff",
        background: "#03c30b",
      };
    case "EXPIRE":
      return {
        color: "#ffffff",
        background: "#f44336",
      };
    case "MEMBER":
      return {
        color: "#ffffff",
        background: "#f1ff26",
      };
    default:
      return {
        color: "#ffffff",
        background: "#53d7fc",
      };
  }
}

const ResizeableTitle = (props) => {
  const { onResize, width, setShowIconResize, showIconResize, ...restProps } =
    props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      handle={(resizeHandle) => (
        <span
          className={`gantt-table-col react-resizable-handle react-resizable-handle-${resizeHandle}`}
        >
          {<Icon path={mdiDragVertical} />}
        </span>
      )}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class DragSortingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenuCreate: false,
      openConfigCalendar: false,
      openModal: false,
      openSetting: false,
      rowHover: null,
      startTimeProject: "",
      canScroll: true,
      width: 800,
      widthTable: 800,
      sizeTable: 618,
      cellDetail: {},
      endTimeProject: "",
      sort_task: true,
      isLoading: true,
      monthArray: [],
      openCreateProjectModal: false,
      showIconResize: false,
      saveEndTimeProject: null,
      daysRender: [],
      data: [],
      columns: [
        {
          title: () => (
            <div
              className="gantt-title-table-project"
              style={{ display: "flex" }}
            >
              <div className="gantt-title-table-project-name">
                {" "}
                {this.props.t("LABEL_GANTT_NAME_TASK_TABLE")}
              </div>
              {this.props.calendarPermisstions?.manage_group_task && (
                <div className="gantt-title-table-project-icon">
                  {" "}
                  <IconButton
                    title={this.props.t("GANTT_ADD_TASK_GROUP")}
                    onClick={() => this.handleOpenCreateProjectModal(true)}
                    aria-controls="simple-menu"
                    style={{ padding: 0 }}
                    aria-haspopup="true"
                    size="small"
                  >
                    <Icon path={mdiPlus} size={1} />
                  </IconButton>
                </div>
              )}
            </div>
          ),
          dataIndex: "name",
          id: 1,
          width: 400,
          height: 100,
          render: (text, record, index) => {
            const isHover = this.state.rowHover === record.key;
            if (record.isTotalDuration)
              return (
                <div
                  className="gantt--group-task"
                  style={{ display: "flex", cursor: "auto" }}
                >
                  <div className="gantt--group-task__left gantt--group-task__total">
                    <div>
                      <Icon
                        className="gantt-icon-table__total"
                        path={mdiClockOutline}
                      />
                    </div>
                    {record.name}
                  </div>
                </div>
              );
            return record.isGroupTask ? (
              <React.Fragment>
                <div
                  className="gantt--group-task"
                  onClick={(e) => {
                    const className = e.target.className;
                    if (
                      !className.indexOf ||
                      className.indexOf("gantt--group-task__right") !== -1
                    )
                      return;
                    this.handleClickMainTask(record.id);
                  }}
                  style={{ display: "flex", cursor: "auto" }}
                >
                  <div className="gantt--group-task__left gantt--group-task-item">
                    <div>
                      <Icon
                        onClick={(e) => {
                          this.handleClickMainTask(record.id);
                        }}
                        title={this.props.t(
                          record.show ? "GANTT_COLLAPSE" : "GANTT_EXPAND"
                        )}
                        className="gantt-icon-table__group"
                        path={record.show ? mdiMenuDown : mdiMenuRight}
                      />
                    </div>
                    {record.name}
                  </div>
                  {this.props.calendarPermisstions?.create_task && (
                    <div className="gantt--group-task__right">
                      <IconButton
                        aria-controls="simple-menu"
                        style={{ padding: 0 }}
                        title={this.props.t("GANTT_ADD_TASK")}
                        aria-haspopup="true"
                        onClick={() => {
                          this.handleOpenCraeteJobModal(true);
                          this.setGroupTaskSelected(record.name, record.id);
                        }}
                        size="small"
                      >
                        <Icon path={mdiPlus} size={1} />
                      </IconButton>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  onMouseOut={() => {
                    if (!window.scrollTable) {
                      const divs = document.getElementsByClassName(
                        "gantt--top-timeline-tr"
                      );
                      if (!divs.length) return;
                      divs[index].style.backgroundColor = "";
                      const divss = document.getElementsByClassName(
                        "ant-table-row ant-table-row-level-0"
                      );
                      if (!divss[index]) return;
                      divss[index].style.backgroundColor =
                        record.isTotalDuration || record.isGroupTask
                          ? "#fafafa"
                          : "";
                      this.handleSetRowHover(-2);
                    }
                  }}
                  onMouseOver={() => {
                    if (!window.scrollTable) this.handleSetRowHover(record.key);
                  }}
                  style={{ display: "flex", height: 20, background: "inherit" }}
                >
                  {this.state.sort_task ? (
                    <Icon
                      style={{ margin: "0 10px", cursor: "grab", fill: "#ccc" }}
                      path={mdiDragVertical}
                      size={1}
                    />
                  ) : (
                    <div style={{ width: 30, height: 20 }}></div>
                  )}
                  <div
                    onClick={(e) => {
                      const className = e.target.className;
                      if (
                        !className.indexOf ||
                        className.indexOf(
                          "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall"
                        ) !== -1
                      )
                        return;
                      this.setState({
                        quickViewId: record.id,
                      });
                    }}
                    className="name-task-gantt"
                  >
                    <div>
                      <span style={{ paddingRight: "5px" }}>{record.name}</span>
                      {record.number_subtask > 0 && (
                        <IconButton
                          title={this.props.t("GANTT_SUB_TASK")}
                          aria-controls="simple-menu"
                          style={{ padding: 0 }}
                          aria-haspopup="true"
                          size="small"
                          onClick={() => {
                            this.props.changeDetailSubtaskDrawer({
                              id: record.id,
                              name: record.name,
                            });
                            this.props.changeVisibleSubtaskDrawer(true);
                          }}
                        >
                          <Icon
                            className="gantt--icon-setting-task"
                            path={mdiFileTree}
                            size={1}
                          />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div
                    id={`icon__${record.id}`}
                    className="name-task-gantt__icon-container"
                  >
                    {this.state.rowHover === record.key && (
                      <IconButton
                        title={this.props.t("GANTT_DETAIL")}
                        aria-controls="simple-menu"
                        style={{ padding: 0 }}
                        aria-haspopup="true"
                        size="small"
                        onClick={() =>
                          this.props.history.push({
                            pathname: `/projects/task-chat/${this.props.match.params.projectId}`,
                            search: `?task_id=${record.id}`,
                          })
                        }
                      >
                        <Icon
                          className="gantt--icon-setting-task"
                          path={mdiPageNextOutline}
                          size={1}
                        />
                      </IconButton>
                    )}

                    {!isHover && this.props.visibleLabel.status && (
                      <CustomBadge
                        style={{
                          margin: "0px 4px",
                          padding: "2px 5px",
                          fontWeight: "normal",
                          ...decodeStatusCode(record.status_code),
                        }}
                        {...decodeStatusCode(record.status_code)}
                      >
                        {record.status_name}
                      </CustomBadge>
                    )}

                    {!isHover && this.props.visibleLabel.prior && (
                      <CustomBadge
                        style={{
                          margin: "0px 4px",
                          padding: "2px 5px",
                          fontWeight: "normal",
                          ...decodePriorityCode(record.priority_code),
                        }}
                        {...decodePriorityCode(record.priority_code)}
                      >
                        {decodePriorityCode(record.priority_code).name}
                      </CustomBadge>
                    )}
                    {!isHover && this.props.visibleLabel.member && (
                      <CustomBadge
                        style={{
                          margin: "0px 4px",
                          padding: "2px 5px",
                          fontWeight: "normal",
                          ...decodePriorityCode("MEMBER"),
                        }}
                        {...decodePriorityCode("MEMBER")}
                      >
                        <Icon
                          style={{
                            transform: "translateY(-50%)",
                            width: "13px",
                            top: "50%",
                            fill: "white",
                            position: "relative",
                          }}
                          path={mdiAccount}
                        />
                        {record.number_member}
                      </CustomBadge>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          },
        },
        {
          title: () => this.props.t("LABEL_GANTT_NAME_START_TIME_TABLE"),
          id: 2,
          dataIndex: "start_time",
          align: "center",
          width: 100,
          height: 100,
          render: (text, record) => (
            <EditCell
              defaultValue={text}
              fetchNewDataSource={this.fetchNewDataSource}
              taskId={record.id}
              type={"start_date"}
              start_date={record.start_label}
              end_date={record.end_label}
              canEdit={
                !record.isTotalDuration &&
                !record.isGroupTask &&
                !record.isStop &&
                record.can_edit
              }
              component={
                <div
                  className={
                    record.isTotalDuration
                      ? "gantt--group-task__total"
                      : record.isGroupTask
                      ? "gantt--group-task-item"
                      : ""
                  }
                >
                  {new moment(text, "DD/MM/YYYY HH:mm").isValid()
                    ? new moment(text, "DD/MM/YYYY HH:mm").format(
                        this.props.girdType !== "HOUR"
                          ? "DD/MM/YYYY"
                          : "DD/MM/YYYY HH:mm"
                      )
                    : ""}
                </div>
              }
            />
          ),
        },
        {
          title: () => this.props.t("LABEL_GANTT_NAME_END_TIME_TABLE"),
          id: 3,
          dataIndex: "end_time",
          align: "center",
          width: 100,
          height: 100,
          render: (text, record) => {
            return (
              <EditCell
                defaultValue={text}
                fetchNewDataSource={this.fetchNewDataSource}
                taskId={record.id}
                type={"end_date"}
                start_date={record.start_label}
                end_date={record.end_label}
                canEdit={
                  !record.isTotalDuration &&
                  !record.isGroupTask &&
                  !record.isStop &&
                  record.can_edit
                }
                component={
                  <div
                    className={
                      record.isTotalDuration
                        ? "gantt--group-task__total"
                        : record.isGroupTask
                        ? "gantt--group-task-item"
                        : ""
                    }
                  >
                    {new moment(text, "DD/MM/YYYY HH:mm").isValid()
                      ? new moment(text, "DD/MM/YYYY HH:mm").format(
                          this.props.girdType !== "HOUR"
                            ? "DD/MM/YYYY"
                            : "DD/MM/YYYY HH:mm"
                        )
                      : ""}
                  </div>
                }
              />
            );
          },
        },
        {
          title: () => this.props.t("LABEL_GANTT_NAME_DURATION_TABLE"),
          id: 4,
          dataIndex: "duration_actual",
          align: "center",
          width: 100,
          height: 100,
          render: (text, record) => {
            return (
              <EditCell
                defaultValue={
                  Math.round((parseFloat(text) + Number.EPSILON) * 100) / 100
                }
                fetchNewDataSource={this.fetchNewDataSource}
                taskId={record.id}
                type={"duration"}
                start_date={record.start_label}
                end_date={record.end_label}
                canEdit={
                  !record.isTotalDuration &&
                  !record.isGroupTask &&
                  !record.isStop &&
                  record.can_edit
                }
                component={
                  <div
                    className={
                      record.isTotalDuration
                        ? "gantt--group-task__total"
                        : record.isGroupTask
                        ? "gantt--group-task-item"
                        : ""
                    }
                  >
                    {text || text === 0
                      ? `${
                          Math.round(
                            (parseFloat(text) + Number.EPSILON) * 100
                          ) / 100
                        } ${this.props.t(
                          `GANTT_${this.props.girdInstance.unitText.toUpperCase()}`
                        )}`
                      : ""}
                  </div>
                }
              />
            );
          },
        },
        {
          title: () => this.props.t("LABEL_GANTT_NAME_COMPLETE_TABLE"),
          dataIndex: "complete",
          align: "center",
          id: 5,
          width: 100,
          height: 100,
          render: (text, record, index) => {
            return (
              <EditCell
                defaultValue={text}
                fetchNewDataSource={this.fetchNewDataSource}
                taskId={record.id}
                type={"complete"}
                start_date={record.start_label}
                end_date={record.end_label}
                setProcessDatasource={this.setProcessDatasource}
                index={index}
                canEdit={
                  !record.isTotalDuration &&
                  !record.isGroupTask &&
                  !record.isStop &&
                  record.can_edit
                }
                component={
                  <div
                    className={
                      record.isTotalDuration
                        ? "gantt--group-task__total"
                        : record.isGroupTask
                        ? "gantt--group-task-item"
                        : ""
                    }
                  >
                    {Math.floor(text) + "%"}
                  </div>
                }
              />
            );
          },
        },
      ],
      projectFilter: -1,
    };
    this.tableRef = React.createRef();
  }

  setOpenSetting = (value) => {
    this.setState({ openSetting: value });
  };

  setOpenConfigCalendar = (value) => {
    this.setState({ openConfigCalendar: value });
  };

  setOpenModal = (value) => {
    this.setState({ openModal: value });
  };

  setRowHover = (index) => {
    this.setState({
      rowHover: index,
    });
  };
  handleSetRowHover = (index) => {
    if (checkTimeOut) {
      clearTimeout(checkTimeOut);
    }
    checkTimeOut = setTimeout(() => {
      this.setState({
        rowHover: index,
      });
    }, 100);
  };
  setProcessDatasource = (complete, index) => {
    try {
      const data = [...this.state.data];
      data[index].complete = complete;
      let totalComplete = 0;
      let groupComplete = 0;
      let countTotalTask = 0;
      let countGroupTask = 0;
      let indexGroupTask;
      let indexTotalTask;
      data.forEach((item, indexData) => {
        if (item.id === data[index].group_task) indexGroupTask = indexData;
        if (item.isTotalDuration) indexTotalTask = indexData;
        if (item.isGroupTask || item.isTotalDuration) return;
        totalComplete += item.complete;
        countTotalTask++;
        if (item.group_task === data[index].group_task) {
          groupComplete += item.complete;
          countGroupTask++;
        }
      });
      data[indexGroupTask].complete = (groupComplete / countGroupTask).toFixed(
        2
      );
      data[indexTotalTask].complete = (totalComplete / countTotalTask).toFixed(
        2
      );
      this.setState({
        data,
      });
      changeTaskComplete({ task_id: data[index].id, complete });
    } catch (e) {
      console.log(e);
    }
  };
  handleClickMainTask = (id) => {
    const newData = this.state.data.map((item) => {
      if (item.id !== id && item.group_task !== id) return item;
      item.show = !item.show;
      return item;
    });
    this.setState({
      data: newData,
    });
  };
  fetchTimeNotWork = async (fromDate, endDate) => {
    try {
      const { projectId } = this.props.match.params;
      const { girdInstance } = this.props;
      const result = await apiService({
        url: `gantt/get-time-not-work?project_id=${projectId}&from_date=${fromDate}&to_date=${endDate}&gird=${girdInstance.gird}&schedule_id=${this.props.mainCalendar}`,
      });
      if (!result.data.state) return;
      this.setState({
        timeNotWork: result.data.data,
      });
      return true;
    } catch (e) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
      return false;
    }
  };
  fetchListTask = async (projectId, update, girdType) => {
    try {
      const { girdInstance } = this.props;
      const { formatString, unit, addUnit } = girdInstance;
      let { resultListTask } = this.state;
      let dataSource;
      if (!resultListTask || update) {
        resultListTask = await apiService({
          url: `gantt/list-task?project_id=${projectId}&gird=${
            girdType ? girdType.toLowerCase() : "hour"
          }`,
        });
        if (!resultListTask.data.state) return;
        dataSource = resultListTask.data;
        this.setState({
          resultListTask,
          sort_task: get(dataSource, "permissions.sort_task", false),
        });
      } else dataSource = resultListTask.data;
      if (!resultListTask.data.state) return;
      let data = [];
      let startTimeProject;
      let endTimeProject;

      startTimeProject = dataSource.total_duration.time
        ? new moment(
            getFormatStartStringFromObject(dataSource.total_duration.time),
            formatString
          )
        : new moment();
      endTimeProject = dataSource.total_duration.time
        ? new moment(
            getFormatEndStringFromObject(dataSource.total_duration.time),
            formatString
          )
        : new moment().add(addUnit, unit);
      const totalProjectData = dataSource.total_duration;
      const timeTotal = totalProjectData.time;
      data.push({
        name: this.props.t("LABEL_GANTT_NAME_TOTAL_DURATION_TABLE"),
        start_label: timeTotal && totalProjectData.time.start_label,
        start_time: getFormatStartStringFromObject(totalProjectData.time),
        end_time: getFormatEndStringFromObject(totalProjectData.time),
        end_label: timeTotal && totalProjectData.time.end_label,
        duration_actual: totalProjectData.duration_plan.value,
        complete: totalProjectData.complete,
        isTotalDuration: true,
        show: true,
        id: "TOTAL_DURATION",
        key: "TOTAL_DURATION",
      });
      dataSource.tasks.forEach((task, index) => {
        const { name, time, duration_plan } = task;
        data.push({
          name,
          start_time: getFormatStartStringFromObject(time),
          end_time: getFormatEndStringFromObject(time),
          start_label: time && time.start_label,
          end_label: time && time.end_label,
          duration_actual: duration_plan.value,
          complete: task.complete,
          isGroupTask: true,
          show: true,
          id: task.id,
          key: task.id,
        });
        task.tasks.forEach((subTask) =>
          data.push({
            name: subTask.name,
            id: subTask.id,
            key: subTask.id,
            group_task: task.id,
            start_label: subTask.time && subTask.time.start_label,
            end_label: subTask.time && subTask.time.end_label,
            can_edit: subTask.can_edit,
            start_time: getFormatStartStringFromObject(subTask.time),
            end_time: getFormatEndStringFromObject(subTask.time),
            duration_actual: subTask.duration_plan.value,
            complete: subTask.complete,
            show: true,
            priority_code: subTask.priority_code,
            isStop: subTask.status_code === 4,
            number_subtask: subTask.number_subtask,
            status_code: subTask.status_code,
            status_name: subTask.status_name,
            number_member: subTask.number_member,
          })
        );
      });
      startTimeProject = startTimeProject.subtract(6, unit);
      endTimeProject = endTimeProject.add(addUnit, unit);
      this.setRenderTime(
        new moment(startTimeProject),
        endTimeProject,
        startTimeProject
      );

      this.setState({
        startTimeProject,
        endTimeProject,
        data,
        height: this.tableRef.current && this.tableRef.current.clientHeight,
        width: this.tableRef.current && this.tableRef.current.clientWidth,
        minLeft: this.tableRef.current && this.tableRef.current.offsetLeft,
        isLoading: false,
      });
      return true;
    } catch (e) {
      if (haveError) return;
      haveError = true;
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
      this.props.history.push({
        pathname: `/projects`,
      });
    }
  };
  setRenderTime = (startTime, endTime, startTimeProject) => {
    const { girdInstance } = this.props;
    const { unit, parentUnit, getWidthParent, getTextParent, getTimeCompare } =
      girdInstance;
    const allMonth = [
      {
        text: "",
        width: "",
      },
    ];
    let index = 0;
    const daysRender = [];
    let minMonth = 0;
    while (
      endTime > startTime ||
      getTimeCompare(startTime) === getTimeCompare(endTime) ||
      minMonth < 2
    ) {
      allMonth.push({
        text: getTextParent(startTime),
        width: getWidthParent(startTime, index === 0),
      });
      startTime.add(1, parentUnit);
      minMonth++;
      index++;
    }
    allMonth.shift();
    let temp = new moment(startTimeProject);
    for (let i = 0; i < MAX_DAY_DEFAULT; i++) {
      const newDate = new moment(temp);
      newDate.add(i, unit);
      daysRender.push(newDate);
    }
    this.setState({
      monthArray: allMonth,
      daysRender,
    });
  };
  setSelectDefaultCalendar = (detail) => {
    this.setState({
      scheduleDetail: detail,
    });
  };
  fetchListSchedule = async () => {
    try {
      const { projectId } = this.props.match.params;
      const [result, permisstion] = await Promise.all([
        apiService({
          url: "group-schedule/list-schedule",
        }),
        apiService({
          url: `gantt/get-permissions?project_id=${projectId}`,
        }),
      ]);
      const { permissions } = permisstion.data;
      const { schedules } = result.data;
      this.props.changeScheduleDetailGantt(schedules[0]);
      this.props.changeCalendarPermisstion(permissions);
    } catch (e) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };
  setEventScroll = () => {
    const tableBody = document.getElementsByClassName("ant-table-body");
    if (!tableBody[0]) return;
    let timeOutId;
    tableBody[0].addEventListener("scroll", (e) => {
      if (window.scrollTimeline || window.scrollTimelineVitural) return;
      window.scrollTable = true;
      const timelineContainer = document.getElementsByClassName(
        "gantt--timeline--container"
      )[0];
      const scrollVirtual = document.getElementById(
        "gantt--scroll-top_virtual"
      );
      const gridTable = document.getElementById("gantt_table_grid");
      gridTable.scrollTop = e.target.scrollTop;
      scrollVirtual.scrollTop = e.target.scrollTop;
      const timelineContainerRelative = document.getElementsByClassName(
        " gantt--timeline--container__relative"
      )[0];
      timelineContainerRelative.scrollTop = e.target.scrollTop;
      timelineContainer.scrollTop = e.target.scrollTop;
      if (timeOutId) clearTimeout(timeOutId);
      timeOutId = setTimeout(() => (window.scrollTable = false), 100);
    });
  };
  async componentDidMount() {
    const { projectId } = this.props.match.params;
    this.fetchSettingGantt(projectId);
    const style = document.getElementById("gantt-style-link");
    style.href = "../../style/antd.css";
    await this.fetchListTask(projectId);
    this.fetchListTask(projectId, true, this.props.girdType);
    this.fetchContentPreview(projectId);
    this.fetchListSchedule();
    this.setEventScroll();
  }
  fetchListDetailProject = (project_id) => {
    this.props.getListGroupTask({ project_id });
    this.props.getListTaskDetail(project_id);
    this.props.getStaticTask(project_id);
    this.props.getProjectListBasic(project_id);
  };
  fetchContentPreview = async (projectId) => {
    try {
      const result = await apiService({
        url: `/gantt/get-export-pdf-info?project_id=${projectId}`,
      });
      const { data } = result.data;
      this.props.changePreviewContent([
        data.top_left,
        data.top_center,
        data.top_right,
        data.bottom_left,
        data.bottom_center,
        data.bottom_right,
      ]);
    } catch (e) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };
  fetchSettingGantt = async (projectId) => {
    try {
      const result = await apiService({
        url: `gantt/project-detail?project_id=${projectId}`,
      });
      const { project } = result.data;
      const ganttColorConfig = {
        total: project.color_total_duration,
        group: project.color_group_task,
        task: project.color_task,
        duration: project.color_duration_task,
      };
      this.props.changeTimelineColor(null, null, ganttColorConfig);
      const ganttVisibleConfig = localStorage.getItem("ganttConfig")
        ? JSON.parse(localStorage.getItem("ganttConfig"))
        : {
            total: true,
            group: true,
            task: true,
            duration: true,
            date: true,
            name: true,
            numberDuration: true,
            numberComplete: true,
            fromNowLayer: true,
            timeNotWork: true,
            gridTable: true,
          };
      const labelVisibleConfig = localStorage.getItem("labelConfig")
        ? JSON.parse(localStorage.getItem("labelConfig"))
        : {
            prior: true,
            status: true,
            member: true,
          };
      this.props.changeVisible(null, null, null, {
        gantt: ganttVisibleConfig,
      });
      this.props.changeVisible(null, null, null, {
        label: labelVisibleConfig,
      });
      this.props.changeProjectInfo({
        id: project.id,
        name: project.name,
        group_icon: project.group_icon,
        work_type: project.state_group_task,
      });
    } catch (e) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };
  components = {
    body: {
      row: (props) => {
        const { index } = props;
        let canDrag;
        if (index)
          canDrag =
            this.state.sort_task &&
            !this.state.data[index].isGroupTask &&
            !this.state.data[index].isTotalDuration;
        return (
          <DragableBodyRow
            dataSource={this.state.data.filter((item) => {
              if (this.props.keyword) {
                return item.name.includes(this.props.keyword);
              }
              if (!this.props.visibleGantt.total && item.isTotalDuration)
                return false;
              return item.isGroupTask || item.show;
            })}
            canDrag={canDrag}
            {...props}
          />
        );
      },
    },
    header: {
      cell: (props) => (
        <ResizeableTitle
          setShowIconResize={(show) => this.setState({ showIconResize: show })}
          showIconResize={this.state.showIconResize}
          {...props}
        />
      ),
    },
  };
  componentDidUpdate = async (prevProps, prevStates) => {
    const { girdInstance } = this.props;
    if (this.props.showHeader !== prevProps.showHeader) {
      this.setState({
        height: this.tableRef.current.clientHeight,
      });
    }
    if (this.state.startTimeProject !== prevStates.startTimeProject) {
      this.fetchTimeNotWork(
        this.state.startTimeProject.format("YYYY-MM-DD"),
        new moment(this.state.startTimeProject)
          .add(700, girdInstance.unit)
          .format("YYYY-MM-DD")
      );
    }
    if (this.props.mainCalendar !== prevProps.mainCalendar) {
      this.fetchTimeNotWork(
        this.state.startTimeProject.format("YYYY-MM-DD"),
        new moment(this.state.startTimeProject)
          .add(700, girdInstance.unit)
          .format("YYYY-MM-DD")
      );
    }
    if (
      this.props.scrollGanttFlag !== prevProps.scrollGanttFlag &&
      this.props.scrollGanttFlag
    ) {
      const { startTimeProject, endTimeProject, saveEndTimeProject } =
        this.state;
      const { girdInstance } = this.props;
      const {
        formatString,
        unit,
        parentUnit,
        addUnit,
        getWidthParent,
        getTextParent,
        getTimeCompare,
        formatChild,
      } = girdInstance;
      const { start, end } = {};
      const daysRender = [];
      const endDate =
        this.props.scrollGanttFlag &&
        new moment(Date.now()).diff(endTimeProject) > 0
          ? new moment(Date.now()).add(addUnit, unit)
          : new moment(endTimeProject);
      const startDate =
        false &&
        this.props.scrollGanttFlag &&
        new moment(Date.now()).diff(startTimeProject) < 0
          ? new moment(Date.now()).subtract(6, unit)
          : new moment(startTimeProject);
      let temp = new moment(startDate);
      if (this.props.scrollGanttFlag) {
        this.setState({
          saveEndTimeProject: this.state.endTimeProject,
        });
      }
      const maxDayRender = this.props.renderFullDay
        ? endDate.diff(startDate, girdInstance.unit) + 1
        : MAX_DAY_DEFAULT;
      for (let i = 0; i < maxDayRender; i++) {
        const newDate = new moment(temp);
        newDate.add(i, girdInstance.unit);
        daysRender.push(newDate);
      }
      const allMonth = [
        {
          text: "",
          width: "",
        },
      ];
      let index = 0;
      let minMonth = 0;
      while (
        endDate > startDate ||
        getTimeCompare(startDate) === getTimeCompare(endDate) ||
        minMonth < 2
      ) {
        allMonth.push({
          text: getTextParent(startDate),
          width: getWidthParent(startDate, index === 0),
        });
        startDate.add(1, parentUnit);
        minMonth++;
        index++;
      }
      allMonth.shift();
      this.setState({
        daysRender,
        monthArray: allMonth,
        startTimeProject: start
          ? new moment(start)
          : new moment(startTimeProject),
        endTimeProject: endDate,
      });
    }
    if (this.props.renderFullDay !== prevProps.renderFullDay) {
      const {
        startTimeProject,
        endTimeProject,
        saveEndTimeProject,
        saveStartTimeProject,
      } = this.state;
      const { girdInstance } = this.props;
      const { parentUnit, getWidthParent, getTextParent, getTimeCompare } =
        girdInstance;
      const { start, end } = this.props.filterExportPdf;
      const daysRender = [];
      const endDate = !this.props.renderFullDay
        ? new moment(saveEndTimeProject)
        : end
        ? new moment(end)
        : new moment(endTimeProject);
      const startDate = !this.props.renderFullDay
        ? new moment(saveStartTimeProject)
        : start
        ? new moment(start)
        : new moment(startTimeProject);
      let temp = new moment(startDate);
      const maxDayRender = this.props.renderFullDay
        ? endDate.diff(startDate, girdInstance.unit) + 1
        : MAX_DAY_DEFAULT;
      for (let i = 0; i < maxDayRender; i++) {
        const newDate = new moment(temp);
        newDate.add(i, girdInstance.unit);
        daysRender.push(newDate);
      }
      const allMonth = [
        {
          text: "",
          width: "",
        },
      ];
      let index = 0;
      let minMonth = 0;
      while (
        endDate > startDate ||
        getTimeCompare(startDate) === getTimeCompare(endDate) ||
        minMonth < 2
      ) {
        allMonth.push({
          text: getTextParent(startDate),
          width: getWidthParent(startDate, index === 0),
        });
        startDate.add(1, parentUnit);
        minMonth++;
        index++;
      }
      allMonth.shift();
      this.setState({
        daysRender,
        monthArray: allMonth,
        saveEndTimeProject: endTimeProject,
        saveStartTimeProject: startTimeProject,
        startTimeProject: !this.props.renderFullDay
          ? new moment(saveStartTimeProject)
          : start
          ? new moment(start)
          : new moment(startTimeProject),
        endTimeProject: !this.props.renderFullDay
          ? new moment(saveEndTimeProject)
          : end
          ? new moment(end).add(1, girdInstance.unit)
          : new moment(endTimeProject),
      });
    }
    if (this.props.girdType !== prevProps.girdType) {
      const { projectId } = this.props.match.params;
      this.fetchListTask(projectId);
      this.fetchListTask(projectId, true, this.props.girdType);
    }
    if (
      this.props.match.params &&
      this.props.match.params.projectId !== prevProps.match.params.projectId
    ) {
      const { projectId } = this.props.match.params;
      this.fetchSettingGantt(projectId);
      this.fetchListDetailProject(projectId);
      this.fetchListTask(projectId);
      this.fetchListTask(projectId, true, this.props.girdType);
      this.fetchListSchedule();
      this.setEventScroll();
      this.fetchContentPreview(projectId);
    }
  };
  componentWillUnmount() {
    const style = document.getElementById("gantt-style-link");
    style.href = "";
  }
  handleResize =
    (index) =>
    (e, { size }) => {
      this.setState({
        widthTable:
          this.state.widthTable + size.width - this.state.columns[index].width,
      });
      this.setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return { columns: nextColumns };
      });
    };
  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    if (dragIndex === hoverIndex) return;
    const dragRow = data[dragIndex];
    const indexGroupTaskList = [];
    let indexSort = 0;
    if (data[dragIndex].isTotalDuration) return;
    data.forEach((item, index) => {
      if (item.isGroupTask) indexGroupTaskList.push(index);
    });
    if (data[dragIndex].isGroupTask) {
      let temp = 0;
      let groupDataSource = [];
      indexSort = 0;
      let oldIndexGroup = 0;
      data.forEach((item, index) => {
        if (item.isTotalDuration) {
          groupDataSource[temp] = [item];
          return;
        }
        if (item.isGroupTask) {
          temp++;
          if (dragIndex === index) oldIndexGroup = temp;
          groupDataSource[temp] = [];
          groupDataSource[temp].push(item);
          if (
            hoverIndex > index ||
            (hoverIndex > dragIndex && hoverIndex === index)
          )
            indexSort++;
          return;
        }
        groupDataSource[temp].push(item);
      });
      if (dragIndex < hoverIndex) indexSort--;
      indexSort = indexSort < 0 ? 0 : indexSort;
      const oldGroup = groupDataSource[oldIndexGroup];
      groupDataSource.splice(oldIndexGroup, 1);
      groupDataSource.splice(indexSort + 1, 0, oldGroup);
      sortGroupTask(data[dragIndex].id, indexSort);
      this.setState({
        data: groupDataSource.flat(),
      });
      return;
    }
    let endProject = false;
    indexGroupTaskList.forEach((index, indexLoop) => {
      if (hoverIndex > index) {
        indexSort = hoverIndex - index;
      }
      if (hoverIndex === index) {
        indexSort = index - indexGroupTaskList[indexLoop - 1];
        if (dragIndex > hoverIndex) {
          endProject = true;
        } else {
          indexSort = 0;
        }
      }
    });
    indexSort--;
    indexSort = indexSort < 0 ? 0 : indexSort;
    const groupTaskIndex = indexGroupTaskList.filter(
      (item) => item <= hoverIndex
    );
    const taskId = data[dragIndex].id;
    // const groupId = data[groupTaskIndex[groupTaskIndex.length - 1]].id;

    const groupId =
      data[
        groupTaskIndex[
          !endProject ? groupTaskIndex.length - 1 : groupTaskIndex.length - 2
        ]
      ].id;
    const { projectId } = this.props.match.params;
    this.handleSortTask(taskId, groupId, projectId, indexSort);
    this.setState(
      update(this.state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        },
      })
    );
  };
  handleSortTask = async (task_id, group_task, project_id, sort_index) => {
    await sortTask(task_id, group_task, project_id, sort_index);
    this.fetchListTask(project_id, true, this.props.girdType);
  };
  handleChangeTaskduration = async (data) => {
    try {
      const { projectId } = this.props.match.params;
      const result = await changeTaskduration(data);
      this.fetchListTask(projectId, true, this.props.girdType);
    } catch (e) {}
  };
  fetchNewDataSource = () => {
    const { projectId } = this.props.match.params;
    this.fetchListTask(projectId);
    this.fetchListTask(projectId, true, this.props.girdType);
  };
  setDataSource = (index, start, end) => {
    const { data, startTimeProject, endTimeProject } = this.state;
    const { girdInstance } = this.props;
    const { unit, formatString, addUnit } = girdInstance;
    const newData = [...data];
    const startDate = moment(startTimeProject, formatString);
    startDate.add(start, unit);
    const endDate = new moment(startDate).add(end - start - 1, unit);
    newData[index].start_time = startDate.format(formatString);
    newData[index].end_time = endDate.format(formatString);
    const dataPostServer = {
      task_id: newData[index].id,
      start_date: startDate.format("YYYY-MM-DD"),
      start_time: startDate.format("HH:mm"),
      end_date: endDate.format("YYYY-MM-DD"),
      end_time: endDate.format("HH:mm"),
    };
    this.handleChangeTaskduration(dataPostServer);
    let newStartTimeGroup;
    let newEndTimeGroup;
    let groupTask;
    let indexGroupTask;
    let indexTotalDuration;
    let startTimeTotalDuration;
    let endTimeTotalDuration;
    data.forEach((item, indexData) => {
      if (item.isTotalDuration) {
        indexTotalDuration = indexData;
      }
      if (
        !startTimeTotalDuration &&
        !item.isTotalDuration &&
        !item.isGroupTask
      ) {
        startTimeTotalDuration = new moment(item.start_time, formatString);
        endTimeTotalDuration = new moment(item.end_time, formatString);
      }
      if (indexData === index) {
        item.start_time = startDate.format(formatString);
        item.end_time = endDate.format(formatString);
      }
      if (
        !item.isTotalDuration &&
        !item.isGroupTask &&
        startTimeTotalDuration.diff(new moment(item.start_time, formatString)) >
          0
      ) {
        startTimeTotalDuration = new moment(item.start_time, formatString);
      }
      if (
        !item.isTotalDuration &&
        !item.isGroupTask &&
        endTimeTotalDuration.diff(new moment(item.end_time, formatString)) < 0
      ) {
        endTimeTotalDuration = new moment(item.end_time, formatString);
      }
      if (item.id === data[index].group_task) {
        indexGroupTask = indexData;
        groupTask = item;
      }
      if (item.group_task === data[index].group_task) {
        const tempStartDateItem = new moment(item.start_time, formatString);
        const tempEndDateItem = new moment(item.end_time, formatString);
        if (!newStartTimeGroup) {
          newStartTimeGroup = tempStartDateItem;
          newEndTimeGroup = tempEndDateItem;
        }
        if (tempStartDateItem.diff(newStartTimeGroup, unit) < 0)
          newStartTimeGroup = tempStartDateItem;
        if (tempEndDateItem.diff(newEndTimeGroup) > 0)
          newEndTimeGroup = tempEndDateItem;
      }
    });
    newData[indexGroupTask].start_time = newStartTimeGroup.format(formatString);
    newData[indexGroupTask].end_time = newEndTimeGroup.format(formatString);
    newData[indexTotalDuration].start_time =
      startTimeTotalDuration.format(formatString);
    newData[indexTotalDuration].end_time =
      endTimeTotalDuration.format(formatString);
    if (startDate.diff(startTimeProject, unit) <= 6) {
      const newStartTimeProject = new moment(startDate).subtract(6, unit);
      this.setState({
        startTimeProject: newStartTimeProject,
      });
      this.setRenderTime(
        new moment(newStartTimeProject),
        endTimeProject,
        newStartTimeProject
      );
    }
    if (endDate.diff(endTimeProject, unit) >= -addUnit) {
      const newEndTimeProject = new moment(endTimeProject).add(addUnit, unit);
      this.setState({
        endTimeProject: newEndTimeProject,
      });
      this.setRenderTime(
        new moment(startTimeProject),
        newEndTimeProject,
        startTimeProject
      );
    }
    this.setState({
      data: newData,
    });
  };
  handleOpenCreateProjectModal = (value, fetch) => {
    if (fetch) {
      const { projectId } = this.props.match.params;
      this.fetchListTask(projectId);
      this.fetchListTask(projectId, true, this.props.girdType);
    }
    this.setState({
      openCreateProjectModal: value,
    });
  };
  handleOpenCraeteJobModal = (value) => {
    this.setState({
      openCreateJobModal: value,
    });
  };
  setGroupTaskSelected = (groupTaskLabel, groupTaskId) => {
    this.setState({
      groupTaskSelected: {
        label: groupTaskLabel,
        value: groupTaskId,
      },
    });
  };
  handleShowProject = (show) => {
    const { projectId } = this.props.match.params;
    if (show) {
      this.setState({
        showProject: true,
      });
      this.fetchListDetailProject(projectId);
      return;
    }
    this.setState({
      showProject: show,
    });
  };
  handleScrollTop = (scroll) => {
    const tableBody = document.getElementsByClassName("ant-table-body");
    tableBody[0].scrollTop = scroll;
    this.setState({
      canScroll: false,
    });
  };
  handleProjectFiler = (type) => {
    this.setState({
      projectFilter: type,
    });
  };
  handleOpenMenuCreate = (openMenuCreate) => {
    this.setState({ openMenuCreate });
  };

  handleMileStoneClick = (textError = "") => {
    if (
      Date.now() - this.state.startTimeProject.toDate().getTime() > 0 ||
      Date.now() - this.state.endTimeProject.toDate().getTime() < 0
    ) {
      SnackbarEmitter(SNACKBAR_VARIANT.ERROR, textError);
      return;
    }
    scrollGantt(true);
  };

  handleResizeTable = (size) => {
    this.setState({
      sizeTable: window.innerWidth - 80 - size,
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    const { indexColumn, visibleTable, girdInstance } = this.props;
    const { sizeTable } = this.state;
    let colShow = columns.map((item, index) => columns[indexColumn[index]]);
    colShow = colShow.filter((col) => visibleTable[col.dataIndex]);
    const { startTimeProject, endTimeProject } = this.state;
    const boundRectTimeLineContainer = document.getElementById(
      "drag-width-gantt-container"
    );

    const widthExtra = boundRectTimeLineContainer
      ? boundRectTimeLineContainer.getBoundingClientRect().x
      : 800;

    const widthPdf = this.props.renderFullDay
      ? endTimeProject.diff(startTimeProject, girdInstance.unit) * 30 +
        widthExtra -
        80
      : "auto";

    const scroll = this.props.renderFullDay
      ? {}
      : {
          scroll: {
            y: this.state.height - 69,
            x: "unset",
          },
        };

    if (this.state.isLoading) return <LoadingBox />;
    return (
      <React.Fragment>
        {
          <RenderJobModal
            projectId={this.props.projectInfo.id || null}
            isOpen={this.state.openCreateJobModal}
            groupId={this.state.groupTaskSelected}
            onCreateTaskSuccess={() => {
              const { projectId } = this.props.match.params;
              this.fetchListTask(projectId);
              this.fetchListTask(projectId, true, this.props.girdType);
            }}
            setOpen={() => {
              this.handleOpenCraeteJobModal();
            }}
          />
        }

        <MenuCreateNew
          setOpenCreateTaskGroup={this.handleOpenCreateProjectModal}
          setOpenmMenuCreate={this.handleOpenMenuCreate}
          setOpenCreate={this.handleOpenCraeteJobModal}
          anchorEl={this.state.openMenuCreate}
          setAnchorEl={this.handleOpenMenuCreate}
        />

        <ProjectSettingModal
          open={this.state.openSetting}
          setOpen={this.setOpenSetting}
          curProject={this.props.projectInfo}
        />

        <CustomModal
          title={"GANTT_CALENDAR_TITLE_MODAL"}
          isLoadTranslateFromHooks
          className="gantt--calendar-modal__container"
          fullWidth={true}
          open={this.state.openConfigCalendar}
          setOpen={this.setOpenConfigCalendar}
          style={{}}
          height="tall"
          confirmRender={() => null}
          isScrollContainer={false}
        >
          <CalendarProjectPage
            setopenModal={this.setOpenModal}
            scheduleDetailGantt={this.props.scheduleDetailGantt}
          />
        </CustomModal>

        <CreateProject
          open={this.state.openCreateProjectModal}
          project_id={this.props.match.params.projectId}
          setOpen={this.handleOpenCreateProjectModal}
          fetchChart={this.handleOpenCreateProjectModal}
        />

        {this.props.keyword &&
        !this.state.data.filter((item) => {
          if (this.props.keyword) {
            return item.name.includes(this.props.keyword);
          }
        })[0] ? (
          <div style={{ width: "100%", height: "100%" }}>
            <div style={{ padding: "40px 50px", color: "black" }}>
              <p>
                {this.props.t("GANTT_CAN_NOT_FIND")}{" "}
                <span style={{ fontWeight: "bold" }}>
                  "{this.props.keyword}"
                </span>{" "}
                {this.props.t("GANTT_IN_ANY")}
              </p>
              <p>{this.props.t("GANTT_SUGGESTION")}:</p>
              <ul>
                <li>{this.props.t("GANTT_MAKE_SURE")}</li>
                <li>{this.props.t("GANTT_DIFF_KEYWORD")}</li>
                <li>{this.props.t("GANTT_REDUCE_KEYWORD")}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            className="gantt__container"
            id="printContent"
            style={{
              width: widthPdf,
              height: `${this.props.showHeader ? "calc(100% - 59px)" : "100%"}`,
            }}
          >
            <RenderDrawers
              dataSource={this.state.data}
              height={this.state.height}
            />
            {this.state.quickViewId && (
              <RenderQuickViewTaskDetailDrawer
                showHeader={this.props.showHeader}
                onClose={() =>
                  this.setState({
                    quickViewId: null,
                  })
                }
                taskId={this.state.quickViewId}
              />
            )}
            <div
              ref={this.tableRef}
              style={{
                maxWidth: `calc(100% - ${sizeTable}px)`,
                overflowX: "auto",
              }}
            >
              {this.state.showProject && (
                <div
                  className="gantt__select-project"
                  style={{
                    height:
                      this.tableRef.current &&
                      this.tableRef.current.clientHeight,
                  }}
                >
                  <div className="gantt-container-lp">
                    <ListProject
                      show={this.state.showProject}
                      setShow={this.handleShowProject}
                      setProjectFilter={this.handleProjectFiler}
                      projectFilter={this.state.projectFilter}
                    />
                  </div>
                </div>
              )}
              <div
                style={{
                  width: this.state.widthTable,
                }}
              >
                <DndProvider backend={HTML5Backend}>
                  <Table
                    columns={colShow}
                    size="small"
                    className="table-gantt-header gantt-header-custom"
                    bordered
                    {...scroll}
                    rowClassName={(record, index) => {
                      if (
                        this.state.data[index] &&
                        (this.state.data[index].isGroupTask ||
                          this.state.data[index].isTotalDuration)
                      )
                        return "row-grey-table";
                      return "";
                    }}
                    pagination={false}
                    dataSource={this.state.data.filter((item) => {
                      if (this.props.keyword) {
                        return item.name.includes(this.props.keyword);
                      }
                      if (
                        !this.props.visibleGantt.total &&
                        item.isTotalDuration
                      )
                        return false;
                      return item.isGroupTask || item.show;
                    })}
                    components={this.components}
                    onRow={(record, index) => ({
                      index,
                      moveRow: this.moveRow,
                      handleSetRowHover: this.handleSetRowHover,
                    })}
                  />
                </DndProvider>
                <div style={{ width: widthPdf }} id="content-last" />
              </div>
            </div>
            <RenderDragTable
              handleResizeTable={this.handleResizeTable}
              setDataSource={this.setDataSource}
              setProcessDatasource={this.setProcessDatasource}
              minLeft={this.state.minLeft}
              heightTable={this.state.height}
              widthTable={this.state.width}
              daysRender={this.state.daysRender}
              monthArray={this.state.monthArray}
              start={this.state.startTimeProject}
              end={this.state.endTimeProject}
              dataSource={this.state.data.filter((item) => {
                if (this.props.keyword) {
                  return item.name.includes(this.props.keyword);
                }
                if (!this.props.visibleGantt.total && item.isTotalDuration)
                  return false;
                return item.isGroupTask || item.show;
              })}
              handleScrollTop={this.handleScrollTop}
              timeNotWork={this.state.timeNotWork}
              fetchTimeNotWork={this.fetchTimeNotWork}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  indexColumn: state.gantt.indexColumn,
  renderFullDay: state.gantt.renderFullDay,
  visibleTable: state.gantt.visible.table,
  filterExportPdf: state.gantt.filterExportPdf,
  girdType: state.gantt.girdType,
  girdInstance: state.gantt.girdInstance,
  projectInfo: state.gantt.projectInfo,
  showHeader: state.gantt.showHeader,
  visibleLabel: state.gantt.visible.label,
  visibleGantt: state.gantt.visible.gantt,
  activeProjectId: state.taskDetail.commonTaskDetail.activeProjectId,
  scrollGanttFlag: state.gantt.scrollGanttFlag,
  calendarPermisstions: state.gantt.calendarPermisstions,
  mainCalendar: state.gantt.mainCalendar,
  keyword: state.gantt.keyword,
  scheduleDetailGantt: state.gantt.scheduleDetailGantt,
});

const mapDispatchToProps = {
  changeTimelineColor,
  changeVisible,
  changeProjectInfo,
  changeVisibleSubtaskDrawer,
  changeScheduleDetailGantt,
  getListGroupTask,
  getListTaskDetail,
  getStaticTask,
  getProjectListBasic,
  changeCalendarPermisstion,
  changeDetailSubtaskDrawer,
  scrollGantt,
  changePreviewContent,
  changeKeyword,
  changeVisibleConfigGantt,
  changeVisibleExportPdfDrawer,
};
export default withRouter(
  withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(DragSortingTable)
  )
);
