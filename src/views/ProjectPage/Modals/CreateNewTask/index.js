import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  TextField, FormControl, FormControlLabel, RadioGroup, 
  Radio, FormLabel,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import CustomSelect from '../../../../components/CustomSelect';
import { createTask } from '../../../../actions/task/createTask';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { useRequiredString } from '../../../../hooks';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './style.scss';

const CustomTextField = ({ className = '', ...props }) => 
  <TextField 
    className={`view_Project_CreateNewTask_Modal___text-field ${className}`}
    {...props}
  />;

const StyledFormLabel = ({ className = '', ...props }) => 
  <FormLabel 
    className={`view_Project_CreateNewTask_Modal___form-label ${className}`}
    {...props}
  />;

const TimeBox = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_CreateNewTask_Modal___time-box ${className}`}
    {...props}
  />;

const StyledRadioGroup = ({ className = '', ...props }) => 
  <RadioGroup 
    className={`view_Project_CreateNewTask_Modal___radio-group ${className}`}
    {...props}
  />;

const CustomRadioGroup = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_CreateNewTask_Modal___custom-radio-group ${className}`}
    {...props}
  />;

const CustomRadio = ({ className = '', checked, ...props }) => 
  <span 
    className={`${checked 
      ? 'view_Project_CreateNewTask_Modal___custom-radio-checked'
      : 'view_Project_CreateNewTask_Modal___custom-radio'} ${className}`}
    {...props}
  />;

const DateWrapper = ({ className = '', progressType, ...props }) =>
  <div
    className={`view_Project_CreateNewTask_Modal___date-wrapper-${progressType} ${className}`}
    {...props}
  />

const ProgressTitleSpan = ({ className = '', ...props }) => 
  <span 
    className={`view_Project_CreateNewTask_Modal___progress-title-span ${className}`}
    {...props}
  />;

