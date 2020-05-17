const offerPagePath = 'OFFER_PAGE';
const detailOfferPath = `${offerPagePath}.DETAIL_OFFER`;
export const getDetailOfferModalTitle = t => t(`${detailOfferPath}.TITLE`);
export const getDetailOfferModalConfirmBtnTitle = t => t(`${detailOfferPath}.DELETE_OFFER`);
export const getDetailOfferModalCancelBtnTitle = t => t(`${detailOfferPath}.ESCAPE`);

const offerTablePath = `${offerPagePath}.OFFER_TABLE`;
const offerTableItemPath = `${offerTablePath}.ITEM`;
const offerTableItemPopoverPath = `${offerTableItemPath}.POPOVER`;
export const getOfferTableItemPopoverDetail = t => t(`${offerTableItemPopoverPath}.DETAIL`);
export const getOfferTableItemPopoverDelete = t => t(`${offerTableItemPopoverPath}.DELETE`);
