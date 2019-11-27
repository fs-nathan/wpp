import React from 'react';
import { mdiPlus, mdiChevronLeft } from '@mdi/js';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { deleteProject } from '../../../../actions/project/deleteProject';

function TaskGroupSlide({ handleSubSlide, detailProject, }) {
  
  const { error: detailProjectError, loading: detailProjectLoading } = detailProject;
  const loading = detailProjectLoading;
  const error = detailProjectError;
  
  
  return (
    <React.Fragment>
      {error !== null && (<ErrorBox />)}
      {error === null && (
        <LeftSideContainer
          title='Thành viên dự án'
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => handleSubSlide(0),
          }}
          rightAction={{
            iconPath: mdiPlus,
            onClick: () => null,
          }}
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    detailProject: state.project.detailProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskGroupSlide);
