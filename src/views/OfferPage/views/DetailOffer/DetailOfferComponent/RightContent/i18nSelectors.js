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
export const getDiscussionDateTimePosted = (t, time, date) =>
  t(`${commentPath}.DATE_TIME_POSTED`, { time, date });
export const getPopoverUpdateOption = t => t(`${popoverPath}.UPDATE`);
export const getPopoverRemoveOption = t => t(`${popoverPath}.REMOVE`);
