import { Avatar, Button, Grid } from "@material-ui/core";
import { isEmpty } from "helpers/utils/isEmpty";
import get from "lodash/get";
import React, { useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ApproveOfferDialog from "views/JobDetailPage/TabPart/OfferTab/TabBody/ApproveOfferDialog";
import { action } from "views/OfferPage/contants/attrs";
import OfferModal from '../../../../../JobDetailPage/TabPart/OfferTab/OfferModal';
import './styles.scss';
import {
  getApprovalAcceptedBtnTitle,
  getApprovalConditionEditingTitle,
  getCreateApprovalBtnTitle,
} from './i18nSelectors';

const MiddleContent = ({
                         can_update_condition_accept,
                         status_code,
                         rate_accepted,
                         members_approved,
                         number_member_rejected,
                         number_member_accepted,
                         date_label,
                         hour_label,
                         content,
                         title,
                         id,
                         priority_code,
                         user_create_name,
                         condition_accept,
                         members_can_approve,
                         user_create_avatar,
                       }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateOfferModal, setOpenUpdateOfferModal] = useState(false);
  const currentUserId = useSelector(state => state.system.profile.id);
  const isCurrentUserAHandler = useMemo(() => {
    return members_can_approve
           && members_can_approve.findIndex(member => member.id === currentUserId) !== -1;
  }, [currentUserId, members_can_approve]);
  const isCurrentUserAlreadyApproved = useMemo(() => {
    return members_approved
           && members_approved.findIndex(member => member.id === currentUserId) !== -1;
  }, [currentUserId, members_approved]);

  const renderUpdateOfferApprovalConditionModal = () => {
    return (
      <OfferModal
        isOpen={openUpdateOfferModal}
        setOpen={setOpenUpdateOfferModal}
        isUpdateOfferApprovalCondition
        item={{
          id: id,
          min_rate_accept: condition_accept.min_rate,
          condition_logic: condition_accept.condition_logic,
          condition_logic_member: condition_accept.condition_logic_member,
          handlers: members_can_approve,
          approvers: condition_accept.member_accept,
        }}
      />
    );
  }
  return (
    <div className="offerDetail-middleContent-container">
      <ApproveOfferDialog
        isOpen={openModal}
        setOpen={setOpenModal}
        item={{
          user_create_avatar,
          content,
          title,
          user_create_name,
          priority_code,
          id,
          date_create: hour_label + " " + date_label,
          action: action.HANDLE_OFFER
        }}
      />
      <Button
        className="offerDetail-createApprovalBtn"
        variant="contained"
        onClick={() => setOpenModal(true)}
        color="primary"
        disableElevation
        disabled={!isCurrentUserAHandler || isCurrentUserAlreadyApproved}
      >
        {
          isCurrentUserAHandler && isCurrentUserAlreadyApproved
            ? getApprovalAcceptedBtnTitle(t)
            : getCreateApprovalBtnTitle(t)

        }
      </Button>
      <div>
        <Button className="offerDetail-approvalStatusBtn" variant="contained" color="primary" disableElevation>
          Trạng thái: {status_code === 0 && "Đang chờ xử lý"} {status_code === 1 && "Đang duyệt"} {status_code === 2 && "Chấp nhận"} {status_code === 3 && "Từ chối"} ({rate_accepted}% đồng ý)
        </Button>
      </div>
      <div className="offerDetail-approvalConditionContainer">
        <div className="offerDetail-approvalConditionContainer-inner">
          <div className="offerDetail-approvalConditionContainer-inner-title">Điều kiện phê duyệt đồng ý</div>
          {
            can_update_condition_accept && (
              <Button
                className="offerDetail-approvalConditionContainer-inner-editBtn"
                size="small"
                onClick={() => setOpenUpdateOfferModal(true)}
              >
                {getApprovalConditionEditingTitle(t)}
              </Button>
            )
          }
          {
            openUpdateOfferModal && (
              renderUpdateOfferApprovalConditionModal()
            )
          }
        </div>
      </div>
      <div className="offerDetail-memberApprovalRateContainer">
        <div>Tỷ lệ thành viên đồng ý:&nbsp;&nbsp;&nbsp;≥&nbsp;&nbsp;&nbsp;{get(condition_accept, "min_rate", "0")}%</div>
      </div>
      {
        get(condition_accept, "min_rate", "0") < 100 && (
          <>
            <div className="offerDetail-memberToAccept-title">
              {get(condition_accept, "condition_logic_member") === "OR"
                ? "Một trong các thành viên sau phải đồng ý:"
                : "Tất cả thành viên sau phải đồng ý:"}
            </div>
            <div className="offerDetail-memberToAccept-container">
              <Grid container>
                {get(condition_accept, "member_accept", []).map(member =>
                  <>
                    <Grid item xs={4}>
                      <div className="offerDetail-memberToAccept-item">
                        <Avatar className="offerDetail-memberToAccept-item-avatar" src={member.avatar} />
                        <div className="offerDetail-memberToAccept-item-name">{member.name}</div>
                      </div>
                    </Grid>
                  </>
                )}
              </Grid>
            </div>
          </>
        )
      }
      {/* - */}
      <div>
        <Grid container direction="row">
          <div className="offerDetail-approvalResult-title">Kết quả phê duyệt:&nbsp;</div>
          <div className="offerDetail-approvalResult-result">Đồng ý ({number_member_accepted}) - Từ chối ({number_member_rejected})  </div>
        </Grid>
      </div>
      <div>
        <div className="offerDetail-horizontalLine" />
      </div>
      {/* - */}
      <Scrollbars autoHide autoHideTimeout={500}>
        {!isEmpty(members_approved) && members_approved.map(member =>
          <Grid
            className="offerDetail-approvalResult-member-container"
            container
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid items>
              <Avatar
                className="offerDetail-approvalResult-member-avatar"
                src={get(member, "avatar")}
              />
            </Grid>
            <Grid items xs={8} direction="column">
              <div className="offerDetail-approvalResult-member-name">{get(member, "name")}</div>
              <div className="offerDetail-approvalResult-member-position">{get(member, 'position')}</div>
              <div>{`Phê duyệt lúc ${member.hour_label} ngày ${member.date_label}`}</div>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="column" alignItems="center" >
                {
                  get(member, "status") === 0 &&
                  <Button variant="contained" size="small" disableElevation className="bg--green">
                    Đồng ý
                  </Button>
                }
                {
                  get(member, "status") === 1 &&
                  <Button variant="contained" size="small" disableElevation className="bg--red">
                    Từ chối
                  </Button>
                }
                {/* <Popover /> */}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Scrollbars>
    </div >
  )
}
export default MiddleContent;
