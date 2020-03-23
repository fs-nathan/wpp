import DateFnsUtils from '@date-io/date-fns';
import { TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createTask, updateNameDescriptionTask } from 'actions/taskDetail/taskDetailActions';
import CustomModal from 'components/CustomModal';
import CustomSelect from 'components/CustomSelect';
import TextEditor, { getEditorData } from 'components/TextEditor';
import TimeSelect, { listTimeSelect } from 'components/TimeSelect';
import { convertToRaw } from 'draft-js';
import { convertDate, convertDateToJSFormat, DEFAULT_DATE_TEXT, DEFAULT_GROUP_TASK_VALUE, EMPTY_STRING } from 'helpers/jobDetail/stringHelper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import CommonControlForm from './CommonControlForm';
import CommonPriorityForm from './CommonPriorityForm';
import CommonProgressForm from './CommonProgressForm';
import './styles.scss';


let optionsList = [
  { value: 2, label: 'Ngày và giờ (mặc định)' },
  { value: 1, label: 'Chỉ nhập ngày' },
  { value: 0, label: 'Không yêu cầu' }
];

let assignList = [
  { id: 0, value: 'Được giao' },
  { id: 1, value: 'Tự đề xuất' },
  { id: 2, value: 'Giao việc cho' }
];

const DEFAULT_ASSIGN = assignList[0];
const DEFAULT_ASSIGN_ID = assignList[0];

// Define variable using in form
let priorityList = [
  { id: 0, value: 'Thấp' },
  { id: 1, value: 'Trung bình' },
  { id: 2, value: 'Cao' }
];
const DEFAULT_PRIORITY = priorityList[0].value;
const DEFAULT_PRIORITY_ID = priorityList[0].id;

const DEFAULT_DATA = {
  name: EMPTY_STRING,
  description: getEditorData(),
  start_time: listTimeSelect[16],
  start_date: DEFAULT_DATE_TEXT,
  end_time: listTimeSelect[34],
  end_date: DEFAULT_DATE_TEXT,
  type_assign: DEFAULT_ASSIGN_ID,
  priority: DEFAULT_PRIORITY_ID,
  group_task: DEFAULT_GROUP_TASK_VALUE,
  priorityLabel: DEFAULT_PRIORITY,
  assignValue: DEFAULT_ASSIGN
};

function validate(data) {
  const {
    name,
    type_assign,
    priority
  } = data
  return type_assign !== null && priority !== null && !!name;
}

