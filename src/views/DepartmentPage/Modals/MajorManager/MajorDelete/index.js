import { deleteMajor } from 'actions/major/deleteMajor';
import { listMajor } from 'actions/major/listMajor';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import MajorDeletePresenter from './presenters';

function MajorCreateAndUpdate({
  selectedMajor = null,
  open, setOpen,
  doDeleteMajor,
  doReloadMajor,
}) {

  return (
    <MajorDeletePresenter
      doReloadMajor={doReloadMajor}
      open={open} setOpen={setOpen}
      handleDeleteMajor={() =>
        doDeleteMajor({
          majorId: get(selectedMajor, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadMajor: () => dispatch(listMajor(true)),
    doDeleteMajor: ({ majorId }) => dispatch(deleteMajor({ majorId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(MajorCreateAndUpdate);
