import { TextField } from '@material-ui/core';
import ColorButton from 'components/ColorButton';
import ColorTypo from 'components/ColorTypo';
import CustomAvatar from 'components/CustomAvatar';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_ROOM, CustomEventDispose, CustomEventListener, UPDATE_ROOM } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  actionLoading,
}) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updateDepartment) {
      setName(get(updateDepartment, 'name', ''));
      setDescription(get(updateDepartment, 'description', ''));
      setIcon({
        url_full: get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png'),
        url_sort: get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png')
          .replace('https://storage.googleapis.com', ''),
      });
    }
    // eslint-disable-next-line
  }, [updateDepartment]);

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setName('');
      setDescription('');
      setIcon({
        url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
        url_sort: '/storage_vtask_net/Icon_default/bt0.png',
      });
    };
    CustomEventListener(CREATE_ROOM, successClose);
    CustomEventListener(UPDATE_ROOM, successClose);
    return () => {
      CustomEventDispose(CREATE_ROOM, successClose);
      CustomEventDispose(UPDATE_ROOM, successClose);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <CustomModal
        title={updateDepartment ? t('DMH.VIEW.DP.MODAL.CUDP.U_TITLE') : t('DMH.VIEW.DP.MODAL.CUDP.C_TITLE')}
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleCreateOrUpdateRoom(name, description, icon)}
        canConfirm={!errorName && !errorDescription}
        onCancle={() => setOpen(false)}
        manualClose={false}
        actionLoading={true}
      >
        <TextField
          value={name}
          onChange={evt => setName(evt.target.value)}
          margin="normal"
          variant="outlined"
          label={t('DMH.VIEW.DP.MODAL.CUDP.NAME')}
          fullWidth
          helperText={
            <ColorTypo variant='caption' color='red'>
              {get(errorName, 'message', '')}
            </ColorTypo>
          }
        />
        <CustomTextbox
          value={description}
          label={t('DMH.VIEW.DP.MODAL.CUDP.DESC')}
          onChange={editorState => setDescription(editorState)}
          helperText={get(errorDescription, 'message', '')}
        />
        <LogoBox>
          <div>
            <ColorTypo>{t('DMH.VIEW.DP.MODAL.CUDP.LOGO')}</ColorTypo>
            <ColorButton
              color='primary'
              onClick={() => handleOpenModal('LOGO', {
                doSelectIcon: icon => setIcon(icon),
              })}
            >{t('DMH.VIEW.DP.MODAL.CUDP.LOGO_SELECT')}</ColorButton>
          </div>
          <CustomAvatar src={icon.url_full} alt='avatar' />
        </LogoBox>
      </CustomModal>
    </React.Fragment>
  )
};

export default CreateAndUpdateDepartment;
