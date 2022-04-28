import { TextField } from "@material-ui/core";
import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

const StyledTextField = ({ className = "", ...rest }) => (
  <TextField
    className={`comp_CustomTextbox___text-field ${className}`}
    {...rest}
  />
);

const StyledTextArea = ({ className = "", ...rest }) => (
  <TextareaAutosize
    className={`comp_CustomTextbox___text-area ${className}`}
    {...rest}
  />
);

const StyledTextBox = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTextbox___text-box ${className}`} {...rest} />
);

function CustomTextbox({
  value,
  onChange,
  description,
  isReadOnly = false,
  className = "",
  label = undefined,
  placeholder = null,
  multiline = false,
  required = false,
  size = "medium",
  isTextarea = false,
}) {
  const { t } = useTranslation();
  if (isReadOnly) {
    return (
      <div className={`comp_CustomTextBox___readonly ${className}`}>
        <div
          style={{
            maxHeight: "initial", //!isReadOnly || showMore ? 'initial' : maxHeight,
            overflow: "initial", //!isReadOnly || showMore ? 'initial' : 'hidden',
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: value.replace(
                /(https?:\/\/[^\s]+)/g,
                "<a href='$1' target='_blank' >$1</a>"
              ),
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <StyledTextBox className={className}>
        <p>
          {label}
          {required ? <abbr title={t("IDS_WP_REQUIRED_LABEL")}>*</abbr> : null}
        </p>
        {description && (
          <p className="custom-text-box-description">{description}</p>
        )}
        {isTextarea ? (
          <StyledTextArea
            minRows={multiline ? 3 : undefined}
            value={value}
            onChange={(evt) => onChange(evt.target.value)}
            placeholder={placeholder ?? t("CUSTOM_TEXTBOX_CONTENT_LABEL")}
          />
        ) : (
          <StyledTextField
            multiline={multiline}
            fullWidth
            rows={multiline ? 3 : undefined}
            variant="outlined"
            size={size}
            value={value}
            onChange={(evt) => onChange(evt.target.value)}
            placeholder={placeholder ?? t("CUSTOM_TEXTBOX_CONTENT_LABEL")}
          />
        )}
      </StyledTextBox>
    );
  }
}

export default CustomTextbox;
