import React from "react";
import {useTranslation} from "react-i18next";
import CustomModal from "../../../../components/CustomModal";
import {
  Button,
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from "react-redux";
import {countPersonalProjectsBoard, listProjectForSelect} from "../../../../actions/project/listProject";
import {listProjectGroup} from "../../../../actions/projectGroup/listProjectGroup";
import {filter, forEach, get, map, size, toLower} from "lodash";
import {updatePinBoardSetting} from "../../../../actions/project/setting/updatePinBoardSetting";
import * as images from "assets/index";
import LoadingBox from "../../../../components/LoadingBox";
import CreateProjectModal from "../CreateProject";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    width: '91%'
  },
}));
function AddToPersonalBoardModal({
  open = false, setOpen, doListProjectGroup, groups, doListProject, updatePinBoardSetting, projects,
  loading = false, doListProjectsInBoard, projectsInBoard
}) {
  const {t} = useTranslation();
  const classes = useStyles();
  const [searchPattern, setSearchPattern] = React.useState("");
  const [filteredGroups, setFilteredGroups] = React.useState(groups.groups);
  const [selectedProjects, setSelectedProjects] = React.useState({});
  const [projectGroups, setProjectGroups] = React.useState(groups);
  const [createWorkingModal, setCreateWorkingModal] = React.useState(false);

  React.useEffect(() => {
    if(open === true) {
      doListProjectGroup({
        timeStart: null,
        timeEnd: null
      });
      doListProject({});
      doListProjectsInBoard();
    }
  }, [doListProjectGroup, open, doListProjectsInBoard]);

  React.useEffect(() => {
    const _projects = {};
    forEach(projectsInBoard, function (project) {
      _projects[project.id] = true;
    });
    setSelectedProjects(({..._projects}));
  }, [projectsInBoard]);

  React.useEffect(() => {
    const _groups = groups.map(projectGroup => ({
      ...projectGroup,
      projects: filter(projects, { project_group_id: get(projectGroup, 'id') }),
    }));
    setProjectGroups({..._groups});
  }, [projects, groups]);
  React.useEffect(() => {
    if(searchPattern === "") {
      setFilteredGroups(projectGroups);
    } else {
      const _groups = map(projectGroups, function (group) {
          const _projects = filter(group.projects, function (project) {
            return toLower(project.name).includes(toLower(searchPattern));
          });
          return {...group, projects: _projects};
      });
      setFilteredGroups(_groups);
    }
  }, [searchPattern, projectGroups]);

  function handleSelectedProject(projectID) {
    setSelectedProjects(({...selectedProjects, [projectID]: !selectedProjects[projectID]}));
  }
  function handlePinProjects() {
    const _projects = [];
      forEach(selectedProjects, function (selected, projectID) {
      if(selected) _projects.push(projectID);
    });
   if(size(_projects) > 0) {
     updatePinBoardSetting({projectId: _projects});
   }
  }
  function handleCreateWorking() {
    setCreateWorkingModal(true);
    setOpen(false);
  }
  return (
    <>
      <CustomModal
        open={open} setOpen={setOpen} title={t("LABEL_PIN_CONTROL_PANEL")}
        height={size(projects) > 0 ? "tall" : "mini"}
        onConfirm={() => handlePinProjects()}
        canConfirm={size(projects) > 0 && size(filter(selectedProjects, function (selected, item) {return selected;})) > 0}
      >
        {loading && <LoadingBox/>}
        {!loading && size(projects) === 0 && (
          <div className={"pinToPanelModal-noDataWrapper"}>
            <img src={images.ic_no_data_2021} alt={""} width={150} height={100}/>
            <Typography variant={"h5"}>{t("MESSAGE_WORKING_BOARD_EMPTY")}</Typography>
            <Typography variant={"body2"}>{t("MESSAGE_WORKING_BOARD_EMPTY_DES")}</Typography>
            <Button variant={"contained"} color={"primary"} disableElevation onClick={() => handleCreateWorking()}>
              {t("LABEL_CREATE_WORKING_BOARD")}
            </Button>
          </div>
        )}
        {!loading && size(projects) > 0 && (
          <>
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
            <Alert severity="info" style={{marginTop: "10px"}}>
              <span>
                {t("MESSAGE_ALERT_INFO_PIN_PERSONAL_BOARD_1")}
                {t("MESSAGE_ALERT_INFO_PIN_PERSONAL_BOARD_21")}
                <span
                  style={{textTransform: "uppercase", color: "var(--color-primary)", cursor: "pointer"}}
                  onClick={() => handleCreateWorking()}
                >
                  + {t("LABEL_CREATE_WORKING_BOARD")}
                </span>
                {t("MESSAGE_ALERT_INFO_PIN_PERSONAL_BOARD_22")}
              </span>
            </Alert>
            {map(filteredGroups, function (group, key) {
              if(size(group.projects) === 0) return;
              return (
                <List
                  id={`list-group-${key}`}
                  component={"nav"} className={"pinToPanelModal--selectList"}
                  subheader={<ListSubheader component="div">{get(group, "name")}</ListSubheader>}
                >
                  {map(group.projects, function (project, key) {
                    return (
                      <ListItem id={`list-group-project-${key}`} onClick={() => handleSelectedProject(project.id)}>
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
          </>
        )}
      </CustomModal>
      <CreateProjectModal
        open={createWorkingModal}
        setOpen={setCreateWorkingModal}
      />
    </>
  );
}
const mapStateToProps = state => {
  return {
    groups: state.projectGroup.listProjectGroup.data.projectGroups,
    projects: state.project.listProject.data.projectsForSelect,
    loading: state.project.listProject.selectLoading,
    projectsInBoard: state.project.countPersonalProjectsBoard.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options) => dispatch(listProjectForSelect(options)),
    doListProjectGroup: (options, quite) => dispatch(listProjectGroup(options, quite)),
    updatePinBoardSetting: (options) => dispatch(updatePinBoardSetting(options)),
    doListProjectsInBoard: () => dispatch(countPersonalProjectsBoard())
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToPersonalBoardModal);