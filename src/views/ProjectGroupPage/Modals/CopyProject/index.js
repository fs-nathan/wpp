import React from 'react';
import styled from 'styled-components';
import { 
  TextField, FormControl, FormControlLabel, 
  Radio, RadioGroup, FormLabel, OutlinedInput,
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
import { mdiCheckCircle, } from '@mdi/js';
import { useRequiredString, useRequiredDate } from '../../../../hooks';

const Header = styled(ColorTypo)`
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledTypo = styled(Typography)`
  font-size: 14px;
`;

const StyledFormControl = styled(FormControl)`
  & > legend {
    margin-bottom: 8px;
  }
`;

const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
  && {
    color: #a5a0a0;
  }
`;

const ListContainer = styled.div`
  margin-top: 8px;
`;

const StyledListSubheader = styled(ListSubheader)`
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px 0;
  &:hover {
    cursor: pointer;
  }
  & > * { 
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
  }
`;

const CustomListItem = styled(StyledListItem)`
  padding: 10px 0;
`;

const StyledPrimary = styled(({ isSelected, ...rest }) => <Primary {...rest} />)`
  display: flex;
  align-items: center;
  & > * {
    &:first-child {
      fill: ${props => props.isSelected ? '#05b50c' : 'rgba(0, 0, 0, 0)'};
    }
    &:last-child {
      color: ${props => props.isSelected ? '#05b50c' : '#444'};
      font-size: 14px;
      margin-left: 8px;
    }
  }
`;

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
          <CustomListItem key={get(project, 'id')} onClick={() => setSelectedProject(project)}>
            <ListItemText 
              primary={
                <StyledPrimary isSelected={get(selectedProject, 'id') === get(project, 'id')}>
                  <Icon path={mdiCheckCircle} size={1} /> 
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
    let newProjects = map(projectGroups, (projectGroup) => {
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
      startDate: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
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
        left={
          <>
            <Header color='gray' uppercase bold>Chọn dự án sao chép</Header>
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
          </>
        }
        right={
          <>
            <Header color='gray' uppercase bold>Dự án được sao chép</Header>
            <StyledTypo>{get(selectedProject, 'name', 'Hãy chọn dự án để sao chép')}</StyledTypo>
            <Header color='gray' uppercase bold>Thông tin dự án</Header>
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
            <StyledFormControl component="div" fullWidth>
              <StyledFormLabel component="legend">Cài đặt thành viên</StyledFormLabel>
              <RadioGroup aria-label="member-setting" name="member-setting" value={isCopyMember} onChange={evt => setIsCopyMember(evt.target.value === 'true')}>
                <FormControlLabel value={true} control={<Radio color='primary'/>} label="Giữ nguyên thành viên" />
                <FormControlLabel value={false} control={<Radio color='primary'/>} label="Xóa toàn bộ thành viên" />
              </RadioGroup>
            </StyledFormControl>
            <StyledFormControl component="div">
              <StyledFormLabel component="legend">Chọn ngày bắt đầu tiến độ</StyledFormLabel>
              <OutlinedInput 
                variant='outlined'
                type='date'
                value={moment(startDate).format('YYYY-MM-DD')}
                onChange={evt => setStartDate(moment(evt.target.value).toDate())}
              />
              <FormHelperText error filled variant='filled'>{get(errorDate, 'message', '')}</FormHelperText>
            </StyledFormControl>
          </>
        }
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
