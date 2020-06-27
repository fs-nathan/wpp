// Detail Offer
const offerPagePath = 'OFFER_PAGE';
const detailOfferPath = `${offerPagePath}.DETAIL_OFFER`;
const deleteOfferPath = `${detailOfferPath}.DELETE_OFFER`;
export const getDetailOfferModalTitle = t => t(`${detailOfferPath}.TITLE`);
export const getDetailOfferModalConfirmBtnTitle = t => t(`${deleteOfferPath}.TITLE`);
export const getDetailOfferModalCancelBtnTitle = t => t(`${detailOfferPath}.ESCAPE`);

// Offer Table Item Popover
const offerTablePath = `${offerPagePath}.OFFER_TABLE`;
const offerItemPath = `${offerTablePath}.ITEM`;
const offerItemPopoverPath = `${offerItemPath}.POPOVER`;
export const getOfferItemPopoverDetail = t => t(`${offerItemPopoverPath}.DETAIL`);
export const getOfferItemPopoverViewTask = t => t(`${offerItemPopoverPath}.VIEW_TASK`);

// Delete offer confirm modal
const deleteOfferConfirmModalPath = `${deleteOfferPath}.CONFIRM_MODAL`;
export const getDeleteOfferConfirmModalTitle = t => t(`${deleteOfferConfirmModalPath}.TITLE`);
export const getDeleteOfferConfirmModalMsg = t => t(`${deleteOfferConfirmModalPath}.MESSAGE`);
export const getDeleteOfferConfirmModalConfirmBtn = t => t(`${deleteOfferConfirmModalPath}.CONFIRM`);
export const getDeleteOfferConfirmModalCancelBtn = t => t(`${deleteOfferConfirmModalPath}.CANCEL`);
