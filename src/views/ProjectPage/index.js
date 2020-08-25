import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import GroupTaskSlide from './LeftPart/GroupTaskSlide';
import ProjectDetail from './LeftPart/ProjectDetail';
import ProjectMemberSlide from './LeftPart/ProjectMemberSlide';
import AllTaskTable from './RightPart/AllTaskTable';
import { routeSelector } from './selectors';

function ProjectPage({
  route,
}) {

  return (
    <Route
      path={route}
      render={({ match: { url, } }) => (
        <>
          <Route
            path={`${url}/:projectId/:memberId?`}
            exact
            render={props => {
              return (
                <TwoColumnsLayout
                  leftRenders={[
                    () => <ProjectDetail {...props} />,
                    ({ handleSubSlide }) => <ProjectMemberSlide {...props} handleSubSlide={handleSubSlide} />,
                    ({ handleSubSlide }) => <GroupTaskSlide {...props} handleSubSlide={handleSubSlide} />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand, handleSubSlide, }) =>
                      <AllTaskTable
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                        handleSubSlide={handleSubSlide}
                      />
                  }
                />
              )
            }}
          />
        </>
      )}
    />
  )
}

export default connect(
  state => ({
    route: routeSelector(state),
  }),
  null,
)(ProjectPage);