function CreateNewTask({ open, setOpen, listGroupTask, doCreateTask, }) {

  const { projectId } = useParams();
  const { data: { groupTasks: _groupTasks }, } = listGroupTask;

  const [groupTasks, setGroupTasks] = React.useState([]);
  const [groupTask, setGroupTask] = React.useState(null);
  const [name, setName, errorName] = useRequiredString('', 100);
  const [progressType, setProgressType] = React.useState(0); 
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState(moment().set({ hours: 8, minutes: 0, seconds: 0 }).toDate());
  const [endDate, setEndDate] = React.useState(moment().set({ hours: 17, minutes: 0, seconds: 0 }).toDate());
  const [errorDate, setErrorDate] = React.useState(null);
  const [priority, setPriority] = React.useState(0);
  const [jobHandle, setJobHandle] = React.useState(0);

  React.useEffect(() => {
    setGroupTasks([{ id: '__default__', name: 'Chưa phân loại' }, ..._groupTasks]);
    setGroupTask({ id: '__default__', name: 'Chưa phân loại' });
  }, [_groupTasks]);

  React.useEffect(() => {
    if (moment(startDate).isAfter(moment(endDate))) {
      setErrorDate(new Error('Tiến độ không hợp lệ'));
    } else {
      setErrorDate(null);
    }
  }, [startDate, endDate]);

  React.useEffect(() => { 
    setStartDate(moment().set({ hours: 8, minutes: 0, seconds: 0 }).toDate());
    setEndDate(moment().set({ hours: 17, minutes: 0, seconds: 0 }).toDate());
  }, [progressType]);

  function handleCreateTask() {
    let options = {
      name,
      projectId,
      description,
      priority,
      typeAssign: jobHandle,
    };
    if (get(groupTask, 'id') !== '__default__') {
      options = {
        ...options,
        groupTask: get(groupTask, 'id'),
      }
    }
    if (progressType < 2) {
      options = {
        ...options,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      }
    }
    if (progressType < 1) {
      options = {
        ...options,
        startTime: moment(startDate).format('HH:mm'),
        endTime: moment(endDate).format('HH:mm'),
      }
    }
    doCreateTask(options);
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Tạo mới công việc`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName && !errorDate && groupTask}
        onConfirm={() => handleCreateTask()}
      >
        <FormControl component="fieldset" fullWidth>
          <StyledFormLabel component="legend">Nhóm công việc</StyledFormLabel>
          <CustomSelect
            options={
              groupTasks.map(groupTask => ({
                  value: get(groupTask, 'id'),
                  label: get(groupTask, 'name', ''),
                })
              )}
            value={{
              value: get(groupTask, 'id'),
              label: get(groupTask, 'name', ''),
            }}
            onChange={({ value: groupTaskId }) => setGroupTask(find(groupTasks, { id: groupTaskId }))}
          />
        </FormControl>
        <CustomTextField
          value={name}
          onChange={evt => setName(evt.target.value)}
          margin="normal"
          variant="outlined"
          label='Tên công việc'
          fullWidth
          helperText={
            <ColorTypo variant='caption' color='red'>
              {get(errorName, 'message', '')}
            </ColorTypo>
          }
        />
        <CustomTextField
          value={description}
          onChange={evt => setDescription(evt.target.value)}
          margin="normal"
          variant="outlined"
          label='Mô tả công việc'
          fullWidth
          multiline
          rowsMax='4'
        />
        <FormControl component="fieldset" fullWidth>
          <ProgressTitleSpan>
            <StyledFormLabel component="legend">Tiến độ công việc</StyledFormLabel>
            <span>Cài đặt</span>
          </ProgressTitleSpan>
          <StyledRadioGroup aria-label="x" name="x1" value={progressType} onChange={evt => setProgressType(parseInt(evt.target.value))}>
            <FormControlLabel value={0} control={<Radio color="primary" />} label="Ngày và giờ (mặc định)" />
            <FormControlLabel value={1} control={<Radio color="primary" />} label="Chỉ nhập ngày" />
            <FormControlLabel value={2} control={<Radio color="primary" />} label="Không yêu cầu" />
          </StyledRadioGroup>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimeBox>
            <DateWrapper progressType={progressType}>
              {progressType < 2 ? <span>Ngày bắt đầu</span> : null}
              {progressType < 1 ? (
                <KeyboardTimePicker 
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  value={startDate}
                  onChange={setStartDate}
                  format="HH:mm"
                />
              ) : null}
              {progressType < 2 ? (
                <KeyboardDatePicker 
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  value={startDate}
                  onChange={setStartDate}
                  format="dd/MM/yyyy"
                />
              ) : null}
            </DateWrapper>
            <DateWrapper progressType={progressType}>
              {progressType < 2 ? <span>Ngày kết thúc</span> : null}
              {progressType < 1 ? (
                <KeyboardTimePicker 
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  value={endDate}
                  onChange={setEndDate}
                  format="HH:mm"
                />
              ) : null}
              {progressType < 2 ? (
                <KeyboardDatePicker 
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  value={endDate}
                  onChange={setEndDate}
                  format="dd/MM/yyyy"
                />
              ) : null}
            </DateWrapper>
            {errorDate && (
              <p className={'MuiFormHelperText-root MuiFormHelperText-contained'}>
                <span className={'MuiTypography-root MuiTypography-caption'}>
                  {get(errorDate, 'message', '')}
                </span>
              </p>
            )}
          </TimeBox>
        </MuiPickersUtilsProvider>
        <FormControl component="fieldset" fullWidth>
          <StyledFormLabel component="legend">Mức độ ưu tiên</StyledFormLabel>
          <CustomRadioGroup>
            {['Thấp', 'Trung bình', 'Cao'].map((value, index) => (
              <CustomRadio
                key={index} 
                checked={priority === index}
                onClick={evt => setPriority(index)}
              >{value}</CustomRadio>  
            ))}
          </CustomRadioGroup>
        </FormControl>
        <FormControl component="fieldset" fullWidth>
          <StyledFormLabel component="legend">Hình thức giao việc</StyledFormLabel>
          <StyledRadioGroup aria-label="y" name="y1" value={jobHandle} onChange={evt => setJobHandle(parseInt(evt.target.value))}>
            <FormControlLabel value={0} control={<Radio color="primary" />} label="Được giao" />
            <FormControlLabel value={1} control={<Radio color="primary" />} label="Tự đề xuất" />
            <FormControlLabel value={2} control={<Radio color="primary" />} label="Giao việc cho" />
          </StyledRadioGroup>
        </FormControl>
      </CustomModal>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listGroupTask: state.groupTask.listGroupTask,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateTask: ({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, }) => dispatch(createTask({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewTask);
