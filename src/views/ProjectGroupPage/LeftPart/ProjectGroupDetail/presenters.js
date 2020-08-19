import { mdiChevronLeft } from '@mdi/js';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import { ActionBox, Container, SubContainer } from '../../../../components/CustomDetailBox';
import { ChartBox, ChartDrawer, ChartInfoBox, ChartPlaceholder, ChartTitle, CustomChart } from '../../../../components/CustomDonutChart';
import CustomTextbox from '../../../../components/CustomTextbox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import './style.scss';

const ProjectGroupName = ({ className = '', ...props }) =>
  <span
    className={`view_ProjectGroup_Detail___name ${className}`}
    {...props}
  />;

const SubHeader = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_Detail___sub-header ${className}`}
    {...props}
  />;

const StyledColorTypo = ({ className = '', ...props }) =>
  <ColorTypo
    className={`view_ProjectGroup_Detail___typography ${className}`}
    {...props}
  />;

function ProjectGroupDetail({
  group, route, canModify,
  handleDeleteProjectGroup, handleOpenModal,
}) {

  const history = useHistory();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <LeftSideContainer
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(route),
          tooltip: t("DMH.VIEW.PGP.LEFT.INFO.BACK"),
        }}
        title={t("DMH.VIEW.PGP.LEFT.INFO.TITLE")}
        loading={{
          bool: group.loading,
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
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.WAITING"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.DOING"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.EXPIRED"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.COMPLETE"),
                        t("DMH.VIEW.PGP.LEFT.INFO.STATS.HIDDEN"),
                      ],
                      colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', '#20194d'],
                    }}
                    series={[
                      get(group.group, 'statistics.task_waiting', 0),
                      get(group.group, 'statistics.task_doing', 0),
                      get(group.group, 'statistics.task_expired', 0),
                      get(group.group, 'statistics.task_complete', 0),
                      get(group.group, 'statistics.task_hidden', 0),
                    ]}
                    width={200}
                    height={200}
                  />
                  <ChartTitle>
                    {t("DMH.VIEW.PGP.LEFT.INFO.ACTV")}
                  </ChartTitle>
                  {
                    get(group.group, 'statistics.task_waiting', 0) +
                      get(group.group, 'statistics.task_doing', 0) +
                      get(group.group, 'statistics.task_expired', 0) +
                      get(group.group, 'statistics.task_complete', 0) +
                      get(group.group, 'statistics.task_hidden', 0) === 0
                      ? <ChartPlaceholder />
                      : null
                  }
                </ChartDrawer>
                <ProjectGroupName>
                  {group.loading ? '...' : get(group.group, 'name', '')}
                </ProjectGroupName>
                <ChartInfoBox
                  title={t("DMH.VIEW.PGP.LEFT.INFO.STATS.TOTAL")}
                  data={
                    [{
                      color: '#ff9800',
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.WAITING"),
                      value: get(group.group, 'statistics.task_waiting', 0),
                    }, {
                      color: '#03a9f4',
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.DOING"),
                      value: get(group.group, 'statistics.task_doing', 0),
                    }, {
                      color: '#f44336',
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.EXPIRED"),
                      value: get(group.group, 'statistics.task_expired', 0),
                    }, {
                      color: '#03c30b',
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.COMPLETE"),
                      value: get(group.group, 'statistics.task_complete', 0),
                    }, {
                      color: '#20194d',
                      title: t("DMH.VIEW.PGP.LEFT.INFO.STATS.HIDDEN"),
                      value: get(group.group, 'statistics.task_hidden', 0),
                    }]
                  }
                />
              </ChartBox>
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>{t("DMH.VIEW.PGP.LEFT.INFO.DESC")}</ColorTypo>
              </SubHeader>
              <CustomTextbox
                value={get(group.group, 'description', '')}
                isReadOnly={true}
              />
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>{t("DMH.VIEW.PGP.LEFT.INFO.MEMBER.TITLE")}</ColorTypo>
              </SubHeader>
              <AvatarCircleList users={group.group.members} total={20} display={12} />
              <StyledColorTypo color='blue' onClick={() => handleOpenModal('MEMBER', {
                members: get(group.group, 'members', []),
              })}>{t("DMH.VIEW.PGP.LEFT.INFO.MEMBER.BTN")}</StyledColorTypo>
            </SubContainer>
          </div>
          {canModify &&
            <ActionBox>
              <ColorButton onClick={() => handleOpenModal('UPDATE', {
                updatedProjectGroup: group.group,
              })} variant='text' size='small' fullWidth>{t("DMH.VIEW.PGP.LEFT.INFO.BTN.UPT")}</ColorButton>
              <ColorButton onClick={() => handleOpenModal('ALERT', {
                selectedProjectGroup: group.group,
              })} variant='text' variantColor='red' size='small' fullWidth>{t("DMH.VIEW.PGP.LEFT.INFO.BTN.DEL")}</ColorButton>
            </ActionBox>}
        </Container>
      </LeftSideContainer>
    </React.Fragment>
  )
}

export default ProjectGroupDetail;
