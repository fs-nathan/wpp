import { mdiArrowLeft } from '@mdi/js';
import { get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomTable from '../../../../components/CustomTable';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
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
  const { t } = useTranslation();

  return (
    <Container>
      {isNil(projects.error)
        ? (
          <React.Fragment>
            <CustomTable
              options={{
                title: t("DMH.VIEW.PGP.RIGHT.TRASH.TITLE"),
                subTitle: '',
                subActions: [{
                  label: t("DMH.VIEW.PGP.RIGHT.TRASH.BACK"),
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
                label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.NAME"),
                field: 'name',
                sort: (evt) => handleSortType('name'),
                align: 'center',
                width: '50%',
              }, {
                label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.USER"),
                field: (row) => null,
                align: 'center',
                width: '15%',
              }, {
                label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.DATE"),
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