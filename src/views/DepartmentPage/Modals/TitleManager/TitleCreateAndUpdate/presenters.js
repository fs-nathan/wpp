import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { useMaxlenString, useRequiredString } from '../../../../../hooks';

function TitleManager({
  open, setOpen,
  updatedPosition = null,
  handleCreateOrUpdatePosition
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updatedPosition) {
      setName(get(updatedPosition, 'name', ''));
      setDescription(get(updatedPosition, 'description', ''));
    }
  }, [updatedPosition, setName, setDescription]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedPosition ? t('DMH.VIEW.DP.MODAL.TITLE.U_TITLE') : t('DMH.VIEW.DP.MODAL.TITLE.C_TITLE')}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdatePosition(name, description)}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label={t('DMH.VIEW.DP.MODAL.TITLE.NAME')}
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
        margin="normal"
        variant="outlined"
        label={t('DMH.VIEW.DP.MODAL.TITLE.DESC')}
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

export default TitleManager;
