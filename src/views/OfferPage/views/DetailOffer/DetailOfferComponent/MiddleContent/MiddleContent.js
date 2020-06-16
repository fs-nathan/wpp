import { Avatar, Button, Grid } from "@material-ui/core";
import { isEmpty } from "helpers/utils/isEmpty";
import { get, size } from "lodash";
import React, { useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ApproveOfferDialog from "views/JobDetailPage/TabPart/OfferTab/TabBody/ApproveOfferDialog";
import { action } from "views/OfferPage/contants/attrs";
import ApprovalConditionModal from "./approvalConditionModal";
import { getApprovalConditionEditingTitle, getCreateApprovalBtnTitle } from './i18nSelectors';
import './styles.scss';

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

  const updateOfferApprovalConditionModal = () => {
    return (
      <ApprovalConditionModal
        open={openUpdateOfferModal}
        setOpen={setOpenUpdateOfferModal}
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
      {
        (isCurrentUserAHandler && !isCurrentUserAlreadyApproved) && (
          <Button
            className="offerDetail-createApprovalBtn"
            variant="contained"
            onClick={() => setOpenModal(true)}
            color="primary"
            disableElevation
          >
            {
              getCreateApprovalBtnTitle(t)
            }
          </Button>
        )
      }
      <div>
        <div className={`offerDetail-approvalStatusBtn offerDetail-approvalStatusBtn-${status_code}`}>
          <span>
            {t("VIEW_OFFER_LABEL_STATUS")}:&nbsp;
            {status_code === 0 && t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_1")}
            {status_code === 1 && t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_2")}
            {status_code === 2 && t("VIEW_OFFER_LABEL_APPROVED")}
            {status_code === 3 && t("VIEW_OFFER_LABEL_REJECTED")}&nbsp;
            ({t("VIEW_OFFER_LABEL_ACCEPTED_PERCENT", { acceptedPercent: rate_accepted })})
          </span>
        </div>
      </div>
      <div className="offerDetail-approvalConditionContainer">
        <div className="offerDetail-approvalConditionContainer-inner">
          <div className="offerDetail-approvalConditionContainer-inner-title">{t("VIEW_OFFER_LABEL_APPROVAL_CONDITION")}</div>
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
              updateOfferApprovalConditionModal()
            )
          }
        </div>
      </div>
      <div className="offerDetail-memberApprovalRateContainer">
        <div>{t("VIEW_OFFER_LABEL_RATE_AGREE")}:&nbsp;&nbsp;&nbsp;≥&nbsp;&nbsp;&nbsp;{get(condition_accept, "min_rate", "0")}%</div>
      </div>
      {
        (get(condition_accept, "min_rate", "0") < 100 || (get(condition_accept, "condition_logic") === "OR" && get(condition_accept, "min_rate", "0") === 100)) && (
          <>
            <div className="offerDetail-memberToAccept-title">
              {get(condition_accept, "condition_logic_member") === "OR"
                ? t("VIEW_OFFER_LABEL_APPROVAL_CONDITION_MEMBER_1")
                : t("VIEW_OFFER_LABEL_APPROVAL_CONDITION_MEMBER_2")}
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

      <div>
        <Grid container direction="row">
          <div className="offerDetail-approvalResult-title">{t("VIEW_OFFER_LABEL_APPROVAL_RESULT")}:&nbsp;</div>
          <div className="offerDetail-approvalResult-result">{t("VIEW_OFFER_LABEL_APPROVED")} ({number_member_accepted}/{size(members_can_approve)}) - {t("VIEW_OFFER_LABEL_REJECTED")} ({number_member_rejected}/{size(members_can_approve)})  </div>
        </Grid>
      </div>
      <div>
        <div className="offerDetail-horizontalLine" />
      </div>

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
            <Grid items xs={7} direction="column">
              <div className="offerDetail-approvalResult-member-name">{get(member, "name")}</div>
              <div className="offerDetail-approvalResult-member-position">{get(member, 'position')} {get(member, 'position') && <span> - </span>} {get(member, 'room')}</div>
              <div>
                {t("VIEW_OFFER_LABEL_APPROVED_AT", { time: member.hour_label, date: member.date_label })}
              </div>
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="column" alignItems="center" >
                {
                  get(member, "status") === 0 &&
                  <div className="offerDetail__result_label bg--green">
                    {t("VIEW_OFFER_LABEL_APPROVED")}
                  </div>
                }
                {
                  get(member, "status") === 1 &&
                  <div className="offerDetail__result_label bg--red">
                    {t("VIEW_OFFER_LABEL_REJECTED")}
                  </div>
                }
              </Grid>
            </Grid>
          </Grid>
        )}
      </Scrollbars>
    </div >
  )
}
export default MiddleContent;
