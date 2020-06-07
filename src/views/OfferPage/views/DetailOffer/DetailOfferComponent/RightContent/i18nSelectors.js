// Detail Offer - Right Content
const offerPagePath = 'OFFER_PAGE';
const detailOfferPath = `${offerPagePath}.DETAIL_OFFER`;
const discussionPath = `${detailOfferPath}.DISCUSSION`;
const textBoxPath = `${discussionPath}.TEXT_BOX`;
const commentPath = `${discussionPath}.COMMENT`;
const popoverPath = `${commentPath}.POPOVER`;
export const getHeaderTitle = t => t(`${discussionPath}.TITLE`);
export const getTextBoxPlaceholder = t => t(`${textBoxPath}.PLACEHOLDER`);
export const getTextBoxBtnTitle = t => t(`${textBoxPath}.BUTTON_TITLE`);
const userRolePath = `${commentPath}.USER_ROLE`;
export const getUserRoleType1 = t => t(`${userRolePath}.TYPE_1`);
export const getUserRoleType2 = t => t(`${userRolePath}.TYPE_2`);
export const getUserRoleType3 = t => t(`${userRolePath}.TYPE_3`);
export const getDiscussionDateTimePosted = (t, time, date) =>
  t(`${commentPath}.DATE_TIME_POSTED`, { time, date });
export const getPopoverUpdateOption = t => t(`${popoverPath}.UPDATE`);
export const getPopoverRemoveOption = t => t(`${popoverPath}.REMOVE`);
