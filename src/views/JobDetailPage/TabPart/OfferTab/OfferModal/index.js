import { Avatar, Button, Chip, Grid, IconButton, TextField } from '@material-ui/core';
import { mdiCloudDownloadOutline, mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { listUserOfGroup } from '../../../../../actions/user/listUserOfGroup';
import { bgColorSelector } from '../../../../../reducers/setting/selectors';
import { createOffer, deleteDocumentToOffer, getMember, updateOffer } from 'actions/taskDetail/taskDetailActions';
import CustomSelect from 'components/CustomSelect';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper';
import lodash from 'lodash';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import CommonPriorityForm from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonPriorityForm';
import TitleSectionModal from '../../../../../components/TitleSectionModal';
import { apiService } from '../../../../../constants/axiosInstance';
import { allMembersSelector } from '../../../../../reducers/user/listOfUserGroup/selectors';
import { updateOfferApprovalCondition, updateOfferDetailDescriptionSection } from '../../../../OfferPage/redux/actions';
import AddOfferMemberModal from '../AddOfferMemberModal';
import { priorityList } from '../data';
import { CONDITION_LOGIC, CONDITION_LOGIC_MEMBER } from './constants';
import OfferFile from './OfferFile';
import SendFileModal from '../../../ChatComponent/SendFile/SendFileModal';
import './styles.scss';

const OfferModal = ({
                      isOpen,
                      setOpen,
                      actionCreateOffer,
                      item: offerItem,
                      isUpdateOfferDetailDescriptionSection,
                      isUpdateOfferApprovalCondition
                    }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bgColor = useSelector(state => bgColorSelector(state));
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const currentUserId = useSelector(state => state.system.profile.id);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { members: allMembers } = useSelector(state => allMembersSelector(state));
  const offers = useSelector(state => state.taskDetail.listGroupOffer.offers);
  const defaultOffer = { ...DEFAULT_OFFER_ITEM, offer_group_id: "", priority: priorityList[0], condition_logic: "OR", condition_logic_member: "OR", file_ids: [], min_rate_accept: 100 }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(defaultOffer);
  const [handlers, setHandlers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [approver, setApprover] = React.useState([])
  const [offersGroup, setOffersGroup] = React.useState([])
  const [isOpenAddHandler, setOpenAddHandler] = React.useState(false);
  const [isOpenAddMonitor, setOpenAddMonitor] = React.useState(false);
  const [selectedFilesFromLibrary, setSelectedFilesFromLibrary] = React.useState([])
  const [openSendFileModal, setOpenSendFileModal] = useState(false);
  /// Mở modal các thành viên sau phải duyệt
  const [isOpenAddApprovalMemberModal, setOpenAddApprovalMemberModal] = React.useState(false)
  const createId = (offerItem && offerItem.user_create_id) || currentUserId;
  const createUserIndex = findIndex(allMembers, member => member.id === createId);

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
  useEffect(() => {
    dispatch(listUserOfGroup(false));
    fetchOffersGroup();
  }, [currentUserId])
  useEffect(() => {
    if (offerItem) {
      const {
        user_can_handers,
        user_monitors,
        priority_code,
        id,
        approvers,
      } = offerItem;
      if (user_can_handers) {
        const handlerIndexes = user_can_handers.map(
          handler => findIndex(allMembers, member => member.id === handler.id))
        setHandlers(handlerIndexes.filter(idx => idx !== -1))
      }
      if (user_monitors) {
        const monitorsIndexes = user_monitors.map(monitor => findIndex(allMembers, member => member.id === monitor.id))
        setMonitors(monitorsIndexes.filter(idx => idx !== -1))
      }
      if (approvers) {
        const approversIndexes = approvers.map(
          approver => findIndex(allMembers, member => member.id === approver.id)
        );
        setApprover(approversIndexes.filter(idx => idx !== -1));
      }
      if (priority_code != null) offerItem.priority = priorityList[priority_code];
      if (id != null) offerItem.offer_id = id;

      // Set default values for approval conditions
      if (!offerItem.min_rate_accept) offerItem.min_rate_accept = 100;
      if (!offerItem.condition_logic) offerItem.condition_logic = 'OR';
      if (!offerItem.condition_logic_member) offerItem.condition_logic_member = 'OR';
      setTempSelectedItem(offerItem)
    }
  }, [offerItem, allMembers])
  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }

  const handleDeleteFile = fileId => {
    let removeFileCallBack = () => {
      setParams("files", tempSelectedItem.files.filter(file => file.id !== fileId))
      setParams("file_ids", tempSelectedItem.file_ids.filter(file => file.id !== fileId));
      setSelectedFilesFromLibrary(prevSelectedFiles => prevSelectedFiles.filter(file => file.id !== fileId));
    }
    if (isUpdateOfferDetailDescriptionSection || isUpdateOfferApprovalCondition) {
      let payload = { offer_id: tempSelectedItem.offer_id, file_id: fileId }
      // Build a callback that allow saga remove file in state array
      // Call api
      dispatch(deleteDocumentToOffer(payload, removeFileCallBack, taskId))
    } else {
      removeFileCallBack()
    }
  }

  const handleUploadSelectedFilesFromPC = async (e) => {
    const { files } = e.target;
    setParams("files", [...tempSelectedItem.files, ...files]);
  }
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
      dataCreateOfferFormData.append("user_handle[" + index + "]", allMembers[value].id)
    })
    monitors.forEach((value, index) => {
      dataCreateOfferFormData.append("user_monitor[" + index + "]", allMembers[value].id)
    })
    approver.forEach((value, index) => {
      dataCreateOfferFormData.append("member_accepted_important[" + index + "]", allMembers[value].id)
    })
    // add uploaded files to form data
    tempSelectedItem.files.forEach(file => {
      dataCreateOfferFormData.append("file", file, file.name);
    });
    // add selected file ids from library to form data
    tempSelectedItem.file_ids.forEach((id, index) => {
      dataCreateOfferFormData.append(`file_ids[${index}]`, id);
    })
    return dataCreateOfferFormData;
  }

  const handleCreateOffer = () => {
    if (actionCreateOffer) {
      if (actionCreateOffer.payload) {
        actionCreateOffer.payload.data = getFormData();
      } else {
        actionCreateOffer.payload = {
          data: getFormData(),
        }
      }
      dispatch(actionCreateOffer);
    }
  };
  function onClickCreateOffer() {
    setOpen(false)
    if (tempSelectedItem.content)
      handleCreateOffer()
    setParams("content", '')
  }

  function onClickUpdateOffer() {
    setOpen(false)
    if (isUpdateOfferDetailDescriptionSection) {
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
      const approverIds = [];
      approver.forEach(idx => {
        approverIds.push(allMembers[idx].id)
      })
      dispatch(updateOfferApprovalCondition({
        offerId: tempSelectedItem.offer_id,
        minRateAccept: tempSelectedItem.min_rate_accept,
        conditionLogic: tempSelectedItem.condition_logic,
        conditionLogicMember: tempSelectedItem.condition_logic_member,
        memberAcceptedImportantIds: approverIds,
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
  function handleDeleteApprover(i) {
    return () => {
      approver.splice(i, 1)
      setApprover([...approver])
    }
  }

  function openAddHandlersDialog() {
    dispatch(getMember())
    setOpenAddHandler(true)
  }
  function openAddMonitorsDialog() {
    setOpenAddMonitor(true)
  }
  function openAddApprovalMemberModal() {
    setOpenAddApprovalMemberModal(true)
  }

  function validate() {
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
      title={
        isUpdateOfferDetailDescriptionSection || isUpdateOfferApprovalCondition
          ? "Chỉnh sửa đề xuất"
          : 'Tạo đề xuất'
      }
      open={isOpen}
      setOpen={setOpen}
      confirmRender={() => "Hoàn Thành"}
      onConfirm={
        isUpdateOfferDetailDescriptionSection || isUpdateOfferApprovalCondition
          ? onClickUpdateOffer
          : onClickCreateOffer
      }
      canConfirm={validate()}
      className="offerModal"
    >
      <React.Fragment>
        {
          !isUpdateOfferApprovalCondition ? (
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
          !isUpdateOfferDetailDescriptionSection && !isUpdateOfferApprovalCondition ? (
            <>
              <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_NHOM_DE_XUAT')} isRequired />
              <CustomSelect
                options={offersGroup}
                onChange={(groupOffer) => setParams('offer_group_id', groupOffer.value)}
              />
              <TitleSectionModal label={`${t('LABEL_CHAT_TASK_NGUOI_PHE_DUYET')}${handlers.length})`} isRequired />
              <div>
                {handlers.map((allMembersIdx, idx) =>
                  <Chip
                    key={allMembersIdx}
                    avatar={<Avatar alt="avatar" src={allMembers[allMembersIdx].avatar} />}
                    label={allMembers[allMembersIdx].name}
                    onDelete={handleDeleteHandler(idx)}
                  />
                )}
                <IconButton className="offerModal-buttonAdd" onClick={openAddHandlersDialog}>
                  <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
                  <span className="offerModal-buttonAdd-title">{t('LABEL_CHAT_TASK_THEM')}</span>
                </IconButton>
                <AddOfferMemberModal
                  isOpen={isOpenAddHandler}
                  setOpen={setOpenAddHandler}
                  value={handlers}
                  onChange={setHandlers}
                  members={allMembers}
                  disableIndexes={[...approver, createUserIndex]}
                />
              </div>
              <TitleSectionModal label={`${t('LABEL_CHAT_TASK_NGUOI_GIAM_SAT')}${monitors.length})`} />
              <div>
                {monitors.map((allMembersIdx, idx) =>
                  <Chip
                    key={allMembersIdx}
                    avatar={<Avatar alt="avatar" src={allMembers[allMembersIdx].avatar} />}
                    label={allMembers[allMembersIdx].name}
                    onDelete={handleDeleteMonitor(idx)}
                  />
                )}
                <IconButton className="offerModal-buttonAdd" onClick={openAddMonitorsDialog}>
                  <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
                  <span className="offerModal-buttonAdd-title">{t('LABEL_CHAT_TASK_THEM')}</span>
                </IconButton>
                <AddOfferMemberModal
                  isOpen={isOpenAddMonitor}
                  setOpen={setOpenAddMonitor}
                  value={monitors}
                  onChange={setMonitors}
                  members={allMembers}
                  disableIndexes={[...handlers, createUserIndex]}
                />
              </div>
            </>
          ) : null
        }
        {
          !isUpdateOfferApprovalCondition ? (
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
          !isUpdateOfferDetailDescriptionSection ? (
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
                        <IconButton className="offerModal-buttonAdd" onClick={openAddApprovalMemberModal}>
                          <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
                          <span className="offerModal-buttonAdd-title">{t('LABEL_CHAT_TASK_THEM')}</span>
                        </IconButton>
                        <AddOfferMemberModal
                          isOpen={isOpenAddApprovalMemberModal}
                          setOpen={setOpenAddApprovalMemberModal}
                          value={approver}
                          onChange={setApprover}
                          members={allMembers}
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
                      <IconButton className="offerModal-buttonAdd" onClick={openAddApprovalMemberModal}>
                        <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
                        <span className="offerModal-buttonAdd-title">{t('LABEL_CHAT_TASK_THEM')}</span>
                      </IconButton>
                      <AddOfferMemberModal
                        isOpen={isOpenAddApprovalMemberModal}
                        setOpen={setOpenAddApprovalMemberModal}
                        value={approver}
                        onChange={setApprover}
                        members={allMembers}
                        disableIndexes={[...monitors, createUserIndex]}
                      />
                    </Grid>
                  </>
                }
                <Grid item xs={12}>
                  <div>
                    {approver.map((allMembersIdx, idx) =>
                      <Chip
                        key={allMembersIdx}
                        avatar={<Avatar alt="avatar" src={allMembers[allMembersIdx].avatar} />}
                        label={allMembers[allMembersIdx].name}
                        onDelete={handleDeleteApprover(idx)}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            </>
          ) : null
        }
        {
          !isUpdateOfferDetailDescriptionSection && !isUpdateOfferApprovalCondition ? (
            <>
              <label className="offerModal--attach" >
                <Button variant="outlined" component="span" onClick={() => setOpenSendFileModal(true)} fullWidth className={'classes.button'}>
                  <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />{t('LABEL_CHAT_TASK_DINH_KEM_TAI_LIEU')}</Button>
              </label>
              {
                tempSelectedItem.files &&
                tempSelectedItem.files.map(file => (<OfferFile key={file.id} file={file} handleDeleteFile={handleDeleteFile} />))
              }
              {
                selectedFilesFromLibrary &&
                selectedFilesFromLibrary.map(file => (<OfferFile key={file.id} file={file} handleDeleteFile={handleDeleteFile} />))
              }
              <SendFileModal
                open={openSendFileModal}
                setOpen={setOpenSendFileModal}
                handleUploadFile={handleUploadSelectedFilesFromPC}
                onConfirmShare={handleSelectedFilesFromLibrary}
              />
            </>
          ) : null
        }
      </React.Fragment>
    </JobDetailModalWrap>
  )
}

export default OfferModal
