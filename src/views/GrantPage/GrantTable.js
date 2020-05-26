import { IconButton } from "@material-ui/core";
import {
  mdiAccount,
  mdiClockOutline,
  mdiDragVertical,
  mdiFileTree,
  mdiMenuDown,
  mdiMenuUp,
  mdiPageNextOutline,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Table, Tooltip } from "antd";
import LoadingBox from "components/LoadingBox";
import update from "immutability-helper";
import moment from "moment";
import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { Resizable } from "react-resizable";
import { withRouter } from "react-router-dom";
import {
  changeProjectInfo,
  changeScheduleDetailGantt,
  changeTaskComplete,
  changeTaskduration,
  changeTimelineColor,
  changeVisible,
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
import "../../views/JobDetailPage/index.scss";
import CreateJobModal from "../../views/JobDetailPage/ListPart/ListHeader/CreateJobModal";
import ListProject from "../../views/JobDetailPage/ListPart/ListProjectGantt";
import QuickViewTaskDetailDrawer from "../../views/JobPage/components/QuickViewTaskDetailDrawer";
import CreateProject from "../../views/ProjectGroupPage/Modals/CreateProject";
import "./abc.scss";
import DragableBodyRow from "./DragableBodyRow";
import DragTable from "./DragableHOC";
import Header from "./Header";
import "./table.css";

const MAX_DAY_DEFAULT = 40;

const RenderJobModal = React.memo(
  (props) => <CreateJobModal {...props} />,
  (prevProps, nextProps) => {
    return false;
  }
);

const RenderHeader = React.memo(
  (props) => <Header {...props} />,
  (prevProps, nextProps) => {
    return false;
  }
);

const RenderDrawers = React.memo(
  (props) => (
    <React.Fragment>
      <ConfigGanttDrawer height={props.height} />
      <SubTaskDrawer height={props.height} />
      <ExportPDFDrawer height={props.height} />
    </React.Fragment>
  ),
  (prevProps, nextProps) => {
    return false;
  }
);

const RenderDragTable = React.memo(
  (props) => <DragTable {...props} />,
  (prevProps, nextProps) => {
    return false;
  }
);

const RenderQuickViewTaskDetailDrawer = React.memo(
  (props) => <QuickViewTaskDetailDrawer {...props} />,
  () => false
);
function getFormatStartStringFromObject(data) {
  try {
    const {
      start_hour,
      start_date,
      start_month,
      start_year,
      start_minute,
    } = data;
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
    case 1:
      return {
        color: "#4caf50",
        background: "#4caf5042",
        name: "Thấp",
      };
    case 2:
      return {
        color: "#ff9800",
        background: "#ff980038",
        name: "Trung bình",
      };
    case 3:
      return {
        color: "#fe0707",
        background: "#ff050524",
        name: "Cao",
      };
    case "WAIT":
      return {
        color: "#ff9800",
        background: "#596fff",
        name: "Cao",
      };
    case "DOING":
      return {
        color: "#03a9f4",
        background: "#ff050524",
        name: "Cao",
      };
    case "DONE":
      return {
        color: "#03c30b",
        background: "#ff050524",
        name: "Cao",
      };
    case "EXPIRE":
      return {
        color: "#f44336",
        background: "#ff050524",
        name: "Cao",
      };
    case "MEMBER":
      return {
        color: "#f1ff26",
        background: "rgb(255, 218, 5)",
        name: "Cao",
      };
    default:
      return {
        color: "#53d7fc",
        name: "Thấp",
      };
  }
}

function decodeStatusCode(statusCode) {
  switch (statusCode) {
    case 0:
      return {
        color: "#ff9800",
        background: "#4caf5042",
      };
    case 1:
      return {
        color: "#03a9f4",
        background: "#ff980038",
      };
    case 2:
      return {
        color: "#03c30b",
        background: "#ff050524",
      };
    case 3:
      return {
        color: "#f44336",
        background: "#ff050524",
      };

    case 4:
      return {
        color: "#607D8B",
        background: "#ff050524",
      };
    case "WAIT":
      return {
        color: "#ff9800",
        background: "#596fff",
      };
    case "DOING":
      return {
        color: "#03a9f4",
        background: "#ff050524",
      };
    case "DONE":
      return {
        color: "#03c30b",
        background: "#ff050524",
      };
    case "EXPIRE":
      return {
        color: "#f44336",
        background: "#ff050524",
      };
    case "MEMBER":
      return {
        color: "#f1ff26",
        background: "rgb(255, 218, 5)",
      };
    default:
      return {
        color: "#53d7fc",
      };
  }
}

const ResizeableTitle = (props) => {
  const {
    onResize,
    width,
    setShowIconResize,
    showIconResize,
    ...restProps
  } = props;
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
      rowHover: null,
      startTimeProject: "",
      canScroll: true,
      width: 800,
      widthTable: 800,
      endTimeProject: "",
      isLoading: true,
      monthArray: [],
      openCreateProjectModal: false,
      showIconResize: false,
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
                Tên công việc
              </div>
              <div className="gantt-title-table-project-icon">
                {" "}
                <IconButton
                  onClick={() => this.handleOpenCreateProjectModal(true)}
                  aria-controls="simple-menu"
                  style={{ padding: 0 }}
                  aria-haspopup="true"
                  size="small"
                >
                  <Icon path={mdiPlus} size={1} />
                </IconButton>
              </div>
            </div>
          ),
          dataIndex: "name",
          id: 1,
          width: 400,
          height: 100,
          render: (text, record) => {
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
                  onClick={() => this.handleClickMainTask(record.id)}
                  style={{ display: "flex", cursor: "auto" }}
                >
                  <div className="gantt--group-task__left gantt--group-task-item">
                    <div>
                      <Icon
                        className="gantt-icon-table__group"
                        path={record.show ? mdiMenuDown : mdiMenuUp}
                      />
                    </div>
                    {record.name}
                  </div>
                  <div className="gantt--group-task__right">
                    <IconButton
                      aria-controls="simple-menu"
                      style={{ padding: 0 }}
                      aria-haspopup="true"
                      onClick={() => this.handleOpenCraeteJobModal(true)}
                      size="small"
                    >
                      <Icon path={mdiPlus} size={1} />
                    </IconButton>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  onMouseLeave={() => {
                    if (!window.scrollTable)
                      this.setState({
                        rowHover: -2,
                      });
                  }}
                  onMouseMove={() => {
                    if (!window.scrollTable)
                      this.setState({
                        rowHover: record.key,
                      });
                  }}
                  style={{ display: "flex", height: 20 }}
                >
                  <Icon
                    style={{ margin: "0 10px", cursor: "grab", fill: "#ccc" }}
                    path={mdiDragVertical}
                    size={1}
                  />
                  <div className="name-task-gantt">
                    <Tooltip title={record.name}>
                      <span>{record.name}</span>
                    </Tooltip>
                  </div>
                  <div
                    style={{
                      background:
                        this.state.rowHover === record.key ? "unset" : "#fff",
                    }}
                    className="name-task-gantt__icon-container"
                  >
                    {this.state.rowHover === record.key && (
                      <IconButton
                        aria-controls="simple-menu"
                        style={{ padding: 0 }}
                        aria-haspopup="true"
                        size="small"
                        onClick={() =>
                          this.setState({
                            quickViewId: record.id,
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
                    {isHover && record.number_subtask > 0 && (
                      <IconButton
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
                    {!isHover && this.props.visibleLabel.status && (
                      <CustomBadge
                        style={{
                          margin: "0px 4px",
                          ...decodeStatusCode(record.status_code),
                        }}
                        {...decodeStatusCode(record.status_code)}
                      >
                        {record.status_name}
                      </CustomBadge>
                    )}
                    {!isHover && this.props.visibleLabel.member && (
                      <CustomBadge
                        style={{
                          margin: "0px 4px",
                          ...decodePriorityCode("MEMBER"),
                        }}
                        {...decodePriorityCode("MEMBER")}
                      >
                        <Icon
                          style={{
                            transform: "translateY(-50%)",
                            width: 12,
                            top: "57%",
                            fill: "white",
                            position: "relative",
                          }}
                          path={mdiAccount}
                        />
                        {record.number_member}
                      </CustomBadge>
                    )}
                    {!isHover && this.props.visibleLabel.prior && (
                      <CustomBadge
                        style={{
                          margin: "0px 4px",
                          ...decodePriorityCode(record.priority_code),
                        }}
                        {...decodePriorityCode(record.priority_code)}
                      >
                        {decodePriorityCode(record.priority_code).name}
                      </CustomBadge>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          },
        },
        {
          title: "Bắt đầu",
          id: 2,
          dataIndex: "start_time",
          align: "center",
          width: 100,
          height: 100,
          render: (text, record) => (
            <div
              className={
                record.isTotalDuration
                  ? "gantt--group-task__total"
                  : record.isGroupTask
                  ? "gantt--group-task-item"
                  : ""
              }
            >
              {new moment(text, "DD/MM/YYYY HH:mm").format(
                this.props.girdType !== "HOUR"
                  ? "DD/MM/YYYY"
                  : "DD/MM/YYYY HH:mm"
              )}
            </div>
          ),
        },
        {
          title: "Kết thúc",
          id: 3,
          dataIndex: "end_time",
          align: "center",
          width: 100,
          height: 100,
          render: (text, record) => (
            <div
              className={
                record.isTotalDuration
                  ? "gantt--group-task__total"
                  : record.isGroupTask
                  ? "gantt--group-task-item"
                  : ""
              }
            >
              {new moment(text, "DD/MM/YYYY HH:mm").format(
                this.props.girdType !== "HOUR"
                  ? "DD/MM/YYYY"
                  : "DD/MM/YYYY HH:mm"
              )}
            </div>
          ),
        },
        {
          title: "Tiến độ",
          id: 4,
          dataIndex: "duration_actual",
          align: "center",
          width: 100,
          height: 100,
          render: (text, record) => (
            <div
              className={
                record.isTotalDuration
                  ? "gantt--group-task__total"
                  : record.isGroupTask
                  ? "gantt--group-task-item"
                  : ""
              }
            >
              {`${
                Math.round((parseFloat(text) + Number.EPSILON) * 100) / 100
              } ${this.props.girdInstance.unitText}`}
            </div>
          ),
        },
        {
          title: "Hoàn thành",
          dataIndex: "complete",
          align: "center",
          id: 5,
          width: 100,
          height: 100,
          render: (text, record) => (
            <div
              className={
                record.isTotalDuration
                  ? "gantt--group-task__total"
                  : record.isGroupTask
                  ? "gantt--group-task-item"
                  : ""
              }
            >
              {text + "%"}
            </div>
          ),
        },
      ],
    };
    this.tableRef = React.createRef();
  }
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
  fetchListTask = async (projectId, update, girdType) => {
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
      });
    } else dataSource = resultListTask.data;
    if (!resultListTask.data.state) return;
    let data = [];
    let startTimeProject;
    let endTimeProject;

    startTimeProject = new moment(
      getFormatStartStringFromObject(dataSource.total_duration.time),
      formatString
    );
    endTimeProject = new moment(
      getFormatEndStringFromObject(dataSource.total_duration.time),
      formatString
    );
    const totalProjectData = dataSource.total_duration;
    if (!totalProjectData.time) return;
    data.push({
      name: "Tổng tiến độ",
      start_label: totalProjectData.time.start_label,
      start_time: getFormatStartStringFromObject(totalProjectData.time),
      end_time: getFormatEndStringFromObject(totalProjectData.time),
      end_label: totalProjectData.time.end_label,
      duration_actual: totalProjectData.duration_actual.value,
      complete: 0,
      isTotalDuration: true,
      show: true,
      id: "TOTAL_DURATION",
      key: "TOTAL_DURATION",
    });
    dataSource.tasks.forEach((task, index) => {
      console.log(task);
      const { name, time, duration_actual } = task;
      data.push({
        name,
        start_label: time && time.start_label,
        start_time: getFormatStartStringFromObject(time),
        end_time: getFormatEndStringFromObject(time),
        start_label: time && time.start_label,
        end_label: time && time.end_label,
        duration_actual: duration_actual.value,
        complete: 0,
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
          start_label: subTask.time.start_label,
          end_label: subTask.time.end_label,
          can_edit: subTask.can_edit,
          start_time: getFormatStartStringFromObject(subTask.time),
          end_time: getFormatEndStringFromObject(subTask.time),
          duration_actual: subTask.duration_actual.value,
          complete: subTask.complete,
          show: true,
          priority_code: subTask.priority_code,
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
  };
  setRenderTime = (startTime, endTime, startTimeProject) => {
    const { girdInstance } = this.props;
    const {
      formatString,
      unit,
      parentUnit,
      getWidthParent,
      getTextParent,
      getTimeCompare,
      formatChild,
    } = girdInstance;
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
    for (let i = 0; i < 40; i++) {
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
      const result = await apiService({
        url: "group-schedule/list-schedule",
      });
      const { schedules } = result.data;
      this.props.changeScheduleDetailGantt(schedules[0]);
    } catch (e) {
      console.log(e);
    }
  };
  setEventScroll = () => {
    const tableBody = document.getElementsByClassName("ant-table-body");
    let timeOutId;
    tableBody[0].addEventListener("scroll", (e) => {
      if (window.scrollTimeline) return;
      window.scrollTable = true;
      const timelineContainer = document.getElementsByClassName(
        "gantt--timeline--container"
      )[0];
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
    this.fetchListDetailProject(projectId);
    await this.fetchListTask(projectId);
    this.fetchListTask(projectId, true, this.props.girdType);
    this.fetchListSchedule();
    this.setEventScroll();
  }
  fetchListDetailProject = (project_id) => {
    this.props.getListGroupTask({ project_id });
    this.props.getListTaskDetail(project_id);
    this.props.getStaticTask(project_id);
    this.props.getProjectListBasic(project_id);
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
      const ganttVisibleConfig = {
        total: project.state_total_duration,
        group: project.state_group_task,
        task: project.state_task,
        duration: project.state_duration_task,
        date: project.state_start_end,
        name: project.state_label_name_of_task,
        numberDuration: project.state_label_number_of_duration,
        numberComplete: project.state_label_number_of_complete,
      };
      this.props.changeVisible(null, null, null, {
        gantt: ganttVisibleConfig,
      });
      this.props.changeProjectInfo({
        id: project.id,
        name: project.name,
        group_icon: project.group_icon,
      });
    } catch (e) {
      console.log(e);
    }
  };
  components = {
    body: {
      row: (props) => {
        const { index } = props;
        let canDrag;
        if (index)
          canDrag =
            !this.state.data[index].isGroupTask &&
            !this.state.data[index].isTotalDuration;
        return <DragableBodyRow canDrag={canDrag} {...props} />;
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
  componentDidUpdate = async (prevProps) => {
    if (this.props.renderFullDay !== prevProps.renderFullDay) {
      const { startTimeProject, endTimeProject } = this.state;
      const { start, end } = this.props.filterExportPdf;
      const daysRender = [];
      const endDate = end ? new moment(end) : endTimeProject;
      const startDate = start ? new moment(start) : startTimeProject;
      let temp = new moment(startDate);
      const maxDayRender = this.props.renderFullDay
        ? endDate.diff(startDate, "days") + 1
        : MAX_DAY_DEFAULT;
      for (let i = 0; i < maxDayRender; i++) {
        const newDate = new moment(temp);
        newDate.add(i, "days");
        daysRender.push(newDate);
      }
      const allMonth = [
        {
          text: "",
          width: "",
        },
      ];
      const tempStart = new moment(startDate);
      let index = 0;
      let minMonth = 0;
      while (
        endDate > tempStart ||
        tempStart.format("M") === endDate.format("M") ||
        minMonth < 2
      ) {
        let width = tempStart.daysInMonth() * 48;
        if (index === 0) {
          width = (tempStart.daysInMonth() - tempStart.format("DD") + 1) * 48;
        }
        allMonth.push({
          text: tempStart.format("MM/YYYY"),
          width: width,
        });
        tempStart.add(1, "month");
        minMonth++;
        index++;
      }
      allMonth.shift();
      this.setState({
        daysRender,
        startTimeProject: startDate,
        endTimeProject: endDate,
        monthArray: allMonth,
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
      this.setState({
        isLoading: true,
      });
      this.fetchSettingGantt(projectId);
      this.fetchListDetailProject(projectId);
      this.fetchListTask(projectId, true, this.props.girdType);
    }
  };
  componentWillUnmount() {
    return null;
  }
  handleResize = (index) => (e, { size }) => {
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
    const dragRow = data[dragIndex];
    const indexGroupTaskList = [];
    let indexSort = 0;
    if (data[dragIndex].isGroupTask || data[dragIndex].isTotalDuration) return;
    data.forEach((item, index) => {
      if (item.isGroupTask) indexGroupTaskList.push(index);
    });
    indexGroupTaskList.forEach((index) => {
      if (hoverIndex >= index) {
        indexSort = hoverIndex - index;
      }
    });
    indexSort--;
    indexSort = indexSort < 0 ? 0 : indexSort;
    const groupTaskIndex = indexGroupTaskList.filter(
      (item) => item <= hoverIndex
    );
    const taskId = data[dragIndex].id;
    const groupId = data[groupTaskIndex[groupTaskIndex.length - 1]].id;
    const { projectId } = this.props.match.params;
    this.handleSortTask(taskId, groupId, projectId, indexSort);
    console.log(dragIndex, hoverIndex);
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
    } catch (e) {
      console.log(e);
    }
  };
  setDataSource = (index, start, end) => {
    console.log(index);
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
    newData[indexTotalDuration].start_time = startTimeTotalDuration.format(
      formatString
    );
    newData[indexTotalDuration].end_time = endTimeTotalDuration.format(
      formatString
    );
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
  handleOpenCreateProjectModal = (value) => {
    this.setState({
      openCreateProjectModal: value,
    });
  };
  handleOpenCraeteJobModal = (value) => {
    this.setState({
      openCreateJobModal: value,
    });
  };
  handleShowProject = (show) => {
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

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    const { indexColumn, visibleTable } = this.props;
    let colShow = columns.map((item, index) => columns[indexColumn[index]]);
    colShow = colShow.filter((col) => visibleTable[col.dataIndex]);
    const { startTimeProject, endTimeProject } = this.state;
    const widthPdf = this.props.renderFullDay
      ? (endTimeProject.diff(startTimeProject, "days") + 1) * 48
      : "auto";
    if (this.state.isLoading) return <LoadingBox />;
    return (
      <React.Fragment>
        {
          <RenderJobModal
            projectId={this.props.projectInfo.id || null}
            isOpen={this.state.openCreateJobModal}
            setOpen={this.handleOpenCraeteJobModal}
          />
        }
        <RenderHeader
          handleShowProject={this.handleShowProject}
          titleProject={this.state.titleProject}
          scheduleIdDefault={this.state.scheduleIdDefault}
        />
        {this.state.openCreateProjectModal && (
          <CreateProject
            open={this.state.openCreateProjectModal}
            projectGroupId={this.props.match.params.projectId}
            setOpen={this.handleOpenCreateProjectModal}
          />
        )}
        <div
          id="printContent"
          className="gantt__container"
          style={{ width: widthPdf, height: "calc(100% - 59px)" }}
        >
          <RenderDrawers height={this.state.height} />
          <RenderQuickViewTaskDetailDrawer
            showHeader={this.props.showHeader}
            onClose={() =>
              this.setState({
                quickViewId: null,
              })
            }
            taskId={this.state.quickViewId}
          />
          <div ref={this.tableRef}>
            {this.state.showProject && (
              <div
                className="gantt__select-project"
                style={{
                  height:
                    this.tableRef.current && this.tableRef.current.clientHeight,
                }}
              >
                <div className="gantt-container-lp">
                  <ListProject
                    show={this.state.showProject}
                    setShow={this.handleShowProject}
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
                  columns={columns}
                  size="small"
                  className="table-gantt-header"
                  bordered
                  scroll={{ y: this.state.height - 69, x: "unset" }}
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
                  dataSource={this.state.data.filter(
                    (item) => item.isGroupTask || item.show
                  )}
                  components={this.components}
                  onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                  })}
                />
              </DndProvider>
            </div>
          </div>
          <RenderDragTable
            setDataSource={this.setDataSource}
            setProcessDatasource={this.setProcessDatasource}
            minLeft={this.state.minLeft}
            heightTable={this.state.height}
            widthTable={this.state.width}
            daysRender={this.state.daysRender}
            monthArray={this.state.monthArray}
            start={this.state.startTimeProject}
            end={this.state.endTimeProject}
            dataSource={this.state.data}
            handleScrollTop={this.handleScrollTop}
          />
          {/* <div
            id="asdasdasd"
            style={{
              position: "absolute",
              left: "calc(100vw - 200px)",
              zIndex: 1000,
            }}  
          >
            <div
              style={{
                position: "relative",
                overflow: "scroll",
                height: this.state.height - 49,
                width: 200,
              }}
            >
              <div style={{ height: this.state.data.length * 37 }}></div>
            </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  rowHover: state.gantt.rowHover,
  indexColumn: state.gantt.indexColumn,
  renderFullDay: state.gantt.renderFullDay,
  visibleTable: state.gantt.visible.table,
  filterExportPdf: state.gantt.filterExportPdf,
  girdType: state.gantt.girdType,
  girdInstance: state.gantt.girdInstance,
  projectInfo: state.gantt.projectInfo,
  showHeader: state.gantt.showHeader,
  visibleLabel: state.gantt.visible.label,
  activeProjectId: state.taskDetail.commonTaskDetail.activeProjectId,
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
  changeDetailSubtaskDrawer,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DragSortingTable)
);
