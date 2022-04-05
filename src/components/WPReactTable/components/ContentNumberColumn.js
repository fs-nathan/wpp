import { Grid, Typography } from "@material-ui/core";
import TitleSectionModal from "components/TitleSectionModal";
import React from "react";
import { useTranslation } from "react-i18next";

const ContentNumberColumn = ({
  title = "",
  position,
  format,
  isAdditionLabel,
  labelName,
  decimal,
}) => {
  const { t } = useTranslation();

  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimal,
  });

  const _renderFormatType = () => {
    switch (format) {
      case "percent":
        return "%";
      case "vnd":
        return "VND";
      case "usd":
        return "USD";
      default:
        if (isAdditionLabel) return labelName;
    }
  };

  return (
    <Grid item xs={6}>
      <Grid container spacing={2}>
        <Grid item xs={12} pt={0}>
          <TitleSectionModal
            label={title || t("PREVIEW")}
            style={{ marginTop: 0 }}
          />
          <Typography
            variant="p"
            gutterBottom
            component="div"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              margin: 0,
              fontSize: 18,
            }}
          >
            {position === "left" && _renderFormatType()}{" "}
            {format === "percent"
              ? formatter.format(100)
              : formatter.format(1000)}{" "}
            {position === "right" && _renderFormatType()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContentNumberColumn;
