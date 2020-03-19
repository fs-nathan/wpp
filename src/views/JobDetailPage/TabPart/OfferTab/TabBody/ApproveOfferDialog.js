import React from 'react';
import findIndex from 'lodash/findIndex';
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
import { priorityList } from '../data';

const ApproveOfferDialog = (props) => {
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
        <Typography className="offerModal--title" >Tiêu đề</Typography>
        <TextField
          className="offerModal--titleText"
          placeholder="Nhập tiêu đề đề xuất"
          value={tempSelectedItem.title}
          onChange={e => setParams("title", e.target.value)}
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
            value={handlers}
            onChange={setHandlers}
            handleClickClose={closeAddHandlersDialog}
            members={members}
          />
        </div>
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
      </React.Fragment>
    </DialogWrap>
  )
}

export default ApproveOfferDialog