import i18n from 'i18n';

export const SNACKBAR_EVENT = 'CUSTOM_SNACKBAR_EVENT';

export const SNACKBAR_VARIANT = {
  SUCCESS: 'SNACKBAR_SUCCESS',
  ERROR: 'SNACKBAR_ERROR',
};

export const DEFAULT_MESSAGE = {
  QUERY: {
    SUCCESS: i18n.t('SNACK_QUERY_SUCCESS'),
    ERROR: i18n.t('SNACK_QUERY_FAIL'),
  },
  MUTATE: {
    SUCCESS: i18n.t('SNACK_MUTATE_SUCCESS'),
    ERROR: i18n.t('SNACK_MUTATE_FAIL'),
  },
}

export const SnackbarEmitter = (VARIANT, MESSAGE) => {
  if (MESSAGE !== '__NO_SNACKBAR_ERROR__') {
    const customEvent = new CustomEvent(SNACKBAR_EVENT, {
      detail: {
        message: MESSAGE,
        variant: VARIANT,
      },
    });
    window.dispatchEvent(customEvent);
  }
};