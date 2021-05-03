import { Avatar, Button, Chip, IconButton, TextField } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { mdiCloudDownloadOutline, mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteDocumentToOffer, getMember, updateOffer } from 'actions/taskDetail/taskDetailActions';
import CustomSelect from 'components/CustomSelect';
import { CustomEventDispose, CustomEventListener } from 'constants/events';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper';
import { get } from 'lodash';
import findIndex from 'lodash/findIndex';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMountedState } from 'react-use';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import CommonPriorityForm from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonPriorityForm';
import { allMembersSelector } from 'views/JobDetailPage/selectors';
import { Routes } from 'views/OfferPage/contants/routes';
import { CREATE_OFFER, CREATE_OFFER_SUCCESSFULLY, UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS } from 'views/OfferPage/redux/types';
import TitleSectionModal from '../../../../../components/TitleSectionModal';
import { apiService } from '../../../../../constants/axiosInstance';
import { bgColorSelector } from '../../../../../reducers/setting/selectors';
import { getMemberToAdd, updateOfferDetailDescriptionSection } from '../../../../OfferPage/redux/actions';
import SendFileModal from '../../../ChatComponent/SendFile/SendFileModal';
import AddOfferMemberModal from '../AddOfferMemberModal';
import OfferFile from './OfferFile';
import SelectGroup from './SelectGroup';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
  listChips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    },
  },
}));

