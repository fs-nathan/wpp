import React from 'react';
import styled from 'styled-components';
import { 
  TextField, FormControl, FormControlLabel, 
  Radio, RadioGroup, FormLabel, OutlinedInput,
  ListItemText, ListSubheader,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import { createProject } from '../../../../actions/project/createProject';
import { connect } from 'react-redux';
import moment from 'moment';
import { StyledList, StyledListItem, Primary } from '../../../../components/CustomList';
import { get, map, filter } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 2fr 3fr;
  grid-template-areas:
    "left right";
  margin-top: -20px;
  & > div {
    padding: 0 16px;
  }
`;

const LeftSide = styled.div`
  grid-area: left;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const RightSide = styled.div`
  grid-area: right;
`;

const StyledTypo = styled(ColorTypo)`
  padding: 16px 8px 8px 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledFormControl = styled(FormControl)`
  padding: 5px 10px;
`;

const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
`;

const ListContainer = styled(Scrollbars)`
  margin-top: 8px;
  max-height: 300px;
  & > div:last-child {
    z-index: 999;
  }
`;

const StyledListSubheader = styled(ListSubheader)`
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px 0;
  &:hover {
    cursor: pointer;
  }
  & > *:first-child {
    fill: rgba(0, 0, 0, 0.54);
  }
  & > *:last-child {
    color: rgba(0, 0, 0, 0.54);  
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
  }
`;

function ProjectGroupList({ projectGroup }) {

  const [expand, setExpand] = React.useState(true);

  return (
    <StyledList
      component="nav"
      aria-labelledby={`list-subheader-${get(projectGroup, 'id')}`}
      subheader={
        <StyledListSubheader component="div" id={`list-subheader-${get(projectGroup, 'id')}`} 
          onClick={evt => setExpand(prev => !prev)}
        >
          {get(projectGroup, 'projects', []).length > 0 && <Icon path={expand ? mdiChevronDown : mdiChevronUp} size={1} />}
          <ColorTypo>{get(projectGroup, 'name', '')}</ColorTypo>
        </StyledListSubheader>
      }
    >
      {expand && get(projectGroup, 'projects', []).map(project => (
        <StyledListItem key={get(project, 'id')}>
          <ListItemText 
            primary={
              <Primary>{get(project, 'name', '')}</Primary>  
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
}

function CopyProject({ open, setOpen, listProjectGroup, listProject, }) {

  const { data: { projectGroups } } = listProjectGroup;
  const { data: { projects }} = listProject;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [memSetting, setMemSetting] = React.useState(0);
  const [searchPatern, setSearchPatern] = React.useState('');
  const [startDate, setStartDate] = React.useState(moment().toDate());

  const [customProjects, setCustomProjects] = React.useState([]);

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
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Sao chép dự án`}
        fullWidth={true}
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleCopyProject()}
      >
        <Container>
          <LeftSide>
            <StyledTypo color='gray' uppercase bold>Chọn dự án sao chép</StyledTypo>
            <SearchInput 
              fullWidth 
              placeholder='Tìm dự án'
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />  
            <ListContainer
              autoHide
              autoHideTimeout={500}
            >
              {customProjects.map(projectGroup => (
                <ProjectGroupList
                  projectGroup={projectGroup}
                  key={get(projectGroup, 'id')} 
                />
              ))}
            </ListContainer>
          </LeftSide>
          <RightSide>
            <StyledTypo color='gray' uppercase bold>Thông tin dự án</StyledTypo>
            <TextField
              value={name}
              onChange={evt => setName(evt.target.value)}
              margin="normal"
              variant="outlined"
              label='Tên dự án mới'
              fullWidth
              helperText={
                <ColorTypo variant='caption' color='red'>
                  Tối đa 200 ký tự
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
                  Tối đa 500 ký tự
                </ColorTypo>
              }
            />
            <StyledFormControl component="fieldset" fullWidth>
              <StyledFormLabel component="legend">Cài đặt thành viên</StyledFormLabel>
              <RadioGroup aria-label="member-setting" name="member-setting" value={memSetting} onChange={evt => setMemSetting(parseInt(evt.target.value))}>
                <FormControlLabel value={0} control={<Radio color='primary'/>} label="Giữ nguyên thành viên" />
                <FormControlLabel value={1} control={<Radio color='primary'/>} label="Xóa toàn bộ thành viên" />
              </RadioGroup>
            </StyledFormControl>
            <StyledFormControl component="fieldset">
              <StyledFormLabel component="legend">Chọn ngày bắt đầu tiến độ</StyledFormLabel>
              <OutlinedInput 
                variant='outlined'
                type='date'
                value={moment(startDate).format('YYYY-MM-DD')}
                onChange={evt => setStartDate(moment(evt.target.value).toDate())}
              />
            </StyledFormControl>
          </RightSide>
        </Container>
      </CustomModal>
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
    doCreateProject: ({ name, description, projectGroupId, priority, currency }) => dispatch(createProject({ name, description, projectGroupId, priority, currency })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyProject);
