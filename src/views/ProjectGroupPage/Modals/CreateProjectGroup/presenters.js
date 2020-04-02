import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
import { useMaxlenString, useRequiredString } from '../../../../hooks';
import './style.scss';

const LogoBox = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_Create_ProjectGroup___logo-box ${className}`}
    {...props}
  />;

function CreateProjectGroup({
  updatedProjectGroup,
  open, setOpen,
  handleCreateOrEditProjectGroup, handleOpenModal
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
  }, [updatedProjectGroup, setName, setDescription]);

  return (
    <CustomModal
      title={updatedProjectGroup ? t("DMH.VIEW.PGP.MODAL.CUPG.U_TITLE") : t("DMH.VIEW.PGP.MODAL.CUPG.C_TITLE")}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrEditProjectGroup(name, description, icon)}
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
          <ColorButton
            color='primary'
            onClick={() => handleOpenModal('LOGO', {
              doSelectIcon: icon => setIcon(icon),
            })}
          >{t("DMH.VIEW.PGP.MODAL.CUPG.LOGO_SELECT")}</ColorButton>
        </div>
        <CustomAvatar src={icon.url_full} alt='avatar' />
      </LogoBox>
    </CustomModal>
  )
}

export default CreateProjectGroup;
