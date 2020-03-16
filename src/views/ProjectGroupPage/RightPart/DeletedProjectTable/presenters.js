import React from 'react';
import { get, isNil } from 'lodash';
import { useHistory } from 'react-router-dom';
import {
  mdiArrowLeft,
} from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomAvatar from '../../../../components/CustomAvatar';
import './style.scss';

const Container = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroupPage_Table_Deleted___container ${className}`}
    {...props}
  />;

function DeletedProjectTable({ 
  expand, handleExpand, 
  projects,
  handleSortType,
}) {

  const history = useHistory();

  return (
    <Container>
      {isNil(projects.error)
      ? (
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
                bool: projects.loading,
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
              sort: (evt) => handleSortType('name'),
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
            data={projects.projects}
          />
        </React.Fragment>
      ) : <ErrorBox />}
    </Container>
  )
}

export default DeletedProjectTable;