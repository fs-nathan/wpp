import React from 'react';
import { IconButton, ListSubheader, List } from '@material-ui/core';
import { mdiClose, mdiDrag, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';
import SearchInput from '../../../components/SearchInput';
import ColorTypo from '../../../components/ColorTypo';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import * as taskDetailAction from '../../../actions/taskDetail/taskDetailActions';

import './ListPart.scss';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 17px;
  margin-top: 9px;
  & > svg {
    color: rbga(0,0,0,0.54);
  }
  & > div {
    font-size: 15px;
    font-weight: normal;
    padding: 0 15px;
  }
  }
  & > *:last-child {
    margin-left: 10px;
    padding: 7px;    
  }
`;
const StyledBodyTitle = styled(ListSubheader)`
  padding: 0;
  display: flex;
  align-items: center;
`;
const StyledList = styled(List)`
  padding: 10px 0;
  & > li {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const ExpansionPanelDetails = styled(MuiExpansionPanelDetails)`
  flex-direction: column;
  padding: 10px 0;
`;
const ProjectsDetail = styled.div`
  margin: 12px 30px 12px 0;
  font-weight: 500;
  border-bottom: 1px solid #0000001a;
  cursor: pointer;
  line-height: 1.5;
  & > *:first-child {
    border-top: 1px solid #0000001a;
  }
`;

const Projects = props => {
  const dispatch = useDispatch();
  const chooseTask = task => dispatch(taskDetailAction.chooseTask(task));
  function onClickProject() {
    console.log('Click item ', props);
    props.history.push(`/list-task-detail/` + props.project.id);
    // props.value.getDetailProject(props.project.id)
    // props.value.chooseProject(props.project)
    chooseTask(null);
    props.setShow(false);
  }
  return (
    // redirect ? <Redirect to='/target' /> :
    <ProjectsDetail
      onClick={onClickProject}
    >
      {props.title}
    </ProjectsDetail>
  );
};

const ExpansionProject = styled(ExpansionPanel)`
  box-shadow: none !important;
  & > *:first-child {
    flex-direction: row-reverse;
    padding: 0;
    margin: 0 30px 0 0;
    min-height: 0;

    & > div {
      margin: 0;
    }
  }
  & > *:last-child {
    margin-left: 43px;
    & > div {
      & > div {
        & > div {
          & > *:first-child {
            padding: 0;
            border-top: 1px solid #0000001a;
          }
        }
      }
    }
  }
`;
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

function ListProjectHeader({ setShow }) {
  // console.log("setShow::::", setShow);
  const dispatch = useDispatch();
  const searchProject = data => dispatch(taskDetailAction.searchProject(data));

  const closeListProject = () => {
    setShow(false);
  };

  const searchListProject = keyword => {
    searchProject(keyword);
  };

  return (
    <div style={{ marginBottom: 17 }}>
      <Header>
        <Icon
          path={mdiDrag}
          size={1}
          color={'#000000'}
          className="job-detail-icon"
        />
        <div>DANH SÁCH DỰ ÁN</div>
        <ButtonIcon onClick={closeListProject}>
          <Icon path={mdiClose} size={1} className="job-detail-icon" />
        </ButtonIcon>
      </Header>
      <SearchInput
        placeholder="Tìm dự án"
        onChange={e => searchListProject(e.target.value)}
      />
    </div>
  );
}

function ListProjectBody({ subPrimary }) {
  return (
    <StyledList>
      <StyledBodyTitle disableSticky>
        <ColorTypo style={{ color: '#828282', fontWeight: 500 }}>
          {subPrimary}
        </ColorTypo>
      </StyledBodyTitle>
    </StyledList>
  );
}
const WrapperHeader = styled(ListProjectHeader)`
  grid-area: header;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 999;
`;
const WrapperBody = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  & > div > *:last-child {
    margin-bottom: 15px;
  }
`;

function ListProject(props) {
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);

  let data = [];
  if (projectListBasic) {
    data = projectListBasic.projectGroups;
  }
  // console.log('ListProject', data)
  return (
    <div
      className={
        'lp-container ' +
        (props.show ? 'lp-container-block' : 'lp-container-none')
      }
    >
      <WrapperHeader {...props} />
      <WrapperBody autoHide autoHideTimeout={500} autoHideDuration={200}>
        {data.map(group => {
          return (
            <div key={group.id}>
              <ExpansionProject defaultExpanded>
                <ExpansionPanelSummary
                  expandIcon={<Icon path={mdiMenuUp} size={1} />}
                  id="panel1bh-header"
                >
                  <ListProjectBody subPrimary={group.name.toUpperCase()} />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {group.projects.map((project, projectIdx) => (
                    <Projects
                      project={project}
                      key={projectIdx}
                      title={project.name}
                      {...props}
                    />
                  ))}
                </ExpansionPanelDetails>
              </ExpansionProject>
            </div>
          );
        })}
      </WrapperBody>
    </div>
  );
}

export default ListProject;
