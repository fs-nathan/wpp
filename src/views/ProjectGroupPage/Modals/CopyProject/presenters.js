import DateFnsUtils from '@date-io/date-fns';
import { FormControl, FormControlLabel, FormHelperText, ListItemText, ListSubheader, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import { Primary, StyledList, StyledListItem } from '../../../../components/CustomList';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
import SearchInput from '../../../../components/SearchInput';
import { useRequiredDate, useRequiredString, useTextboxString } from '../../../../hooks';
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
}) {

  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription, rawDescription] = useTextboxString('', 500);
  const [isCopyMember, setIsCopyMember] = React.useState(false);
  const [startDate, setStartDate, errorDate] = useRequiredDate(moment().toDate());

  const [selectedProject, setSelectedProject] = React.useState(null);

  return (
    <CustomModal
      title={`Sao chép dự án`}
      fullWidth={true}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription && !errorDate && selectedProject}
      onConfirm={() => handleCopyProject(
        get(selectedProject, 'id'),
        name,
        rawDescription,
        moment(startDate).format('YYYY-MM-DD'),
        isCopyMember
      )}
      height='tall'
      columns={2}
      loading={groups.loading}
      left={{
        title: 'Chọn dự án sao chép',
        content: () =>
          <LeftContainer>
            <SearchInput
              fullWidth
              placeholder='Tìm dự án'
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
        title: 'Thông tin dự án mới',
        content: () =>
          <RightContainer>
            <Header uppercase bold>Dự án được sao chép</Header>
            <StyledTypo>{get(selectedProject, 'name', 'Hãy chọn dự án để sao chép')}</StyledTypo>
            <Header uppercase bold>Thông tin dự án</Header>
            <ColorTypo>Tên dự án mới</ColorTypo>
            <TextField
              value={name}
              onChange={evt => setName(evt.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              helperText={
                <ColorTypo variant='caption' color='red'>
                  {get(errorName, 'message', '')}
                </ColorTypo>
              }
            />
            <ColorTypo>Mô tả dự án mới</ColorTypo>
            <CustomTextbox
              value={description}
              onChange={value => setDescription(value)}
              helperText={get(errorDescription, 'message', '')}
            />
            <ColorTypo>Cài đặt thành viên</ColorTypo>
            <StyledFormControl component="div" fullWidth>
              <RadioGroup aria-label="member-setting" name="member-setting" value={isCopyMember} onChange={evt => setIsCopyMember(evt.target.value === 'true')}>
                <FormControlLabel value={true} control={<Radio color='primary' />} label="Giữ nguyên thành viên" />
                <FormControlLabel value={false} control={<Radio color='primary' />} label="Xóa toàn bộ thành viên" />
              </RadioGroup>
            </StyledFormControl>
            <ColorTypo>Chọn ngày bắt đầu tiến độ</ColorTypo>
            <StyledFormControl component="div">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  value={startDate}
                  onChange={setStartDate}
                  format="dd/MM/yyyy"
                />
              </MuiPickersUtilsProvider>
              <FormHelperText error filled variant='filled'>{get(errorDate, 'message', '')}</FormHelperText>
            </StyledFormControl>
          </RightContainer>,
      }}
    />
  )
}

export default CopyProject;
