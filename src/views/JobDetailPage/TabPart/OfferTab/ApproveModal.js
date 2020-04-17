import { InputBase, TextField, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import colorPal from 'helpers/colorPalette';
import React from 'react';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';

const TexTitle = styled(Typography)`
  font-size: 14px;
  color: ${colorPal['gray'][0]}
  margin-bottom: 20px;
  margin-left: 0;
`
const InputText = styled(InputBase)`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 30px;
`

const ApproveModal = (props) => {
  const DEFAULT_VALUE = {
    offer_id: props.offer.id,
    content: "Đồng ý phê duyệt",
    status: 1
  }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(DEFAULT_VALUE)
  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }
  const onClickApprove = () => {
    props.setOpen(false)
    props.handleOfferById({ data: tempSelectedItem, taskId: props.taskId })
  }
  return (
    <JobDetailModalWrap
      title={"Phê duyệt đề xuất"}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => "Phê duyệt"}
      onConfirm={onClickApprove}
      canConfirm={true}
      className="approveOfferModal"
    >
      <DialogContent dividers>
        <TexTitle >Nội dung công việc </TexTitle>
        <InputText
          inputProps={{ 'aria-label': 'naked' }}
          value={'Xin phê duyệt chi phí tiếp khách'}
          fullWidth
        />
        <TextField
          label="Nội dung phê duyệt"
          fullWidth
          multiline
          rows="7"
          value={tempSelectedItem.content}
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          onChange={e => setParams("content", e.target.value)}
        />
      </DialogContent>
    </JobDetailModalWrap>
  )
}

export default ApproveModal;