import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import Chart from 'react-apexcharts';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ProgressBar from '../../../../components/ProgressBar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import ColorButton from '../../../../components/ColorButton';
import Icon from '@mdi/react';
import { mdiPlus, mdiChevronLeft } from '@mdi/js';
import { connect } from 'react-redux';
import { Context as ProjectContext } from '../../index';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import EditProjectModal from '../../../ProjectGroupPage/Modals/EditProject';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_PROJECT } from '../../../../constants/events.js';
import { deleteProject } from '../../../../actions/project/deleteProject';

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: auto; 
`;

const ChartBox = styled.div`
  padding: 10px;
`;

const ChartDrawer = styled.div`
  position: relative;
  height: 200px;
`;

const ChartTitle = styled.span`
  position: absolute;
  left: ${126.5}px;
  top: ${92.5}px;
  transform: translate(-50%, -50%);
  height: 90px;
  width: 90px;
  border-radius: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-transform: uppercase;
`;

const ProjectName = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const ChartLegendBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > *:first-child {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const SubHeader = styled.div`
  border-top: 1px solid rgba(0, 0, 0, .1);
  padding: 8px 0;
  margin: 8px 0
  display: flex;
  align-items: center;
`;

const DateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
`;

const ActionBox = styled.div`
  margin-top: 16px;
  padding: 8px 0 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    text-transform: none;
    justify-content: flex-start;
    & > span:last-child {
      display: none;
    }
    background-color: #fff;
    &:hover {
      background-color: #fff;
    }
  }
`;

function displayDate(date) {
  if (
    (date instanceof Date && !isNaN(date))
  ) {
    return (
      <>
        <span>{date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}</span>
        <span>{date.toLocaleDateString()}</span>
      </>
    );
  } else {
    return <span>Không xác định</span>;
  }
}

function TaskGroupSlide({ handleSubSlide, detailProject, deleteProject, }) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();
  const history = useHistory();
  const { data: { project }, error: detailProjectError, loading: detailProjectLoading } = detailProject;
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
            onClick: () => handleSubSlide(false, null),
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
