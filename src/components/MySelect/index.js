import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from '../CustomSelect';
import './style.scss';

const Title = ({ className = '', ...props }) =>
  <Typography
    className={`comp_MySelect___title ${className}`}
    {...props}
  />

const Select = ({ className = '', ...props }) =>
  <Typography
    className={`comp_MySelect___select ${className}`}
    component={'div'}
    {...props}
  />

function MySelect({
  label, placeholder,options, value, onChange, isRequired = false,
  selectProps
}) {
  const { t } = useTranslation();
  return (
    <>
      <Title component={'div'}>{label} {isRequired ? <abbr title={t("IDS_WP_REQUIRED_LABEL")}>*</abbr> : null}</Title>
      <Select {...selectProps}>
        <CustomSelect
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </Select>
    </>
  );
}

export default MySelect;
