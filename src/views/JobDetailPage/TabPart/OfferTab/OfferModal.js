import React from 'react';
import { IconButton, Dialog, Button, TextField, withStyles, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCloudDownloadOutline, mdiClose } from '@mdi/js';
// import ColorTypo from '../../../../components/ColorTypo';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IntegrationReactSelect from '../Tag/index'
// import colorPal from '../../../../helpers/colorPalette';
import { makeStyles } from '@material-ui/core/styles';
import ColorTypo from '../../../../components/ColorTypo'
import { WrapperContext } from '../../index'
import { DEFAULT_OFFER_ITEM } from '../../../../helpers/jobDetail/arrayHelper'
const TexTitle = styled(Typography)`
  font-size: 15px;
  margin: 15px 0;
`
// const Text = styled(TextField)`
//   & > *:first-child {
//     margin-bottom: 20px;
//     & > input {
//       font-size: 16px;
//       margin-bottom: 100px;
//     }
//   }
// `

// const TitleText = styled(Typography)`
//   font-size: 15px;
//   margin: 15px 0;
// `
// const ButtonFile = styled.label`
//       & > span {
//         margin: 20px 0 0 0;
//         & > span {
//           display: flex;
//           align-items: center;
//           justify-content: start;
//           padding: 3px 10px;
//           font-size: 14px;
//           font-weight: 500;
//         }
//       }
// `
const TextContent = styled(TextField)`
  & > label {
      font-size: 14px;
      z-index: 0
  }
`

const FileSize = styled(ColorTypo)`
  margin-right: 20px;
  width: 67px;
`
const FileId = styled(Icon)`
 cursor: pointer;
`

// const FileBoxStyledListItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 10px;
//   border-bottom: 1px solid #b5b5b5;
// `
// const FileName = styled.span`
//   width: 440px;
//   word-break: break-word;
//   margin-right: 30px
// `

// bien cua modal
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: '#f5f8fc'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 400,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: '15px 24px',
  },
}))(MuiDialogActions);
// end modal

const OfferFile = ({ file, handleDeleteFile }) => {
  return (
    <div className="file-box-wrapper">
      <span className="file-name">{file.name}</span>
      <FileSize variant='caption'>{file.size}</FileSize>
      <FileId onClick={() => handleDeleteFile(file.id)} path={mdiClose} size={0.5} />
    </div>
  )
}

const OfferModal = (props) => {
  const valueOffer = React.useContext(WrapperContext)
  const [tempSelectedItem, setTempSelectedItem] = React.useState(DEFAULT_OFFER_ITEM)
  const classes = useStyles()

  React.useEffect(() => {
    if (props.item)
      setTempSelectedItem(props.item)
  }, [props.item])

  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }))
  }

  const handleUploadFileUpdate = files => {
    // console.log("files:", files);

    // For update
    if (!files.length) return
    let payload = new FormData()
    // Add offer id to form data
    payload.append("offer_id", tempSelectedItem.offer_id)
    // console.log('tempSelectItem::::', tempSelectedItem.offer_id);

    // Add each file to form data
    for (let i = 0; i < files.length; i++) {
      payload.append("file", files[i], files[i].name)
    }
    // Build a callback that allow saga append new file to state array
    let appendFileCallBack = responseFiles => {
      setParams("files", [...tempSelectedItem.files, ...responseFiles])
    }
    // Call api
    valueOffer.uploadDocumentToOfferById({payload, appendFileCallBack, taskId: valueOffer.taskId})
  }

  const handleDeleteFile = fileId => {
    let payload = { offer_id: tempSelectedItem.offer_id, file_id: fileId }
    // Build a callback that allow saga remove file in state array
    let removeFileCallBack = () => {
      setParams("files", tempSelectedItem.files.filter(file => file.id !== fileId))
    }
    // Call api
    valueOffer.deleteDocumentToOfferById({payload, removeFileCallBack, taskId: valueOffer.taskId})
  }


  const handleUploadFileAdd = files => {
    setParams("files", [...tempSelectedItem.files, ...files])
  }

  const handleCreateOffer = () => {
    let dataCreateOfferFormData = new FormData()
    // add content and task id to form data
    dataCreateOfferFormData.append('content', tempSelectedItem.content)
    dataCreateOfferFormData.append('task_id', props.taskId)
    // add each user to formdata
    for (let i = 0; i < tempSelectedItem.user_hander.length; i++) {
      dataCreateOfferFormData.append("user_hander[" + i + "]", tempSelectedItem.user_hander[i])
    }
    // add each file to formdata  
    for (let i = 0; i < tempSelectedItem.files.length; i++) {
      dataCreateOfferFormData.append("file", tempSelectedItem.files[i], tempSelectedItem.files[i].name)
    }
    props.createOfferByTaskId({data: dataCreateOfferFormData, taskId: props.taskId})
    setParams("files", [])
  }

  // const handleUpdateOffer = () => {
  //   let dataUpdateOfferFormData = new FormData()
  //   dataUpdateOfferFormData.append('offer_id', tempSelectedItem.offer_id)
  //   // add each user to formdata
  //   for (let i = 0; i < tempSelectedItem.user_hander.length; i++) {
  //     dataUpdateOfferFormData.append("user_hander[" + i + "]", tempSelectedItem.user_hander[i])
  //   }
  // }

  return (
    <Dialog open={props.isOpen} onClose={props.handleClickClose} fullWidth>
      {props.isOffer ?
        <DialogTitle onClose={props.handleClickClose}>
          Chỉnh sửa đề xuất
        </DialogTitle>
        :
        <DialogTitle onClose={props.handleClickClose}>
          Tạo đề xuất
        </DialogTitle>
      }
      <DialogContent dividers>
        <TexTitle >Chọn người duyệt</TexTitle>
        <IntegrationReactSelect {...props} handleChooseUser={listUser => setParams("user_hander", listUser)} />
        <TextContent
          label="Nội dung phê duyệt"
          fullWidth
          multiline
          rows="7"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          style={{ marginTop: 20 }}
          value={tempSelectedItem ? tempSelectedItem.content : ""}
          onChange={e => setParams("content", e.target.value)}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="outlined-button-file"
          multiple
          type="file"
          onChange={e => props.isOffer ? handleUploadFileUpdate(e.target.files) : handleUploadFileAdd(e.target.files)}
        />
        <label className="button-offer-modal" htmlFor="outlined-button-file">
          <Button variant="outlined" component="span" fullWidth className={classes.button}>
            <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />
            Đính kèm tài liệu
                </Button>
        </label>
        {
          tempSelectedItem.files.map(file => (<OfferFile key={file.id} file={file} handleDeleteFile={handleDeleteFile} />))
        }
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClickClose} color='#222'>
          Hủy
        </Button>
        {props.isOffer ?
          <Button
            color="primary"
            onClick={() => {
              props.handleClickClose()
              if (tempSelectedItem.content) {
                props.updateOfferById({offerId: tempSelectedItem.offer_id, content:tempSelectedItem.content, taskId: valueOffer.taskId})
              }
              setParams("content", '')
            }}>
            Chỉnh sửa
        </Button>
          :
          <Button
            color="primary"
            onClick={() => {
              props.handleClickClose()
              if (tempSelectedItem.content)
                handleCreateOffer()
              setParams("content", '')
            }}>
            Hoàn Thành
          </Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default OfferModal