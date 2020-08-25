import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const TitleSectionModal = ({ label, isRequired }) => {
  const { t } = useTranslation();

  return (
    <abbr className="TitleSectionModal" title={isRequired ? t('IDS_WP_REQUIRED_LABEL') : ''} >
      <Typography component={'span'} className="TitleSectionModal--titleLabel"> {label} </Typography>
      {isRequired && <span className="TitleSectionModal--asterisk">*</span>}
    </abbr>
  );
}

TitleSectionModal.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};

export default TitleSectionModal;
