import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './styles.scss'

const CommonProgressForm = ({
  handleChange,
  value,
  items,
  defaultState,
}) => {
  const { t } = useTranslation();
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={e => handleChange(parseInt(e.target.value))}
        row
      >
        {items &&
          items.map((item, key) => (
            <FormControlLabel
              key={key}
              value={item.value}
              control={<Radio color="primary" />}
              label={defaultState === item.value ? <span className="CommonProgressForm--radio">
                <abbr
                  title={t('LABEL_CHAT_TASK_THAY_DOI_MAC_DINH')}>
                  {`${item.label} ${t('LABEL_CHAT_TASK_MAC_DINH')}`}
                </abbr>
              </span>
                : item.label}
              labelPlacement="end"
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CommonProgressForm;