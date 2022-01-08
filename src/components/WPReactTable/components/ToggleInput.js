import { TextField, Typography } from "@material-ui/core";
import TitleSectionModal from "components/TitleSectionModal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ToggleInput = () => {
  const { t } = useTranslation();
  const [isShowInput, setIsShowInput] = useState(false);

  if (isShowInput)
    return (
      <>
        <TitleSectionModal label={t("ADD_DESCRIPTION")} style={{ margin: 0 }} />
        <TextField
          className="offerModal--titleText"
          placeholder={t("ADD_DESCRIPTION")}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { color: "#666", marginTop: "15px" },
          }}
        />
      </>
    );

  return (
    <Typography
      style={{
        color: "#666",
        lineHeight: "15px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
      }}
      onClick={() => setIsShowInput(true)}
    >
      + {t("ADD_DESCRIPTION")}
    </Typography>
  );
};

export default ToggleInput;
