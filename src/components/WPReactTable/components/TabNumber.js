import { Grid, TextField, Typography } from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import PaidIcon from "@mui/icons-material/Paid";
import FunctionsIcon from "@mui/icons-material/Functions";
import TagIcon from "@mui/icons-material/Tag";
import TitleSectionModal from "components/TitleSectionModal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SelectFieldTypeDropdown from "./Dropdown";

const TabNumber = () => {
  const { t } = useTranslation();
  const [numToFix, setNumToFix] = useState(0);
  const [labelName, setLabelName] = useState("");
  const [position, setPosition] = useState("right");
  const [format, setFormat] = useState("number");

  const isAdditionLabel = format === "other_label";

  const _handleSelect = (value) => {
    setNumToFix(value);
  };

  const _handleSelectFormat = (value) => {
    setFormat(value);
  };

  const _handleSelectPosition = (value) => {
    setPosition(value);
  };

  const _renderLabelNameInput = () => (
    <>
      <TitleSectionModal label={t("LABEL_NAME")} style={{ marginTop: 0 }} />
      <TextField
        placeholder={t("LABEL_NAME")}
        variant="outlined"
        fullWidth
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
        InputProps={{
          style: { color: "#666" },
        }}
      />
    </>
  );

  const _renderDemicalNumber = () => (
    <>
      <TitleSectionModal label={t("DECIMAL")} style={{ marginTop: 0 }} />
      <SelectFieldTypeDropdown
        options={[
          { text: 0, type: 0 },
          { text: 1, type: 1 },
          { text: 2, type: 2 },
          { text: 3, type: 3 },
        ]}
        defaultValue={0}
        onSelect={_handleSelect}
      />
    </>
  );

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
    <>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={7} pt={0}>
            <TitleSectionModal label={t("FORMAT")} style={{ marginTop: 0 }} />
            <SelectFieldTypeDropdown
              options={[
                { text: "Con số", type: "number", icon: () => <TagIcon /> },
                {
                  text: "Phần trăm",
                  type: "percent",
                  icon: () => <PercentIcon />,
                },
                { text: "VND", type: "vnd", icon: () => <PaidIcon /> },
                { text: "USD", type: "usd", icon: () => <AttachMoneyIcon /> },
                {
                  icon: () => <FunctionsIcon />,
                  text: "Công thức",
                  type: "hash",
                },
                { text: "Nhãn khác", type: "other_label" },
              ]}
              defaultValue="number"
              onSelect={_handleSelectFormat}
            />
          </Grid>
          <Grid item xs={5} pt={0}>
            {isAdditionLabel ? _renderLabelNameInput() : _renderDemicalNumber()}
          </Grid>
        </Grid>
      </Grid>

      {isAdditionLabel && (
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={7} pt={0}>
              <TitleSectionModal
                label={t("POSITION")}
                style={{ marginTop: 0 }}
              />
              <SelectFieldTypeDropdown
                options={[
                  { text: "Trái", type: "left" },
                  { text: "Phải", type: "right" },
                ]}
                defaultValue="right"
                onSelect={_handleSelectPosition}
              />
            </Grid>
            <Grid item xs={5} pt={0}>
              {_renderDemicalNumber()}
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6} pt={0}>
            <TitleSectionModal label={t("PREVIEW")} style={{ marginTop: 0 }} />
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
              {position === "left" && isAdditionLabel && _renderFormatType()}{" "}
              {parseFloat(1000).toFixed(numToFix)}{" "}
              {(!isAdditionLabel ||
                (isAdditionLabel && position === "right")) &&
                _renderFormatType()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TabNumber;
