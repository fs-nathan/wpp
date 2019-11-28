import React from 'react';
import Joi from '@hapi/joi';

export function useRequiredString(initial = '', maxLength = 100) {
  const [string, setString] = React.useState(initial);
  const [error, setError] = React.useState()
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