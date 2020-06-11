import { mdiEmailCheck } from "@mdi/js";
import React from "react";
import { createSelector } from "reselect";
import { Routes } from "views/OfferPage/contants/routes";
import { OFFER_BY_DEPARTMENT, TASK_OFFER_BY_DEPARTMENT } from "views/OfferPage/redux/types";
// create a "selector creator" that uses lodash.isEqual instead of ===
const selectSummaryGroup = state => state.offerPage[TASK_OFFER_BY_DEPARTMENT];
const selectOffer = state => state.offerPage[OFFER_BY_DEPARTMENT];

const rightIcon = () => {
  return (
    <>
      <div className="right-setting-icon">
        <span>N</span>
      </div>
    </>
  );
};

export const getOffer = createSelector(selectOffer, offer => offer.offers);
export const getFirstSummaryGroup = createSelector(
  selectSummaryGroup,
  group => {
    if (!group.offers_room[0]) {
      return null;
    }
    return group.offers_room[0].id;
  }
);
export const getSummaryGroupInDepartment = createSelector(selectSummaryGroup, group => {
  if (!group) {
    return [];
  }
  return group.offers_room.map(x => ({
    title: x.name,
    subtitle: x.offer_waiting + " đề xuất chờ duyệt",
    url: Routes.OFFERBYGROUP + `/${x.id}`,
    color: "#7d99a6",
    icon: mdiEmailCheck,
    rightIcon: !x.have_new_offer && rightIcon
  }));
});
export const getTaskByKeyword = (keyword, status_filter) =>
  createSelector(selectOffer, offers => {
    let newOffers = offers.offers
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
  });

export const getDepartmentGroupByKeyword = (keyword, t) => createSelector(selectSummaryGroup, group => {
  if (group === undefined) {
    return []
  }
  return group.offers_room.map(x => ({
    title: x.name,
    subtitle: typeof t === 'function' ? t("VIEW_OFFER_LABEL_PENDING_OFFER", { count: x.offer_waiting }) : x.offer_waiting,
    url: Routes.OFFERBYDEPARTMENT + `/${x.id}`,
    color: "#7d99a6",
    icon: mdiEmailCheck,
    rightIcon: x.have_new_offer && rightIcon,
    rightIconVisiableAlways: x.have_new_offer
  })).filter(
    x => x.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  );
})
