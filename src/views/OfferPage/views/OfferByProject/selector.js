import { get } from 'lodash';
import { createSelector } from 'reselect';
import { OFFER_BY_PROJECT, SUMMARY_PROJECT } from 'views/OfferPage/redux/types';

const selectSummaryProject = state => state.offerPage[SUMMARY_PROJECT]
const selectOffer = state => state.offerPage[OFFER_BY_PROJECT]

export const getFirstSummaryProject = createSelector(
  selectSummaryProject,
  summaryProject => {
    var projects = get(summaryProject, 'projects', []);
    var haveProjectsArr = projects.filter(item => get(item, "projects", []).length !== 0);
    return get(haveProjectsArr, "[0].projects[0].id");
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

export const getSummaryByProjectAndKeyword = (keyword) => createSelector(selectSummaryProject, summary => {
  const { projects } = summary
  if (projects === undefined) {
    return []
  }
  return projects.map(project => ({
    title: get(project, "name"),
    url: get(project, "id"),
    projects: get(project, "projects")
  })).filter(
    x => x.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  )
})