function CreateJobModal(props) {
  const dispatch = useDispatch();
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const isFetching = useSelector(state => state.taskDetail.listDetailTask.isFetching);
  const taskId = useSelector(taskIdSelector);

  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  // const [openAddModal, setOpenAddModal] = React.useState(false);
  const [listGroupTask, setListGroupTask] = React.useState([]);
  const [groupTaskValue, setGroupTaskValue] = React.useState(null);
  const [type, setType] = useState(2);

  const updateData = () => {
    const dataNameDescription = {
      task_id: taskId,
      name: data.name,
      description: JSON.stringify(convertToRaw(data.description.getCurrentContent())),
      start_time: data.start_time,
      start_date: data.start_date,
      end_time: data.end_time,
      end_date: data.end_date,
      priority: data.priority,
      project_id: projectId,
      group_task: data.group_task,
      type_assign: data.type_assign.id,
    }
    dispatch(updateNameDescriptionTask(dataNameDescription));
    props.setOpen(false);
  };

  React.useEffect(() => {
    if (listTaskDetail) {
      // Map task to input
      let listTask = listTaskDetail.tasks.map(item => ({
        label:
          item.id !== DEFAULT_GROUP_TASK_VALUE ? item.name : 'Chưa phân loại',
        value: item.id !== DEFAULT_GROUP_TASK_VALUE ? item.id : ''
      }));
      setListGroupTask(listTask);

      // Set default group for input
      let item = listTask.find(
        item => item.value === ''
      );
      if (item) setGroupTaskValue(item);
    }
  }, [listTaskDetail]);

  React.useEffect(() => {
    if (props.data) {
      let tempData = props.data;
      if (!tempData.name) tempData.name = '';
      tempData.description = getEditorData(tempData.description);
      if (!tempData.start_date) tempData.start_date = '';
      else tempData.start_date = convertDateToJSFormat(tempData.start_date);
      if (!tempData.start_time) tempData.start_time = '';
      if (!tempData.end_date) tempData.end_date = '';
      else tempData.end_date = convertDateToJSFormat(tempData.end_date);
      if (!tempData.end_time) tempData.end_time = '';
      if (!tempData.group_task) tempData.group_task = '';
      tempData.type_assign = assignList.find(ass => ass.id === props.data.assign_code);
      let priority = priorityList.find(
        item => item.id === tempData.priority_code
      );
      tempData.priorityLabel = priority ? priority.value : DEFAULT_PRIORITY;
      let assign = assignList.find(item => item.id === tempData.type_assign);
      tempData.assignLabel = assign ? assign : DEFAULT_ASSIGN;
      setDataMember(tempData);
    }
  }, [props.data]);

  useEffect(() => {
    if (!isFetching)
      props.setOpen(false);
    // eslint-disable-next-line
  }, [isFetching])

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  const dataCreateJob = {
    project_id: projectId,
    group_task: data.group_task,
    name: data.name,
    description: data.description,
    type_assign: data.type_assign.id,
    priority: data.priority,
    start_date: data.start_date,
    start_time: data.start_time,
    end_date: data.end_date,
    end_time: data.end_time
  };

  const handlePressConfirm = () => {
    if (validate(data)) {
      // Remove group task in object if user unselect group task
      let data = dataCreateJob;
      if (!dataCreateJob.group_task ||
        dataCreateJob.group_task === DEFAULT_GROUP_TASK_VALUE) delete data.group_task;
      data.date_status = type;
      data.description = JSON.stringify(convertToRaw(data.description.getCurrentContent()));
      // Call api
      dispatch(createTask({ data, projectId: projectId }));
      // Clear temporary data
      setDataMember(DEFAULT_DATA);
      // Close modal
      // handleClose();
    } else {
      // Alert user
      alert('Bạn cần nhập tên công việc');
    }
  };

  return (
    <CustomModal
      title={props.isRight ? 'Chỉnh sửa công việc' : 'Tạo công việc'}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => props.isRight ? "Hoàn Thành" : "TẠO VIỆC"}
      onConfirm={props.isRight ? updateData : handlePressConfirm}
      canConfirm={!validate(data)}
      maxWidth='sm'
      className="createJob"
    >
      <React.Fragment>
        <Typography className="createJob--titleLabel" component={'div'}> Chọn nhóm công việc </Typography>
        <Typography component={'div'} style={{ marginBottom: '20px' }}>
          <CustomSelect
            options={listGroupTask}
            value={groupTaskValue}
            onChange={({ value: groupTaskId }) => handleChangeData('group_task', groupTaskId)}
          />
        </Typography>
        <Typography component={'div'} style={{ marginBottom: 10 }}>
          <Typography className="createJob--titleText" component={'span'}>
            <TextField
              className="createJob--inputTextJob"
              label="Tên công việc"
              helperText={data.name ? '' : "Không được để trống"}
              margin="normal"
              variant="outlined"
              fullWidth
              value={data.name}
              onChange={e => handleChangeData('name', e.target.value)}
            />
          </Typography>
        </Typography>
        <Typography className="createJob--description" component={'div'}>
          <Typography className="createJob--titleLabel" component={'span'}>Mô tả công việc</Typography>
          <TextEditor
            className="createJob--content"
            value={data.description}
            onChange={value => handleChangeData('description', value)}
          />
        </Typography>
        <Typography className="createJob--processWork" component={'span'}>
          <Typography className="createJob--titleLabel" component={'span'}>Tiến độ công việc</Typography>
        </Typography>
        <CommonProgressForm
          items={optionsList}
          value={type}
          handleChange={setType}
        />
        {type !== 0 &&
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Typography className="createJob--timeWrap" component={'span'}>
              <Typography className="createJob--endTime" component={'span'}>Ngày bắt đầu</Typography>
              {type === 1 ? (
                <KeyboardDatePicker
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
                  <TimeSelect
                    className="createJob--timeSelect"
                    value={data.start_time}
                    onChange={({ target }) => handleChangeData('start_time', target.value)}
                  />
                )}
              {type !== 1 && (
                <KeyboardDatePicker
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
              <Typography className="createJob--endTime" component={'span'}>Ngày kết thúc</Typography>
              {type === 1 ? (
                <KeyboardDatePicker
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
                  <TimeSelect
                    className="createJob--timeSelect"
                    value={data.end_time}
                    onChange={({ target }) => handleChangeData('end_time', target.value)}
                  />
                )}
              {type !== 1 && (
                <KeyboardDatePicker
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
        <Typography component={'span'}>
          <Typography className="createJob--titleLabel" component={'div'}>Mức độ ưu tiên</Typography>
          <CommonPriorityForm
            labels={priorityList}
            priority={data.priorityLabel}
            handleChangeLabel={priorityItem =>
              handleChangeData('priority', priorityItem.id)
            }
          />
        </Typography>
        <Typography component={'span'}>
          <Typography className="createJob--titleLabel" component={'div'}> Hình thức giao việc </Typography>
          <CommonControlForm
            labels={assignList}
            assign={data.type_assign}
            handleChangeAssign={assignItem =>
              handleChangeData('type_assign', assignItem)
            }
          />
        </Typography>
      </React.Fragment>
    </CustomModal>
  );
}

export default CreateJobModal;
