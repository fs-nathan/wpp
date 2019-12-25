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
import TimeField from 'react-simple-timefield';

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
  display: flex;
  align-items: center;
  & > * {
    &:not(:first-child) {
      margin-left: 16px;
      width: 30%;
    }
    &:first-child {
      width: 10%;
      font-size: 14px;
      color: #a5a0a0;
    }
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
  const [startTime, setStartTime] = React.useState('00:00');
  const [endTime, setEndTime] = React.useState('00:00');
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());
  const [priority, setPriority] = React.useState(0);
  const [jobHandle, setJobHandle] = React.useState(0);

  React.useEffect(() => {
    setGroupTasks([{ id: '__default__', name: 'Chưa phân loại' }, ..._groupTasks]);
    setGroupTask({ id: '__default__', name: 'Chưa phân loại' });
  }, [_groupTasks]);

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
        startTime,
        endTime,
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
        canConfirm={!errorName && !errorDescription && groupTask}
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
        {progressType < 2 && (
          <>
          <TimeBox>
            <span>Bắt đầu</span>
            {progressType < 1 && (
              <TimeField 
              value={startTime}
              onChange={(evt, time) => setStartTime(time)}
              input={
                <TextField
                  label='Thời gian' 
                  type='text'
                  variant='outlined'
                />
              }
              />
            )}
            <TextField 
              label='Ngày'
              type='date'
              variant='outlined'
              value={moment(startDate).format('YYYY-MM-DD')}
              onChange={evt => setStartDate(moment(evt.target.value).toDate())}
            />
          </TimeBox>
          <TimeBox>
            <span>Kết thúc</span>
            {progressType < 1 && (
              <TimeField 
                value={endTime}
                onChange={(evt, time) => setEndTime(time)}
                input={
                  <TextField
                    label='Thời gian' 
                    type='text'
                    variant='outlined'
                  />
                }
              />
            )}
            <TextField 
              label='Ngày'
              type='date'
              variant='outlined'
              value={moment(endDate).format('YYYY-MM-DD')}
              onChange={evt => setEndDate(moment(evt.target.value).toDate())}
            />
          </TimeBox>
          </>
        )}
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
