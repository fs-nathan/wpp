import DateFnsUtils from '@date-io/date-fns';
import {TextField, Typography} from '@material-ui/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  createTask,
  getListGroupTask,
  getSchedules,
  updateGroupTask,
  updateNameDescription,
  updatePriority,
  updateScheduleTask,
  updateTypeAssign
} from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import CustomSelect from 'components/CustomSelect';
import TimePicker from 'components/TimePicker';
import {listTimeSelect} from 'components/TimeSelect';
import TitleSectionModal from 'components/TitleSectionModal';
import {isOneOf} from 'helpers/jobDetail/arrayHelper';
import {
  convertDate,
  convertDateToJSFormat,
  DEFAULT_DATE_TEXT,
  DEFAULT_GROUP_TASK_VALUE,
  EMPTY_STRING
} from 'helpers/jobDetail/stringHelper';
import {get, isFunction, isNil} from 'lodash';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import CreateProjectGroup from 'views/ProjectPage/Modals/CreateGroupTask';
import CreateGroupTaskModal from '../CreateGroupTaskModal';
import CommonPriorityForm from './CommonPriorityForm';
import CommonProgressForm from './CommonProgressForm';
import './styles.scss';
import {getWorkType} from "../../../../../actions/project/getWorkType";
import {WORKPLACE_TYPES} from "../../../../../constants/constants";
import {getProjectSetting} from "../../../../../actions/project/setting/detailStatus";
import SelectGroupTask from "./SelectGroupTask"
import {CREATE_TASK, CustomEventDispose, CustomEventListener} from "../../../../../constants/events";
import AddMemberModal from "../AddMemberModal";
import {
  UPDATE_INFOMATION_TASK
} from 'constants/events';

export const EDIT_MODE = {
  NAME_DES: 0,
  GROUP: 1,
  WORK_DATE: 2,
  PRIORITY: 3,
  ASSIGN_TYPE: 4,
}

