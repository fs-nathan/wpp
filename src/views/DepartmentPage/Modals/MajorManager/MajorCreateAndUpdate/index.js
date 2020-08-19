import { createMajor } from 'actions/major/createMajor';
import { listMajor } from 'actions/major/listMajor';
import { updateMajor } from 'actions/major/updateMajor';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import MajorCreateAndUpdatePresenter from './presenters';

function MajorCreateAndUpdate({
  open, setOpen,
  updatedMajor = null,
  doCreateMajor, doUpdateMajor,
  doReloadMajor,
}) {

  return (
    <MajorCreateAndUpdatePresenter
      open={open} setOpen={setOpen}
      updatedMajor={updatedMajor}
      doReloadMajor={doReloadMajor}
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
    doReloadMajor: () => dispatch(listMajor(true)),
    doCreateMajor: ({ name, description }) => dispatch(createMajor({ name, description })),
    doUpdateMajor: ({ majorId, name, description }) => dispatch(updateMajor({ majorId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(MajorCreateAndUpdate);
