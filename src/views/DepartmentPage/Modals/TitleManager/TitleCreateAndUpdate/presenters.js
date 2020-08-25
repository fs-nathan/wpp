import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_POSITION, CustomEventDispose, CustomEventListener, LIST_POSITION, UPDATE_POSITION } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function TitleManager({
  open, setOpen,
  updatedPosition = null,
  handleCreateOrUpdatePosition,
  doReloadPosition,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    if (updatedPosition) {
      setName(get(updatedPosition, 'name', ''));
      setDescription(get(updatedPosition, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedPosition]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(CREATE_POSITION.SUCCESS, doReloadPosition);
    CustomEventListener(UPDATE_POSITION.SUCCESS, doReloadPosition);
    CustomEventListener(CREATE_POSITION.FAIL, fail);
    CustomEventListener(UPDATE_POSITION.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_POSITION.SUCCESS, doReloadPosition);
      CustomEventDispose(UPDATE_POSITION.SUCCESS, doReloadPosition);
      CustomEventDispose(CREATE_POSITION.FAIL, fail);
      CustomEventDispose(UPDATE_POSITION.FAIL, fail);
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
    CustomEventListener(LIST_POSITION.SUCCESS, success);
    CustomEventListener(LIST_POSITION.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_POSITION.SUCCESS, success);
      CustomEventDispose(LIST_POSITION.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedPosition ? t('DMH.VIEW.DP.MODAL.TITLE.U_TITLE') : t('DMH.VIEW.DP.MODAL.TITLE.C_TITLE')}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrUpdatePosition(name, description);
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    >
      <CustomTextbox
        value={name}
        onChange={newName => setName(newName)}
        label={t('DMH.VIEW.DP.MODAL.TITLE.NAME')}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        onChange={newDescription => setDescription(newDescription)}
        label={t('DMH.VIEW.DP.MODAL.TITLE.DESC')}
        fullWidth
        multiline={true}
      />
    </CustomModal>
  )
}

export default TitleManager;
