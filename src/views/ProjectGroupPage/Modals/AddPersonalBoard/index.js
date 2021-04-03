import React from "react";
import {useTranslation} from "react-i18next";
import CustomModal from "../../../../components/CustomModal";
import {
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper
} from "@material-ui/core";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from "react-redux";
import {groupsSelector} from "../CopyProject/selectors";
import {listProjectForSelect} from "../../../../actions/project/listProject";
import {listProjectGroup} from "../../../../actions/projectGroup/listProjectGroup";
import {filter, forEach, get, map, set, toLower} from "lodash";
import {updatePinBoardSetting} from "../../../../actions/project/setting/updatePinBoardSetting";

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    width: '92%'
  },
}));
function AddToPersonalBoardModal({
  open = false, setOpen, doListProjectGroup, groups, doListProject, updatePinBoardSetting, projects
}) {
  const {t} = useTranslation();
  const classes = useStyles();
  const [searchPattern, setSearchPattern] = React.useState("");
  const [filteredGroups, setFilteredGroups] = React.useState(groups.groups);
  const [selectedProjects, setSelectedProjects] = React.useState({});
  React.useEffect(() => {
    if(open === true) {
      doListProjectGroup({
        timeStart: null,
        timeEnd: null
      });
      doListProject({});
    }
  }, [doListProjectGroup, open]);
  console.log(projects);
  React.useEffect(() => {
    if(searchPattern === "") {
      setFilteredGroups(groups.groups);
    } else {
      const _groups = map(groups.groups, function (group) {
          const _projects = filter(group.projects, function (project) {
            return toLower(project.name).includes(toLower(searchPattern));
          });
          return {...group, projects: _projects};
      });
      setFilteredGroups(_groups);
    }
  }, [searchPattern, groups.groups]);

  React.useEffect(() => {
    const _selectedProjects = {};
    forEach(groups.groups, function (group) {
      forEach(group.projects, function (project) {
        set(_selectedProjects, project.id, false);
      });
    });
    setSelectedProjects({..._selectedProjects});
  }, [groups.groups]);
  function handleSelectedProject(projectID) {
    set(selectedProjects, projectID, !selectedProjects[projectID]);
    setSelectedProjects({...selectedProjects});
  }
  function handlePinProjects() {
    const _projects = [];
      forEach(selectedProjects, function (selected, projectID) {
      if(selected) _projects.push(projectID);
    });
    updatePinBoardSetting({projectId: _projects});
  }
  return (
    <CustomModal
      open={open} setOpen={setOpen} title={t("LABEL_PIN_CONTROL_PANEL")}
      height='tall' onConfirm={() => handlePinProjects()}
    >
      <Paper component="form" elevation={0} variant={"outlined"} className={classes.root}>
        <IconButton  aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={t("LABEL_SEARCH_PERSONAL_BOARD")}
          inputProps={{ 'aria-label': 'search personal board' }}
          onChange={evt => setSearchPattern(evt.currentTarget.value)}
        />
      </Paper>
      {map(filteredGroups, function (group, key) {
        return (
          <List
            id={`list-group-${key}`}
            component={"nav"} className={"pinToPanelModal--selectList"}
            subheader={<ListSubheader component="div">{get(group, "name")}</ListSubheader>}
          >
            {map(group.projects, function (project, key) {
              return (
                <ListItem id={`list-group-project-${key}`}>
                  <ListItemIcon>
                    <Checkbox
                      color={"primary"} edge="start"
                      checked={selectedProjects[project.id]} disableRipple
                      onChange={evt => handleSelectedProject(project.id, evt.target.value)}
                      inputProps={{ 'aria-labelledby': `checkbox-${group.id}-${project.id}`}}
                    />
                  </ListItemIcon>
                  <ListItemText id={`checkbox-${group.id}-${project.id}`} primary={get(project, "name")} />
                </ListItem>
              );
            })}
          </List>
        );
      })}
    </CustomModal>
  );
}
const mapStateToProps = state => {
  return {
    groups: groupsSelector(state),
    projects: state.project.listProject.data.projectsForSelect
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options) => dispatch(listProjectForSelect(options)),
    doListProjectGroup: (options, quite) => dispatch(listProjectGroup(options, quite)),
    updatePinBoardSetting: (options) => dispatch(updatePinBoardSetting(options))
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToPersonalBoardModal);