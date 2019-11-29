import React from 'react';
import Joi from '@hapi/joi';
import moment from 'moment';

export function useRequiredString(initial = '', maxLength = 100) {
  const [string, setString] = React.useState(initial);
  const [error, setError] = React.useState(null);
  const schema = Joi.string().max(maxLength).required().messages({
    'string.empty': 'Không được để trống',
    'string.max': 'Tối đa {#limit} ký tự',
  });
  
  React.useEffect(() => {
    const { error } = schema.validate(string);
    setError(error);
  }, [string]);

  return [string, setString, error];
}

export function useRequiredDate(initial = moment().toDate()) {
  const [date, setDate] = React.useState(initial);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (moment(date).isValid())
      setError(null);
    else
      setError(new Error('Phải là kiểu ngày tháng'));
  }, [date]);

  return [date, setDate, error];
}