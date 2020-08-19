import { useSnackbar } from "notistack";


export function messageBox(message, type) {
  return new Promise(resolve => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return enqueueSnackbar("hello")
  })
}
