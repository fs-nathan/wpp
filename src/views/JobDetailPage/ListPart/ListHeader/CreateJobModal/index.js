import React, { useState, useEffect } from 'react';
import {
  Typography,
  Dialog,
  Button,
  withStyles,
  TextField,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';

import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useSelector, useDispatch } from 'react-redux';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import CustomSelect from '../../../../../components/CustomSelect';
import {
  DEFAULT_DATE_TEXT,
  EMPTY_STRING,
  DEFAULT_GROUP_TASK_VALUE
} from '../../../../../helpers/jobDetail/stringHelper';
import {
  convertDate,
  convertDateToJSFormat
} from '../../../../../helpers/jobDetail/stringHelper';
import { taskIdSelector } from '../../../selectors';
import * as taskDetailAction from '../../../../../actions/taskDetail/taskDetailActions';
import CommonProgressForm from './CommonProgressForm';
import CommonControlForm from './CommonControlForm';
import CommonPriorityForm from './CommonPriorityForm';
import TextEditor from '../../../../../components/TextEditor';
import spinnerGif from '../../../../../assets/loading_spinner.gif';
import DialogTitle from './DialogTitle';

import './styles.scss';

const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const Typotitle = styled(Typography)`
  font-size: 16px;
  color: #444444;
`;

const ProgressWork = styled(Typography)`
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin-top: 20px;
`;

const TitleText = styled(Typography)`
  display: flex;
  justify-content: space-between;
  & > *:first-child {
    font-size: 15px;
    color: #444444;
  }
  & > *:last-child {
    color: #fa0000;
    font-size: 14px;
  }
`;

const BeginEndTime = styled(Typography)`
  width: 120px;
  margin-right: 20px;
  margin-left: 20px;
`;

const TypoText = styled(Typography)`
  font-size: 15px;
  color: #505050;
  margin: 20px 0 15px 0;
`;

const InputDate = styled(KeyboardDatePicker)`
  & > div:nth-child(2) {
    width: 160px;
    padding-right: 5px;
    & > input {
      padding: 10px;
    }
    & > div > button {
      padding: 5px;
    }
  }
`;

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    justifyContent: 'space-between',
    padding: '15px 24px'
  }
}))(MuiDialogActions);

const InputTextJob = styled(TextField)`
  margin: 0;
  & > label {
    font-size: 14px;
    z-index: 0;
  }
  & > p {
    color: red;
  }
`;

const Descripe = styled(Typography)`
  margin-top: 15px;
`;
//
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

const DEFAULT_ASSIGN = assignList[0].value;
const DEFAULT_ASSIGN_ID = assignList[0].id;

// Define variable using in form
let priorityList = [
  { id: 0, value: 'Thấp' },
  { id: 1, value: 'Trung bình' },
  { id: 2, value: 'Cao' }
];
const DEFAULT_PRIORITY = priorityList[0].value;
const DEFAULT_PRIORITY_ID = priorityList[0].id;

const StyleDialog = styled(Dialog)`
  & > div:nth-child(3) > div {
    overflow: hidden;
  }
`;

