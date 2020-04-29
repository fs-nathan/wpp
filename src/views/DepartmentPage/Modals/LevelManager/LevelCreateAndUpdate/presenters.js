import { TextField } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import { CREATE_LEVEL, CustomEventDispose, CustomEventListener, UPDATE_LEVEL } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function LevelCreateAndUpdate({
  updatedLevel = null,
  open, setOpen,
  handleCreateOrUpdateLevel,
  activeLoading,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updatedLevel) {
      setName(get(updatedLevel, 'name', ''));
      setDescription(get(updatedLevel, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedLevel]);

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setName('');
      setDescription('');
    };
    CustomEventListener(CREATE_LEVEL, successClose);
    CustomEventListener(UPDATE_LEVEL, successClose);
    return () => {
      CustomEventDispose(CREATE_LEVEL, successClose);
      CustomEventDispose(UPDATE_LEVEL, successClose);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedLevel ? t('DMH.VIEW.DP.MODAL.LEVEL.U_TITLE') : t('DMH.VIEW.DP.MODAL.LEVEL.C_TITLE')}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateLevel(name, description)}
      onCancle={() => setOpen(false)}
      manualClose={false}
      activeLoading={activeLoading}
    >
      <TextField
        value={name}
        label={t('DMH.VIEW.DP.MODAL.LEVEL.NAME')}
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
      <TextField
        value={description}
        label={t('DMH.VIEW.DP.MODAL.LEVEL.DESC')}
        onChange={evt => setDescription(evt.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
        rowsMax='4'
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorDescription, 'message', '')}
          </ColorTypo>
        }
      />
    </CustomModal>
  )
}

export default LevelCreateAndUpdate;
