import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { mdiMenuUp } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "classnames";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import "../ListPart.scss";
import ListProjectBody from "./ListProjectBody";
import ListProjectHeader from "./ListProjectHeader";
import ProjectItem from "./ProjectItem";
import { connect } from 'react-redux';
import { getProjectListBasic } from "actions/taskDetail/taskDetailActions";
import { filter, map, get } from 'lodash';
import { CustomEventDispose, CustomEventListener, UPDATE_PROJECT } from 'constants/events.js';
import "./styles.scss";

function ListProject(props) {
  
  const { projectId, getProjectListBasic } = props;
  const [ projectFilter, setProjectFilter ] = React.useState(-1);

  React.useLayoutEffect(() => {
    getProjectListBasic(projectId);
    const doGetProjectListBasic = () => {
      getProjectListBasic(projectId);
    };
    CustomEventListener(UPDATE_PROJECT.SUCCESS, doGetProjectListBasic);
    return () => {
      CustomEventDispose(UPDATE_PROJECT.SUCCESS, doGetProjectListBasic);
    }
  }, [projectId]);

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
        "lp-container",
        "lp-container-block",
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

const mapDispatchToProps = {
  getProjectListBasic,
};

export default connect(null, mapDispatchToProps)(ListProject);
