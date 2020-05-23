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
import { updateOfferApprovalCondition, updateOfferDetailDescriptionSection } from '../../../../OfferPage/redux/actions';
import ShareFromLibraryModal from '../../../ChatComponent/ShareFromLibraryModal';
import AddOfferMemberModal from '../AddOfferMemberModal';
import { priorityList } from '../data';
import { CONDITION_LOGIC, CONDITION_LOGIC_MEMBER } from './constants';
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
  const defaultOffer = { ...DEFAULT_OFFER_ITEM, offer_group_id: "", priority: priorityList[0], condition_logic: "OR", condition_logic_member: "OR", file_ids: [], min_rate_accept: 100 }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(defaultOffer);
  const [handlers, setHandlers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [approvalMembers, setApprovalMembers] = React.useState([])
  const [offersGroup, setOffersGroup] = React.useState([])
  const [isOpenAddHandler, setOpenAddHandler] = React.useState(false);
  const [isOpenAddMonitor, setOpenAddMonitor] = React.useState(false);
  const [selectedFilesFromLibrary, setSelectedFilesFromLibrary] = React.useState([])
  const [openShareFromLibraryModal, setOpenShareFromLibraryModal] = useState(false);
  /// Mở modal các thành viên sau phải duyệt
  const [isOpenAddApprovalMemberModal, setOpenAddApprovalMemberModal] = React.useState(false)
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
      const {
        user_can_handers,
        user_monitors,
        priority_code,
        id,
        approval_members,
      } = item;
      if (user_can_handers) {
        const handlerIndexes = user_can_handers.map(
          handler => findIndex(members, member => member.id === handler.id))
        setHandlers(handlerIndexes.filter(idx => idx !== -1))
      }
      if (user_monitors) {
        const monitorsIndexes = user_monitors.map(monitor => findIndex(members, member => member.id === monitor.id))
        setMonitors(monitorsIndexes.filter(idx => idx !== -1))
      }
      if (approval_members) {
        const approvalMembersIndices = approval_members.map(
          approvalMembers => findIndex(members, member => member.id === approvalMembers.id)
        );
        setApprovalMembers(approvalMembersIndices.filter(idx => idx !== -1));
      }
      if (priority_code != null) item.priority = priorityList[priority_code];
      if (id != null) item.offer_id = id;
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
    if (props.isUpdateOffer) {
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
    dataCreateOfferFormData.append('min_rate_accept', tempSelectedItem.min_rate_accept)
    dataCreateOfferFormData.append('priority', tempSelectedItem.priority.id)
    dataCreateOfferFormData.append("condition_logic_member", tempSelectedItem.condition_logic_member)
    dataCreateOfferFormData.append("condition_logic", tempSelectedItem.condition_logic)
    dataCreateOfferFormData.append("offer_group_id", tempSelectedItem.offer_group_id)

    // add each user to form data
    handlers.forEach((value, index) => {
      dataCreateOfferFormData.append("user_handle[" + index + "]", members[value].id)
    })
    monitors.forEach((value, index) => {
      dataCreateOfferFormData.append("user_monitor[" + index + "]", members[value].id)
    })
    approvalMembers.forEach((value, index) => {
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
    if (props.isUpdateOfferDetailDescriptionSection) {
      if (validate()) {
        dispatch(updateOfferDetailDescriptionSection({
          offerId: tempSelectedItem.offer_id,
          title: tempSelectedItem.title,
          content: tempSelectedItem.content,
          offerGroupId: tempSelectedItem.offer_group_id,
          priorityCode: tempSelectedItem.priority.id,
        }))
      }
    } else {
      const approvalMemberIds = [];
      approvalMembers.forEach(idx => {
        approvalMemberIds.push(members[idx].id)
      })
      dispatch(updateOfferApprovalCondition({
        offerId: tempSelectedItem.offer_id,
        minRateAccept: tempSelectedItem.min_rate_accept,
        conditionLogic: tempSelectedItem.condition_logic,
        conditionLogicMember: tempSelectedItem.condition_logic_member,
        memberAcceptedImportantIds: approvalMemberIds,
      }))
    }
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
      approvalMembers.splice(i, 1)
      setApprovalMembers([...monitors])
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
  function openAddApprovalMemberModal() {
    setOpenAddApprovalMemberModal(true)
  }

  function validate() {
    const { isUpdateOfferDetailDescriptionSection, isUpdateOfferApprovalCondition } = props;
    const { title, content, offer_group_id, priority } = tempSelectedItem;
    if (isUpdateOfferDetailDescriptionSection) {
      return title && content;
    } else {
      return title && content
             && offer_group_id
             && priority
             && handlers.length;
    }
  }
  return (
    <JobDetailModalWrap
      title={props.isUpdateOffer ? "Chỉnh sửa đề xuất" : 'Tạo đề xuất'}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => "Hoàn Thành"}
      onConfirm={props.isUpdateOffer ? onClickUpdateOffer : onClickCreateOffer}
      canConfirm={validate()}
      className="offerModal"
    >
      <React.Fragment>
        {
          !props.isUpdateOffer || props.isUpdateOfferDetailDescriptionSection ? (
            <>
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
                placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
                variant="outlined"
                value={tempSelectedItem ? tempSelectedItem.content : ""}
                onChange={e => setParams("content", e.target.value)}
              />
            </>
          ) : null
        }
        {
          !props.isUpdateOffer ? (
            <>
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
                  disableIndexes={[...approvalMembers, createUserIndex]}
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
            </>
          ) : null
        }
        {
          !props.isUpdateOffer || props.isUpdateOfferDetailDescriptionSection ? (
            <>
              <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_MUC_DO')} isRequired />
              <CommonPriorityForm
                labels={priorityList}
                priority={tempSelectedItem.priority.value}
                handleChangeLabel={priorityItem =>
                  setParams('priority', priorityItem)
                }
              />
            </>
          ) : null
        }
        {
          !props.isUpdateOffer || props.isUpdateOfferApprovalCondition ? (
            <>
              <TitleSectionModal label={'Điều kiện được duyệt'} />
              <Grid container spacing={3} className="">
                <Grid item xs={7}>
                  <Grid container alignItems="center">
                    <div className="offerModal--input_rate_prefix_1">
                      <div>Tỷ lệ thành viên đồng ý ≥</div>
                    </div>
                    <div className="offerModal--input__rate">
                      <input
                        value={tempSelectedItem.min_rate_accept}
                        placeholder={tempSelectedItem.min_rate_accept}
                        onChange={(e) => setParams('min_rate_accept', e.target.value)}
                      />
                    </div>
                    <div className="offerModal--input_rate_suffix">
                      <div>%</div>
                    </div>

                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <CustomSelect
                    className="offerModal--custom_select"
                    options={CONDITION_LOGIC}
                    value={CONDITION_LOGIC.find(option =>
                      option.value.toLowerCase() === tempSelectedItem.condition_logic.toLowerCase()
                    )}
                    onChange={(condition_logic) => setParams("condition_logic", condition_logic.value)}
                  />
                </Grid>
                {
                  tempSelectedItem.min_rate_accept >= 100 && get(tempSelectedItem, "condition_logic") === "OR" &&
                  (
                    <>
                      <Grid item xs={7}>
                        <Grid container >
                          <CustomSelect
                            options={CONDITION_LOGIC_MEMBER}
                            value={CONDITION_LOGIC_MEMBER.find(option =>
                              option.value.toLowerCase() === tempSelectedItem.condition_logic_member.toLowerCase()
                            )}
                            onChange={(condition_logic_member) => setParams('condition_logic_member', condition_logic_member.value)}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={3}>
                        <IconButton className="offerModal--buttonAdd" onClick={openAddApprovalMemberModal}>
                          <Icon size={1} path={mdiPlusCircleOutline} />
                          <span className="offerModal--textAdd">{t('LABEL_CHAT_TASK_THEM')}</span>
                        </IconButton>
                        <AddOfferMemberModal
                          isOpen={isOpenAddApprovalMemberModal}
                          setOpen={setOpenAddApprovalMemberModal}
                          value={approvalMembers}
                          onChange={setApprovalMembers}
                          members={filterUserInHandlers()}
                          disableIndexes={[...monitors, createUserIndex]}
                        />
                      </Grid>
                    </>
                  )
                }
                {
                  tempSelectedItem.min_rate_accept < 100 &&
                  <>
                    <Grid item xs={7}>
                      <Grid container >
                        <CustomSelect
                          options={CONDITION_LOGIC_MEMBER}
                          value={CONDITION_LOGIC_MEMBER.find(option =>
                            option.value.toLowerCase() === tempSelectedItem.condition_logic_member.toLowerCase()
                          )}
                          onChange={(condition_logic_member) => setParams("condition_logic_member", condition_logic_member.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton className="offerModal--buttonAdd" onClick={openAddApprovalMemberModal}>
                        <Icon size={1} path={mdiPlusCircleOutline} />
                        <span className="offerModal--textAdd">{t('LABEL_CHAT_TASK_THEM')}</span>
                      </IconButton>
                      <AddOfferMemberModal
                        isOpen={isOpenAddApprovalMemberModal}
                        setOpen={setOpenAddApprovalMemberModal}
                        value={approvalMembers}
                        onChange={setApprovalMembers}
                        members={filterUserInHandlers()}
                        disableIndexes={[...monitors, createUserIndex]}
                      />
                    </Grid>
                  </>
                }
                <Grid item xs={12}>
                  <div>
                    {approvalMembers.map((index) =>
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
            </>
          ) : null
        }
        {
          !props.isUpdateOffer ? (
            <>
              <label className="offerModal--attach" >
                <Button variant="outlined" component="span" onClick={() => setOpenShareFromLibraryModal(true)} fullWidth className={'classes.button'}>
                  <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />{t('LABEL_CHAT_TASK_DINH_KEM_TAI_LIEU')}</Button>
              </label>
              {
                selectedFilesFromLibrary &&
                selectedFilesFromLibrary.map(file => (<OfferFile key={file.id} file={file} handleDeleteFile={handleDeleteFile} />))
              }
              <ShareFromLibraryModal open={openShareFromLibraryModal} setOpen={setOpenShareFromLibraryModal} onClickConfirm={handleSelectedFilesFromLibrary}/>
            </>
          ) : null
        }
      </React.Fragment>
    </JobDetailModalWrap>
  )
}

export default OfferModal
