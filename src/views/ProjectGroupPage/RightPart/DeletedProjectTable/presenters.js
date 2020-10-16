import {Button, CircularProgress, IconButton} from '@material-ui/core';
import {mdiArrowLeft, mdiMenuDown} from '@mdi/js';
import {concat, filter, find, get, isNil} from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomBadge from '../../../../components/CustomBadge';
import CustomTable from '../../../../components/CustomTable';
import LoadingBox from '../../../../components/LoadingBox';
import { StateBox } from '../../../../components/TableComponents';
import './style.scss';
import AlertModal from "../../../../components/AlertModal";
import {CustomEventListener, DELETE_TRASH_PROJECT, CustomEventDispose, DELETE_TRASH_PROJECT_FAIL} from "../../../../constants/events";
import * as images from "../../../../assets";
import Icon from "@mdi/react";
import {WORKPLACE_TYPES} from "../../../../constants/constants";
import SelectWorkType from "../../Modals/SelectWorkType";
import {connect} from "react-redux";

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
  projects, pendings, projectGroup,
  handleSortType,
  handleDelete, handleRestore,
}) {

  const history = useHistory();
  const { t } = useTranslation();
  const [alertConfirm, showAlertConfirm] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(t("IDS_WP_ALL"));
  const [projectFiltered , setProjectFiltered] = React.useState([]);
  const [openWorkTypeModal, setOpenWorkTypeModal] = React.useState(false);
  const [selectedWorkType, setSelectedWorkType] = React.useState(undefined);
  const [workTypeIcon, setWorkTypeIcon] = React.useState(images.type_all_64);

  React.useEffect(() => {
      const resetConfirm = () => {
          showAlertConfirm(false);
          setLoading(false);
      }
      CustomEventListener(DELETE_TRASH_PROJECT, resetConfirm);
      CustomEventListener(DELETE_TRASH_PROJECT_FAIL, resetConfirm);
      return () => {
          CustomEventDispose(DELETE_TRASH_PROJECT, resetConfirm);
          CustomEventDispose(DELETE_TRASH_PROJECT_FAIL, resetConfirm);
      }
  }, [loading]);

  React.useEffect(() => {
    let _projects = [];
    switch (selectedWorkType) {
      case WORKPLACE_TYPES.JOB:
        setWorkTypeIcon(images.check_64);
        setTitle(t("IDS_WP_WORKING_TYPE"));
        _projects = filter(projects.projects, (item) => item.work_type === WORKPLACE_TYPES.JOB);
        break;
      case WORKPLACE_TYPES.PROJECT:
        setWorkTypeIcon(images.speed_64);
        setTitle(t("IDS_WP_PROJECT_LIST"));
        _projects = filter(projects.projects, (item) => item.work_type === 1);
        break;
      case WORKPLACE_TYPES.PROCESS:
        setWorkTypeIcon(images.workfollow_64);
        setTitle(t("IDS_WP_PROCESS_LIST"));
        _projects = filter(projects.projects, (item) => item.work_type === WORKPLACE_TYPES.PROCESS);
        break;
      default:
        setWorkTypeIcon(images.type_all_64);
        setTitle(t("IDS_WP_ALL"));
        _projects = projects.projects;
        break;
    }
    setProjectFiltered(_projects);
  }, [selectedWorkType,projects]);

  return (
    <Container>
      <React.Fragment>
        <CustomTable
          options={{
            title: () => (
              <div className={"view_ProjectGroupPage_Table_Deleted_title"}>
                <img src={workTypeIcon} alt="Working type icon" width={30} height={30}/>
                <div className={"view_ProjectGroupPage_Table_Deleted_title_icon"}>
                  <Button endIcon={<Icon path={mdiMenuDown} size={1.5} />} onClick={() => setOpenWorkTypeModal(true)}><span>{title}</span></Button>
                </div>
              </div>
            ),
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
          columns={[
            {
              label: () => null,
              field: row => {
                switch (get(row, 'work_type')) {
                  case WORKPLACE_TYPES.JOB:
                    return (<abbr title={t("IDS_WP_JOB")}><img src={images.check_64} alt={"work type icon"} width={30} height={30} style={{padding: "15px 10px 7px 3px"}}/></abbr>);
                  case WORKPLACE_TYPES.PROJECT:
                    return (<abbr title={t("IDS_WP_PROJECT")}><img src={images.speed_64} alt={"work type icon"} width={30} height={30} style={{padding: "15px 10px 7px 3px"}}/></abbr>);
                  case WORKPLACE_TYPES.PROCESS:
                    return (<abbr title={t("IDS_WP_PROCESS")}><img src={images.workfollow_64} alt={"work type icon"} width={30} height={30} style={{padding: "15px 10px 7px 3px"}}/></abbr>);
                  default:
                    return;
                }
              },
              align: 'left',
              width: '3%',
            }, {
            label: t("DMH.VIEW.PGP.RIGHT.TRASH.LABEL.NAME"),
            field: row => <span style={{ fontSize: 14 }}>{get(row, 'name')}</span>,
            sort: (evt) => handleSortType('name'),
            align: 'left',
            width: '25%',
          },
          {
              label: t("IDS_WP_GROUP"),
            field: (row) =>
              <CustomAvatar
                style={{
                  width: 35,
                  height: 35,
                }}
                src={get(row, 'user_delete_avatar')}
                alt='user delete avatar'
              />,
              sort: evt => handleSortType('group'),
              align: 'left',
              width: '8%'
          },
          {
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
                  //onClick={() => handleDelete(get(row, 'id'))}
                   onClick={() => {
                       setSelectedRow(row)
                       showAlertConfirm(true);
                   }}
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
          data={projectFiltered}
        />
      </React.Fragment>
      <AlertModal
        open={alertConfirm}
        setOpen={showAlertConfirm}
        content={t("DMH.VIEW.PGP.RIGHT.ALL.ALERT")}
        onConfirm={() => {
            setLoading(true);
            handleDelete(get(selectedRow, 'id'));
        }}
        onCancle={() => {
            showAlertConfirm(false);
            setLoading(false);
        }}
        manualClose={true}
        actionLoading={loading}
      />
      <SelectWorkType
        open={openWorkTypeModal}
        setOpen={setOpenWorkTypeModal}
        selected={selectedWorkType}
        handleSelectItem={(type) => setSelectedWorkType(type)}
        projectStatistic={{
          number_work_type: projectGroup.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.work_topic', 0), 0),
          number_project: projectGroup.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.project', 0), 0),
          number_process: projectGroup.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.process', 0), 0),
        }}
      />
    </Container>
  )
}
export default connect(
  state => ({
    projectGroup: get(state.projectGroup.listProjectGroupDeleted.data, "projectGroups", [])
  }),
  {},
)(DeletedProjectTable);