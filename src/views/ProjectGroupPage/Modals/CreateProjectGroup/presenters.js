import { Button, TextField } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import CustomAvatar from 'components/CustomAvatar';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_PROJECT_GROUP, CustomEventDispose, CustomEventListener, EDIT_PROJECT_GROUP } from 'constants/events.js';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const LogoBox = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_Create_ProjectGroup___logo-box ${className}`}
    {...props}
  />;

const MyButton = ({ className = '', ...props }) =>
  <Button
    className={`view_ProjectGroup_Create_ProjectGroup___button ${className}`}
    disableRipple
    disableFocusRipple
    disableTouchRipple
    {...props}
  />

function CreateProjectGroup({
  updatedProjectGroup,
  open, setOpen,
  handleCreateOrEditProjectGroup, handleOpenModal,
  activeLoading,
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });

  React.useEffect(() => {
    setName(get(updatedProjectGroup, 'name'));
    setDescription(get(updatedProjectGroup, 'description'));
    setIcon({
      url_full: get(updatedProjectGroup, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png'),
      url_sort: get(updatedProjectGroup, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png')
        .replace('https://storage.googleapis.com', ''),
    });
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

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
    CustomEventListener(CREATE_PROJECT_GROUP, successClose);
    CustomEventListener(EDIT_PROJECT_GROUP, successClose);
    return () => {
      CustomEventDispose(CREATE_PROJECT_GROUP, successClose);
      CustomEventDispose(EDIT_PROJECT_GROUP, successClose);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      title={updatedProjectGroup ? t("DMH.VIEW.PGP.MODAL.CUPG.U_TITLE") : t("DMH.VIEW.PGP.MODAL.CUPG.C_TITLE")}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrEditProjectGroup(name, description, icon)}
      onCancle={() => setOpen(false)}
      activeLoading={activeLoading}
      manualClose={true}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label={t("DMH.VIEW.PGP.MODAL.CUPG.NAME")}
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <CustomTextbox
        value={description}
        label={t("DMH.VIEW.PGP.MODAL.CUPG.DESC")}
        onChange={value => setDescription(value)}
        helperText={get(errorDescription, 'message', '')}
      />
      <LogoBox>
        <div>
          <ColorTypo>{t("DMH.VIEW.PGP.MODAL.CUPG.LOGO")}</ColorTypo>
          <MyButton
            color='primary'
            onClick={() => handleOpenModal('LOGO', {
              doSelectIcon: icon => setIcon(icon),
            })}
          >
            <span>+</span>
            <span>{t('DMH.VIEW.PGP.MODAL.CUPG.LOGO_SELECT')}</span>
          </MyButton>
        </div>
        <CustomAvatar src={icon.url_full} alt='avatar' />
      </LogoBox>
    </CustomModal>
  )
}

export default CreateProjectGroup;
