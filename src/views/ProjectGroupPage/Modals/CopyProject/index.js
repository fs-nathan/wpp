import React from 'react';
import { 
  TextField, FormControl, FormControlLabel, 
  Radio, RadioGroup,
  ListItemText, ListSubheader, Typography,
  FormHelperText,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import { copyProject } from '../../../../actions/project/copyProject';
import { connect } from 'react-redux';
import moment from 'moment';
import { StyledList, StyledListItem, Primary } from '../../../../components/CustomList';
import { get, map, filter } from 'lodash';
import Icon from '@mdi/react';
import { mdiCheckboxMarkedCircle, mdiCheckboxBlankCircleOutline } from '@mdi/js';
import { useRequiredString, useRequiredDate } from '../../../../hooks';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
        {get(projectGroup, 'projects', []).map(project => (
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

function CopyProject({ open, setOpen, listProjectGroup, listProject, doCopyProject }) {

  const { data: { projectGroups } } = listProjectGroup;
  const { data: { projects }} = listProject;

  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription] = useRequiredString('', 500);
  const [isCopyMember, setIsCopyMember] = React.useState(false);
  const [searchPatern, setSearchPatern] = React.useState('');
  const [startDate, setStartDate, errorDate] = useRequiredDate(moment().toDate());

  const [customProjects, setCustomProjects] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState(null);

  React.useEffect(() => {
    let newProjects = map([...projectGroups, {
      name: 'Mặc định',
      id: null,
    }], (projectGroup) => {
      const { name, id } = projectGroup;
      const ownedProjects = filter(projects, project => {
        if (
          (get(project, 'project_group_id') === id) &&
          (get(project, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()))
        ) {
          return true;
        }
        return false;
      });
      return {
        name,
        id,
        projects: ownedProjects,
      };
    });
    setCustomProjects(newProjects);
  }, [projectGroups, projects, searchPatern]);

  function handleCopyProject() { 
    doCopyProject({
      projectId: get(selectedProject, 'id'),
      name,
      description,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      isCopyMember,
    })
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Sao chép dự án`}
        fullWidth={true}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName && !errorDescription && !errorDate && selectedProject}
        onConfirm={() => handleCopyProject()}
        height='tall'
        columns={2}
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
                {customProjects.map(projectGroup => (
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
              <TextField
                value={name}
                onChange={evt => setName(evt.target.value)}
                margin="normal"
                variant="outlined"
                label='Tên dự án mới'
                fullWidth
                helperText={
                  <ColorTypo variant='caption' color='red'>
                    {get(errorName, 'message', '')}
                  </ColorTypo>
                }
              />
              <TextField
                value={description}
                onChange={evt => setDescription(evt.target.value)}
                margin="normal"
                variant="outlined"
                label='Mô tả dự án mới'
                fullWidth
                multiline
                rowsMax='6'
                helperText={
                  <ColorTypo variant='caption' color='red'>
                    {get(errorDescription, 'message', '')}
                  </ColorTypo>
                }
              />
              <Header uppercase bold>Cài đặt thành viên</Header>
              <StyledFormControl component="div" fullWidth>
                <RadioGroup aria-label="member-setting" name="member-setting" value={isCopyMember} onChange={evt => setIsCopyMember(evt.target.value === 'true')}>
                  <FormControlLabel value={true} control={<Radio color='primary'/>} label="Giữ nguyên thành viên" />
                  <FormControlLabel value={false} control={<Radio color='primary'/>} label="Xóa toàn bộ thành viên" />
                </RadioGroup>
              </StyledFormControl>
              <Header uppercase bold>Chọn ngày bắt đầu tiến độ</Header>
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
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listProject: state.project.listProject,
    listProjectGroup: state.projectGroup.listProjectGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCopyProject: ({ projectId, name, description, startDate, isCopyMember }) => dispatch(copyProject({ projectId, name, description, startDate, isCopyMember })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyProject);