const OfferModal = ({
  isOpen,
  setOpen,
  actionCreateOffer,
  item: offerItem,
  isUpdateOfferDetailDescriptionSection,
  isOffer,
  additionQuery
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const bgColor = useSelector(state => bgColorSelector(state));
  const isMounted = useMountedState();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const currentUserId = useSelector(state => state.system.profile.id);
  const priorityList = [
    { id: 0, value: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_1") },
    { id: 1, value: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_2") },
    { id: 2, value: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_3") }
  ];
  const { members: allMembers } = useSelector(state => allMembersSelector(state));
  const defaultOffer = { ...DEFAULT_OFFER_ITEM, title: '', content: '', offer_group_id: "", offer_group_name: "", priority: priorityList[0], file_ids: [] }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(defaultOffer);
  const [handlers, setHandlers] = React.useState([])
  const [monitors, setMonitors] = React.useState([])
  const [isOpenAddHandler, setOpenAddHandler] = React.useState(false);
  const [isOpenAddMonitor, setOpenAddMonitor] = React.useState(false);
  const [selectedFilesFromLibrary, setSelectedFilesFromLibrary] = React.useState([])
  const [openSendFileModal, setOpenSendFileModal] = useState(false);
  const createId = (offerItem && offerItem.user_create_id) || currentUserId;
  const createUserIndex = findIndex(allMembers, member => member.id === createId);
  const [loading, setLoading] = React.useState(false);
  const [openSelectGroupOfferModal, setOpenSelectGroupOfferModal] = React.useState(false);

  useEffect(() => {
    if (!isUpdateOfferDetailDescriptionSection) {
      dispatch(getMemberToAdd({ additionQuery: additionQuery }));
    }
  }, [currentUserId, isUpdateOfferDetailDescriptionSection]);

  useEffect(() => {
    if (offerItem) {
      const {
        user_can_handers,
        user_monitors,
        priority_code,
        id,
        handlers,   // member object
        approvers,  // member object
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
      // handlers & approvers are used when editing approval conditions
      if (handlers) {
        const handlerIndexes = handlers.map(
          handler => findIndex(allMembers, member => member.id === handler.id));
        setHandlers(handlerIndexes.filter(idx => idx !== -1)); // use indexes of all members to set
      }
      if (priority_code != null) offerItem.priority = priorityList[priority_code];
      if (id != null) offerItem.offer_id = id;
      setTempSelectedItem(offerItem);
    }
  }, [offerItem, allMembers]);

  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }

  const handleDeleteFile = fileId => {
    let removeFileCallBack = () => {
      setParams("files", tempSelectedItem.files.filter(file => file.id !== fileId))
      setParams("file_ids", tempSelectedItem.file_ids.filter(file => file.id !== fileId));
      setSelectedFilesFromLibrary(prevSelectedFiles => prevSelectedFiles.filter(file => file.id !== fileId));
    }
    if (isUpdateOfferDetailDescriptionSection) {
      let payload = { offer_id: tempSelectedItem.offer_id, file_id: fileId }
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
    dataCreateOfferFormData.append("offer_group_id", tempSelectedItem.offer_group_id)

    // add each user to form data
    handlers.forEach((value, index) => {
      dataCreateOfferFormData.append("user_handle[" + index + "]", allMembers[value].id)
    })
    monitors.forEach((value, index) => {
      dataCreateOfferFormData.append("user_monitor[" + index + "]", allMembers[value].id)
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
        actionCreateOffer.payload.additionQuery = additionQuery;
      } else {
        actionCreateOffer.payload = {
          data: getFormData(),
          additionQuery: additionQuery
        }
      }
      setLoading(true);
      dispatch(actionCreateOffer);
    }
  };

  const afterDoOfferOperations = () => {
    setLoading(false);
    setOpen(false);
  }

  const redirectAfterCreateOfferSuccess = () => {
    setTimeout(() => {
      history.push(`${Routes.OFFERBYGROUP}/${tempSelectedItem.offer_group_id}?referrer=${history.location.pathname}`);
    }, 1000);
  }

  React.useEffect(() => {
    if (isMounted) {
      CustomEventListener(CREATE_OFFER_SUCCESSFULLY, redirectAfterCreateOfferSuccess);
      return () => {
        CustomEventDispose(CREATE_OFFER_SUCCESSFULLY, redirectAfterCreateOfferSuccess);
      }
    }
  }, [isMounted, tempSelectedItem]);

  React.useEffect(() => {
    if (isMounted) {
      CustomEventListener(CREATE_OFFER, afterDoOfferOperations);
      CustomEventListener(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, afterDoOfferOperations);
      return () => {
        CustomEventDispose(CREATE_OFFER, afterDoOfferOperations);
        CustomEventDispose(UPDATE_OFFER_DETAIL_DESCRIPTION_SECTION_SUCCESS, afterDoOfferOperations);
      }
    }
  }, [isMounted]);

  function onClickCreateOffer() {
    if (tempSelectedItem.content)
      handleCreateOffer()
    setParams("content", '')
  }

  function onClickUpdateOffer() {
    if (isUpdateOfferDetailDescriptionSection) {
      if (validate()) {
        dispatch(updateOfferDetailDescriptionSection({
          offerId: tempSelectedItem.offer_id,
          title: tempSelectedItem.title,
          content: tempSelectedItem.content,
          offerGroupId: tempSelectedItem.offer_group_id,
          priorityCode: tempSelectedItem.priority.id,
          additionQuery
        }));
        setLoading(true);
      }
    } else if (tempSelectedItem.content) {
      dispatch(updateOffer({
        task_id: taskId,
        offer_id: tempSelectedItem.offer_id,
        user_hander: handlers.map((idx) => allMembers[idx].id),
        user_monitor: monitors.map((idx) => allMembers[idx].id),
        title: tempSelectedItem.title,
        content: tempSelectedItem.content,
        offer_group_id: get(tempSelectedItem, 'offer_group_id.value'),
        priority: get(tempSelectedItem, 'priority.id'),
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

  function openAddHandlersDialog() {
    dispatch(getMember())
    setOpenAddHandler(true)
  }
  function openAddMonitorsDialog() {
    setOpenAddMonitor(true)
  }

  function renderAddMemberModal(isOpen, setOpen, value, onChange, members, disabledIndexes, isUpdate) {
    return (
      <AddOfferMemberModal
        isOpen={isOpen}
        setOpen={setOpen}
        value={value}
        onChange={onChange}
        members={members}
        disableIndexes={disabledIndexes}
        isUpdate={isUpdate}
      />
    );
  }

  function validate() {
    const { title, content, offer_group_id, priority } = tempSelectedItem;
    if (isUpdateOfferDetailDescriptionSection) {
      return title && content;
    }
    return actionCreateOffer
      && title && content
      && offer_group_id
      && priority
  }
  return (
    <>
      <JobDetailModalWrap
        title={
          isUpdateOfferDetailDescriptionSection || isOffer ? t('LABEL_CHAT_TASK_CHINH_SUA_DE_XUAT') : t('LABEL_CHAT_TASK_TAO_DE_XUAT')
        }
        open={isOpen}
        setOpen={setOpen}
        confirmRender={() => t('LABEL_CHAT_TASK_HOAN_THANH')}
        onConfirm={
          isUpdateOfferDetailDescriptionSection || isOffer
            ? onClickUpdateOffer
            : onClickCreateOffer
        }
        canConfirm={validate()}
        actionLoading={loading}
        className="offerModal"
        height={'medium'}
        manualClose={true}
        onCancle={() => setOpen(false)}
      >
        <React.Fragment>
          {
            !isUpdateOfferDetailDescriptionSection && (
              <div className="select-customer-from-input">
                <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_NHOM_DE_XUAT')} isRequired />
                <TextField
                  className="offerModal--titleText"
                  placeholder={t('LABEL_CHAT_TASK_CHON_NHOM_DE_XUAT')}
                  variant="outlined"
                  fullWidth
                  value={tempSelectedItem.offer_group_name}
                  onClick={() => setOpenSelectGroupOfferModal(true)}
                  inputProps={{
                    readOnly: true
                  }}
                />
                <ArrowDropDownIcon className="icon-arrow" />
              </div>
            )
          }
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
          {
            !isUpdateOfferDetailDescriptionSection && (
              <>
                <TitleSectionModal label={`${t('LABEL_CHAT_TASK_NGUOI_PHE_DUYET')}${handlers.length})`} />
                <div className={classes.listChips}>
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
                  {renderAddMemberModal(
                    isOpenAddHandler,
                    setOpenAddHandler,
                    handlers,
                    setHandlers,
                    allMembers,
                    [...monitors, createUserIndex]
                  )}
                </div>
                <TitleSectionModal label={`${t('LABEL_CHAT_TASK_NGUOI_GIAM_SAT')}${monitors.length})`} />
                <div className={classes.listChips}>
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
                  {renderAddMemberModal(
                    isOpenAddMonitor,
                    setOpenAddMonitor,
                    monitors,
                    setMonitors,
                    allMembers,
                    [...handlers, createUserIndex]
                  )}
                </div>
              </>
            )
          }
          <TitleSectionModal label={t('LABEL_CHAT_TASK_CHON_MUC_DO')} isRequired />
          <CommonPriorityForm
            labels={priorityList}
            priority={tempSelectedItem.priority.value}
            handleChangeLabel={priorityItem =>
              setParams('priority', priorityItem)
            }
          />
          {
            !isUpdateOfferDetailDescriptionSection && (
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
            )
          }
        </React.Fragment>
      </JobDetailModalWrap>
      {
        openSelectGroupOfferModal &&
        <SelectGroup
          isOpen={true}
          setOpen={(value) => setOpenSelectGroupOfferModal(value)}
          selectedOption={(group) => {
            setParams("offer_group_id", group.id);
            setParams("offer_group_name", group.name)
          }}
          offerGroupSelected={tempSelectedItem.offer_group_id}
        />
      }
    </>
  )
}

export default OfferModal
