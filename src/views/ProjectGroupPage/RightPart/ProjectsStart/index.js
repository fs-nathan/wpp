import React from "react";
import {Box, Card, CardContent, LinearProgress, List, ListItem,
  ListItemIcon, ListItemText, Typography, withStyles
} from "@material-ui/core";
import "./styles.scss";
import * as images from "../../../../assets";
import {get, map} from "lodash";
import DoneIcon from "@material-ui/icons/Done";
import Icon from "@mdi/react";
import {mdiChevronRight} from "@mdi/js";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {getStatusWorkGroup} from "../../../../actions/project/getStatusWork";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#6AEA92',
  },
}))(LinearProgress);

function ProjectsStart({statusWorkGroup, getStatusWorkGroup}) {
  const { t } = useTranslation();
  const [stepsDone, setStepsDone] = React.useState({1: false, 2: false, 3: false, 4: false, 5: false});
  React.useEffect(() => {
    getStatusWorkGroup();
  }, [getStatusWorkGroup]);
  React.useEffect(() => {
    setStepsDone(prevState => ({...prevState, 1: get(statusWorkGroup, "status.created_project_group", false)}));
    setStepsDone(prevState => ({...prevState, 2: get(statusWorkGroup, "status.created_work_group", false)}));
    setStepsDone(prevState => ({...prevState, 3: get(statusWorkGroup, "status.created_task", false)}));
    setStepsDone(prevState => ({...prevState, 4: get(statusWorkGroup, "status.invited_member", false)}));
    setStepsDone(prevState => ({...prevState, 5: get(statusWorkGroup, "status.created_order", false)}));
  }, [statusWorkGroup]);
  return (
    <Box style={{position: "relative"}}>
      <Box className={"projectsStart-header"}>
        <img src={images.bg_work_start_1} alt={""}/>
      </Box>
      <Box className={"projectsStart-container"}>
        <Card variant="outlined" className={"projectsStart-card"}>
          <CardContent>
            <Box textAlign={"center"} className={"projectsStart-card--topText"}>
              <Typography variant={"h5"} style={{fontWeight: 500}}>{t("LABEL_HOW_TO_START")}?</Typography>
              <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_HOW_TO_START_DES")}</Typography>
              <Typography variant={"body1"} color={"textSecondary"}>{t("LABEL_HOW_TO_START_DES2")}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop={"15px"} marginLeft={"7px"}>
              <Box minWidth={35}>
                <Typography variant="body1" color="textSecondary">{get(statusWorkGroup, "complete_rate", 0)}%</Typography>
              </Box>
              <Box width="100%" ml={1}>
                <BorderLinearProgress variant="determinate" value={parseInt(get(statusWorkGroup, "complete_rate", 0))}/>
              </Box>
            </Box>
            <List component={"nav"} className={"projectsStart-listSteps"}>
              {map(stepsDone, function (isDone, index) {
                return (
                  <ListItem>
                    <ListItemIcon>
                      {isDone ? <DoneIcon/> : <div className={"projectsStart--stepNumber"}>{index}</div>}
                    </ListItemIcon>
                    <ListItemText primary={t(`LABEL_START_WORK_STEP_${index}`)} secondary={t(`LABEL_START_WORK_STEP_${index}_DES`)}/>
                    <div className={"projectsStart-secondaryAction"}>
                      <Icon path={mdiChevronRight} size={1} color="rgba(0, 0, 0, 0.54)" />
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
export default connect(
  state => ({
    statusWorkGroup: state.project.getStatusWorkGroup.data
  }),
  {getStatusWorkGroup}
)(ProjectsStart);