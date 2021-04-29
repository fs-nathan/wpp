import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {mdiMenuUp} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "classnames";
import React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {useSelector} from "react-redux";
import "../ListPart.scss";
import ListProjectBody from "./ListProjectBody";
import ListProjectHeader from "./ListProjectHeader";
import ProjectItem from "./ProjectItem";
import {filter, get, map, size} from 'lodash';
import "./styles.scss";

function ListProject(props) {
  
  const [ projectFilter, setProjectFilter ] = React.useState(-1);

  const projectListBasic = useSelector(
    (state) => state.taskDetail.commonTaskDetail.projectListBasic
  );
  
  let data = [];
  
  if (projectListBasic) {
    data = projectListBasic.projectGroups;
  }

  data = map(
    data,
    projectGroup => {
      const { projects } = projectGroup;
      const newProjects = filter(
        projects,
        project => projectFilter === -1 || get(project, 'work_type', -1) === projectFilter
      );
      return ({
        ...projectGroup,
        projects: newProjects,
      });
    }
  );

  return (
    <div
      className={clsx(
        "listProject",
        "kanban-lp-container"
      )}
    >
      <ListProjectHeader 
        className="listProject--header" 
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
      />
      <Scrollbars
        className="listProject--body"
        renderView={(props) => (
          <div {...props} className="listProject--container" />
        )}
        autoHide
        autoHideTimeout={500}
      >
        {data.map((group) => {
          if(size(group.projects) === 0) return;
          return (
            <div key={group.id}>
              <ExpansionPanel
                className="listProject--project-panel"
                defaultExpanded
              >
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
