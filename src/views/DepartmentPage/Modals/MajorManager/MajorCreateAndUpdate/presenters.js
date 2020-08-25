import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_MAJOR, CustomEventDispose, CustomEventListener, LIST_MAJOR, UPDATE_MAJOR } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function MajorCreateAndUpdate({
  open, setOpen,
  updatedMajor = null,
  handleCreateOrUpdateMajor,
  doReloadMajor,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    if (updatedMajor) {
      setName(get(updatedMajor, 'name', ''));
      setDescription(get(updatedMajor, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedMajor]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(CREATE_MAJOR.SUCCESS, doReloadMajor);
    CustomEventListener(UPDATE_MAJOR.SUCCESS, doReloadMajor);
    CustomEventListener(CREATE_MAJOR.FAIL, fail);
    CustomEventListener(UPDATE_MAJOR.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_MAJOR.SUCCESS, doReloadMajor);
      CustomEventDispose(UPDATE_MAJOR.SUCCESS, doReloadMajor);
      CustomEventDispose(CREATE_MAJOR.FAIL, fail);
      CustomEventDispose(UPDATE_MAJOR.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_MAJOR.SUCCESS, success);
    CustomEventListener(LIST_MAJOR.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_MAJOR.SUCCESS, success);
      CustomEventDispose(LIST_MAJOR.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedMajor ? t('DMH.VIEW.DP.MODAL.MAJOR.U_TITLE') : t('DMH.VIEW.DP.MODAL.MAJOR.C_TITLE')}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrUpdateMajor(name, description);
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
      height={"mini"}
    >
      <CustomTextbox
        value={name}
        onChange={newName => setName(newName)}
        label={t('DMH.VIEW.DP.MODAL.MAJOR.NAME')}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        onChange={newDescription => setDescription(newDescription)}
        label={t('DMH.VIEW.DP.MODAL.MAJOR.DESC')}
        fullWidth
        multiline={true}
      />
    </CustomModal>
  )
}

export default MajorCreateAndUpdate;
