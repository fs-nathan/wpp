import React from 'react';
import { connect } from 'react-redux';
import { routeSelector } from '../../selectors';
import CalendarTypesPresenter from "./presenter";

function CalendarTypes({
  route
}) {
  return (
    <CalendarTypesPresenter
      route={route}
    />
  );
}

export default connect(
  state => ({
    route: routeSelector(state),
  }),
)(CalendarTypes);