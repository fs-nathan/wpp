import { mdiEmailCheck } from "@mdi/js";
import get from "lodash/get";
import React from "react";
import { createSelector } from "reselect";
import { Routes } from "views/OfferPage/contants/routes";
import { CREATE_GROUP_OFFER, OFFER_BY_GROUP, SUMMARY_BY_GROUP } from "views/OfferPage/redux/types";
import Popover from "./popover";
// create a "selector creator" that uses lodash.isEqual instead of ===
const selectSummaryGroup = state => state.offerPage[SUMMARY_BY_GROUP];
const selectOffer = state => state.offerPage[OFFER_BY_GROUP];
const selectStatusCreateGroupOffer = state => state.offerPage[CREATE_GROUP_OFFER]
export const getOffer = createSelector(selectOffer, offer => offer.offers);
export const getFirstSummaryGroup = createSelector(
  selectSummaryGroup,
  group => {
    if (!group.offers_group[0]) {
      return null;
    }
    return group.offers_group[0].id;
  }
);

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

export const getSummaryByGroupByKeyword = (keyword, isOfferGroupManageable, t) => createSelector(selectSummaryGroup, group => {
  if (group === undefined) {
    return []
  }
  return group.offers_group.map(x => ({
    title: x.name,
    subtitle: t("VIEW_OFFER_LABEL_PENDING_OFFER", { count: x.offer_waiting }),
    url: Routes.OFFERBYGROUP + `/${x.id}`,
    color: "#7d99a6",
    icon: mdiEmailCheck,
    rightIcon: (() => isOfferGroupManageable && (
      <>
        <Popover
          offer_group_id={get(x, "id")}
          name={get(x, "name")}
          description={get(x, "description")}
          view={false}
        />
      </>
    ))
  })).filter(
    x => x.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  )
})

export const getStatusCreateGroupOffer = createSelector(selectStatusCreateGroupOffer, status => {
  if (status === undefined) {
    return {}
  }
  return status
})

export const getGroupOfferList = createSelector(
  selectSummaryGroup,
  group => {
    return group.offers_group;
  }
);