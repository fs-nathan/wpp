import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { useMaxlenString, useRequiredString } from '../../../../../hooks';

function MajorCreateAndUpdate({
  open, setOpen,
  updatedMajor = null,
  handleCreateOrUpdateMajor,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updatedMajor) {
      setName(get(updatedMajor, 'name', ''));
      setDescription(get(updatedMajor, 'description', ''));
    }
  }, [updatedMajor, setName, setDescription]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedMajor ? t('DMH.VIEW.DP.MODAL.MAJOR.U_TITLE') : t('DMH.VIEW.DP.MODAL.MAJOR.C_TITLE')}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateMajor(name, description)}
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
