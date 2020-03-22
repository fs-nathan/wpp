import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import styled from 'styled-components';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect'
import { updateCommand, } from 'actions/taskDetail/taskDetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../selectors';
import DialogWrap from 'components/DialogWrap';

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
    props.handleClose()
    props.confirmCreateCommand(tempSelectedItem)
    setParams("content", '')
  }

  function onClickUpdate() {
    props.handleClose();
    tempSelectedItem.taskId = taskId;
    dispatch(updateCommand(tempSelectedItem))
    setParams("content", '')
  }

  return (
    <DialogWrap
      title={"Chỉ đạo, quyết định"}
      isOpen={props.isOpen}
      handleClickClose={props.handleClose}
      successLabel={(props.isEditDemand) ? "Chỉnh sửa" : "Tạo mới"}
      onClickSuccess={(props.isEditDemand) ? onClickUpdate : onClickCreate}
    >
      <React.Fragment>
        <TexTitle >Chọn loại</TexTitle>
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
          placeholder="Nhập nội dung"
          variant="outlined"
          value={tempSelectedItem.content}
          onChange={e => setParams("content", e.target.value)}
        />
      </React.Fragment>
    </DialogWrap>
  )
}

export default DemandModal