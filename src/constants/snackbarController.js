export const SNACKBAR_EVENT = 'CUSTOM_SNACKBAR_EVENT';

export const SNACKBAR_VARIANT = {
  SUCCESS: 'SNACKBAR_SUCCESS',
  ERROR: 'SNACKBAR_ERROR',
};

export const DEFAULT_MESSAGE = {
  QUERY: {
    SUCCESS: 'Tải dữ liệu thành công',
    ERROR: 'Lỗi trong quá trình tải dữ liệu',
  },
  MUTATE: {
    SUCCESS: 'Thao tác thành công',
    ERROR: 'Thao tác không thành công',
  },
}

export const SnackbarEmitter = (VARIANT, MESSAGE) => {
  const customEvent = new CustomEvent(SNACKBAR_EVENT, {
    detail: {
      message: MESSAGE,
      variant: VARIANT,
    },
  });
  window.dispatchEvent(customEvent);
};