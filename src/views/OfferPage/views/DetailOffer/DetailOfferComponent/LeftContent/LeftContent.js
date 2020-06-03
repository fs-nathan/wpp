import { Avatar, Button, Grid, IconButton, TextField } from '@material-ui/core';
import { AddCircle } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import AlertModal from "components/AlertModal";
import { apiService } from "constants/axiosInstance";
import lodash from 'lodash';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemberHandle,
  addMemberMonitor,
  deleteDocumentOffer,
  deleteMemberHandle,
  deleteMemberMonitor,
  uploadDocumentOffer,
} from 'views/OfferPage/redux/actions';
import { listUserOfGroup } from '../../../../../../actions/user/listUserOfGroup';
import { bgColorSelector } from '../../../../../../reducers/setting/selectors';
import { allMembersSelector } from '../../../../../../reducers/user/listOfUserGroup/selectors';
import SendFileModal from '../../../../../JobDetailPage/ChatComponent/SendFile/SendFileModal';
import AddOfferMemberModal from '../../../../../JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';
import OfferModal from '../../../../../JobDetailPage/TabPart/OfferTab/OfferModal';
import CustomAddOfferMemberModal from "../AddOfferMemberModal";
import './styles.scss';
import { getPriorityEditingTitle } from './i18nSelectors';





const PersonInfo = ({
  hour_label,
  date_label,
  user_create_position,
  user_create_avatar,
  user_create_name,
}) => {
  return (
    <>
      <Grid container className="offerDetail">
        <Grid item xs={2}>
          <Avatar className="offerDetail-personInfo-avatar" src={user_create_avatar} />
        </Grid>
        <div className="offerDetail-personInfo-middleSpacing" />
        <Grid item>
          <div className="offerDetail-personInfo-userCreateName">{user_create_name}</div>
          <div className="offerDetail-personInfo-userCreatePosition">{user_create_position}</div>
          <div className="offerDetail-personInfo-timeCreated">
            Đã tạo đề xuất lúc {hour_label} ngày {date_label}
          </div>
        </Grid>
      </Grid>
      <div className="offerDetail-horizontalLine"></div>
    </>
  );
};

const RenderChipItem = (priority_code, priority_name) => {
  let chipBgColorClassName;
  switch (priority_code) {
    case 0:
      chipBgColorClassName = 'bg--orange';
      break;
    case 1:
      chipBgColorClassName = 'bg--red';
      break;
    case 2:
      chipBgColorClassName = 'bg--red';
      break;
    default:
      chipBgColorClassName = 'bg--orange';
  }
  return (
    <div className={
      clsx(
        'offerDetail-detailDescription-priorityAndOfferTypeContainer-chipContainer-offerPriorityName',
        chipBgColorClassName
      )
    }>
      {priority_name}
    </div>
  );
};
const RenderUpdateOfferDetailDescriptionSectionModal = (
  openUpdateOfferModal, setOpenUpdateOfferModal, offerId, title, content, priorityCode, offerGroupId
) => {
  return (
    <OfferModal
      isOpen={openUpdateOfferModal}
      setOpen={setOpenUpdateOfferModal}
      isUpdateOfferDetailDescriptionSection
      item={{
        id: offerId,
        title,
        content,
        priority_code: priorityCode,
        offer_group_id: offerGroupId
      }}
    />
  );
};
const DetailDescription = ({ offer_id, priority_name, priority_code, type_name, content, title, offer_group_id, can_modify }) => {
  const { t } = useTranslation();
  const [openUpdateOfferModal, setOpenUpdateOfferModal] = useState(false);

  return (
    <>
      <div className="offerDetail-detailDescription-priorityAndOfferTypeContainer">
        <div className="offerDetail-detailDescription-priorityAndOfferTypeContainer-chipContainer">
          {!isEmpty(type_name) &&
           <div className="offerDetail-detailDescription-priorityAndOfferTypeContainer-chipContainer-offerTypeName">
             {type_name}
           </div>
          }
          {RenderChipItem(priority_code, priority_name)}
        </div>
        {
          can_modify && (
            <Button
              className="offerDetail-detailDescription-priorityAndOfferTypeContainer-editBtn"
              size="small"
              onClick={() => setOpenUpdateOfferModal(true)}
            >
              {getPriorityEditingTitle(t)}
            </Button>
          )
        }
        {
          openUpdateOfferModal && (
            RenderUpdateOfferDetailDescriptionSectionModal(
              openUpdateOfferModal,
              setOpenUpdateOfferModal,
              offer_id,
              title,
              content,
              priority_code,
              offer_group_id
            )
          )
        }
      </div>
      <div>
        <div className="offerDetail-detailDescription-title">{title}</div>
      </div>
      <div>
        <div className="offerDetail-detailDescription-detailSection">Mô tả chi tiết</div>
      </div>
      <div>
        <p className="offerDetail-detailDescription-content">{content}</p>
      </div>
    </>
  );
};

