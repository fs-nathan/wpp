import { Avatar, Button, Chip, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { mdiCloudDownloadOutline, mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteDocumentToOffer, getMember, updateOffer } from 'actions/taskDetail/taskDetailActions';
import CustomSelect from 'components/CustomSelect';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper';
import lodash from 'lodash';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import CommonPriorityForm from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonPriorityForm';
import TitleSectionModal from '../../../../../components/TitleSectionModal';
import { apiService } from '../../../../../constants/axiosInstance';
import ShareFromLibraryModal from '../../../ChatComponent/ShareFromLibraryModal';
import AddOfferMemberModal from '../AddOfferMemberModal';
import { priorityList } from '../data';
import OfferFile from './OfferFile';
import DocumentFileModal from './SendFile/DocumentFileModal';
import SendFileModal from './SendFile/SendFileModal';
import './styles.scss';

const OfferModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const currentUserId = useSelector(state => state.system.profile.id);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const members = useSelector(state => state.taskDetail.taskMember.member);
  const [members, setMembers] = useState([])
  const offers = useSelector(state => state.taskDetail.listGroupOffer.offers);
  const defaultOffer = { ...DEFAULT_OFFER_ITEM, offer_group_id: "", priority: priorityList[0], condition_logic: "OR", condition_logic_member: "OR", file_ids: [] }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(defaultOffer);
  const [handlers, setHandlers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [approves, setApproves] = React.useState([])
  const [minRateAccept, setMinRateAccept] = React.useState(100)
  const [conditionLogicMember, setConditionLogicMember] = useState("OR")
  const [offersGroup, setOffersGroup] = React.useState([])
  const [isOpenAddHandler, setOpenAddHandler] = React.useState(false);
  const [isOpenAddMonitor, setOpenAddMonitor] = React.useState(false);
  const [selectedFilesFromLibrary, setSelectedFilesFromLibrary] = React.useState([])
  const [openShareFromLibraryModal, setOpenShareFromLibraryModal] = useState(false);
  /// Mở modal các thành viên sau phải duyệt
  const [isOpenAddApprove, setOpenAddAppove] = React.useState(false)
  const { item } = props;
  const createId = (item && item.user_create_id) || currentUserId;
  const createUserIndex = findIndex(members, member => member.id === createId);


  const fetchMembers = useCallback(async () => {
    const config = {
      url: "/list-users",
      method: "GET"
    }
    var users = []
    const result = await apiService(config)
    result.data.users.forEach(x => {
      users = [...users, [...x.users]]
    })
    setMembers(lodash.flatten(users).filter(x => x.id !== currentUserId))
  }, [currentUserId])
  const fetchOffersGroup = async () => {
    const config = {
      url: "/offers/list-group-offer",
      method: "GET"
    }
    const result = await apiService(config)
    const { offers_group } = result.data
    const newArray = []
    offers_group.forEach(e => {
      newArray.push({ value: e.id, label: e.name })
    })
    setOffersGroup(newArray)
  }
  /// Khi nào modal open thì load members và group 
  React.useEffect(() => {
    fetchMembers()
    fetchOffersGroup()
  }, [fetchMembers, props.isOpen])
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
  const filterUserInHandlers = useCallback(() => {
    const arr = handlers.map(i => members[i])
    return arr || []
  })
  const handleDeleteFile = fileId => {
    let removeFileCallBack = () => {
      setSelectedFilesFromLibrary(prevSelectedFiles => prevSelectedFiles.filter(file => file.id !== fileId));
      setParams("file_ids", tempSelectedItem.file_ids.filter(file => file.id !== fileId));
    }
    if (props.isOffer) {
      let payload = { offer_id: tempSelectedItem.offer_id, file_id: fileId }
      // Build a callback that allow saga remove file in state array
      // Call api
      dispatch(deleteDocumentToOffer(payload, removeFileCallBack, taskId))
    } else {
      removeFileCallBack()
    }
  }


  React.useEffect(() => {
    filterUserInHandlers()
  }, [filterUserInHandlers, handlers])
  const handleSelectedFilesFromLibrary = (selectedFiles) => {
    if (selectedFiles) {
      setParams("file_ids", [...tempSelectedItem.file_ids, ...selectedFiles.map(file => (file.id))]);
      setSelectedFilesFromLibrary([...selectedFilesFromLibrary, ...selectedFiles]);
    }
  }
  const getFormData = () => {
    let dataCreateOfferFormData = new FormData()
    // add content and task id to form data
    dataCreateOfferFormData.append('title', tempSelectedItem.title)
    dataCreateOfferFormData.append('content', tempSelectedItem.content)
    dataCreateOfferFormData.append('task_id', taskId)
    dataCreateOfferFormData.append('min_rate_accept', minRateAccept)
    dataCreateOfferFormData.append('priority', tempSelectedItem.priority.id)
    dataCreateOfferFormData.append("condition_logic_member", conditionLogicMember)
    dataCreateOfferFormData.append("condition_logic", tempSelectedItem.condition_logic)
    dataCreateOfferFormData.append("offer_group_id", tempSelectedItem.offer_group_id)

    // add each user to form data    
    handlers.forEach((value, index) => {
      dataCreateOfferFormData.append("user_handle[" + index + "]", members[value].id)
    })
    monitors.forEach((value, index) => {
      dataCreateOfferFormData.append("user_monitor[" + index + "]", members[value].id)
    })
    approves.forEach((value, index) => {
      dataCreateOfferFormData.append("member_accepted_important[" + index + "]", members[value].id)
    })
    // add selected file ids from library to form data
    tempSelectedItem.file_ids.forEach((id, index) => {
      dataCreateOfferFormData.append(`file_ids[${index}]`, id);
    })
    return dataCreateOfferFormData;
  }

  const handleCreateOffer = async () => {
    try {
      const config = {
        url: "/offers/personal/create",
        method: "POST",
        data: getFormData(),
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      await apiService(config)
      enqueueSnackbar("Create offer successful", { variant: "success" })
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" })
    }
    // setParams("files", [])
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
        offer_group_id: get(tempSelectedItem, 'offer_group_id.value'),
        priority: get(tempSelectedItem, 'priority.id'),
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
  function handleDeleteMonitor(i) {
    return () => {
      monitors.splice(i, 1)
      setMonitors([...monitors])
    }
  }
  function handleDeleteApprove(i) {
    return () => {
      approves.splice(i, 1)
      setApproves([...monitors])
    }
  }

  function openAddHandlersDialog() {
    dispatch(getMember())
    setOpenAddHandler(true)
    filterUserInHandlers()
  }
  function openAddMonitorsDialog() {
    setOpenAddMonitor(true)
  }
  function openAddApproveDialog() {
    setOpenAddAppove(true)
  }

  function validate() {
    return tempSelectedItem.content && tempSelectedItem.title
      && handlers.length
      && tempSelectedItem.offer_group_id
      && tempSelectedItem.priority
  }
  const selectConditionMember = (e) => {
    if (e.value == "OR") {
      setConditionLogicMember("OR")
    } else {
      setConditionLogicMember("AND")
    }
  }
  return (
    <JobDetailModalWrap
      title={props.isOffer ? "Chỉnh sửa đề xuất" : 'Tạo đề xuất'}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => props.isOffer ? "Chỉnh sửa" : "Hoàn Thành"}
      onConfirm={props.isOffer ? onClickUpdateOffer : onClickCreateOffer}
      canConfirm={validate()}
      className="offerModal"
    >
      <React.Fragment>
        <TitleSectionModal label={t('LABEL_CHAT_TASK_TEN_DE_XUAT')} isRequired />
        <TextField
          className="offerModal--titleText"
          placeholder={t('LABEL_CHAT_TASK_NHAP_TIEU_DE_DE_XUAT')}
          variant="outlined"
          fullWidth
          value={tempSelectedItem.title}
          onChange={e => setParams("title", e.target.value)}
        />
        <TitleSectionModal label={t('LABEL_CHAT_TASK_NOI_DUNG_DE_XUAT')} isRequired />
        <TextField
          className="offerModal--content"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
          variant="outlined"
          value={tempSelectedItem ? tempSelectedItem.content : ""}
          onChange={e => setParams("content", e.target.value)}
        />
        <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_NHOM_DE_XUAT')} isRequired />
        <CustomSelect
          options={offersGroup}
          onChange={(groupOffer) => setParams('offer_group_id', groupOffer.value)}
        />
        <TitleSectionModal label={`${t('LABEL_CHAT_TASK_NGUOI_PHE_DUYET')}${handlers.length})`} isRequired />
        <div>
          {handlers.map((index) =>
            <Chip
              key={index}
              avatar={<Avatar alt="avatar" src={members[index].avatar} />}
              label={members[index].name}
              onDelete={handleDeleteHandler(index)}
            />
          )}
          <IconButton className="offerModal--buttonAdd" onClick={openAddHandlersDialog}>
            <Icon size={1} path={mdiPlusCircleOutline} />
            <span className="offerModal--textAdd">{t('LABEL_CHAT_TASK_THEM')}</span>
          </IconButton>
          <AddOfferMemberModal
            isOpen={isOpenAddHandler}
            setOpen={setOpenAddHandler}
            value={handlers}
            onChange={setHandlers}
            members={members}
            disableIndexes={[...approves, createUserIndex]}
          />
        </div>
        <TitleSectionModal label={`${t('LABEL_CHAT_TASK_NGUOI_GIAM_SAT')}${monitors.length})`} />
        <div>
          {monitors.map((index) =>
            <Chip
              key={index}
              avatar={<Avatar alt="avatar" src={members[index].avatar} />}
              label={members[index].name}
              onDelete={handleDeleteMonitor(index)}
            />
          )}
          <IconButton
            className="offerModal--buttonAdd"
            onClick={openAddMonitorsDialog}>
            <Icon size={1} path={mdiPlusCircleOutline} />
            <span className="offerModal--textAdd">{t('LABEL_CHAT_TASK_THEM')}</span>
          </IconButton>
          <AddOfferMemberModal
            isOpen={isOpenAddMonitor}
            setOpen={setOpenAddMonitor}
            value={monitors}
            onChange={setMonitors}
            members={members}
            disableIndexes={[...handlers, createUserIndex]}
          />
        </div>
        <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_MUC_DO')} isRequired />
        <CommonPriorityForm
          labels={priorityList}
          priority={tempSelectedItem.priority.value}
          handleChangeLabel={priorityItem =>
            setParams('priority', priorityItem)
          }
        />
        <TitleSectionModal label={'Điều kiện được duyệt'} />
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Grid container alignItems="center">
              <div className="offerModal--input_rate_prefix_1">
                <div>Tỷ lệ thành viên đồng ý ≥</div>
              </div>
              <div className="offerModal--input__rate">
                <input placeholder={minRateAccept} onChange={(e) => setMinRateAccept(e.target.value)} />
              </div>
              <div className="offerModal--input_rate_suffix">
                <div>%</div>
              </div>

            </Grid>
          </Grid>
          <Grid item xs={1}>
            <CustomSelect
              className="offerModal--custom_select"
              options={[{ label: "Hoặc", value: "OR" }, { label: "Và", value: "AND" }]}
              placeholder="Hoặc"
              onChange={(condition_logic) => setParams("condition_logic", condition_logic.value)}
            />
          </Grid>
          {
            minRateAccept >= 100 && get(tempSelectedItem, "condition_logic") === "OR" &&
            <>
              <Grid item xs={7}>
                <Grid container >
                  <CustomSelect
                    options={[{ label: "Một số thành viên sau phải đồng ý", value: "OR" }, { label: "Tất cả thành viên sau phải đồng ý", value: "AND" }]}
                    onChange={selectConditionMember}
                    placeholder="Một số thành viên sau đồng ý"
                  />
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <IconButton className="offerModal--buttonAdd" onClick={openAddApproveDialog}>
                  <Icon size={1} path={mdiPlusCircleOutline} />
                  <span className="offerModal--textAdd">{t('LABEL_CHAT_TASK_THEM')}</span>
                </IconButton>
                <AddOfferMemberModal
                  isOpen={isOpenAddApprove}
                  setOpen={setOpenAddAppove}
                  value={approves}
                  onChange={setApproves}
                  members={filterUserInHandlers()}
                  disableIndexes={[...monitors, createUserIndex]}
                />
              </Grid>
            </>
          }
          {
            minRateAccept < 100 &&
            <>
              <Grid item xs={7}>
                <Grid container >
                  <CustomSelect
                    options={[{ label: "Một số thành viên sau phải đồng ý", value: "OR" }, { label: "Tất cả thành viên sau phải đồng ý", value: "AND" }]}
                    onChange={(condition_logic_member) => setParams("condition_logic_member", condition_logic_member)}
                    placeholder="Một số thành viên sau đồng ý"
                  />
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <IconButton className="offerModal--buttonAdd" onClick={openAddApproveDialog}>
                  <Icon size={1} path={mdiPlusCircleOutline} />
                  <span className="offerModal--textAdd">{t('LABEL_CHAT_TASK_THEM')}</span>
                </IconButton>
                <AddOfferMemberModal
                  isOpen={isOpenAddApprove}
                  setOpen={setOpenAddAppove}
                  value={approves}
                  onChange={setApproves}
                  members={filterUserInHandlers()}
                  disableIndexes={[...monitors, createUserIndex]}
                />
              </Grid>
            </>
          }
          <Grid item xs={12}>
            <div>
              {approves.map((index) =>
                <Chip
                  key={index}
                  avatar={<Avatar alt="avatar" src={members[index].avatar} />}
                  label={members[index].name}
                  onDelete={handleDeleteApprove(index)}
                />
              )}
            </div>
          </Grid>
        </Grid>
        <label className="offerModal--attach" >
          <Button variant="outlined" component="span" onClick={() => setOpenShareFromLibraryModal(true)} fullWidth className={'classes.button'}>
            <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />{t('LABEL_CHAT_TASK_DINH_KEM_TAI_LIEU')}</Button>
        </label>
        {
          selectedFilesFromLibrary &&
          selectedFilesFromLibrary.map(file => (<OfferFile key={file.id} file={file} handleDeleteFile={handleDeleteFile} />))
        }
        <ShareFromLibraryModal open={openShareFromLibraryModal} setOpen={setOpenShareFromLibraryModal} onClickConfirm={handleSelectedFilesFromLibrary}/>
      </React.Fragment>
    </JobDetailModalWrap>
  )
}

export default OfferModal
