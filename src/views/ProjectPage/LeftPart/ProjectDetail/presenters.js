import { mdiChevronLeft } from '@mdi/js';
import AvatarCircleList from 'components/AvatarCircleList';
import ColorButton from 'components/ColorButton';
import ColorTypo from 'components/ColorTypo';
import { ActionBox, Container, SubContainer } from 'components/CustomDetailBox';
import { ChartBox, ChartDrawer, ChartInfoBox, ChartPlaceholder, ChartTitle, CustomChart } from 'components/CustomDonutChart';
import CustomTextbox from 'components/CustomTextbox';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingBox from 'components/LoadingBox';
import ProgressBar from 'components/ProgressBar';
import { clamp, get, isNaN } from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './style.scss';
import {WORKPLACE_TYPES} from "../../../../constants/constants";

const ProjectName = ({ className = '', ...props }) =>
  <span
    className={`view_Project_ProjectDetail___name ${className}`}
    {...props}
  />

const SubHeader = ({ className = '', ...props }) =>
  <div
    className={`view_Project_ProjectDetail___subheader ${className}`}
    {...props}
  />

const DateBox = ({ className = '', ...props }) =>
  <div
    className={`view_Project_ProjectDetail___date-box ${className}`}
    {...props}
  />

function getExpectedProgress(startDate, endDate) {
  if (startDate === -1 || endDate === 1) {
    return 0;
  } else {
    const start = moment(startDate, 'DD-MM-YYYY').toDate();
    const end = moment(endDate, 'DD-MM-YYYY').toDate();
    const now = moment().toDate();
    const total = (end - start) / 1000;
    const current = (now - start) / 1000;
    return clamp(total === 0 || isNaN(current / total) ? 0 : parseInt((current / total) * 100), 0, 100);
  }
}

function ProjectDetail({
  project, route,
  handleDeleteProject, handleOpenModal,
}) {

  const history = useHistory();
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  useEffect(() => {
    if(project.project) {
      switch (get(project.project, 'work_type')) {
        case WORKPLACE_TYPES.JOB:
          setTitle(t("IDS_WP_WORKING_TYPE"));
          break;
        case WORKPLACE_TYPES.PROJECT:
          setTitle(t("IDS_WP_PROJECT"));
          break;
        case WORKPLACE_TYPES.PROCESS:
          setTitle(t("IDS_WP_PROCESS"));
          break;
        default:
          break;
      }
    }
  }, [project]);
  return (
    <>
      <LeftSideContainer
        title={title}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => history.push(route),
          tooltip: t("DMH.VIEW.PP.LEFT.PD.BACK"),
        }}
        loading={{
          bool: project.loading,
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
                        t("DMH.VIEW.PGP.RIGHT.ALL.STATS.WAITING"),
                        t("DMH.VIEW.PGP.RIGHT.ALL.STATS.DOING"),
                        t("DMH.VIEW.PGP.RIGHT.ALL.STATS.EXPIRED"),
                        t("DMH.VIEW.PGP.RIGHT.ALL.STATS.COMPLETE"),
                        t("DMH.VIEW.PGP.RIGHT.ALL.STATS.STOP"),
                      ],
                      colors: ['#ff9800', '#03a9f4', '#f44336', '#03c30b', '#607d8b'],
                    }}
                    series={[
                      get(project.project, 'task_waiting', 0),
                      get(project.project, 'task_doing', 0),
                      get(project.project, 'task_expired', 0),
                      get(project.project, 'task_complete', 0),
                      get(project.project, 'task_stop', 0),
                    ]}
                    width={250}
                    height={250}
                  />
                  <ChartTitle>
                    {get(project.project, 'state_name')}
                  </ChartTitle>
                  {
                    get(project.project, 'task_waiting', 0) +
                      get(project.project, 'task_doing', 0) +
                      get(project.project, 'task_expired', 0) +
                      get(project.project, 'task_complete', 0) +
                      get(project.project, 'task_stop', 0) === 0
                      ? <ChartPlaceholder />
                      : null
                  }
                </ChartDrawer>
                <ProjectName>
                  {project.loading ? '...' : get(project.project, 'name', '')}
                </ProjectName>
                <ChartInfoBox
                  data={
                    [{
                      color: '#ff9800',
                      title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.WAITING"),
                      value: get(project.project, 'task_waiting', 0),
                    }, {
                      color: '#03a9f4',
                      title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.DOING"),
                      value: get(project.project, 'task_doing', 0),
                    }, {
                      color: '#f44336',
                      title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.EXPIRED"),
                      value: get(project.project, 'task_expired', 0),
                    }, {
                      color: '#03c30b',
                      title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.COMPLETE"),
                      value: get(project.project, 'task_complete', 0),
                    }, {
                      color: '#607d8b',
                      title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.STOP"),
                      value: get(project.project, 'task_stop', 0),
                    }]
                  }
                />
              </ChartBox>
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>{t("IDS_WP_PROGRESS")}</ColorTypo>
              </SubHeader>
              <DateBox>
                <div>{get(project.project, 'date_start', -1)}</div>
                <div>{get(project.project, 'date_end', -1)}</div>
              </DateBox>
              <ProgressBar
                percentDone={get(project.project, 'complete', 0)}
                percentTarget={
                  getExpectedProgress(
                    get(project.project, 'date_start', -1),
                    get(project.project, 'date_end', -1)
                  )
                }
                colorDone={'#31b586'}
                colorTarget={'#fd7e14'}
              />
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>{t("GANTT_DESCRIPTION")}</ColorTypo>
              </SubHeader>
              <CustomTextbox
                value={get(project.project, 'description', '')}
                isReadOnly={true}
              />
            </SubContainer>
            <SubContainer>
              <SubHeader>
                <ColorTypo color='gray' uppercase>{t("DMH.VIEW.PP.LEFT.PD.MEM")}</ColorTypo>
              </SubHeader>
              <AvatarCircleList users={get(project.project, 'members', [])} total={20} display={12} />
            </SubContainer>
          </div>
          <ActionBox>
            {
              get(project.project, "permissions.update_task", false) && (
                <ColorButton
                  onClick={() => handleOpenModal('UPDATE', {
                    curProject: project.project
                  })}
                  variant='text'
                  size='small'
                  fullWidth
                >
                  {t("DMH.VIEW.PP.LEFT.PD.EDIT")}
                </ColorButton>
              )
            }
            {
              get(project.project, "permissions.delete_task", false) && (
                <ColorButton
                  onClick={() => handleOpenModal('ALERT', {
                    selectedProject: project.project
                  })}
                  variant='text'
                  variantColor='red'
                  size='small'
                  fullWidth
                >
                  {t("IDS_WP_DELETE")}
                </ColorButton>
              )
            }
          </ActionBox>
        </Container>
      </LeftSideContainer>
    </>
  )
}

export default ProjectDetail;
