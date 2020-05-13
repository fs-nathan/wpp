import { Avatar, Button, Grid, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
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
import CustomAddOfferMemberModal from "./AddOfferMemberModal";
import DocumentFileModal from "./SendFile/DocumentFileModal.js";
import SendFileModal from "./SendFile/SendFileModal";
import { styles } from './style';





const InforPerson = ({
  hour_label,
  date_label,
  user_create_position,
  user_create_avatar,
  user_create_name,
}) => {
  const classes = styles();
  return (
    <Grid container className={`${classes.border_bottom} ${classes.pb_1}`}>
      <Grid item xs={2}>
        <Avatar className={classes.avatar} src={user_create_avatar} />
      </Grid>
      <Grid item>
        <div className={classes.name}>{user_create_name}</div>
        <div>{user_create_position}</div>
        <div>
          Đã tạo lúc {hour_label} ngày {date_label}
        </div>
      </Grid>
    </Grid>
  );
};
const Detail = ({ priority_name, priority_code, type_name, content, title }) => {
  const classes = styles();
  return (
    <>
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        <h4>Mô tả chi tiết</h4>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <Grid container>
        {!isEmpty(type_name) &&
          <div className={`${classes.bg_blue} ${classes.status_title}`}>
            {type_name}
          </div>
        }
        {
          priority_code === 0 && (
            <div
              className={classNames(classes.bg_orange, classes.status_file, classes.ml_1)}
            >
              {priority_name}
            </div>
          )
        }
        {
          priority_code === 1 && (
            <div
              className={classNames(classes.bg_red, classes.status_file, classes.ml_1)}
            >
              {priority_name}
            </div>
          )
        }
        {
          priority_code === 2 && (
            <div
              className={classNames(classes.bg_red, classes.status_file, classes.ml_1)}
            >
              {priority_name}
            </div>
          )
        }
      </Grid>
    </>
  );
};

const RenderListFile = ({ can_modify, offer_id, documents }) => {
  const classes = styles();
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
  const renderFile = () => {
    return (
      <>
        <Grid container direction="column" justify="center" alignItems="center">
          <p>Bạn có muốn xoá file sau?</p>
          <div style={{ textAlign: "center" }}>
            <a target="_blank"
              href={get(selectedItem, "url")}>
              <img height="50" width="50" alt="file" src={get(selectedItem, "file_icon")} />
              <div className={classes.icon_name}>{get(selectedItem, "name")}</div>
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
        <h4>Tài liệu đính kèm</h4>
      </div>
      <Grid container spacing="2">
        {!isEmpty(documents) &&
          reRenDerDocumentsOnDelete.map((document) => (
            <Grid item xs={6} >
              <div
                className={classes.icon_file}
              >
                <img height="30" width="30" src={get(document, "file_icon")} />
                <a target="_blank"
                  href={get(document, "url")}>
                  <div className={classes.icon_name}>{get(document, "name")}</div>
                </a>

                <IconButton style={{ marginLeft: "auto" }} onClick={() => handleDeleteDocument({ file_id: document.id, ...document })}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </Grid>
          ))}
      </Grid>
      <div
        className={`${classes.mt_1} ${classes.border_bottom} ${classes.pb_1}`}
      >
        <label htmlFor="icon-button-file">
          <Button
            size="small"
            onClick={() => setOpenSendFileModal(true)}
            startIcon={
              <AddCircle
                className={`${classes.color_blue} ${classes.add_file_button}`}
              />
            }
          >
            <span className={classes.handle_button}>
              {t("ADD_DOCUMENT_OFFER")}
            </span>
          </Button>
        </label>
        <AlertModal open={deleteDocumentModal} onConfirm={confirmDeleteDocument} setOpen={setOpen} content={renderFile()} />
        <SendFileModal offer_id={offer_id} open={openSendFileModal} setOpen={handleOpenSendFileModal} onClickShareFromLibrary={onClickShareFromLibrary} />
        <DocumentFileModal offer_id={offer_id} open={openDocumentModal} setOpen={handleOpenDocumentFileModal} />
      </div>
    </>
  );
};
const PersonCanApprove = ({ can_modify, offer_id, memberCanAddInApprove, members_can_approve }) => {
  const classes = styles();
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
      <Grid container className={classNames(classes.border_bottom, classes.pb_1, classes.mt_1)}>
        <Grid item xs={5}>
          <h4 className={classes.m_0}>{t('PERSON_HANDLE')}</h4>
          <Button

            size="small"
            onClick={() => setOpenAddApproveModal(true)}
            startIcon={
              <AddCircle
                className={`${classes.color_blue} ${classes.add_file_button}`}
              />
            }
          >
            <span className={classes.handle_button}>
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
                        className={`${classes.h_100} ${classes.ml_1}`}
                        justify="center"
                      >
                        <h5 className={classes.m_0}>{get(member, "name")}</h5>
                        <div className={classes.color_orange}>{get(member, "position")}</div>
                      </Grid>
                    </Grid>

                    <IconButton style={{ marginLeft: "auto" }} onClick={() => handleDeleteMemberHandle({ member_id: get(member, "id") })} >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
      <CustomAddOfferMemberModal members={memberCanAddInApprove} onChange={handleAddMemberApprove} isOpen={openAddApproveModal} setOpen={handleOpenAddHandleMemberModal} />
    </>
  );
};
const PersonMonitor = ({ can_modify, offer_id, memberCanAddInMonitor, members_monitor }) => {
  const classes = styles();
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
    <Grid container className={classNames(classes.border_top, classes.pt_1)}>
      <Grid item xs={5}>
        <h4 className={classes.m_0}>Người giám sát</h4>
        <Button
          size="small"
          onClick={() => setOpenAddMonitorModal(true)}
          startIcon={
            <AddCircle
              className={`${classes.color_blue} ${classes.add_file_button}`}
            />
          }
        >
          <span className={classes.handle_button}>
            {t('ADD_PERSON_MONITOR')}
          </span>
        </Button>
      </Grid>
      <Grid item xs={7}>
        <Grid container>
          {!isEmpty(members_monitor) && (
            members_monitor.map(member => (
              <Grid item xs={12} direction="row" style={{ marginTop: '2px' }} alignItems="center" justify="center">
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar src={get(member, "avatar")} />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      className={`${classes.h_100} ${classes.ml_1}`}
                      justify="center"
                    >
                      <h5 className={classes.m_0}>{get(member, "name")}</h5>
                      <div className={classes.color_orange}>{get(member, "position")}</div>
                    </Grid>
                  </Grid>
                  <IconButton style={{ marginLeft: "auto" }} onClick={() => handleDeleteMemberMonitor({ offer_id, member_id: get(member, "id") })} >
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
    <Grid item xs={6} className={classes.border_right}>
      <InforPerson
        date_label={date_label}
        hour_label={hour_label}
        user_create_position={user_create_position}
        user_create_name={user_create_name}
        user_create_avatar={user_create_avatar}
      />
      <Detail
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
