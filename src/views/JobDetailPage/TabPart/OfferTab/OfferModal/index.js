import React from 'react';
import { Button, IconButton, TextField, Typography, Avatar, Chip } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiCloudDownloadOutline, mdiPlusCircleOutline } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper'
import { uploadDocumentToOffer, deleteDocumentToOffer, createOffer, updateOffer } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';

import './styles.scss';
import OfferFile from './OfferFile';
import AddOfferMemberModal from '../AddOfferMemberModal';
import CommonPriorityForm from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonPriorityForm';
import CustomSelect from 'components/CustomSelect';

const priorityList = [
  { id: 0, value: 'Bình thường' },
  { id: 1, value: 'Gấp' },
  { id: 2, value: 'Rất gấp' }
];

const OfferModal = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const listGroupOffer = useSelector(state => state.taskDetail.listGroupOffer.offers);

  const [tempSelectedItem, setTempSelectedItem] = React.useState(DEFAULT_OFFER_ITEM)
  const [handlers, setHandlers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [isOpenAddHandler, setOpenAddHandler] = React.useState(false);
  const [isOpenAddMonitor, setOpenAddMonitor] = React.useState(false);

  React.useEffect(() => {
    if (props.item)
      setTempSelectedItem(props.item)
  }, [props.item])

  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }

  const handleUploadFileUpdate = files => {
    // console.log("files:", files);

    // For update
    if (!files.length) return
    let payload = new FormData()
    // Add offer id to form data
    payload.append("offer_id", tempSelectedItem.offer_id)
    // console.log('tempSelectItem::::', tempSelectedItem.offer_id);

    // Add each file to form data
    for (let i = 0; i < files.length; i++) {
      payload.append("file", files[i], files[i].name)
    }
    // Build a callback that allow saga append new file to state array
    let appendFileCallBack = responseFiles => {
      setParams("files", [...tempSelectedItem.files, ...responseFiles])
    }
    // Call api
    dispatch(uploadDocumentToOffer(payload, appendFileCallBack, taskId))
  }

  const handleDeleteFile = fileId => {
    let payload = { offer_id: tempSelectedItem.offer_id, file_id: fileId }
    // Build a callback that allow saga remove file in state array
    let removeFileCallBack = () => {
      setParams("files", tempSelectedItem.files.filter(file => file.id !== fileId))
    }
    // Call api
    dispatch(deleteDocumentToOffer(payload, removeFileCallBack, taskId))
  }

  const handleUploadFileAdd = files => {
    setParams("files", [...tempSelectedItem.files, ...files])
  }

  const handleCreateOffer = () => {
    let dataCreateOfferFormData = new FormData()
    // add content and task id to form data
    dataCreateOfferFormData.append('content', tempSelectedItem.content)
    dataCreateOfferFormData.append('task_id', taskId)
    // add each user to formdata
    for (let i = 0; i < tempSelectedItem.user_hander.length; i++) {
      dataCreateOfferFormData.append("user_hander[" + i + "]", tempSelectedItem.user_hander[i])
    }
    // add each file to formdata  
    for (let i = 0; i < tempSelectedItem.files.length; i++) {
      dataCreateOfferFormData.append("file", tempSelectedItem.files[i], tempSelectedItem.files[i].name)
    }
    dispatch(createOffer({ data: dataCreateOfferFormData, taskId }))
    setParams("files", [])
  }

  function onClickCreateOffer() {
    props.handleClickClose()
    if (tempSelectedItem.content)
      handleCreateOffer()
    setParams("content", '')
  }

  function onClickUpdateOffer() {
    props.handleClickClose()
    if (tempSelectedItem.content) {
      dispatch(updateOffer({ offerId: tempSelectedItem.offer_id, content: tempSelectedItem.content, taskId }))
    }
    setParams("content", '')
  }

  function handleDeleteHandler(i) {
    return () => {
      handlers.splice(i, 1)
      setHandlers([...handlers]);
    }
  }

  function openAddHandlersDialog() {
    setOpenAddHandler(true)
  }

  function closeAddHandlersDialog() {
    setOpenAddHandler(false)
  }

  function openAddMonitorsDialog() {
    setOpenAddMonitor(true)
  }

  function closeAddMonitorsDialog() {
    setOpenAddMonitor(false)
  }

  return (
    <DialogWrap
      title={props.isOffer ? "Chỉnh sửa đề xuất" : 'Tạo đề xuất'}
      isOpen={props.isOpen}
      handleClickClose={props.handleClickClose}
      successLabel={props.isOffer ? "Chỉnh sửa" : "Hoàn Thành"}
      onClickSuccess={props.isOffer ? onClickUpdateOffer : onClickCreateOffer}
    >
      <React.Fragment>
        <Typography className="offerModal--title" >Người phê duyệt ({handlers.length})</Typography>
        <div>
          {handlers.map((index) =>
            <Chip
              key={index}
              avatar={<Avatar alt="avatar" src={members[index].avatar} />}
              label={members[index].name}
              onDelete={handleDeleteHandler(index)}
            />
          )}
          <IconButton onClick={openAddHandlersDialog}>
            <Icon size={1} path={mdiPlusCircleOutline} />
          </IconButton>
          <AddOfferMemberModal
            isOpen={isOpenAddHandler}
            value={handlers}
            onChange={setHandlers}
            handleClickClose={closeAddHandlersDialog}
            members={members}
          />
        </div>
        <Typography className="offerModal--title"  >Giám sát ({monitors.length})</Typography>
        <div>
          {monitors.map((index) =>
            <Chip
              key={index}
              avatar={<Avatar alt="avatar" src={members[index].avatar} />}
              label={members[index].name}
              onDelete={handleDeleteHandler(index)}
            />
          )}
          <IconButton onClick={openAddMonitorsDialog}>
            <Icon size={1} path={mdiPlusCircleOutline} />
          </IconButton>
          <AddOfferMemberModal
            isOpen={isOpenAddMonitor}
            value={monitors}
            onChange={setMonitors}
            handleClickClose={closeAddMonitorsDialog}
            members={members}
          />
        </div>
        <Typography className="offerModal--title" >Chọn nhóm đề xuất</Typography>
        <CustomSelect
          options={listGroupOffer}
          value={listGroupOffer[0]}
          onChange={({ value: groupOfferId }) => setParams('offer_group_id', groupOfferId)}
        />
        <Typography className="offerModal--title" >Chọn mức độ</Typography>
        <CommonPriorityForm
          labels={priorityList}
          priority={tempSelectedItem.priority.value}
          handleChangeLabel={priorityItem =>
            setParams('priority', priorityItem.id)
          }
        />
        <TextField
          className="offerModal--content"
          label="Nội dung phê duyệt"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          style={{ marginTop: 20 }}
          value={tempSelectedItem ? tempSelectedItem.content : ""}
          onChange={e => setParams("content", e.target.value)}
        />
        <input
          accept="image/*"
          className={'classes.input'}
          id="outlined-button-file"
          multiple
          type="file"
          onChange={e => props.isOffer ? handleUploadFileUpdate(e.target.files) : handleUploadFileAdd(e.target.files)}
        />
        <label className="button-offer-modal" htmlFor="outlined-button-file">
          <Button variant="outlined" component="span" fullWidth className={'classes.button'}>
            <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />
            Đính kèm tài liệu
                </Button>
        </label>
        {
          tempSelectedItem.files.map(file => (<OfferFile key={file.id} file={file} handleDeleteFile={handleDeleteFile} />))
        }
      </React.Fragment>
    </DialogWrap>
  )
}

export default OfferModal