import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
import { useMaxlenString, useRequiredString } from '../../../../hooks';
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
}) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription, errorDescription] = useMaxlenString('', 200);

  React.useEffect(() => {
    if (curGroupTask) {
      setName(get(curGroupTask, 'name'));
      setDescription(get(curGroupTask, 'description'));
    }
  }, [curGroupTask, setName, setDescription]);

  return (
    <CustomModal
      title={`${curGroupTask ? 'Chỉnh sửa' : 'Tạo mới'} nhóm công việc`}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateGroupTask(name, description)}
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