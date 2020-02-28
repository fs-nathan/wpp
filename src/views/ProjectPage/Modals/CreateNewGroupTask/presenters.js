import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import { get } from 'lodash';
import { useRequiredString, useMaxlenString } from '../../../../hooks';
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
  const [description, setDescription] = useMaxlenString('', 200);

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
      canConfirm={!errorName}
      onConfirm={() => handleCreateOrUpdateGroupTask(name, description)}
    >
      <CustomTextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên nhóm công việc'
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
        label='Mô tả nhóm công việc'
        fullWidth
        multiline
        rowsMax='4'
      />
    </CustomModal>
  )
}

export default CreateNewOrUpdateGroupTask;