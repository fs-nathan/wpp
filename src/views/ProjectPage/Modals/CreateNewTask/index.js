import React from 'react';
import styled from 'styled-components';
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

const CustomTextField = styled(TextField)`
  & > label {
    z-index: 0;
  }
`;

const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
  margin-bottom: 8px;
  && {
    color: #a5a0a0;
  }
`;

const TimeBox = styled.div`
  margin-bottom: 16px;
  width: 100%;
  & > div {
    &:not(:first-child) {
      margin-top: 8px;
    }
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & > p > span {
    color: #dc3545;
  }
`;

const StyledRadioGroup = styled(RadioGroup)`
  flex-direction: row;
`;

const CustomRadioGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 8px;
`;

const CustomRadio = styled(({ checked = false, ...rest }) => <span {...rest} />)`
  font-size: 14px;
  width: 25%;
  border-radius: 999px;
  text-align: center;
  padding: 8px;
  background-color: ${props => props.checked ? '#48bb78' : 'rgba(224, 224, 224, 1)'};
  &:hover {
    cursor: pointer;
  }
`;

function CreateNewTask({ open, setOpen, listGroupTask, doCreateTask, }) {

  const { projectId } = useParams();
  const { data: { groupTasks: _groupTasks }, } = listGroupTask;

  const [groupTasks, setGroupTasks] = React.useState([]);
  const [groupTask, setGroupTask] = React.useState(null);
  const [name, setName, errorName] = useRequiredString('', 100);
  const [progressType, setProgressType] = React.useState(0); 
  const [description, setDescription, errorDescription] = useRequiredString('', 200);
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());
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
    setStartDate(moment().toDate());
    setEndDate(moment().toDate());
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
        canConfirm={!errorName && !errorDescription && !errorDate && groupTask}
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
          helperText={
            <ColorTypo variant='caption' color='red'>
              {get(errorDescription, 'message', '')}
            </ColorTypo>
          } 
        />
        <FormControl component="fieldset" fullWidth>
          <StyledFormLabel component="legend">Tiến độ công việc</StyledFormLabel>
          <StyledRadioGroup aria-label="x" name="x1" value={progressType} onChange={evt => setProgressType(parseInt(evt.target.value))}>
            <FormControlLabel value={0} control={<Radio color="primary" />} label="Ngày và giờ (mặc định)" />
            <FormControlLabel value={1} control={<Radio color="primary" />} label="Chỉ nhập ngày" />
            <FormControlLabel value={2} control={<Radio color="primary" />} label="Không yêu cầu" />
          </StyledRadioGroup>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimeBox>
          {progressType === 0 && (
            <>
            <div>
              <KeyboardTimePicker 
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                ampm={false}
                label="Thời gian bắt đầu"
                value={startDate}
                onChange={setStartDate}
                format="HH:mm"
              />
              <KeyboardDatePicker 
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                ampm={false}
                label="Ngày bắt đầu"
                value={startDate}
                onChange={setStartDate}
                format="dd/MM/yyyy"
              />
            </div>
            <div>
              <KeyboardTimePicker 
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                ampm={false}
                label="Thời gian kết thúc"
                value={endDate}
                onChange={setEndDate}
                format="HH:mm"
              />
              <KeyboardDatePicker 
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                ampm={false}
                label="Ngày kết thúc"
                value={endDate}
                onChange={setEndDate}
                format="dd/MM/yyyy"
              />
            </div>
            </>
          )}
          {progressType === 1 && (
            <>
            <div>
              <KeyboardDatePicker 
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                ampm={false}
                label="Ngày bắt đầu"
                value={startDate}
                onChange={setStartDate}
                format="dd/MM/yyyy"
              />
            </div>
            <div>
              <KeyboardDatePicker 
                disableToolbar
                inputVariant="outlined"
                variant="inline"
                ampm={false}
                label="Ngày kết thúc"
                value={endDate}
                onChange={setEndDate}
                format="dd/MM/yyyy"
              />
            </div>
            </>
          )}
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
