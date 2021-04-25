import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'classnames';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import '../ListPart.scss';
import ListProjectBody from './ListProjectBody';
import ListProjectHeader from './ListProjectHeader';
import ProjectItem from './ProjectItem';
import './styles.scss';

function ListProject({
  show,
  setShow,
  onClickProject,
}) {
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);
  let data = [];
  if (projectListBasic) {
    data = projectListBasic.projectGroups;
  }

  return (
    <div
      className={clsx('listProject',
        'lp-container ',
        (show ? 'lp-container-block' : 'lp-container-none'))
      }
    >
      <ListProjectHeader className="listProject--header" setShow={setShow} />
      <Scrollbars className="listProject--body"
        renderView={props => <div {...props} className="listProject--container" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        {data.map(group => {
          return (
            <div key={group.id}>
              <ExpansionPanel className="listProject--project-panel" defaultExpanded>
                <ExpansionPanelSummary
                  expandIcon={<Icon path={mdiMenuUp} size={1} />}
                  id="panel1bh-header"
                >
                  <ListProjectBody subPrimary={group.name.toUpperCase()} />
                </ExpansionPanelSummary>
                <MuiExpansionPanelDetails className="listProject--project-panel-detail">
                  {group.projects.map((project, projectIdx) => (
                    <ProjectItem
                      project={project}
                      key={projectIdx}
                      title={project.name}
                      onClickProject={onClickProject}
                    />
                  ))}
                </MuiExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
}

export default ListProject;
