import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox, { getEditorData } from '../../../../components/CustomTextbox';
import { useRequiredString, useTextboxString } from '../../../../hooks';
import './style.scss';

const LogoBox = ({ className = '', ...props }) =>
  <div
    className={`view_Department_Create_Modal___logo-box ${className}`}
    {...props}
  />;

function CreateAndUpdateDepartment({
  updateDepartment = null,
  open, setOpen,
  handleCreateOrUpdateRoom,
  handleOpenModal,
}) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription, errorDescription, rawDescription] = useTextboxString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });

  React.useEffect(() => {
    if (updateDepartment) {
      setName(get(updateDepartment, 'name', ''));
      setDescription(getEditorData(get(updateDepartment, 'description', '')));
      setIcon({
        url_full: get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png'),
        url_sort: get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png')
          .replace('https://storage.googleapis.com', ''),
      });
    }
  }, [updateDepartment, setName, setDescription]);

  return (
    <React.Fragment>
      <CustomModal
        title={`${updateDepartment ? 'Cập nhật' : 'Tạo'} bộ phận`}
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleCreateOrUpdateRoom(name, rawDescription, icon)}
        canConfirm={!errorName && !errorDescription}
      >
        <ColorTypo>Tên bộ phận</ColorTypo>
        <TextField
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
        <ColorTypo>Mô tả bộ phận</ColorTypo>
        <CustomTextbox
          value={description}
          onChange={editorState => setDescription(editorState)}
          helperText={get(errorDescription, 'message', '')}
        />
        <LogoBox>
          <div>
            <ColorTypo>Biểu tượng</ColorTypo>
            <ColorButton
              color='primary'
              onClick={() => handleOpenModal('LOGO', {
                doSelectIcon: icon => setIcon(icon),
              })}
            >+ Chọn biểu tượng</ColorButton>
          </div>
          <CustomAvatar src={icon.url_full} alt='avatar' />
        </LogoBox>
      </CustomModal>
    </React.Fragment>
  )
};

export default CreateAndUpdateDepartment;
