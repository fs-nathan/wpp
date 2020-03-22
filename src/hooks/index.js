import Joi from '@hapi/joi';
import { convertToRaw } from 'draft-js';
import moment from 'moment';
import React from 'react';
import { getEditorData } from '../components/TextEditor';

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

export function useTextboxString(initial = '', maxLength = 100) {
  const [editorState, setEditorState] = React.useState(getEditorData(initial));
  const [error, setError] = React.useState(null);
  const [raw, setRaw] = React.useState(null);

  React.useEffect(() => {
    const string = editorState
      .getCurrentContent()
      .getPlainText('')
    const schema = Joi.string().allow('').max(maxLength).messages({
      'string.max': 'Tối đa {#limit} ký tự',
    });
    const { error } = schema.validate(string);
    setError(error);
    setRaw(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }, [editorState, maxLength]);

  return [editorState, setEditorState, error, raw];
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

export function useClientReact(...dependencies) {
  const [rect, setRect] = React.useState();
  const ref = React.useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, dependencies);
  return [rect, ref];
}