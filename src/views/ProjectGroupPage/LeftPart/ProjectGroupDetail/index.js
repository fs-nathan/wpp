import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { 
  ChartBox, ChartDrawer, ChartLegendBox, ChartTitle, CustomChart 
} from '../../../../components/CustomDonutChart';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ColorButton from '../../../../components/ColorButton';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import { Container, SubContainer, ActionBox, } from '../../../../components/CustomDetailBox';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiSquare } from '@mdi/js';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import { detailProjectGroup } from '../../../../actions/projectGroup/detailProjectGroup';
import { memberProjectGroup } from '../../../../actions/projectGroup/memberProjectGroup';
import { deleteProjectGroup } from '../../../../actions/projectGroup/deleteProjectGroup';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_PROJECT_GROUP } from '../../../../constants/events.js';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import MembersDetail from '../../Modals/MembersDetail';


const ProjectGroupName = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const SubHeader = styled.div`
  padding: 8px 0;
  margin: 8px 0
  display: flex;
  align-items: center;
`;

const StyledColorTypo = styled(ColorTypo)`
  cursor: pointer;
  margin-top: 8px;
`;

function ProjectGroupDetail({ detailProjectGroup, memberProjectGroup, doDeleteProjectGroup }) {
  
  const { setProjectGroupId } = React.useContext(ProjectGroupContext);
  const { projectGroupId } = useParams();
  const history = useHistory();
  const { data: { projectGroup }, error: detailProjectGroupError, loading: detailProjectGroupLoading } = detailProjectGroup;
  const { data: { members }, error: memberProjectGroupError, loading: memberProjectGroupLoading } = memberProjectGroup;
  const loading = detailProjectGroupLoading || memberProjectGroupLoading;
  const error = detailProjectGroupError || memberProjectGroupError;
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [openMemberModal, setOpenMemberModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
    
  React.useEffect(() => {
    setProjectGroupId(projectGroupId);
  }, [setProjectGroupId, projectGroupId]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push('/projects');
    };

    CustomEventListener(DELETE_PROJECT_GROUP, historyPushHandler);
    
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP, historyPushHandler);
    };
  }, [history, projectGroupId]);

  function handleDeleteProjectGroup(projectGroupId) {
    doDeleteProjectGroup({ 
      projectGroupId: projectGroupId,
    });
  }
  
  return (
    <React.Fragment>
      {error !== null && (<ErrorBox />)}
      {error === null && (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/projects'),
            tooltip: 'Quay lại',
          }}
          title='Chi tiết nhóm dự án'
          loading={{
            bool: loading,
            component: () => <LoadingBox />
          }}
        >
          <Container>
            <div>
              <SubContainer>
                <ChartBox>
                  <ChartDrawer>
                    <CustomChart 
                      type='donut'
                      options={{
                        legend: {
                          show: false,
                        },
                        plotOptions: {
                          pie: {
                            expandOnClick: false,
                          },
                        },
                        labels: [
                          'Công việc đang chờ', 
                          'Công việc đang làm', 
                          'Công việc quá hạn',
                          'Công việc hoàn thành',
                          'Công việc dừng',
                        ],
                        colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', 'black'],
                      }}
                      series={[
                        get(projectGroup, 'task_waiting', 0),
                        get(projectGroup, 'task_doing', 0),
                        get(projectGroup, 'task_expired', 0),
                        get(projectGroup, 'task_complete', 0),
                        get(projectGroup, 'task_stop', 0),
                      ]}
                      width={250}
                      height={250}
                    />
                    <ChartTitle>
                      Hoạt động
                    </ChartTitle>
                  </ChartDrawer>
                  <ProjectGroupName>
                    {loading ? '...' : get(projectGroup, 'name', '')}
                  </ProjectGroupName>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#ff9800'} />
                    <ColorTypo>Công việc đang chờ</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_waiting', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#03a9f4'} />
                    <ColorTypo>Công việc đang làm</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_doing', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#f44336'} />
                    <ColorTypo>Công việc quá hạn</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_expired', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#03c30b'} />
                    <ColorTypo>Công việc hoàn thành</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_complete', 0)}</ColorTypo>
                  </ChartLegendBox>
                  <ChartLegendBox>
                    <Icon path={mdiSquare} size={1} color={'#black'} />
                    <ColorTypo>Công việc dừng</ColorTypo>
                    <ColorTypo>{get(projectGroup, 'task_stop', 0)}</ColorTypo>
                  </ChartLegendBox>
                </ChartBox>
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Mô tả</ColorTypo>
                </SubHeader>
                <ColorTextField 
                  value={get(projectGroup, 'description', '')}
                />
              </SubContainer>
              <SubContainer>
                <SubHeader>
                  <ColorTypo color='gray' uppercase>Thành viên</ColorTypo>
                </SubHeader>
                <AvatarCircleList users={members} total={20} display={12}/>
                <StyledColorTypo color='blue' onClick={() => setOpenMemberModal(true)}>Xem chi tiết thành viên</StyledColorTypo>
              </SubContainer>
            </div>
            <ActionBox>
              <ColorButton onClick={() => setOpenUpdateModal(true)} variant='text' size='small' fullWidth>Chỉnh sửa</ColorButton>
              <ColorButton onClick={() => setAlert(true)} variant='text' variantColor='red' size='small' fullWidth>Xóa nhóm dự án</ColorButton>
            </ActionBox>
          </Container>
          <CreateProjectGroup updateProjectGroup={projectGroup} open={openUpdateModal} setOpen={setOpenUpdateModal} />
          <MembersDetail open={openMemberModal} setOpen={setOpenMemberModal} members={members} />
          <AlertModal
            open={alert}
            setOpen={setAlert}
            content='Bạn chắc chắn muốn xóa?'
            onConfirm={() => handleDeleteProjectGroup(projectGroupId)}
          />
        </LeftSideContainer>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    detailProjectGroup: state.projectGroup.detailProjectGroup,
    memberProjectGroup: state.projectGroup.memberProjectGroup,
    deleteProjectGroup: state.projectGroup.deleteProjectGroup,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doMemberProjectGroup: ({ projectGroupId }, quite) => dispatch(memberProjectGroup({ projectGroupId }, quite)),
    doDeleteProjectGroup: ({ projectGroupId }) => dispatch(deleteProjectGroup({ projectGroupId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectGroupDetail);
