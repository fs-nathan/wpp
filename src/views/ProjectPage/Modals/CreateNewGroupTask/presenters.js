import { TextField } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_GROUP_TASK, CustomEventDispose, CustomEventListener, UPDATE_GROUP_TASK } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import './style.scss';

const CustomTextField = ({ className = '', ...props }) =>
  <TextField
    className={`view_Project_CreateNewOrUpdateGroupTask_Modal___text-field ${className}`}
    {...props}
  />;

function CreateNewOrUpdateGroupTask({
  open, setOpen,
  curGroupTask,
  handleCreateOrUpdateGroupTask,
  activeLoading,
}) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription, errorDescription] = useMaxlenString('', 200);

  React.useEffect(() => {
    if (curGroupTask) {
      setName(get(curGroupTask, 'name'));
      setDescription(get(curGroupTask, 'description'));
    }
    // eslint-disable-next-line
  }, [curGroupTask]);

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setName('');
      setDescription('');
    };
    CustomEventListener(CREATE_GROUP_TASK, successClose);
    CustomEventListener(UPDATE_GROUP_TASK, successClose);
    return () => {
      CustomEventDispose(CREATE_GROUP_TASK, successClose);
      CustomEventDispose(UPDATE_GROUP_TASK, successClose);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      title={`${curGroupTask ? 'Chỉnh sửa' : 'Tạo mới'} nhóm công việc`}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateGroupTask(name, description)}
      onCancle={() => setOpen(false)}
      activeLoading={activeLoading}
      manualClose={false}
    >
      <CustomTextField
        label='Tên nhóm công việc'
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <CustomTextbox
        label='Mô tả nhóm công việc'
        value={description}
        onChange={value => setDescription(value)}
        helperText={get(errorDescription, 'message', '')}
      />
    </CustomModal>
  )
}

export default CreateNewOrUpdateGroupTask;