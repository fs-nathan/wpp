import { Grid } from "@material-ui/core";
import TitleSectionModal from "components/TitleSectionModal";
import React from "react";
import { useTranslation } from "react-i18next";
import SelectFieldTypeDropdown from "./Dropdown";

const SelectCalculate = () => {
  const { t } = useTranslation();
  const [position, setPosition] = React.useState(1);
  const _handleSelectPosition = (value) => {
    setPosition(value);
  };

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
