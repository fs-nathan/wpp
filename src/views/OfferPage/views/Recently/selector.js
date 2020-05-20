


import { createSelector } from 'reselect';
import { TASK_RECENTLY } from 'views/OfferPage/redux/types';


const selectTaskRecently = (state) => state.offerPage[TASK_RECENTLY]


export const getTaskRecentLy = createSelector(selectTaskRecently, list => {
  if (list.offers === undefined) {
    return []
  }
  return list.offers
})

export const getTaskByKeyword = (keyword, status_filter) => createSelector(selectTaskRecently, list => {
  let newOffers = list.offers
  if (newOffers === undefined) {
    return []
  }

  if (status_filter.offer_waiting === false) {
    newOffers = newOffers.filter(offer => offer.status_code !== 0)
  }
  if (status_filter.offer_approving === false) {
    newOffers = newOffers.filter(offer => offer.status_code !== 1)
  }
  if (status_filter.offer_accept === false) {
    newOffers = newOffers.filter(offer => offer.status_code !== 2)
  }
  if (status_filter.offer_reject === false) {
    newOffers = newOffers.filter(offer => offer.status_code !== 3)
  }
  if (status_filter.you_handle === false) {
    newOffers = newOffers.filter(offer => offer.type_name !== "You handle")
  }
  if (status_filter.you_monitor === false) {
    newOffers = newOffers.filter(offer => offer.type_name !== "You monitor")
  }
  if (status_filter.you_offer === false) {
    newOffers = newOffers.filter(offer => offer.type_name !== "You offer")
  }
  if (status_filter.normal === false) {
    newOffers = newOffers.filter(offer => offer.priority_code !== 0)
  }
  if (status_filter.urgent === false) {
    newOffers = newOffers.filter(offer => offer.priority_code !== 1)
  }
  if (status_filter.very_urgent === false) {
    newOffers = newOffers.filter(offer => offer.priority_code !== 2)
  }
  return newOffers.filter(x => x.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
})
