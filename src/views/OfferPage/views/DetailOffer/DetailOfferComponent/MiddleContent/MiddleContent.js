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
  status_name,
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
  additionQuery,
  learn_more_redirect
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

  /*function handleDeleteApproval() {
    dispatch(deleteApproval({ offer_id: id, member_id: selectedMemberID }));
  }*/

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
        additionQuery={additionQuery}
      />
    );
  }

  return (
    <div className="offerDetail-middleContent-container">
      <Scrollbars autoHide autoHideTimeout={500}>
        <div className="offerDetail-middleContent-padding">
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
              action: action.HANDLE_OFFER,
              learn_more_redirect
            }}
            additionQuery={additionQuery}
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
                {t("VIEW_OFFER_LABEL_STATUS")}:&nbsp;{status_name}&nbsp;({t("VIEW_OFFER_LABEL_ACCEPTED_PERCENT", { acceptedPercent: rate_accepted })})
          </span>
            </div>
          </div>
          <div className="offerDetail-approvalConditionContainer">
            <div className="offerDetail-approvalConditionContainer-inner">
              <div className="offerDetail-approvalConditionContainer-inner-title">{t("VIEW_OFFER_LABEL_APPROVAL_CONDITION")}</div>
              {
                can_update_condition_accept && (
                  <Button
                    className="offerDetail-approvalConditionContainer-inner-editBtn button-edit-condition-approved"
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
            <div>
              {t("VIEW_OFFER_LABEL_RATE_AGREE")}:&nbsp;&nbsp;&nbsp;???&nbsp;&nbsp;&nbsp;{get(condition_accept, "min_rate", "0")}%
              &nbsp; {
              get(condition_accept, "member_accept", []).length !== 0 && <span style={{textTransform: "uppercase"}}>{t(`VIEW_OFFER_LABEL_CONDITION_LOGIC_${get(condition_accept, 'condition_logic', 'OR')}`)}</span>
            }
            </div>
          </div>
          {
            (get(condition_accept, "min_rate", "0") < 100 || (get(condition_accept, "condition_logic") === "OR" && get(condition_accept, "min_rate", "0") === 100)) && (
              <>
                {
                  get(condition_accept, "member_accept", []).length !== 0 && (
                    <div className="offerDetail-memberToAccept-title">
                      {get(condition_accept, "condition_logic_member") === "OR"
                        ? t("VIEW_OFFER_LABEL_APPROVAL_CONDITION_MEMBER_1")
                        : t("VIEW_OFFER_LABEL_APPROVAL_CONDITION_MEMBER_2")}
                    </div>
                  )
                }
                <div className="offerDetail-memberToAccept-container">
                  <Grid container>
                    {get(condition_accept, "member_accept", []).map(member =>
                      <React.Fragment key={"member-approved-" + member.id}>
                        <Grid item xs={12} className="offerDetail-handlingPerson-item">
                          <Grid container>
                            <Grid item xs={1}>
                              <Avatar src={get(member, "avatar")} />
                            </Grid>
                            <Grid item>
                              <div className="offerDetail-handlingPerson-infoContainer">
                                <div className="offerDetail-handlingPerson-name">{get(member, "name")}</div>
                                <div className="offerDetail-handlingPerson-position">{get(member, "position")}</div>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </React.Fragment>
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
          {!isEmpty(members_approved) && members_approved.map(member =>
            <Grid
              className="offerDetail-approvalResult-member-container"
              container
              justify="space-between"
              alignItems="flex-start"
              key={member.id}
            >
              <Grid>
                <Avatar
                  className="offerDetail-approvalResult-member-avatar"
                  src={get(member, "avatar")}
                />
              </Grid>
              <Grid item xs={7} container direction="column">
                <div className="offerDetail-approvalResult-member-name">{get(member, "name")}</div>
                <div className="offerDetail-approvalResult-member-position">{get(member, 'position')} {get(member, 'position') && <span> - </span>} {get(member, 'room')}</div>
                <div className="offerDetail-approvalResult-member-date">
                  {t("VIEW_OFFER_LABEL_APPROVED_AT", { time: member.hour_label, date: member.date_label })}
                </div>
                <div className="offerDetail-approval offerDetail-approval-content-approved">
                  {get(member, "content_approved")}
                </div>
              </Grid>
              <Grid item xs={3}>
                <div style={{textAlign: "center"}}>
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
                </div>
              </Grid>
            </Grid>
          )}
        </div>
      </Scrollbars>
    </div>
  )
}
export default MiddleContent;
