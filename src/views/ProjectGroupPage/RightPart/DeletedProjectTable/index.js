import React from 'react';
import styled from 'styled-components';
import { get, sortBy, reverse } from 'lodash';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiShieldAccount,
  mdiArrowLeft,
} from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomAvatar from '../../../../components/CustomAvatar';

const Container = styled.div`
  grid-area: table;
`;

const CenterCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DeletedProjectTable({ 
  expand, handleExpand, 
  listDeletedProject,
}) {

  const history = useHistory();
  const { data: { projects: _projects }, loading, error } = listDeletedProject;

  const [projects, setProjects] = React.useState(_projects);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);

  React.useEffect(() => {
    let projects = _projects;
    if (sortField) {
      projects = sortBy(projects, [o => get(o, sortField)]);
      if (sortType === -1) reverse(projects);
    }
    setProjects(projects);
  }, [_projects, sortField, sortType]);

  function handleSortColumn(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  }

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: `Thùng rác`,
              subTitle: '',
              subActions: [{
                label: 'Quay lại',
                iconPath: mdiArrowLeft,
                onClick: (evt) => history.push('/projects'),
              }],
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand),
              },
              draggable: {
                bool: false,
              },
              loading: {
                bool: loading,
                component: () => <LoadingBox />,
              },
              grouped: {
                bool: false,
              },
              row: {
                id: 'id',
                onClick: () => null,
              },
            }}
            columns={[{
              label: () => null,
              field: (row) => 
                <CustomAvatar 
                  style={{
                    width: 35,
                    height: 35,
                  }}  
                  src={get(row, 'user_create.avatar')} 
                  alt='user create avatar' 
                />,
              align: 'center',
              width: '5%',
            }, {
              label: 'Dự án',
              field: 'name',
              sort: (evt) => handleSortColumn('name'),
              align: 'center',
              width: '50%',
            }, {
              label: 'Người xóa',
              field: (row) => null,
              align: 'center',
              width: '15%',
            }, {
              label: 'Ngày xóa',
              field: (row) => null,
              align: 'center',
              width: '15%',
            }, {
              label: '',
              field: (row) => null,
              align: 'center',
              width: '5%',
            }]}
            data={projects}
          />
        </React.Fragment>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    listDeletedProject: state.project.listDeletedProject,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletedProjectTable);