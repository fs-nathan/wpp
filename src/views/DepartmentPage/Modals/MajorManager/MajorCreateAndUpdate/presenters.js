import { TextField } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import { CREATE_MAJOR, CustomEventDispose, CustomEventListener, UPDATE_MAJOR } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function MajorCreateAndUpdate({
  open, setOpen,
  updatedMajor = null,
  handleCreateOrUpdateMajor,
  activeLoading,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updatedMajor) {
      setName(get(updatedMajor, 'name', ''));
      setDescription(get(updatedMajor, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedMajor]);

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setName('');
      setDescription('');
    };
    CustomEventListener(CREATE_MAJOR, successClose);
    CustomEventListener(UPDATE_MAJOR, successClose);
    return () => {
      CustomEventDispose(CREATE_MAJOR, successClose);
      CustomEventDispose(UPDATE_MAJOR, successClose);
    }
    // eslint-disable-next-line
  }, []);


  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedMajor ? t('DMH.VIEW.DP.MODAL.MAJOR.U_TITLE') : t('DMH.VIEW.DP.MODAL.MAJOR.C_TITLE')}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateMajor(name, description)}
      onCancle={() => setOpen(false)}
      manualClose={false}
      activeLoading={activeLoading}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        label={t('DMH.VIEW.DP.MODAL.MAJOR.NAME')}
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
        onChange={evt => setDescription(evt.target.value)}
        label={t('DMH.VIEW.DP.MODAL.MAJOR.DESC')}
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

export default MajorCreateAndUpdate;
