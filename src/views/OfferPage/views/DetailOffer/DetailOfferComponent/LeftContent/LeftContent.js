import { Avatar, Button, Grid, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
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
import { addMemberHandle, addMemberMonitor, deleteDocumentOffer, deleteMemberHandle, deleteMemberMonitor } from "views/OfferPage/redux/actions";
import CustomAddOfferMemberModal from "../AddOfferMemberModal";
import DocumentFileModal from "../SendFile/DocumentFileModal.js";
import SendFileModal from "../SendFile/SendFileModal";
import { styles } from '../style';
import './styles.scss';





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
    <div className={clsx('offerDetail-detailDescription-offerPriorityName', chipBgColorClassName)}>
      {priority_name}
    </div>
  );
};
const DetailDescription = ({ priority_name, priority_code, type_name, content, title }) => {
  return (
    <>
      <Grid container>
        {!isEmpty(type_name) &&
         <div className="offerDetail-detailDescription-offerTypeName">
           {type_name}
         </div>
        }
        {RenderChipItem(priority_code, priority_name)}
      </Grid>
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

const RenderListFile = ({ can_modify, offer_id, documents }) => {
  const { t } = useTranslation()
  const [deleteDocumentModal, setDeleteDocumentModal] = useState(false)
  const file = useRef(null)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [deletedFileId, setDeletedFileId] = useState([])
  const [selectedItem, setSelectedItem] = useState({ file_id: "", name: "", url: "", file_icon: "" })
  const [openSendFileModal, setOpenSendFileModal] = useState(false)
  const [openDocumentModal, setOpenDocumentModal] = useState(false)
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
  const setOpen = () => {
    setDeleteDocumentModal(false)
  }
  const confirmDeleteDocument = useCallback(() => {
    if (can_modify === false) {
      enqueueSnackbar('You not have permission to access', {
        variant: "warning"
      });

      return
    }
    setDeleteDocumentModal(false)
    dispatch(deleteDocumentOffer({ offer_id, file_id: selectedItem.file_id }))
    // setDeletedFileId((prevValue) => [...prevValue, selectedItem.file_id])
  }, [can_modify, dispatch, enqueueSnackbar, offer_id, selectedItem.file_id])
  const handleOpenDocumentFileModal = () => {
    setOpenDocumentModal(false)
  }
  const handleOpenSendFileModal = () => {
    setOpenSendFileModal(false)
  }
  const onClickShareFromLibrary = () => {
    setOpenSendFileModal(false)
    setOpenDocumentModal(true)
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
            <Grid item xs={6} className="offerDetail-attachedDocument-fileContainer">
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
                <IconButton onClick={() => handleDeleteDocument({ file_id: document.id, ...document })}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </Grid>
          ))}
      </Grid>
      <div className="offerDetail-attachedDocument-addFileBtn">
        <label htmlFor="icon-button-file">
          <Button
            size="small"
            onClick={() => setOpenSendFileModal(true)}
            startIcon={<AddCircle className="offerDetail-addBtn-icon" />}
          >
            <span className="offerDetail-addBtn-title">
              {t("ADD_DOCUMENT_OFFER")}
            </span>
          </Button>
        </label>
        <AlertModal open={deleteDocumentModal} onConfirm={confirmDeleteDocument} setOpen={setOpen} content={renderConfirmRemoveFileModal()} />
        <SendFileModal offer_id={offer_id} open={openSendFileModal} setOpen={handleOpenSendFileModal} onClickShareFromLibrary={onClickShareFromLibrary} />
        <DocumentFileModal offer_id={offer_id} open={openDocumentModal} setOpen={handleOpenDocumentFileModal} />
      </div>
      <div className="offerDetail-horizontalLine" />
    </>
  );
};
const PersonCanApprove = ({ can_modify, offer_id, memberCanAddInApprove, members_can_approve }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openAddApproveModal, setOpenAddApproveModal] = useState(false)

  const handleOpenAddHandleMemberModal = () => {
    setOpenAddApproveModal(false)
  }
  const handleAddMemberApprove = (member) => {
    if (can_modify === false) {
      enqueueSnackbar(t('MESSAGE_NOT_PERMISSION'), {
        variant: "warning"
      });
      return
    }
    let membersID = []
    member.forEach(i => {
      membersID = [...membersID, memberCanAddInApprove[i].id]
    })
    dispatch(addMemberHandle({ offer_id, member_id: membersID }))
  }
  const handleDeleteMemberHandle = ({ member_id }) => {
    if (can_modify === false) {
      enqueueSnackbar(t('MESSAGE_NOT_PERMISSION'), {
        variant: "warning"
      });
      return
    }
    dispatch(deleteMemberHandle({ offer_id, member_id }))
  }
  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <div className="offerDetail-handlingPerson-title">{t('PERSON_HANDLE')}</div>
          <Button
            size="small"
            onClick={() => setOpenAddApproveModal(true)}
            startIcon={<AddCircle className="offerDetail-addBtn-icon" />}
          >
            <span className="offerDetail-addBtn-title">
              {t("ADD_PERSON_HANDLE")}
            </span>
          </Button>
        </Grid>
        <Grid item xs={7}>
          <Grid container>
            {!isEmpty(members_can_approve) && (
              members_can_approve.map((member, i) => (
                <Grid item xs={12} style={{ marginTop: '2px' }} direction="row" alignItems="center" justify="center">
                  <Grid container>
                    <Grid item xs={2}>
                      <Avatar src={get(member, "avatar")} />
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        className="offerDetail-handlingPerson-infoContainer"
                        justify="center"
                      >
                        <div className="offerDetail-handlingPerson-name">{get(member, "name")}</div>
                        <div className="offerDetail-handlingPerson-position">{get(member, "position")}</div>
                      </Grid>
                    </Grid>

                    <IconButton onClick={() => handleDeleteMemberHandle({ member_id: get(member, "id") })} >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className="offerDetail-horizontalLine" />
      <CustomAddOfferMemberModal members={memberCanAddInApprove} onChange={handleAddMemberApprove} isOpen={openAddApproveModal} setOpen={handleOpenAddHandleMemberModal} />
    </>
  );
};
const PersonMonitor = ({ can_modify, offer_id, memberCanAddInMonitor, members_monitor }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();



  const handleAddMember = (member) => {
    if (can_modify === false) {
      enqueueSnackbar(t('MESSAGE_NOT_PERMISSION'), {
        variant: "warning"
      });

      return
    }
    let membersID = []
    member.forEach(i => {
      membersID = [...membersID, memberCanAddInMonitor[i].id]
    })
    dispatch(addMemberMonitor({ offer_id, member_id: membersID }))
  }
  const handleOpenAddMonitorModal = () => {
    setOpenAddMonitorModal(false)
  }
  const handleDeleteMemberMonitor = ({ member_id, offer_id }) => {
    if (can_modify === false) {
      enqueueSnackbar(t('MESSAGE_NOT_PERMISSION'), {
        variant: "warning"
      });

      return
    }
    dispatch(deleteMemberMonitor({ offer_id, member_id }))
  }
  const [openAddMonitorModal, setOpenAddMonitorModal] = useState(false)
  return (
    <Grid container>
      <Grid item xs={5}>
        <div className="offerDetail-monitoringPerson-title">Người giám sát</div>
        <Button
          size="small"
          onClick={() => setOpenAddMonitorModal(true)}
          startIcon={<AddCircle className="offerDetail-addBtn-icon" />}
        >
          <span className="offerDetail-addBtn-title">
            {t('ADD_PERSON_MONITOR')}
          </span>
        </Button>
      </Grid>
      <Grid item xs={7}>
        <Grid container>
          {!isEmpty(members_monitor) && (
            members_monitor.map(member => (
              <Grid item xs={12} direction="row" alignItems="center" justify="center">
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar src={get(member, "avatar")} />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      className="offerDetail-monitoringPerson-infoContainer"
                      justify="center"
                    >
                      <h5 className="offerDetail-monitoringPerson-name">{get(member, "name")}</h5>
                      <div className="offerDetail-monitoringPerson-position">{get(member, "position")}</div>
                    </Grid>
                  </Grid>
                  <IconButton onClick={() => handleDeleteMemberMonitor({ offer_id, member_id: get(member, "id") })} >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <CustomAddOfferMemberModal members={memberCanAddInMonitor} onChange={handleAddMember} isOpen={openAddMonitorModal} setOpen={handleOpenAddMonitorModal} />
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
  user_create_name,
  user_create_avatar,
  user_create_id,
  members_monitor,
  id
}) {
  const classes = styles();
  const currentUserId = useSelector(state => state.system.profile.id);
  const [members, setMembers] = useState([])

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
  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const memberCanAdd = () => {
    return lodash.differenceBy(members, members_can_approve, members_monitor, 'id')
  }
  return (
    <Grid item xs={6}>
      <PersonInfo
        date_label={date_label}
        hour_label={hour_label}
        user_create_position={user_create_position}
        user_create_name={user_create_name}
        user_create_avatar={user_create_avatar}
      />
      <DetailDescription
        type_name={type_name}
        priority_name={priority_name}
        priority_code={priority_code}
        content={content}
        title={title}
      />
      <RenderListFile can_modify={can_modify} offer_id={id} documents={documents} />
      <PersonCanApprove can_modify={can_modify} offer_id={id} memberCanAddInApprove={memberCanAdd()} members_can_approve={members_can_approve} />
      <PersonMonitor can_modify={can_modify} offer_id={id} memberCanAddInMonitor={memberCanAdd()} members_monitor={members_monitor} />
    </Grid>
  );
}
