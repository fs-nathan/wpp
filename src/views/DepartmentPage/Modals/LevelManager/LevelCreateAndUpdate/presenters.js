import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_LEVEL, CustomEventDispose, CustomEventListener, LIST_LEVEL, UPDATE_LEVEL } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function LevelCreateAndUpdate({
  updatedLevel = null,
  open, setOpen,
  handleCreateOrUpdateLevel,
  doReloadLevel,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    if (updatedLevel) {
      setName(get(updatedLevel, 'name', ''));
      setDescription(get(updatedLevel, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedLevel]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(CREATE_LEVEL.SUCCESS, doReloadLevel);
    CustomEventListener(UPDATE_LEVEL.SUCCESS, doReloadLevel);
    CustomEventListener(CREATE_LEVEL.FAIL, fail);
    CustomEventListener(UPDATE_LEVEL.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_LEVEL.SUCCESS, doReloadLevel);
      CustomEventDispose(UPDATE_LEVEL.SUCCESS, doReloadLevel);
      CustomEventDispose(CREATE_LEVEL.FAIL, fail);
      CustomEventDispose(UPDATE_LEVEL.FAIL, fail);
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
    CustomEventListener(LIST_LEVEL.SUCCESS, success);
    CustomEventListener(LIST_LEVEL.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_LEVEL.SUCCESS, success);
      CustomEventDispose(LIST_LEVEL.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedLevel ? t('DMH.VIEW.DP.MODAL.LEVEL.U_TITLE') : t('DMH.VIEW.DP.MODAL.LEVEL.C_TITLE')}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrUpdateLevel(name, description);
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    >
      <CustomTextbox
        value={name}
        label={t('DMH.VIEW.DP.MODAL.LEVEL.NAME')}
        onChange={newName => setName(newName)}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        label={t('DMH.VIEW.DP.MODAL.LEVEL.DESC')}
        onChange={newDescription => setDescription(newDescription)}
        fullWidth
        multiline
      />
    </CustomModal>
  )
}

export default LevelCreateAndUpdate;
