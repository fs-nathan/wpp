import { createSelector } from 'reselect';
import { DETAIL_OFFER } from '../../../../redux/types';

const selectDetailOfferComments = state => state.offerPage[DETAIL_OFFER]
export const selectCommentListOfferDetail = createSelector(
  selectDetailOfferComments, detail => detail.comments
);
