import React from 'react';
import { createMajor } from '../../../../../actions/major/createMajor';
import { updateMajor } from '../../../../../actions/major/updateMajor';
import { connect } from 'react-redux';
import { get } from 'lodash';
import MajorCreateAndUpdatePresenter from './presenters';

function MajorCreateAndUpdate({ 
  open, setOpen, 
  updatedMajor = null, 
  doCreateMajor, doUpdateMajor 
}) {

  return (
    <MajorCreateAndUpdatePresenter 
      open={open} setOpen={setOpen} 
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
  null,
  mapDispatchToProps,
)(MajorCreateAndUpdate);
