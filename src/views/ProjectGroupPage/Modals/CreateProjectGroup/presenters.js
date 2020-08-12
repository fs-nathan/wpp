import CustomAvatar from 'components/CustomAvatar';
import CustomModal, { Title } from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import UploadButton from 'components/UploadButton';
import { CREATE_PROJECT_GROUP, CustomEventDispose, CustomEventListener, DETAIL_PROJECT_GROUP, EDIT_PROJECT_GROUP, LIST_PROJECT_GROUP } from 'constants/events.js';
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

function CreateProjectGroup({
  updatedProjectGroup,
  open, setOpen,
  handleCreateOrEditProjectGroup, handleOpenModal,
  doReloadDetail,
  doReloadList,
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription] = useMaxlenString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });
  const [activeLoading, setActiveLoading] = React.useState(false);

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
    const fail = () => {
      setActiveLoading(false);
    };
    if (updatedProjectGroup) {
      CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, doReloadDetail);
      CustomEventListener(EDIT_PROJECT_GROUP.FAIL, fail);
    }
    else {
      CustomEventListener(CREATE_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventListener(CREATE_PROJECT_GROUP.FAIL, fail);
    }
    return () => {
      if (updatedProjectGroup) {
        CustomEventDispose(EDIT_PROJECT_GROUP.SUCCESS, doReloadDetail);
        CustomEventDispose(EDIT_PROJECT_GROUP.FAIL, fail);
      }
      else {
        CustomEventDispose(CREATE_PROJECT_GROUP.SUCCESS, doReloadList);
        CustomEventDispose(CREATE_PROJECT_GROUP.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    if (updatedProjectGroup) {
      CustomEventListener(DETAIL_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventListener(DETAIL_PROJECT_GROUP.FAIL, fail);
    }
    return () => {
      if (updatedProjectGroup) {
        CustomEventDispose(DETAIL_PROJECT_GROUP.SUCCESS, doReloadList);
        CustomEventDispose(DETAIL_PROJECT_GROUP.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
      setIcon({
        url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
        url_sort: '/storage_vtask_net/Icon_default/bt0.png',
      });
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT_GROUP.SUCCESS, success);
    CustomEventListener(LIST_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT_GROUP.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT_GROUP.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      title={updatedProjectGroup ? t("DMH.VIEW.PGP.MODAL.CUPG.U_TITLE") : t("DMH.VIEW.PGP.MODAL.CUPG.C_TITLE")}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrEditProjectGroup(name, description, icon);
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      activeLoading={activeLoading}
      manualClose={true}
      height={"mini"}
    >
      <CustomTextbox
        value={name}
        onChange={value => setName(value)}
        label={t("DMH.VIEW.PGP.MODAL.CUPG.NAME")}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        label={t("DMH.VIEW.PGP.MODAL.CUPG.DESC")}
        onChange={value => setDescription(value)}
        fullWidth
        multiline={true}
      />
      <LogoBox>
        <div>
          <Title>{t("DMH.VIEW.PGP.MODAL.CUPG.LOGO")}</Title>
          <UploadButton
            label={t('DMH.VIEW.PGP.MODAL.CUPG.LOGO_SELECT')}
            onClick={() => handleOpenModal('LOGO', {
              doSelectIcon: icon => setIcon(icon),
            })}
          />
        </div>
        <CustomAvatar src={icon.url_full} alt='avatar' />
      </LogoBox>
    </CustomModal>
  )
}

export default CreateProjectGroup;
