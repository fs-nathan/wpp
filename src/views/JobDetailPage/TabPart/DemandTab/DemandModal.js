import { TextField } from '@material-ui/core';
import { updateCommand } from 'actions/taskDetail/taskDetailActions';
import TitleSectionModal from 'components/TitleSectionModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { taskIdSelector } from '../../selectors';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect';
import './styles.scss';

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
  const isFetching = useSelector(state => state.taskDetail.taskCommand.isFetching)
  const error = useSelector(state => state.taskDetail.taskCommand.error)

  React.useEffect(() => {
    setTempSelectedItem(props.item)
  }, [props.item])

  React.useEffect(() => {
    if (!isFetching && !error)
      props.setOpen(false);
    // eslint-disable-next-line
  }, [isFetching, error])

  const setParams = (nameParam, value) => {
    setTempSelectedItem({ ...tempSelectedItem, [nameParam]: value })
  }

  function onClickCreate() {
    // props.setOpen(false)
    props.confirmCreateCommand(tempSelectedItem)
    setParams("content", '')
  }

  function onClickUpdate() {
    // props.setOpen(false);
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
      confirmRender={() => (props.isEditDemand) ? t('LABEL_CHAT_TASK_CHINH_SUA') : t('IDS_WP_CREATE_NEW')}
      onConfirm={(props.isEditDemand) ? onClickUpdate : onClickCreate}
      canConfirm={validate()}
      actionLoading={isFetching}
      manualClose
      onCancle={() => props.setOpen(false)}
      className="DemandModal modal_height_50vh"
    >
      <React.Fragment>
        <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_LOAI')} isRequired />
        <OutlinedInputSelect
          selectedIndex={tempSelectedItem.type}
          setOptions={typeId => setParams("type", typeId)}
          commandSelect={selector}
        />
        <TitleSectionModal
          label={tempSelectedItem.type === selector[0].value ?
            t('LABEL_CHAT_TASK_NOI_DUNG_CHI_DAO')
            : t('LABEL_CHAT_TASK_NOI_DUNG_QUYET_DINH')
          }
          isRequired />
        <Text
          fullWidth
          multiline
          rows="7"
          rowsMax={18}
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