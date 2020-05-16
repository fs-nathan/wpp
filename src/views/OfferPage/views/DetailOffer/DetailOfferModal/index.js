import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomModal from '../../../../../components/CustomModal';
import DetailOffer from '../DetailOfferComponent'
import { styles } from '../DetailOfferComponent/style'

const DetailOfferModal = ({ open, setOpen, history: { goBack }, ...rest }) => {
  const { t } = useTranslation()
  const classes = styles()
  const onCloseModal = () => {
    goBack();
  }
  const onDeleteOffer = () => {

  }

  return (
    <CustomModal
      title={t('DETAIL_OFFER')}
      open={open}
      setOpen={setOpen}
      confirmRender={"Xoa De Xuat"}
      onConfirm={onDeleteOffer}
      cancleRender={"Thoat"}
      onCancle={onCloseModal}
      fullWidth
    >
      <DetailOffer {...rest} />
    </CustomModal>
  )
}

export default DetailOfferModal
