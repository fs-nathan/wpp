


import { createSelector } from 'reselect';
import { SUMMARY_OVERVIEW } from 'views/OfferPage/redux/types';



const selectSummaryGroup = state => state.offerPage[SUMMARY_OVERVIEW]


export const getMyOffers = createSelector(selectSummaryGroup, offer => {
  return { static: { offer_of_me_sending: offer.my_offers["sent"], offer_of_me_approved: offer.my_offers["handle"], offer_of_me_monitoring: offer.my_offers["monitor"] } }
})
export const getStatusOffers = createSelector(selectSummaryGroup, offer => {
  return { static: { offer_status_waiting: offer.status_offers["waiting"], offer_status_approved: offer.status_offers["accepted"], offer_status_cancel: offer.status_offers["rejected"] } }
})
export const getPriorityOffers = createSelector(selectSummaryGroup, offer => {
  return { static: { offer_priority_normal: offer.priority_offers["nomal"], offer_priority_urgent: offer.priority_offers["urgent"], offer_priority_very_urgent: offer.priority_offers["very_urgent"] } }
})
