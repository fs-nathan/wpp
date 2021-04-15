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
import {filter, map} from "lodash";

function ListProject({
  show,
  setShow,
  onClickProject,
}) {
  const [projectFilter, setProjectFilter] = React.useState(-1);
  const projectListBasic = useSelector((state) => state.taskDetail.commonTaskDetail.projectListBasic);
  const [data, setData]= React.useState([]);
  const [projectGroup, setProjectsGroup] = React.useState([]);
  React.useEffect(() => {
    if(projectListBasic) {
      setData(projectListBasic.projectGroups);
    }
  }, [projectListBasic]);
  React.useEffect(() => {
    if(projectFilter === -1) {
      setProjectsGroup(data);
    } else {
      let filtered = map(data, function (group) {
        let projects = filter(group.projects, function (project) {
          return project.work_type === projectFilter;
        });
        return {...group, projects};
      });
      setProjectsGroup(filtered);
    }
  },[projectFilter, data]);
  return (
    <div
      className={clsx('listProject',
        'lp-container ',
        (show ? 'lp-container-block' : 'lp-container-none'))
      }
      style={{height: "75vh"}}
    >
      <ListProjectHeader
        className="listProject--header"
        setShow={setShow} projectFilter={projectFilter}
        setProjectFilter={(type) => setProjectFilter(type)}
      />
      <Scrollbars className="listProject--body"
        renderView={props => <div {...props} className="listProject--container" />}
        autoHide autoHideTimeout={500} autoHideDuration={200}>
        {projectGroup.map(group => {
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
