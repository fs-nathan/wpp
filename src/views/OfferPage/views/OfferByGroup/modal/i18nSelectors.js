// Offer By Group
const offerPagePath = 'OFFER_PAGE';
const offerByGroupPath = `${offerPagePath}.OFFER_BY_GROUP_VIEW`;
const modalPath = `${offerByGroupPath}.MODAL`;
// Create offer group modal
const createPath = `${modalPath}.CREATE`;
export const getCreateModalTitle = t => t(`${createPath}.TITLE`);
export const getCreateModalConfirmBtnTitle = t => t(`${createPath}.CONFIRM`);
export const getCreateModalCancelBtnTitle = t => t(`${createPath}.CANCEL`);
// Update offer group modal
const updatePath = `${modalPath}.UPDATE`;
export const getUpdateModalTitle = t => t(`${updatePath}.TITLE`);
export const getUpdateModalConfirmBtnTitle = t => t(`${updatePath}.CONFIRM`);
export const getUpdateModalCancelBtnTitle = t => t(`${updatePath}.CANCEL`);
// Modal section titles
const groupNameSection = `${modalPath}.GROUP_NAME_SECTION`;
export const getOfferGroupNameTitle = t => t(`${groupNameSection}.TITLE`);
export const getOfferGroupNamePlaceholder = t => t(`${groupNameSection}.PLACEHOLDER`);
const groupDescriptionSection = `${modalPath}.GROUP_DESCRIPTION_SECTION`;
export const getOfferGroupDescriptionTitle = t => t(`${groupDescriptionSection}.TITLE`);
export const getOfferGroupDescriptionPlaceholder = t => t(`${groupDescriptionSection}.PLACEHOLDER`);
