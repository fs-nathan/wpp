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
