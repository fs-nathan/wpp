import { TextField } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import DialogWrap from 'components/DialogWrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

function AddRoleModal(props) {
  const { t } = useTranslation();
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const handleClose = () => {
    props.setOpen(false)
  }

  const handleSubmit = () => {
    // Call compatible API depends on modal 
    if (props.isEditRole) {
      props.addData(name, description)
      handleClose()
    } else {
      props.editData(props.valueId, name, description)
      handleClose()
    }
  }

  React.useEffect(() => {
    setName(props.valueName)
    setDescription(props.valueDes)
  }, [props.valueName, props.valueDes])

  return (
    <DialogWrap
      title={props.isEditRole ? t('LABEL_CHAT_TASK_CHINH_SUA_VAI_TRO') : t('LABEL_CHAT_TASK_TAO_VAI_TRO')}
      isOpen={props.isOpen}
      handleClickClose={handleClose}
      successLabel={t('IDS_WP_UPDATE')}
      onClickSuccess={handleSubmit}
      className="AddRoleModal"
    >
      <>
        <TextField
          value={name}
          margin="normal"
          variant="outlined"
          label='Tên vai trò'
          onChange={(e) => setName(e.target.value)}
          fullWidth
          helperText={
            !name && <ColorTypo variant='caption' color='red'>{t('LABEL_CHAT_TASK_KHONG_DUOC_DE_TRONG')}</ColorTypo>
          }
        />
        <TextField
          value={description}
          margin="normal"
          variant="outlined"
          label='Mô tả vai trò'
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          helperText={
            !description && <ColorTypo variant='caption' color='red'>{t('LABEL_CHAT_TASK_KHONG_DUOC_DE_TRONG')}</ColorTypo>
          }
        />
      </>
    </DialogWrap>
  )
}

export default AddRoleModal;
