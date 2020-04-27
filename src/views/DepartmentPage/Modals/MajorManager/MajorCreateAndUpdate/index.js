import { createMajor } from 'actions/major/createMajor';
import { updateMajor } from 'actions/major/updateMajor';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import MajorCreateAndUpdatePresenter from './presenters';
import { activeLoadingSelector } from './selectors';

function MajorCreateAndUpdate({
  open, setOpen,
  updatedMajor = null,
  doCreateMajor, doUpdateMajor,
  activeLoading,
}) {

  return (
    <MajorCreateAndUpdatePresenter
      open={open} setOpen={setOpen} activeLoading={activeLoading}
      updatedMajor={updatedMajor}
      handleCreateOrUpdateMajor={(name, description) =>
        updatedMajor
          ? doUpdateMajor({ majorId: get(updatedMajor, 'id'), name, description })
          : doCreateMajor({ name, description, })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateMajor: ({ name, description }) => dispatch(createMajor({ name, description })),
    doUpdateMajor: ({ majorId, name, description }) => dispatch(updateMajor({ majorId, name, description })),
  }
};

export default connect(
  state => ({
    activeLoading: activeLoadingSelector(state),
  }),
  mapDispatchToProps,
)(MajorCreateAndUpdate);
