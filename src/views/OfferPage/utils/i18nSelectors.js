// Detail Offer
const offerPagePath = 'OFFER_PAGE';
const detailOfferPath = `${offerPagePath}.DETAIL_OFFER`;
export const getDetailOfferModalTitle = t => t(`${detailOfferPath}.TITLE`);
export const getDetailOfferModalConfirmBtnTitle = t => t(`${detailOfferPath}.DELETE_OFFER`);
export const getDetailOfferModalCancelBtnTitle = t => t(`${detailOfferPath}.ESCAPE`);

// Offer Table Item Popover
const offerTablePath = `${offerPagePath}.OFFER_TABLE`;
const offerItemPath = `${offerTablePath}.ITEM`;
const offerItemPopoverPath = `${offerItemPath}.POPOVER`;
export const getOfferItemPopoverDetail = t => t(`${offerItemPopoverPath}.DETAIL`);
const offerItemPopoverDeletePath = `${offerItemPopoverPath}.DELETE`;
export const getOfferItemPopoverDelete = t => t(`${offerItemPopoverDeletePath}.TITLE`);
// Popover delete confirm modal
const deleteOfferConfirmModalPath = `${offerItemPopoverDeletePath}.CONFIRM_MODAL`;
export const getDeleteOfferConfirmModalTitle = t => t(`${deleteOfferConfirmModalPath}.TITLE`);
export const getDeleteOfferConfirmModalMsg = t => t(`${deleteOfferConfirmModalPath}.MESSAGE`);
export const getDeleteOfferConfirmModalConfirmBtn = t => t(`${deleteOfferConfirmModalPath}.CONFIRM`);
export const getDeleteOfferConfirmModalCancelBtn = t => t(`${deleteOfferConfirmModalPath}.CANCEL`);
