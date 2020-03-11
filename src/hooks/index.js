import React from 'react';
import Joi from '@hapi/joi';
import moment from 'moment';

export function useRequiredString(initial = '', maxLength = 100) {
  const [string, setString] = React.useState(initial);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const schema = Joi.string().max(maxLength).required().messages({
      'any.required': 'Không được để trống',
      'string.empty': 'Không được để trống',
      'string.max': 'Tối đa {#limit} ký tự',
    });
    const { error } = schema.validate(string);
    setError(error);
  }, [string, maxLength]);

  return [string, setString, error];
}

export function useMaxlenString(initial = '', maxLength = 100) {
  const [string, setString] = React.useState(initial);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const schema = Joi.string().allow('').max(maxLength).messages({
      'string.max': 'Tối đa {#limit} ký tự',
    });
    const { error } = schema.validate(string);
    setError(error);
  }, [string, maxLength]);

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

export function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      setStoredValue(storedValue);
    }
  };
  
  return [storedValue, setValue];
}