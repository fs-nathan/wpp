import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DetailOffer from '../DetailOfferComponent'
import { styles } from '../DetailOfferComponent/style'



const DetailOfferModal = ({ open, setOpen, ...rest }) => {
  const { t } = useTranslation()
  const classes = styles()
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} maxWidth={'lg'}>
      <DialogTitle>
        <span>{t('DETAIL_OFFER')}</span>
      </DialogTitle>
      <DialogContent>
        <DetailOffer {...rest} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Thoát
        </Button>
        <Button className={classes.color_red}>
          Xoá đề xuất
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DetailOfferModal