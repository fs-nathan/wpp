import { Grid } from "@material-ui/core";
import TitleSectionModal from "components/TitleSectionModal";
import React from "react";
import { useTranslation } from "react-i18next";
import SelectFieldTypeDropdown from "./Dropdown";

const SelectCalculate = ({ _handleSelectPosition }) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={3} pt={0}>
      <TitleSectionModal label={t("TYPE")} style={{ marginTop: 0 }} />
      <SelectFieldTypeDropdown
        options={[
          { text: t("total"), type: 1 },
          { text: t("averaged"), type: 2 },
        ]}
        defaultValue={1}
        onSelect={_handleSelectPosition}
      />
    </Grid>
  );
};

export default SelectCalculate;
