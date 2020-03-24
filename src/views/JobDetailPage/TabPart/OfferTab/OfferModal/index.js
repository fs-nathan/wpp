import { Avatar, Button, Chip, IconButton, TextField, Typography } from '@material-ui/core';
import { mdiCloudDownloadOutline, mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { createOffer, deleteDocumentToOffer, updateOffer, uploadDocumentToOffer } from 'actions/taskDetail/taskDetailActions';
import CustomModal from 'components/CustomModal';
import CustomSelect from 'components/CustomSelect';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper';
import findIndex from 'lodash/findIndex';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonPriorityForm from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonPriorityForm';
import AddOfferMemberModal from '../AddOfferMemberModal';
import { priorityList } from '../data';
import OfferFile from './OfferFile';
import './styles.scss';

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  data[element.name] = element.value;
  return data;
}, {});

const OfferModal = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const offers = useSelector(state => state.taskDetail.listGroupOffer.offers);
  const listGroupOffer = offers.map(off => ({ value: off.id, label: off.name }))
  const defaultOffer = { ...DEFAULT_OFFER_ITEM, offer_group_id: listGroupOffer[0], priority: priorityList[0] }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(defaultOffer);
  const [handlers, setHandlers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [isOpenAddHandler, setOpenAddHandler] = React.useState(false);
  const [isOpenAddMonitor, setOpenAddMonitor] = React.useState(false);
  const { item } = props;

  React.useEffect(() => {
    if (item) {
      const { user_can_handers, user_monitors,
        priority_code,
        id } = item;
      if (user_can_handers) {
        const handlerIndexes = user_can_handers.map(
          handler => findIndex(members, member => member.id === handler.id))
        setHandlers(handlerIndexes.filter(idx => idx !== -1))
      }
      if (user_monitors) {
        const monitorsIndexes = user_monitors.map(monitor => findIndex(members, member => member.id === monitor.id))
        setMonitors(monitorsIndexes.filter(idx => idx !== -1))
      }
      if (priority_code) item.priority = priorityList[priority_code];
      if (id) item.offer_id = id;
      setTempSelectedItem(item)
    }
  }, [item, members])

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

  const getFormData = () => {
    let dataCreateOfferFormData = new FormData()
    // add content and task id to form data
    dataCreateOfferFormData.append('title', tempSelectedItem.title)
    dataCreateOfferFormData.append('content', tempSelectedItem.content)
    dataCreateOfferFormData.append('task_id', taskId)
    dataCreateOfferFormData.append('offer_group_id', tempSelectedItem.offer_group_id.value)
    dataCreateOfferFormData.append('priority', tempSelectedItem.priority.id)
    // add each user to form data
    for (let i = 0; i < handlers.length; i++) {
      dataCreateOfferFormData.append("user_hander[" + i + "]", members[handlers[i]].id)
    }
    for (let i = 0; i < monitors.length; i++) {
      dataCreateOfferFormData.append("user_monitor[" + i + "]", members[monitors[i]].id)
    }
    // add each file to form data  
    for (let i = 0; i < tempSelectedItem.files.length; i++) {
      dataCreateOfferFormData.append("file", tempSelectedItem.files[i], tempSelectedItem.files[i].name)
    }
    return dataCreateOfferFormData;
  }

  const handleCreateOffer = () => {
    dispatch(createOffer({ data: getFormData(), taskId }))
    setParams("files", [])
  }

  function onClickCreateOffer() {
    props.setOpen(false)
    if (tempSelectedItem.content)
      handleCreateOffer()
    setParams("content", '')
  }

  function onClickUpdateOffer() {
    props.setOpen(false)
    if (tempSelectedItem.content) {
      dispatch(updateOffer({
        task_id: taskId,
        offer_id: tempSelectedItem.offer_id,
        user_hander: handlers.map((id) => members[id].id),
        user_monitor: monitors.map((id) => members[id].id),
        title: tempSelectedItem.title,
        content: tempSelectedItem.content,
        offer_group_id: tempSelectedItem.offer_group_id.value,
        priority: tempSelectedItem.priority.id,
      }))
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

  function openAddMonitorsDialog() {
    setOpenAddMonitor(true)
  }

  function validate() {
    return tempSelectedItem.content && tempSelectedItem.title
      && handlers.length
      && tempSelectedItem.offer_group_id
      && tempSelectedItem.priority
  }
  return (
    <CustomModal
      title={props.isOffer ? "Chỉnh sửa đề xuất" : 'Tạo đề xuất'}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => props.isOffer ? "Chỉnh sửa" : "Hoàn Thành"}
      onConfirm={props.isOffer ? onClickUpdateOffer : onClickCreateOffer}
      canConfirm={validate()}
    >
      <React.Fragment>
        <Typography className="offerModal--title" >Tiêu đề</Typography>
        <TextField
          className="offerModal--titleText"
          placeholder="Nhập tiêu đề đề xuất"
          fullWidth
          value={tempSelectedItem.title}
          onChange={e => setParams("title", e.target.value)}
        />
        <Typography className="offerModal--title" >Nội dung phê duyệt</Typography>
        <TextField
          className="offerModal--content"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          value={tempSelectedItem ? tempSelectedItem.content : ""}
          onChange={e => setParams("content", e.target.value)}
        />
        <Typography className="offerModal--title" >Chọn nhóm đề xuất</Typography>
        <CustomSelect
          options={listGroupOffer}
          value={tempSelectedItem.offer_group_id}
          onChange={(groupOffer) => setParams('offer_group_id', groupOffer)}
        />
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
            setOpen={setOpenAddHandler}
            value={handlers}
            onChange={setHandlers}
            members={members}
          />
        </div>
        <Typography className="offerModal--title">Giám sát ({monitors.length})</Typography>
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
            setOpen={setOpenAddMonitor}
            value={monitors}
            onChange={setMonitors}
            members={members}
          />
        </div>
        <Typography className="offerModal--title" >Chọn mức độ</Typography>
        <CommonPriorityForm
          labels={priorityList}
          priority={tempSelectedItem.priority ? tempSelectedItem.priority.value : ''}
          handleChangeLabel={priorityItem =>
            setParams('priority', priorityItem)
          }
        />
        <input
          accept="image/*"
          className={'offerModal--input__hidden'}
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
    </CustomModal>
  )
}

export default OfferModal