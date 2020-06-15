import { createSelector } from "reselect";
import { DETAIL_OFFER } from "views/OfferPage/redux/types";
const selectDetailOffer = state => state.offerPage[DETAIL_OFFER]
export const getDetailOffer = createSelector(selectDetailOffer, detail => {
  if (detail.offer === undefined) {
    return []
  }
  return detail.offer
});
export const getDetailOfferLoadingState = createSelector(selectDetailOffer, detail => detail.loading);