import { Button, CircularProgress } from '@material-ui/core';
import { mdiArrowLeft } from '@mdi/js';
import { concat, find, get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomBadge from '../../../../components/CustomBadge';
import CustomTable from '../../../../components/CustomTable';
import LoadingBox from '../../../../components/LoadingBox';
import { StateBox } from '../../../../components/TableComponents';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroupPage_Table_Deleted___container ${className}`}
    {...props}
  />;

const MyButton = ({ className = '', disabled = false, isDel = false, ...props }) =>
  <Button
    variant="outlined"
    className={`view_ProjectGroupPage_Table_Deleted___button${isDel ? '-delete' : ''}${disabled ? '-disabled' : ''} ${className}`}
    disabled={disabled}
    {...props}
  />;

const ButtonWrapper = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroupPage_Table_Deleted___button-wrapper ${className}`}
    {...props}
  />;

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:
      return {
        color: '#4caf50',
        background: '#4caf5042',
      };
    case 1:
      return {
        color: '#ff9800',
        background: '#ff980038',
      };
    case 2:
      return {
        color: '#fe0707',
        background: '#ff050524',
      };
    default:
      return {
        color: '#53d7fc',
      };
  }
}

function DeletedProjectTable({
  expand, handleExpand, route,
  projects, pendings,
  handleSortType,
  handleDelete, handleRestore,
}) {

  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Container>
      <React.Fragment>
        <CustomTable
          options={{
            title: t("DMH.VIEW.PGP.RIGHT.TRASH.TITLE"),
            subTitle: '',
            subActions: [{
              label: t("DMH.VIEW.PGP.RIGHT.TRASH.BACK"),
              iconPath: mdiArrowLeft,
              onClick: (evt) => history.push(route),
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
            noData: {
              bool: (projects.firstTime === false) && (projects.projects.length === 0)
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
                src={get(row, 'user_delete_avatar')}
                alt='user delete avatar'
              />,
            align: 'left',
            width: '5%',
          }, {
            label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.NAME"),
            field: row => <span style={{ fontSize: 14 }}>{get(row, 'name')}</span>,
            sort: (evt) => handleSortType('name'),
            align: 'left',
            width: '25%',
          }, {
            label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.STATE"),
            field: row => (
              <StateBox
                stateCode={get(row, 'state_code')}
              >
                <div>
                  <span>&#11044;</span>
                  <span>
                    {get(row, 'state_code') === 5 ? t("DMH.VIEW.PGP.RIGHT.ALL.HIDE") : get(row, 'state_name')}
                  </span>
                </div>
              </StateBox>
            ),
            sort: (evt) => handleSortType('state_name'),
            align: 'left',
            width: '10%',
          }, {
            label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.PRIO"),
            field: row => (
              <CustomBadge
                color={
                  decodePriorityCode(get(row, 'priority_code', 0)).color
                }
                background={
                  decodePriorityCode(get(row, 'priority_code', 0))
                    .background
                }
              >
                {get(row, 'priority_name', '')}
              </CustomBadge>
            ),
            sort: (evt) => handleSortType('priority_name'),
            align: 'center',
            width: '10%',
          }, {
            label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.USER"),
            field: (row) => get(row, 'user_delete_name'),
            align: 'left',
            width: '10%',
          }, {
            label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.DATE"),
            field: (row) => get(row, 'delete_at'),
            align: 'left',
            width: '10%',
          }, {
            label: '',
            field: (row) =>
              <ButtonWrapper>
                <MyButton
                  onClick={() => handleDelete(get(row, 'id'))}
                  disabled={
                    !isNil(find(concat(pendings.deletePendings, pendings.restorePendings), pending => pending === get(row, 'id')))
                  }
                  isDel={true}
                >
                  {!isNil(find(pendings.deletePendings, pending => pending === get(row, 'id'))) &&
                    <CircularProgress
                      size={16}
                      className="margin-circular"
                      color="white"
                    />}
                  {t('DMH.VIEW.PGP.RIGHT.TRASH.BTN.DEL')}
                </MyButton>
                <MyButton
                  onClick={() => handleRestore(get(row, 'id'))}
                  disabled={
                    !isNil(find(concat(pendings.deletePendings, pendings.restorePendings), pending => pending === get(row, 'id')))
                  }
                >
                  {!isNil(find(pendings.restorePendings, pending => pending === get(row, 'id'))) &&
                    <CircularProgress
                      size={16}
                      className="margin-circular"
                      color="white"
                    />}
                  {t('DMH.VIEW.PGP.RIGHT.TRASH.BTN.RES')}
                </MyButton>
              </ButtonWrapper>,
            align: 'center',
            width: '20%',
          }]}
          data={projects.projects}
        />
      </React.Fragment>
    </Container>
  )
}

export default DeletedProjectTable;