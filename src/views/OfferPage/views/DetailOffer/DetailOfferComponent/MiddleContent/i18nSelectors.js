// Detail Offer - Middle Content
const offerPagePath = 'OFFER_PAGE';
const detailOfferPath = `${offerPagePath}.DETAIL_OFFER`;
const offerApprovalConditionEditingPath = `${detailOfferPath}.OFFER_APPROVAL_CONDITION_EDITING`;
export const getApprovalConditionEditingTitle = t => t(`${offerApprovalConditionEditingPath}.TITLE`);
const createApprovalPath = `${detailOfferPath}.CREATE_APPROVAL`;
const buttonPath = `${createApprovalPath}.BUTTON`;
export const getCreateApprovalBtnTitle = t => t(`${buttonPath}.CREATE`);
export const getApprovalAcceptedBtnTitle = t => t(`${buttonPath}.APPROVED`);
