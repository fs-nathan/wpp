import TitleSectionModal from "components/TitleSectionModal";
import React from "react";
import { useTranslation } from "react-i18next";
import SelectFieldTypeDropdown from "./Dropdown";

const SelectLabel = ({ options = [], handleSelectLabel }) => {
  const { t } = useTranslation();

  const _handleSelect = (value) => {
    console.log("@Pham_Tinh_Console:", value);
    handleSelectLabel(value);
  }

  return (
    <>
      <TitleSectionModal label={t("label")} style={{ marginTop: 0 }} />
      <SelectFieldTypeDropdown
        options={options}
        defaultValue={options[0]?.value || ""}
        disabled={options.length === 0}
        onSelect={_handleSelect}
      />
    </>
  );
};

export default SelectLabel;
