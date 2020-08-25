import { deleteProjectGroup } from 'actions/projectGroup/deleteProjectGroup';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import DeleteProjectGroupPresenter from './presenters';

function ProjectGroupDelete({
  selectedProjectGroup = null,
  open, setOpen,
  doDeleteProjectGroup,
  doReloadProjectGroup,
}) {

  return (
    <DeleteProjectGroupPresenter
      doReloadProjectGroup={doReloadProjectGroup}
      open={open} setOpen={setOpen}
      handleDeleteProjectGroup={() =>
        doDeleteProjectGroup({
          projectGroupId: get(selectedProjectGroup, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadProjectGroup: () => dispatch(listProjectGroup(true)),
    doDeleteProjectGroup: ({ projectGroupId }) => dispatch(deleteProjectGroup({ projectGroupId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectGroupDelete);