const ContentDialog = styled(DialogContent)`
  border: none;
  overflow: scroll;
  padding-top: 0;
  ::-webkit-scrollbar {
    width: 7px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
  &&:hover {
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
  }
`;
const DialogFooter = styled(DialogActions)`
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 100;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

let listTimeSelect = [];
for (let index = 0; index < 24; index++) {
  listTimeSelect.push(`${index}:00`, `${index}:30`)
}
listTimeSelect = listTimeSelect.map(value => ({ value, label: value }))

const DEFAULT_DATA = {
  name: EMPTY_STRING,
  description: EditorState.createEmpty(),
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

function CreateJobModal(props) {
  const dispatch = useDispatch();
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const isFetching = useSelector(state => state.taskDetail.listDetailTask.isFetching);
  const taskId = useSelector(taskIdSelector);
  const updateNameDescriptionTask = data => dispatch(taskDetailAction.updateNameDescriptionTask(data));
  const createJobByProjectId = data => dispatch(taskDetailAction.createTask(data));

  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  // const [openAddModal, setOpenAddModal] = React.useState(false);
  const [listGroupTask, setListGroupTask] = React.useState([]);
  const [groupTaskValue, setGroupTaskValue] = React.useState(null);
  const [type, setType] = useState(2);

  const updateData = () => {
    const dataNameDescription = {
      task_id: taskId,
      name: data.name,
      description: data.description
    };
    const dataTimeDuration = {
      task_id: taskId,
      start_time: data.start_time,
      start_date: data.start_date,
      end_time: data.end_time,
      end_date: data.end_date
    };
    updateNameDescriptionTask({ dataNameDescription, dataTimeDuration });
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
      if (!tempData.description) tempData.description = '';
      if (!tempData.start_date) tempData.start_date = '';
      else tempData.start_date = convertDateToJSFormat(tempData.start_date);
      if (!tempData.start_time) tempData.start_time = '';
      if (!tempData.end_date) tempData.end_date = '';
      else tempData.end_date = convertDateToJSFormat(tempData.end_date);
      if (!tempData.end_time) tempData.end_time = '';
      if (!tempData.group_task) tempData.group_task = '';
      // if (!tempData.type_assign) tempData.type_assign = ''
      let priority = priorityList.find(
        item => item.id === tempData.priority_code
      );
      tempData.priorityLabel = priority ? priority.value : DEFAULT_PRIORITY;
      let assign = assignList.find(item => item.id === tempData.type_assign);
      tempData.assignLabel = assign ? assign.value : DEFAULT_ASSIGN;
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

  const handleClose = () => {
    props.setOpen(false);
  };

  const dataCreateJob = {
    project_id: projectId,
    group_task: data.group_task,
    name: data.name,
    description: data.description,
    type_assign: data.type_assign,
    priority: data.priority,
    start_date: data.start_date,
    start_time: data.start_time,
    end_date: data.end_date,
    end_time: data.end_time
  };

  const validate = () => !!data.name;

  const handlePressConfirm = () => {
    if (validate()) {
      // Remove group task in object if user unselect group task
      let data = dataCreateJob;
      if (!dataCreateJob.group_task ||
        dataCreateJob.group_task === DEFAULT_GROUP_TASK_VALUE) delete data.group_task;
      data.start_time = data.start_time.value;
      data.end_time = data.end_time.value;
      data.date_status = type;
      data.description = JSON.stringify(convertToRaw(data.description.getCurrentContent()));
      // Call api
      createJobByProjectId({ data, projectId: projectId });
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
    <div>
      <StyleDialog open={props.isOpen} fullWidth onClose={handleClose}>
        <DialogTitle onClose={handleClose}>
          {props.isRight ? 'Chỉnh sửa công việc' : 'Tạo công việc'}
        </DialogTitle>
        <ContentDialog dividers>
          <TypoText component={'div'}> Chọn nhóm công việc </TypoText>
          <Typography component={'div'} style={{ marginBottom: '20px' }}>
            <CustomSelect
              options={listGroupTask}
              value={groupTaskValue}
              onChange={({ value: groupTaskId }) => handleChangeData('group_task', groupTaskId)}
            />
          </Typography>
          <Typography component={'div'} style={{ marginBottom: 10 }}>
            <TitleText component={'span'}>
              <InputTextJob
                label="Tên công việc"
                helperText={data.name ? '' : "Không được để trống"}
                margin="normal"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={e => handleChangeData('name', e.target.value)}
              />
            </TitleText>
          </Typography>
          <Descripe component={'div'}>
            <Typotitle component={'span'}>Mô tả công việc</Typotitle>
            <TextEditor
              variant="outlined"
              value={data.description}
              onChange={value => handleChangeData('description', value)}
            />
          </Descripe>
          <ProgressWork component={'span'}>
            <Typotitle component={'span'}>Tiến độ công việc</Typotitle>
            {/* <DefaultFlex component={'span'}>Cài đặt</DefaultFlex> */}
          </ProgressWork>
          <CommonProgressForm
            items={optionsList}
            value={type}
            handleChange={setType}
          />
          {type !== 0 &&
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <StartEndDay component={'span'}>
                <BeginEndTime component={'span'}>Ngày bắt đầu</BeginEndTime>
                {type === 1 ? (
                  <InputDate
                    size="small"
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    value={data.start_date}
                    onChange={e => handleChangeData('start_date', convertDate(e))}
                  />
                ) : (
                    <CustomSelect
                      className="createJob--timeSelect"
                      options={listTimeSelect}
                      value={data.start_time}
                      onChange={({ value: startTime }) => handleChangeData('start_time', startTime)}
                    />
                  )}
                {type !== 1 && (
                  <InputDate
                    size="small"
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    value={data.start_date}
                    onChange={e => handleChangeData('start_date', convertDate(e))}
                  />
                )}
              </StartEndDay>
              <StartEndDay component={'span'}>
                <BeginEndTime component={'span'}>Ngày kết thúc</BeginEndTime>
                {type === 1 ? (
                  <InputDate
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
                    <CustomSelect
                      className="createJob--timeSelect"
                      options={listTimeSelect}
                      value={data.end_time}
                      onChange={({ value: endTime }) => handleChangeData('end_time', endTime)}
                    />
                  )}
                {type !== 1 && (
                  <InputDate
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
              </StartEndDay>
            </MuiPickersUtilsProvider>
          }
          <Typography component={'span'}>
            <TypoText component={'div'}>Mức độ ưu tiên</TypoText>
            <CommonPriorityForm
              labels={priorityList}
              priority={data.priorityLabel}
              handleChangeLabel={priorityItem =>
                handleChangeData('priority', priorityItem.id)
              }
            />
          </Typography>
          <Typography component={'span'}>
            <TypoText component={'div'}> Hình thức giao việc </TypoText>
            <CommonControlForm
              labels={assignList}
              assign={data.assignValue}
              handleChangeAssign={assignItem =>
                handleChangeData('type_assign', assignItem.id)
              }
            />
          </Typography>
        </ContentDialog>
        <DialogFooter>
          {props.isRight ? (
            <>
              <span></span>
              <div>
                <Button autoFocus onClick={handleClose}>
                  Hủy
                </Button>
                <Button
                  onClick={updateData}
                  color="primary"
                >
                  Hoàn Thành
                </Button>
              </div>
            </>
          ) : (
              <>
                {/* <ButtonImage
                  onClick={() => {
                    // handleClose()
                    setOpenAddModal(true);
                  }}
                >
                  <Icon
                    path={mdiAccountPlus}
                    alt="addMemberIcon"
                    size={1}
                    color={'#878a88'}
                  />{' '}
                  &nbsp;<span>(0 thành viên)</span>
                </ButtonImage> */}
                &nbsp;
                <div>
                  <Button autoFocus onClick={handleClose} style={{ color: '#222222' }} >
                    Hủy
                </Button>
                  <Button autoFocus onClick={handlePressConfirm} color="primary">
                    {isFetching && <img alt='loading' width="30px" src={spinnerGif}></img>}
                    TẠO VIỆC
              </Button>
                </div>
              </>
            )}
        </DialogFooter>
      </StyleDialog>
      {/* <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} /> */}
    </div>
  );
}

export default CreateJobModal;
