import { useTranslation } from 'react-i18next';
import { TextField, Typography } from '@material-ui/core';
import { updateCommand } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { taskIdSelector } from '../../selectors';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect';

const TexTitle = styled(Typography)`
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 0;
`

const Text = styled(TextField)`
  & > label {
      font-size: 14px;
      z-index: 0
  }
`

const selector = [
  { label: 'Chỉ đạo', value: 1 },
  { label: 'Quyết định', value: 0 }
]

const DemandModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const [tempSelectedItem, setTempSelectedItem] = React.useState({ task_id: props.taskId, content: "", type: -1 })

  React.useEffect(() => {
    setTempSelectedItem(props.item)
  }, [props.item])

  const setParams = (nameParam, value) => {
    setTempSelectedItem({ ...tempSelectedItem, [nameParam]: value })
  }

  function onClickCreate() {
    props.setOpen(false)
    props.confirmCreateCommand(tempSelectedItem)
    setParams("content", '')
  }

  function onClickUpdate() {
    props.setOpen(false);
    tempSelectedItem.taskId = taskId;
    dispatch(updateCommand(tempSelectedItem))
    setParams("content", '')
  }
  function validate() {
    return tempSelectedItem.content && tempSelectedItem.type !== -1
  }
  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_CHI_DAO_QUYET_DINH')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => (props.isEditDemand) ? "Chỉnh sửa" : "Tạo mới"}
      onConfirm={(props.isEditDemand) ? onClickUpdate : onClickCreate}
      canConfirm={validate()}
    >
      <React.Fragment>
        <TexTitle >{t('LABEL_CHAT_TASK_CHON_LOAI')}</TexTitle>
        <OutlinedInputSelect
          selectedIndex={tempSelectedItem.type}
          setOptions={typeId => setParams("type", typeId)}
          commandSelect={selector}
        />
        <Text
          label="Nội dung"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
          variant="outlined"
          value={tempSelectedItem.content}
          onChange={e => setParams("content", e.target.value)}
        />
      </React.Fragment>
    </JobDetailModalWrap>
  )
}

export default DemandModal