const RenderListFile = ({ can_modify, offer_id, documents, bgColor }) => {
  const { t } = useTranslation()
  const [deleteDocumentModal, setDeleteDocumentModal] = useState(false)
  const dispatch = useDispatch()
  const [deletedFileId, setDeletedFileId] = useState([])
  const [selectedItem, setSelectedItem] = useState({ file_id: "", name: "", url: "", file_icon: "" })
  const [openSendFileModal, setOpenSendFileModal] = useState(false)
  const handleDeleteDocument = ({ file_id, name, url, file_icon }) => {
    setSelectedItem({ file_id, name, url, file_icon })
    setDeleteDocumentModal(true)
  }
  const renderConfirmRemoveFileModal = () => {
    return (
      <>
        <Grid container direction="column" justify="center" alignItems="center">
          <p>Bạn có muốn xoá file sau?</p>
          <div style={{ textAlign: "center" }}>
            <a target="_blank"
              href={get(selectedItem, "url")}>
              <img height="50" width="50" alt="file" src={get(selectedItem, "file_icon")} />
              <div>{get(selectedItem, "name")}</div>
            </a>
          </div>
        </Grid>
      </>
    )
  }
  const confirmDeleteDocument = useCallback(() => {
    dispatch(deleteDocumentOffer({ offer_id, file_id: selectedItem.file_id }))
    // setDeletedFileId((prevValue) => [...prevValue, selectedItem.file_id])
  }, [dispatch, offer_id, selectedItem.file_id])
  const handleUploadSelectedFilesFromPC = async (e) => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append("offer_id", offer_id);
    [...files].forEach(file => formData.append("file", file, file.name));
    dispatch(uploadDocumentOffer({ data: formData }));
  }
  const handleSelectedFilesFromLibrary = (selectedFiles) => {
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("offer_id", offer_id);
      selectedFiles.forEach((file, index) => formData.append(`file_ids[${index}]`, file.id));
      dispatch(uploadDocumentOffer({ data: formData }))
    }
  }
  const reRenDerDocumentsOnDelete = useMemo(() => {
    if (isEmpty(documents)) {
      return []
    }
    return documents.filter(document => !deletedFileId.includes(document.id))
  }, [deletedFileId, documents])
  return (
    <>
      <div>
        <div className="offerDetail-attachedDocument-title">Tài liệu đính kèm</div>
      </div>
      <Grid container spacing="2">
        {!isEmpty(documents) &&
          reRenDerDocumentsOnDelete.map((document) => (
            <Grid item xs={5} className="offerDetail-attachedDocument-fileContainer">
              <div
                className="offerDetail-attachedDocument-fileIcon"
              >
                <img height="30" width="30" src={get(document, "file_icon")} />
                <a
                  target="_blank"
                  href={get(document, "url")}
                >
                  <div className="offerDetail-attachedDocument-fileName">{get(document, "name")}</div>
                </a>
                {
                  can_modify && (
                    <IconButton onClick={() => handleDeleteDocument({ file_id: document.id, ...document })}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )
                }
              </div>
            </Grid>
          ))}
      </Grid>
      {
        can_modify && (
          <IconButton
            className="offerDetail-addBtn"
            onClick={() => setOpenSendFileModal(true)}
          >
            <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
            <span className="offerDetail-addBtn-title">{t('ADD_DOCUMENT_OFFER')}</span>
          </IconButton>
        )
      }
      <AlertModal
        open={deleteDocumentModal}
        setOpen={setDeleteDocumentModal}
        onConfirm={confirmDeleteDocument}
        content={renderConfirmRemoveFileModal()}
      />
      <SendFileModal
        open={openSendFileModal}
        setOpen={setOpenSendFileModal}
        handleUploadFile={handleUploadSelectedFilesFromPC}
        onConfirmShare={handleSelectedFilesFromLibrary}
      />
      <div className="offerDetail-horizontalLine" />
    </>
  );
};
const Handler = ({ can_update_member_handle, offer_id, userCreateId, allMembers, addedHandlers, addableHandlers, bgColor }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openAddHandlerModal, setOpenAddHandlerModal] = useState(false);
  const [newHandlerIndexes, setNewHandlerIndexes] = useState([]);

  const disabledMemberIndexes = [];
  allMembers.forEach((member, idx) => {
    (
      addableHandlers.every(handler => member.id !== handler.id)
      || member.id === userCreateId
    )
    && disabledMemberIndexes.push(idx);
  })

  const onAddHandler = (members) => {
    setNewHandlerIndexes(members);
    const memberIds = [];
    members.forEach(idx => {
      memberIds.push(allMembers[idx].id);
    })
    dispatch(addMemberHandle({ offer_id, member_id: memberIds }))
  }
  const onDeleteHandler = ({ offer_id, member_id }) => {
    dispatch(deleteMemberHandle({ offer_id, member_id }))
  }
  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <div className="offerDetail-handlingPerson-title">{t('PERSON_HANDLE')}</div>
          {
            can_update_member_handle && (
              <IconButton
                className="offerDetail-addBtn"
                onClick={() => setOpenAddHandlerModal(true)}
              >
                <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
                <span className="offerDetail-addBtn-title">{t('ADD_PERSON_HANDLE')}</span>
              </IconButton>
            )
          }
        </Grid>
        <Grid item xs={7}>
          <Grid container>
            {!isEmpty(addedHandlers) && (
              addedHandlers.map((member, i) => (
                <Grid item xs={12} className="offerDetail-handlingPerson-item">
                  <Grid container>
                    <Grid item xs={2}>
                      <Avatar src={get(member, "avatar")} />
                    </Grid>
                    <Grid item>
                      <div className="offerDetail-handlingPerson-infoContainer">
                        <div className="offerDetail-handlingPerson-name">{get(member, "name")}</div>
                        <div className="offerDetail-handlingPerson-position">{get(member, "position")}</div>
                      </div>
                    </Grid>
                    {
                      can_update_member_handle && (
                        <IconButton
                          className="offerDetail-handlingPerson-deleteBtn"
                          onClick={() => onDeleteHandler({ offer_id, member_id: get(member, "id") })}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )
                    }
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className="offerDetail-horizontalLine" />
      <AddOfferMemberModal
        isOpen={openAddHandlerModal}
        setOpen={setOpenAddHandlerModal}
        members={allMembers}
        disableIndexes={disabledMemberIndexes}
        value={newHandlerIndexes}
        onChange={onAddHandler}
      />
    </>
  );
};
const Monitor = ({ can_update_member_monitor, offer_id, userCreateId, allMembers, addedMonitors, addableMonitors, bgColor }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openAddMonitorModal, setOpenAddMonitorModal] = useState(false);
  const [newMonitorIndexes, setNewMonitorIndexes] = useState([]);

  const disabledMemberIndexes = [];
  allMembers.forEach((member, idx) => {
    (
      addableMonitors.every(monitor => member.id !== monitor.id)
      || member.id === userCreateId
    )
    && disabledMemberIndexes.push(idx);
  })

  const onAddMonitor = (members) => {
    setNewMonitorIndexes(members);
    const memberIds = [];
    members.forEach(idx => {
      memberIds.push(allMembers[idx].id);
    })
    dispatch(addMemberMonitor({ offer_id, member_id: memberIds }))
  }
  const onDeleteMonitor = ({ offer_id, member_id }) => {
    dispatch(deleteMemberMonitor({ offer_id, member_id }))
  }
  return (
    <Grid container>
      <Grid item xs={5}>
        <div className="offerDetail-monitoringPerson-title">Người giám sát</div>
        {
          can_update_member_monitor && (
            <IconButton
              className="offerDetail-addBtn"
              onClick={() => setOpenAddMonitorModal(true)}
            >
              <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
              <span className="offerDetail-addBtn-title">{t('ADD_PERSON_MONITOR')}</span>
            </IconButton>
          )
        }
      </Grid>
      <Grid item xs={7}>
        <Grid container>
          {!isEmpty(addedMonitors) && (
            addedMonitors.map(member => (
              <Grid item xs={12} className="offerDetail-monitoringPerson-item">
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar src={get(member, "avatar")} />
                  </Grid>
                  <Grid item>
                    <div className="offerDetail-monitoringPerson-infoContainer">
                      <div className="offerDetail-monitoringPerson-name">{get(member, "name")}</div>
                      <div className="offerDetail-monitoringPerson-position">{get(member, "position")}</div>
                    </div>
                  </Grid>
                  {
                    can_update_member_monitor && (
                      <IconButton
                        className="offerDetail-monitoringPerson-deleteBtn"
                        onClick={() => onDeleteMonitor({ offer_id, member_id: get(member, "id") })}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )
                  }
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <AddOfferMemberModal
        isOpen={openAddMonitorModal}
        setOpen={setOpenAddMonitorModal}
        members={allMembers}
        disableIndexes={disabledMemberIndexes}
        value={newMonitorIndexes}
        onChange={onAddMonitor}
      />
    </Grid>


  );
};
export default function LeftContent({
  members_can_approve,
  documents,
  date_label,
  hour_label,
  user_create_position,
  priority_name,
  priority_code,
  type_name,
  title,
  content,
  can_modify,
  can_update_member_handle,
  can_update_member_monitor,
  user_create_name,
  user_create_avatar,
  user_create_id,
  members_monitor,
  offer_group_id,
  id
}) {
  const dispatch = useDispatch();
  const bgColor = useSelector(state => bgColorSelector(state));
  const currentUserId = useSelector(state => state.system.profile.id);
  const { members: allMembers } = useSelector(state => allMembersSelector(state));
  useEffect(() => {
    dispatch(listUserOfGroup(false));
  }, [currentUserId])

  const addableMembers = useMemo(
    () => lodash.differenceBy(allMembers, members_can_approve, members_monitor, 'id'),
    [allMembers, members_can_approve, members_monitor]
  );
  return (
    <Grid item xs={6} className="offerDetail-leftContent-container">
      <PersonInfo
        date_label={date_label}
        hour_label={hour_label}
        user_create_position={user_create_position}
        user_create_name={user_create_name}
        user_create_avatar={user_create_avatar}
      />
      <DetailDescription
        offer_id={id}
        type_name={type_name}
        priority_name={priority_name}
        priority_code={priority_code}
        content={content}
        title={title}
        offer_group_id={offer_group_id}
        can_modify={can_modify}
      />
      <RenderListFile
        can_modify={can_modify}
        offer_id={id}
        documents={documents}
        bgColor={bgColor}
      />
      <Handler
        can_update_member_handle={can_update_member_handle}
        offer_id={id}
        userCreateId={user_create_id}
        allMembers={allMembers}
        addedHandlers={members_can_approve}
        addableHandlers={addableMembers}
        bgColor={bgColor}
      />
      <Monitor
        can_update_member_monitor={can_update_member_monitor}
        offer_id={id}
        userCreateId={user_create_id}
        allMembers={allMembers}
        addedMonitors={members_monitor}
        addableMonitors={addableMembers}
        bgColor={bgColor}
      />
    </Grid>
  );
}
