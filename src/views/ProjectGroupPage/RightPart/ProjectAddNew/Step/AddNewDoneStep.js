import { Check } from "@material-ui/icons";
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const AddNewDoneStep = ({ onNext, projectId }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [option, setOption] = useState(0);

  function navigate() {
    switch (option) {
      case 0:
        //  history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
        history.push(`/projects/task-table/${projectId}`);
        break;
      case 1:
        history.push(`/projects/task-table/${projectId}?open-employee=true`);
        break;
    }
  }
  return (
    <Box className="add-new-done-step">
      <div className="add-new-done-step-form">
        <Typography variant="h4" marginBottom={4}>
          {t("CREATE_PROJECT_DONE_TITLE")}
        </Typography>
        <div>
          <Paper
            variant="outlined"
            className={`add-new-done-step-card ${
              option === 0 && "add-new-done-step-card--active"
            }`}
            onClick={() => setOption(0)}
          >
            <div className={`add-new-done-step-card-icon `}>
              <img src="https://img.icons8.com/color/48/000000/in-progress--v1.png" />
            </div>

            <div className="add-new-done-step-card-content">
              <h2>{t("CREATE_PROJECT_DONE_NEW_LABEL")}</h2>
              <p>{t("CREATE_PROJECT_DONE_NEW_CONTENT")}</p>
            </div>
          </Paper>

          <Paper
            variant="outlined"
            className={`add-new-done-step-card ${
              option === 1 && "add-new-done-step-card--active"
            }`}
            onClick={() => setOption(1)}
          >
            <div className={`add-new-done-step-card-icon `}>
              <img src="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/000000/external-team-work-from-home-sbts2018-flat-sbts2018.png" />
            </div>

            <div className="add-new-done-step-card-content">
              <h2>{t("CREATE_PROJECT_DONE_SHARE_LABEL")}</h2>
              <p>{t("CREATE_PROJECT_DONE_SHARE_CONTENT")}</p>
            </div>
          </Paper>
        </div>
        <div className="submit-button">
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={navigate}
            fullWidth
          >
            {t("BEGIN")}
          </Button>
        </div>
      </div>
    </Box>
  );
};
export default AddNewDoneStep;
