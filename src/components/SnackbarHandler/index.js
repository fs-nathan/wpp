import React from 'react';
import { SNACKBAR_EVENT, SNACKBAR_VARIANT } from '../../constants/snackbarController';
import { useSnackbar } from 'notistack';

export default function SnackbarHandler({ ...props }) {

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    function fireSnackbar({ detail: { message, variant } }) {
      switch (variant) {
        case SNACKBAR_VARIANT.SUCCESS:
          enqueueSnackbar(message, { variant: 'success' , persist: true});
          return;
        case SNACKBAR_VARIANT.ERROR:
          enqueueSnackbar(message, { variant: 'error' , persist: true});
          return;
        default:
          return;
      }
    };
    window.addEventListener(SNACKBAR_EVENT, fireSnackbar);
    return () => window.removeEventListener(SNACKBAR_EVENT, fireSnackbar);
  }, [enqueueSnackbar]);
  
  return (
    <div {...props} />
  );
}