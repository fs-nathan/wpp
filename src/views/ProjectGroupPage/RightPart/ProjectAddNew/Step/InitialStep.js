import { Add, PlusOneOutlined } from "@material-ui/icons";
import { Box, IconButton, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "react-i18next";

const InitialStep = ({ onNext }) => {
  const history = useHistory();
  const { t } = useTranslation();
  function onClose() {
    history.goBack();
  }
  return (
    <Box className="initial-step">
      <div className="close-button">
        <IconButton htmlColor="#969ead" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Typography variant="h4" style={{ margin: "0 0 10px" }}>
        {t("ADD_NEW.Create new project")}
      </Typography>
      <Typography
        variant="subtitle1"
        color="#6d6e6f"
        style={{ margin: "0 0 96px", fontWeight: 300 }}
      >
        {t("ADD_NEW.How do you want to do")}
      </Typography>
      <div className="initial-step-options" onClick={onNext}>
        <div className="initial-step-item initial-step-create-new">
          <div className="initial-step-item-icon initial-step-create-new-icon">
            <Add fontSize="large" sx={{ color: "#333333" }} />
          </div>
          <Typography
            variant="subtitle1"
            style={{
              marign: 0,
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t("ADD_NEW.Blank page")}
          </Typography>
          <Typography variant="subtitle1" color="#6d6e6f">
            {t("ADD_NEW.Start")}
          </Typography>
        </div>

        <div
          className="initial-step-item initial-step-template"
          onClick={() => history.push("/projects/template")}
        >
          <div className="initial-step-item-icon initial-step-template-icon">
            <img src="/images/rocket.png" alt="Rocket" />
          </div>
          <Typography
            variant="subtitle1"
            style={{
              marign: 0,
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t("ADD_NEW.Use a template")}
          </Typography>
          <Typography variant="subtitle1" color="#6d6e6f">
            {t("ADD_NEW.From library")}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default InitialStep;
