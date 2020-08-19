import CustomAvatar from 'components/CustomAvatar';
import CustomModal, { Title } from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import UploadButton from 'components/UploadButton';
import { CREATE_ROOM, CustomEventDispose, CustomEventListener, DETAIL_ROOM, GET_USER_OF_ROOM, LIST_ROOM, LIST_USER_OF_GROUP, UPDATE_ROOM } from 'constants/events';
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
  doReloadRoom,
}) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription] = useMaxlenString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(3);

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      setName('');
      setDescription('');
      setIcon({
        url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
        url_sort: '/storage_vtask_net/Icon_default/bt0.png',
      });
    }
    // eslint-disable-next-line
  }, [activeMask]);

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
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(CREATE_ROOM.SUCCESS, doReloadRoom);
    CustomEventListener(UPDATE_ROOM.SUCCESS, doReloadRoom);
    CustomEventListener(CREATE_ROOM.FAIL, fail);
    CustomEventListener(UPDATE_ROOM.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_ROOM.SUCCESS, doReloadRoom);
      CustomEventDispose(UPDATE_ROOM.SUCCESS, doReloadRoom);
      CustomEventDispose(CREATE_ROOM.FAIL, fail);
      CustomEventDispose(UPDATE_ROOM.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [updateDepartment]);

  React.useEffect(() => {
    const success = (bit) => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    if (updateDepartment) {
      CustomEventListener(DETAIL_ROOM.SUCCESS, success(0));
      CustomEventListener(GET_USER_OF_ROOM.SUCCESS, success(1));
      CustomEventListener(DETAIL_ROOM.FAIL, fail);
      CustomEventListener(GET_USER_OF_ROOM.FAIL, fail);
    } else {
      CustomEventListener(LIST_ROOM.SUCCESS, success(0));
      CustomEventListener(LIST_USER_OF_GROUP.SUCCESS, success(1));
      CustomEventListener(LIST_ROOM.FAIL, fail);
      CustomEventListener(LIST_USER_OF_GROUP.FAIL, fail);
    }
    return () => {
      if (updateDepartment) {
        CustomEventDispose(DETAIL_ROOM.SUCCESS, success(0));
        CustomEventDispose(GET_USER_OF_ROOM.SUCCESS, success(1));
        CustomEventDispose(DETAIL_ROOM.FAIL, fail);
        CustomEventDispose(GET_USER_OF_ROOM.FAIL, fail);
      } else {
        CustomEventDispose(LIST_ROOM.SUCCESS, success(0));
        CustomEventDispose(LIST_USER_OF_GROUP.SUCCESS, success(1));
        CustomEventDispose(LIST_ROOM.FAIL, fail);
        CustomEventDispose(LIST_USER_OF_GROUP.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [updateDepartment]);

  return (
    <React.Fragment>
      <CustomModal
        title={updateDepartment ? t('DMH.VIEW.DP.MODAL.CUDP.U_TITLE') : t('DMH.VIEW.DP.MODAL.CUDP.C_TITLE')}
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          handleCreateOrUpdateRoom(name, description, icon);
          setActiveMask(0);
        }}
        canConfirm={!errorName}
        onCancle={() => setOpen(false)}
        manualClose={true}
        activeLoading={activeLoading}
      >
        <CustomTextbox
          value={name}
          onChange={newName => setName(newName)}
          label={t('DMH.VIEW.DP.MODAL.CUDP.NAME')}
          fullWidth
          required={true}
        />
        <CustomTextbox
          value={description}
          multiline={true}
          label={t('DMH.VIEW.DP.MODAL.CUDP.DESC')}
          onChange={newDescription => setDescription(newDescription)}
        />
        <LogoBox>
          <div>
            <Title>{t('DMH.VIEW.DP.MODAL.CUDP.LOGO')}</Title>
            <UploadButton
              label={t('DMH.VIEW.DP.MODAL.CUDP.LOGO_SELECT')}
              onClick={() => handleOpenModal('LOGO', {
                doSelectIcon: icon => setIcon(icon),
              })}
            />
          </div>
          <CustomAvatar src={icon.url_full} alt='avatar' />
        </LogoBox>
      </CustomModal>
    </React.Fragment>
  )
};

export default CreateAndUpdateDepartment;
