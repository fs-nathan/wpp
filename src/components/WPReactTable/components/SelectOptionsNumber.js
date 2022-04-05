import { Grid } from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import PercentIcon from "@mui/icons-material/Percent";
import TagIcon from "@mui/icons-material/Tag";
import TitleSectionModal from "components/TitleSectionModal";
import React from "react";
import { useTranslation } from "react-i18next";
import SelectFieldTypeDropdown from "./Dropdown";

const SelectOptionsNumber = ({ defaultFormat, handleSelectFormat }) => {
  const { t } = useTranslation();
  return (
    <Grid item xs={3} pt={0}>
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
            text: "Công thức",
            type: "hash",
          },
          { text: "Nhãn khác", type: "other_label" },
        ]}
        defaultValue={defaultFormat}
        onSelect={handleSelectFormat}
      />
    </Grid>
  );
};

export const SelectPosition = ({ handleSelectPosition }) => {
  const { t } = useTranslation();
  return (
    <Grid item xs={3} pt={0}>
      <TitleSectionModal label={t("POSITION")} style={{ marginTop: 0 }} />
      <SelectFieldTypeDropdown
        options={[
          { text: "Trái", type: "left" },
          { text: "Phải", type: "right" },
        ]}
        defaultValue="right"
        onSelect={handleSelectPosition}
      />
    </Grid>
  );
};

export default SelectOptionsNumber;
