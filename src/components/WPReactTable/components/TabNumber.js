import { Grid, TextField } from "@material-ui/core";
import TitleSectionModal from "components/TitleSectionModal";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentNumberColumn from "./ContentNumberColumn";
import SelectFieldTypeDropdown from "./Dropdown";
import SelectCalculate from "./SelectCalculate";
import SelectLabel from "./SelectLabel";
import SelectOptionsNumber, { SelectPosition } from "./SelectOptionsNumber";
import SourceNumberSelect from "./SourceNumberSelect";

const TabNumber = forwardRef(
  (
    {
      defaultLabel = "",
      defaultPosition = "right",
      defaultFormat = "number",
      defaultNumFix = 0,
      setListSources,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [decimal, setDecimal] = useState(defaultNumFix);
    const [labelName, setLabelName] = useState(defaultLabel);
    const [position, setPosition] = useState(defaultPosition);
    const [format, setFormat] = useState(defaultFormat);
    const [optionsLabelSelect, setOptionsLabelSelect] = useState([]);
    const isAdditionLabel = format === "other_label";
    const isHashFormat = format === "hash";

    useImperativeHandle(ref, () => ({
      _getValue: () => ({
        format: _handleGetFormat(),
        decimal,
        position_format: position === "left" ? 1 : 2,
      }),
    }));

    const _handleGetFormat = () => {
      if (format === "percent") return "%";
      if (format === "vnd") return "VND";
      if (format === "usd") return "USD";
      return labelName;
    };

    const _handleSelect = (value) => {
      setDecimal(value);
    };

    const _handleSelectFormat = (value) => {
      setFormat(value);
    };

    const _handleSelectPosition = (value) => {
      setPosition(value);
    };

    const _handleSelectLabel = (value) => {
      setLabelName(value);
    };

    const _handleSelectLabelSelect = (selected) => {
      const listID = [];
      (selected || []).forEach((element) => {
        if (!element.id) return;
        listID.push(element.id);
      });
      setListSources && setListSources(listID);
      setOptionsLabelSelect(selected);
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

    return (
      <>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <SelectOptionsNumber
              defaultFormat={defaultFormat}
              handleSelectFormat={_handleSelectFormat}
            />
            {isAdditionLabel && (
              <Grid item xs={3} pt={0}>
                {_renderLabelNameInput()}
              </Grid>
            )}
            {isHashFormat ? (
              <SelectCalculate handleSelectPosition={_handleSelectPosition} />
            ) : (
              format !== "number" && (
                <SelectPosition handleSelectPosition={_handleSelectPosition} />
              )
            )}
            <Grid item xs={3} pt={0}>
              {isHashFormat ? (
                <SourceNumberSelect
                  defaultSelected={optionsLabelSelect}
                  onSelectSource={_handleSelectLabelSelect}
                />
              ) : (
                _renderDemicalNumber()
              )}
            </Grid>
          </Grid>
        </Grid>

        {isHashFormat && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3} pt={0}>
                {_renderDemicalNumber()}
              </Grid>
              <Grid item xs={3} pt={0}>
                <SelectLabel
                  options={optionsLabelSelect.map((item) => ({
                    id: item.id,
                    value: item.format,
                    text: item.format,
                  }))}
                  handleSelectLabel={_handleSelectLabel}
                />
              </Grid>
              <ContentNumberColumn
                isAdditionLabel
                title={t("FORMAT")}
                position={position}
                labelName={labelName}
                decimal={decimal}
                format={format}
              />
            </Grid>
          </Grid>
        )}

        {!isHashFormat && (
          <ContentNumberColumn
            position={position}
            format={format}
            isAdditionLabel={isAdditionLabel}
            labelName={labelName}
            decimal={decimal}
          />
        )}
      </>
    );
  }
);

export default TabNumber;
