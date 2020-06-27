// Detail Offer
const offerPagePath = 'OFFER_PAGE';
const detailOfferPath = `${offerPagePath}.DETAIL_OFFER`;
const createApprovalPath = `${detailOfferPath}.CREATE_APPROVAL`;
const modalPath = `${createApprovalPath}.MODAL`;
export const getConfirmBtnTitle = t => t(`${modalPath}.CONFIRM`);
export const getCancelBtnTitle = t => t(`${modalPath}.CANCEL`);
