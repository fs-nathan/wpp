import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormControlLabel, ListItemText, ListSubheader, Radio, RadioGroup, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle } from '@mdi/js';
import Icon from '@mdi/react';
import ColorTypo from 'components/ColorTypo';
import CustomDatePicker from 'components/CustomDatePicker';
import { Primary, StyledList, StyledListItem } from 'components/CustomList';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import SearchInput from 'components/SearchInput';
import { COPY_PROJECT, CustomEventDispose, CustomEventListener, LIST_PROJECT } from 'constants/events.js';
import { useMaxlenString, useRequiredDate, useRequiredString } from 'hooks';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const Header = ({ className = '', ...props }) =>
  <ColorTypo
    className={`view_ProjecrGroup_Copy_Project_Modal___header ${className}`}
    {...props}
  />;

const StyledTypo = ({ className = '', ...props }) =>
  <Typography
    className={`view_ProjecrGroup_Copy_Project_Modal___typography ${className}`}
    {...props}
  />;

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjecrGroup_Copy_Project_Modal___form-control ${className}`}
    {...props}
  />;

const ListContainer = ({ className = '', ...props }) =>
  <div
    className={`view_ProjecrGroup_Copy_Project_Modal___list-container ${className}`}
    {...props}
  />;

const StyledListSubheader = ({ className = '', ...props }) =>
  <ListSubheader
    className={`view_ProjecrGroup_Copy_Project_Modal___list-subheader ${className}`}
    {...props}
  />;

const CustomListItem = ({ className = '', ...props }) =>
  <StyledListItem
    className={`view_ProjecrGroup_Copy_Project_Modal___list-item ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', isSelected, ...props }) =>
  <Primary
    className={`${isSelected
      ? 'view_ProjecrGroup_Copy_Project_Modal___primary-selected'
      : 'view_ProjecrGroup_Copy_Project_Modal___primary'} ${className}`}
    {...props}
  />;

const LeftContainer = ({ className = '', ...props }) =>
  <div
    className={`view_ProjecrGroup_Copy_Project_Modal___left-container ${className}`}
    {...props}
  />;

const RightContainer = ({ className = '', ...props }) =>
  <div
    className={`view_ProjecrGroup_Copy_Project_Modal___right-container ${className}`}
    {...props}
  />;

const Subtitle = ({ className = '', ...props }) =>
  <Typography
    className={`view_ProjecrGroup_Copy_Project_Modal___subtitle ${className}`}
    {...props}
  />;

function ProjectGroupList({ projectGroup, selectedProject, setSelectedProject }) {

  if (get(projectGroup, 'projects', []).length > 0)
    return (
      <StyledList
        component="nav"
        aria-labelledby={`list-subheader-${get(projectGroup, 'id')}`}
        subheader={
          <StyledListSubheader component="div" id={`list-subheader-${get(projectGroup, 'id')}`}
          >
            <ColorTypo bold uppercase>{get(projectGroup, 'name', '')}</ColorTypo>
          </StyledListSubheader>
        }
      >
        {get(projectGroup, 'projects', []).filter(project => get(project, 'can_copy', false)).map(project => (
          <CustomListItem
            key={get(project, 'id')}
            onClick={() => setSelectedProject(project)}
            disableSticky
          >
            <ListItemText
              primary={
                <StyledPrimary isSelected={get(selectedProject, 'id') === get(project, 'id')}>
                  <Icon
                    path={get(selectedProject, 'id') === get(project, 'id')
                      ? mdiCheckboxMarkedCircle
                      : mdiCheckboxBlankCircleOutline}
                    size={1}
                  />
                  <span>{get(project, 'name', '')}</span>
                </StyledPrimary>
              }
            />
          </CustomListItem>
        ))}
      </StyledList>
    );
  else return null;
}

function CopyProject({
  open, setOpen,
  searchPatern, setSearchPatern,
  groups,
  handleCopyProject,
  doReload,
  projectGroupId,
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription] = useMaxlenString('', 500);
  const [isCopyMember, setIsCopyMember] = React.useState(false);
  const [startDate, setStartDate, errorDate] = useRequiredDate(moment().toDate());
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(COPY_PROJECT.SUCCESS, doReload);
    CustomEventListener(COPY_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(COPY_PROJECT.SUCCESS, doReload);
      CustomEventDispose(COPY_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectGroupId]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
      setIsCopyMember(false);
      setStartDate(moment().toDate());
      setSelectedProject(null);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success);
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectGroupId]);

  return (
    <CustomModal
      title={t("DMH.VIEW.PGP.MODAL.COPY.TITLE")}
      fullWidth={true}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDate && selectedProject}
      onConfirm={() => {
        handleCopyProject(
          get(selectedProject, 'id'),
          name,
          description,
          moment(startDate).format('YYYY-MM-DD'),
          isCopyMember
        );
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      height='tall'
      columns={2}
      loading={groups.loading}
      activeLoading={activeLoading}
      manualClose={true}
      left={{
        title: t("DMH.VIEW.PGP.MODAL.COPY.LEFT.TITLE"),
        content: () =>
          <LeftContainer>
            <SearchInput
              fullWidth
              placeholder={t("DMH.VIEW.PGP.MODAL.COPY.LEFT.FIND")}
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />
            <ListContainer>
              {groups.map(projectGroup => (
                <ProjectGroupList
                  projectGroup={projectGroup}
                  key={get(projectGroup, 'id')}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </ListContainer>
          </LeftContainer>,
      }}
      right={{
        title: t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.TITLE"),
        content: () =>
          <RightContainer>
            <Header uppercase bold>{t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.NAME")}</Header>
            <StyledTypo>{get(selectedProject, 'name', t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.PLACEHOLDER"))}</StyledTypo>
            <Header uppercase bold>{t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.DESC")}</Header>
            <CustomTextbox
              value={name}
              onChange={value => setName(value)}
              label={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.NEW_NAME")}
              fullWidth
              required={true}
            />
            <CustomTextbox
              value={description}
              onChange={value => setDescription(value)}
              label={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.NEW_DESC")}
              fullWidth
              multiline={true}
            />
            <StyledFormControl component="div" fullWidth>
              <Subtitle>{t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.MEMBER.TITLE")}</Subtitle>
              <RadioGroup aria-label="member-setting" name="member-setting" value={isCopyMember} onChange={evt => setIsCopyMember(evt.target.value === 'true')}>
                <FormControlLabel value={true} control={<Radio color='primary' />} label={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.MEMBER.KEEP")} />
                <FormControlLabel value={false} control={<Radio color='primary' />} label={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.MEMBER.DISCARD")} />
              </RadioGroup>
            </StyledFormControl>
            <StyledFormControl component="div">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CustomDatePicker
                  label={t("DMH.VIEW.PGP.MODAL.COPY.RIGHT.PROJECT.DATE")}
                  ampm={false}
                  value={startDate}
                  onChange={setStartDate}
                  format="dd/MM/yyyy"
                  required={true}
                />
              </MuiPickersUtilsProvider>
            </StyledFormControl>
          </RightContainer>,
      }}
    />
  )
}

export default CopyProject;
