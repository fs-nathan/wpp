import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSnackbar } from '../redux/actions';
import { NOTIFICATIONS } from '../redux/types';

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.offerPage[NOTIFICATIONS]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (displayed.includes(key)) return
      enqueueSnackbar(message, {
        key, ...options, onExited: (event, myKey) => {
          dispatch(removeSnackbar(myKey))
          removeDisplayed(myKey)
        }
      })
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
