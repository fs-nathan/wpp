import { Box, ButtonBase } from "@material-ui/core";
import { actionChangeLanguage } from "actions/system/system";
import colors from "helpers/colorPalette";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import TasksCard from "../components/TasksCard";

const Language = ({ handleChangeLanguage, language }) => {
  return (
    <TasksCard.Container>
      <Box padding="20px">
        <ButtonBase
          disabled={language === "vi"}
          style={{
            padding: "2px 4px",
            color: language === "vi" ? colors.gray[0] : colors.blue[0],
          }}
          onClick={() => handleChangeLanguage("vi")}
        >
          Tiếng Việt
        </ButtonBase>
        <ButtonBase
          disabled={language === "en"}
          style={{
            padding: "2px 4px",
            color: language === "en" ? colors.gray[0] : colors.blue[0],
          }}
          onClick={() => handleChangeLanguage("en")}
        >
          English(US)
        </ButtonBase>
      </Box>
    </TasksCard.Container>
  );
};
export default (props) => {
  const profile = useSelector((state) => state.system.profile);
  const { t, i18n } = useTranslation();
  console.log({ i18n });
  const handleChangeLanguage = async (lang = "vi") => {
    await actionChangeLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <Language
      handleChangeLanguage={handleChangeLanguage}
      language={i18n.language}
    />
  );
};
