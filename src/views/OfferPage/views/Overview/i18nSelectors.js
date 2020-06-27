// Detail Offer
const offerPagePath = 'OFFER_PAGE';
const overviewPath = `${offerPagePath}.OVERVIEW`;
const groupOffersPath = `${overviewPath}.GROUP_OFFERS`;
const titlePath = `${groupOffersPath}.TITLE`;
export const getWaitingOfferTitle = t => t(`${titlePath}.WAITING`);
export const getApprovingOfferTitle = t => t(`${titlePath}.APPROVING`);
export const getRejectedOfferTitle = t => t(`${titlePath}.REJECTED`);
export const getAcceptedOfferTitle = t => t(`${titlePath}.ACCEPTED`);
