import React from 'react';
import { mdiClose, mdiDrag, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import ProjectItem from './ProjectItem';
import ListProjectBody from './ListProjectBody';
import ListProjectHeader from './ListProjectHeader';

import '../ListPart.scss';
import './styles.scss';

function ListProject(props) {
  const projectListBasic = useSelector(state => state.taskDetail.commonTaskDetail.projectListBasic);

  let data = [];
  if (projectListBasic) {
    data = projectListBasic.projectGroups;
  }
  // console.log('ListProject', data)
  return (
    <div
      className={clsx('listProject',
        'lp-container ',
        (props.show ? 'lp-container-block' : 'lp-container-none'))
      }
    >
      <ListProjectHeader className="listProject--header" {...props} />
      <Scrollbars className="listProject--body" autoHide autoHideTimeout={500} autoHideDuration={200}>
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
                      {...props}
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