function CreateJobModal(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listSchedule = useSelector(state => state.taskDetail.detailTask.projectSchedules)
  const isFetching = useSelector(state => state.taskDetail.detailTask.isFetching)
  const error = useSelector(state => state.taskDetail.detailTask.error)
  const _projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const [isUpdating, setIsUpdating] = React.useState(false)
  const projectId = isNil(get(props, 'projectId'))
    ? _projectId
    : get(props, 'projectId');
  const groupId = get(props, 'groupId');
  const taskId = props.data ? props.data.id : null;
  const workType = useSelector(state => state.project.getWorkType.data.work_type);
  const [title, setTitle] = React.useState("");
  const optionsList = useMemo(() => [
    { value: 2, label: t('LABEL_CHAT_TASK_NGAY_VA_GIO') },
    { value: 1, label: t('LABEL_CHAT_TASK_CHI_NHAP_NGAY') },
    { value: 0, label: t('LABEL_CHAT_TASK_KHONG_YEU_CAU') }
  ], [t]);
  const curGroupTask = get(props, 'curGroupTask', null);
  const assignList = useMemo(() => [
    { id: 0, value: t('LABEL_CHAT_TASK_DUOC_GIAO') },
    { id: 1, value: t('LABEL_CHAT_TASK_TU_DE_XUAT') },
    { id: 2, value: t('LABEL_CHAT_TASK_GIAO_VIEC_CHO') }
  ], [t]);

  const DEFAULT_ASSIGN = assignList[0];
  // Define variable using in form
  const priorityList = useMemo(() => [
    { id: 2, value: t('LABEL_CHAT_TASK_THAP') },
    { id: 1, value: t('LABEL_CHAT_TASK_TRUNG_BINH') },
    { id: 0, value: t('LABEL_CHAT_TASK_CAO') },
  ], [t]);
  const DEFAULT_PRIORITY = priorityList[0].value;
  const DEFAULT_PRIORITY_ID = priorityList[0].id;

  const DEFAULT_DATA = {
    name: EMPTY_STRING,
    description: EMPTY_STRING,
    start_time: listTimeSelect[16],
    start_date: DEFAULT_DATE_TEXT,
    end_time: listTimeSelect[34],
    end_date: DEFAULT_DATE_TEXT,
    priority: DEFAULT_PRIORITY_ID,
    priorityLabel: DEFAULT_PRIORITY,
    assignValue: DEFAULT_ASSIGN
  };

  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  // const [openAddModal, setOpenAddModal] = React.useState(false);
  const [listSchedules, setListSchedules] = React.useState([]);
  const [scheduleValue, setScheduleValue] = React.useState(null);
  const [type, setType] = React.useState(0);
  const [openSelectGroupTaskModal, setOpenSelectGroupTaskModal] = React.useState(false);
  const [createdTask, setCreatedTask] = React.useState(null);
  // const [showAddMember, setShowAddMember] = React.useState(false);

  const isEdit = props.editMode !== null && props.editMode !== undefined;

  const updateData = () => {
    const updateData = {
      task_id: taskId,
      name: data.name,
      description: data.description,
      start_time: data.start_time,
      start_date: data.start_date,
      end_time: data.end_time,
      end_date: data.end_date,
      priority: data.priority,
      project_id: projectId,
      group_task: data.group_task,
      schedule_id: data.schedule,
    }
    if (type === 0) {
      updateData.start_date = undefined;
      updateData.start_time = undefined;
      updateData.end_date = undefined;
      updateData.end_time = undefined;
    } else if (type === 1) {
      updateData.start_time = undefined;
      updateData.end_time = undefined;
    }

    switch (props.editMode) {
      case EDIT_MODE.NAME_DES:
        dispatch(updateNameDescription(taskId, data.name, updateData.description, props.fromView));
        break;
      case EDIT_MODE.PRIORITY:
        dispatch(updatePriority(taskId, data.priority, props.fromView));
        break;
      case EDIT_MODE.WORK_DATE:
        dispatch(updateScheduleTask(taskId, updateData.schedule_id, props.fromView));
        break;
      case EDIT_MODE.GROUP:
        dispatch(updateGroupTask(taskId, data.group_task.id, props.fromView));
        break;

      default:
        break;
    }
    setIsUpdating(true)
  };
  React.useEffect(() => {
    switch (workType) {
      case WORKPLACE_TYPES.JOB:
      case WORKPLACE_TYPES.PROJECT:
        setTitle(t('LABEL_CHAT_TASK_CHON_NHOM_CONG_VIEC'));
        break;
      case WORKPLACE_TYPES.PROCESS:
        setTitle(t("IDS_WP_SELECT_PHASE"));
        break;
      default:
        break;
    }
  }, [workType]);

  React.useEffect(() => {
    if (props.isOpen) {
      if (!isNil(curGroupTask)) {
        handleChangeData('group_task', {
          name: get(curGroupTask, 'name'),
          id: get(curGroupTask, 'id'),
        })
      } else if (groupId) {
        handleChangeData('group_task', {
          name: groupId.label,
          id: groupId.value
        })
      } else if (props.data && props.data.group_task) {
        handleChangeData('group_task', {
          name: props.data.group_task_name,
          id: props.data.group_task
        })
      }
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    if (listSchedule) {
      // Map task to input
      let listSchedulesData = listSchedule.map(item => ({
        label: item.name,
        is_default: item.is_default,
        value: item._id
      }));
      setListSchedules(listSchedulesData);

      // Set default group for input
      let item = listSchedulesData.find(
        item => item.is_default
      );
      if (item) {
        setScheduleValue(item);
        handleChangeData('schedule', item.value)
      }
    }
  }, [listSchedule]);

  React.useEffect(() => {
    if (props.data && props.editMode !== null) {
      let tempData = { ...props.data };
      tempData.priority = tempData.priority_code;
      if (!tempData.name) tempData.name = '';
      if (!tempData.start_date) tempData.start_date = '';
      else tempData.start_date = convertDateToJSFormat(tempData.start_date);
      if (!tempData.start_time) tempData.start_time = '';
      if (!tempData.end_date) tempData.end_date = '';
      else tempData.end_date = convertDateToJSFormat(tempData.end_date);
      if (!tempData.end_time) tempData.end_time = '';
      let priority = priorityList.find(
        item => item.id === tempData.priority_code
      );
      tempData.priorityLabel = priority ? priority.value : DEFAULT_PRIORITY;
      tempData.group_task = {
        id: tempData.group_task,
        name: tempData.group_task_name
      }
      setDataMember(tempData);
    }
    // eslint-disable-next-line
  }, [props.data, props.editMode]);

  useEffect(() => {
    if (isFetching === false && error === false && !Number.isInteger(props.editMode)) {
      props.setOpen(false);
      if (props.onCreateTaskSuccess) props.onCreateTaskSuccess()
    }
    // eslint-disable-next-line
  }, [isFetching, error])

  useEffect(() => {
    if (props.isOpen) {
      if (projectId) {
        if (!Number.isInteger(props.editMode) || props.editMode === EDIT_MODE.WORK_DATE) {
          dispatch(getSchedules(projectId))
        }
        if (!Number.isInteger(props.editMode) || props.editMode === EDIT_MODE.GROUP) {
          dispatch(getWorkType({projectId}))
        }
        if (!isEdit) {
          handleChangeData('name', EMPTY_STRING)
          handleChangeData('description', EMPTY_STRING)
        }
      }
    }
  }, [dispatch, isEdit, projectId, props.isOpen])

  useEffect(() => {
    if (props.isOpen && projectId) {
      if (props.data) {
        setType(props.data.type_time)
      } else {
        async function fetchData() {
          const projectSettings = await getProjectSetting(projectId)
          if (projectSettings.data && projectSettings.data.state) {
            setType(projectSettings.data.date_status)
          }
        }
        fetchData();
      }
    }
  }, [props.isOpen])

  React.useEffect(() => {
    if (props.isOpen && Number.isInteger(props.editMode)) {
      const closeModal = () => {
        setIsUpdating(false)
        props.setOpen(false)
      }
      CustomEventListener(UPDATE_INFOMATION_TASK, closeModal);
      return () => {
        CustomEventDispose(UPDATE_INFOMATION_TASK, closeModal);
      }
    }
  }, [props.isOpen]);

  const handleChangeData = (attName, value) => {
    // console.log(attName, value)
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  const dataCreateJob = {
    project_id: projectId,
    group_task: data.group_task,
    name: data.name,
    description: data.description,
    priority: data.priority,
    start_date: data.start_date,
    start_time: data.start_time,
    end_date: data.end_date,
    end_time: data.end_time,
    schedule_id: data.schedule,
    from_view: props.fromView
  };

  function validate(data) {
    const {
      name,
      priority
    } = data
    if (isEdit && props.editMode !== EDIT_MODE.NAME_DES) {
      return true;
    }
    return priority !== null && !!name.trim();
  }

  const handlePressConfirm = () => {
    if (validate(data)) {
      // Remove group task in object if user unselect group task
      let data = { ...dataCreateJob };
      if (!dataCreateJob.group_task ||
        dataCreateJob.group_task === DEFAULT_GROUP_TASK_VALUE)
        delete data.group_task;
      else
        data.group_task = dataCreateJob.group_task.id;
      data.type = type;
      if (type === 0) {
        data.start_date = undefined;
        data.start_time = undefined;
        data.end_date = undefined;
        data.end_time = undefined;
      } else if (type === 1) {
        data.start_time = undefined;
        data.end_time = undefined;
      }
      // Call api
      isFunction(get(props, 'doCreateTask'))
        ? get(props, 'doCreateTask')({ data, projectId: projectId })
        : dispatch(createTask({ data, projectId: projectId }));
    }
  };

  // React.useEffect(() => {
  //   if (projectId) {
  //     console.log('xxxx', projectId)
  //     CustomEventListener(CREATE_TASK, (e) => {
  //       console.log(e)
  //       if (!localStorage.getItem(`MODAL_MEMBER_TASK_MARK_NOT_SHOW_${projectId}`)) {
  //         setCreatedTask(e.detail.task);
  //         setShowAddMember(true);
  //       }
  //     });
  //     return () => {
  //       CustomEventDispose(CREATE_TASK, (e) => {
  //         if (!localStorage.getItem(`MODAL_MEMBER_TASK_MARK_NOT_SHOW_${projectId}`)) {
  //           setCreatedTask(e.detail.task);
  //           setShowAddMember(true);
  //         }
  //       });
  //     }
  //   }
  // }, []);

  return (
    <>
      <JobDetailModalWrap
        title={isEdit ? t('LABEL_CHAT_TASK_CHINH_SUA_CONG_VIEC') : t('LABEL_CHAT_TASK_TAO_CONG_VIEC')}
        open={props.isOpen}
        setOpen={props.setOpen}
        confirmRender={() => isEdit ? t('LABEL_CHAT_TASK_HOAN_THANH') : t('LABEL_CHAT_TASK_TAO_VIEC')}
        onConfirm={isEdit ? updateData : handlePressConfirm}
        canConfirm={validate(data)}
        maxWidth='sm'
        actionLoading={isFetching || isUpdating}
        manualClose
        onCancle={() => props.setOpen(false)}
        className={clsx("createJob", `createJob__edit${props.editMode}`, {
          'modal_height_50vh': isOneOf(props.editMode, [EDIT_MODE.NAME_DES]),
          'modal_height_30vh': isOneOf(props.editMode, [EDIT_MODE.WORK_DATE, EDIT_MODE.ASSIGN_TYPE]),
          'modal_height_20vh': isOneOf(props.editMode, [EDIT_MODE.PRIORITY, EDIT_MODE.GROUP]),
        })}
      >
        <React.Fragment>
          {
            (!isEdit || props.editMode === EDIT_MODE.GROUP) &&
            <div className="select-customer-from-input">
              <TitleSectionModal label={title} isRequired />
              <TextField
                className="offerModal--titleText"
                placeholder={t('LABEL_CHAT_TASK_CHON_NHOM_CONG_VIEC')}
                variant="outlined"
                fullWidth
                value={data.group_task ? data.group_task.name : ""}
                onClick={() => setOpenSelectGroupTaskModal(true)}
                inputProps={{
                  readOnly: true
                }}
              />
              <ArrowDropDownIcon className="icon-arrow" />
            </div>
          }
          {
            (!isEdit || props.editMode === EDIT_MODE.NAME_DES) &&
            <>
              <TitleSectionModal label={t('LABEL_CHAT_TASK_TEN_CONG_VIEC')} isRequired />
              <TextField
                className="createJob--inputTextJob"
                margin="normal"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={e => handleChangeData('name', e.target.value)}
                placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
              />
              <TitleSectionModal label={t('LABEL_CHAT_TASK_MO_TA_CONG_VIEC')} />
              <TextField
                className="createJob--content"
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
                rowsMax={18}
                fullWidth
                value={data.description}
                onChange={e => handleChangeData('description', e.target.value)}
                placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
              />
            </>
          }
          {
            (!isEdit || props.editMode === EDIT_MODE.WORK_DATE) &&
            <>
              <TitleSectionModal label={t('LABEL_CHAT_TASK_LICH_CONG_VIEC')} isRequired />
              <CustomSelect
                options={listSchedules}
                value={scheduleValue}
                onChange={({ value: scheduleId }) => handleChangeData('schedule', scheduleId)}
              />
            </>
          }
          {!isEdit &&
            <>
              <TitleSectionModal label={t('LABEL_CHAT_TASK_TIEN_DO_CONG_VIEC')} isRequired />
              <CommonProgressForm
                items={optionsList}
                value={type}
                handleChange={setType}
              />
              {type !== 0 &&
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Typography className="createJob--timeWrap" component={'span'}>
                    <Typography className="createJob--endTime" component={'span'}>{t('LABEL_CHAT_TASK_NGAY_BAT_DAU')}</Typography>
                    {type === 1 ? (
                      <KeyboardDatePicker
                        autoOk
                        className="createJob--inputDate"
                        size="small"
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={data.start_date}
                        onChange={e => handleChangeData('start_date', convertDate(e))}
                      />
                    ) : (
                        <TimePicker
                          className="createJob--timeSelect"
                          value={data.start_time}
                          onChange={(value) => handleChangeData('start_time', value)}
                        />
                      )}
                    {type !== 1 && (
                      <KeyboardDatePicker
                        autoOk
                        className="createJob--inputDate"
                        size="small"
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={data.start_date}
                        onChange={e => handleChangeData('start_date', convertDate(e))}
                      />
                    )}
                  </Typography>
                  <Typography className="createJob--timeWrap" component={'span'}>
                    <Typography className="createJob--endTime" component={'span'}>{t('LABEL_CHAT_TASK_NGAY_KET_THUC')}</Typography>
                    {type === 1 ? (
                      <KeyboardDatePicker
                        autoOk
                        className="createJob--inputDate"
                        size="small"
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={data.end_date}
                        // minDate={data.start_date}
                        onChange={e => handleChangeData('end_date', convertDate(e))}
                      />
                    ) : (
                        <TimePicker
                          className="createJob--timeSelect"
                          value={data.end_time}
                          onChange={(value) => handleChangeData('end_time', value)}
                        />
                      )}
                    {type !== 1 && (
                      <KeyboardDatePicker
                        autoOk
                        className="createJob--inputDate"
                        size="small"
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={data.end_date}
                        // minDate={data.start_date}
                        onChange={e => handleChangeData('end_date', convertDate(e))}
                      />
                    )}
                  </Typography>
                </MuiPickersUtilsProvider>
              }
            </>
          }
          {
            (!isEdit || props.editMode === EDIT_MODE.PRIORITY) &&
            <>
              <TitleSectionModal label={t('LABEL_CHAT_TASK_MUC_DO_UU_TIEN_LABEL')} isRequired />
              <CommonPriorityForm
                labels={priorityList}
                priority={data.priorityLabel}
                handleChangeLabel={priorityItem =>
                  handleChangeData('priority', priorityItem.id)
                }
              />
            </>
          }
        </React.Fragment>
      </JobDetailModalWrap >
      {
        openSelectGroupTaskModal &&
        <SelectGroupTask
          isOpen={true}
          setOpen={(value) => setOpenSelectGroupTaskModal(value)}
          selectedOption={(group) => {
            handleChangeData('group_task', group)
          }}
          groupSelected={data.group_task ? data.group_task.id : null}
          projectId={projectId}
        />
      }
    </>
  );
}

function CheckCreateJob(props) {

  const dispatch = useDispatch();
  const _projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const {t} = useTranslation();
  const listGroupTaskData = useSelector(state => state.taskDetail.listGroupTask.listGroupTask) || {};
  const isFetching = useSelector(state => state.taskDetail.listGroupTask.isFetching);
  const [isOpenCreateGroup, setOpenCreateGroup] = React.useState(false);
  const [isOpenProjectGroup, setOpenProjectGroup] = React.useState(false);
  const [isOpenCreateTask, setOpenCreateTask] = React.useState(false);
  const projectId = isNil(get(props, 'projectId'))
    ? _projectId
    : get(props, 'projectId');
  const project = get(props, "project");
  useEffect(() => {
    if (projectId && props.isOpen && !Number.isInteger(props.editMode)) {
      dispatch(getListGroupTask({ project_id: projectId }));
    }
  }, [dispatch, projectId, props.isOpen])
  useEffect(() => {
    if (Number.isInteger(props.editMode)) {
      setOpenCreateGroup(false)
      setOpenCreateTask(props.isOpen)
    } else {
      if (listGroupTaskData.group_tasks && props.isOpen && !isFetching) {
        if (listGroupTaskData.group_tasks.length === 0) {
          setOpenCreateGroup(true)
          setOpenCreateTask(false)
        } else {
          setOpenCreateGroup(false)
          setOpenCreateTask(true)
        }
      }
    }
  }, [isFetching, listGroupTaskData.group_tasks, props.isOpen])

  function onClickCreateProjectGroup() {
    setOpenCreateGroup(false)
    setOpenProjectGroup(true)
    props.setOpen(false)
  }

  function onClickCloseGroupTask(isOpen) {
    props.setOpen(false)
    setOpenCreateGroup(isOpen)
  }

  function onClickCloseGroupProject(isOpen) {
    props.setOpen(false)
    setOpenProjectGroup(isOpen)
  }

  function onClickCloseTask(isOpen) {
    props.setOpen(false)
    setOpenCreateTask(isOpen)
  }

  return !isFetching ? (
    <>
      <CreateJobModal
        {...props}
        isOpen={isOpenCreateTask}
        setOpen={onClickCloseTask}
      />
      <CreateGroupTaskModal
        isOpen={isOpenCreateGroup}
        setOpen={onClickCloseGroupTask}
        onClickCreate={onClickCreateProjectGroup}
        title1={
          get(project, "project.work_type") === WORKPLACE_TYPES.PROCESS ?
            t("LABEL_CHAT_TASK_HIEN_TAI_CHUA_CO_GIAI_DOAN") : null
        }
        title2={
          get(project, "project.work_type") === WORKPLACE_TYPES.PROCESS ?
            t("LABEL_CHAT_TASK_HAY_TAO_MOI_GIAI_DOAN") : null
        }
        actionName={
          get(project, "project.work_type") === WORKPLACE_TYPES.PROCESS ?
            t("LABEL_CHAT_TASK_TAO_MOI_GIAI_DOAN") : null
        }
      />
      <CreateProjectGroup
        project_id={projectId}
        open={isOpenProjectGroup}
        setOpen={onClickCloseGroupProject} />
    </>
  ) : null
}

export default CheckCreateJob;
