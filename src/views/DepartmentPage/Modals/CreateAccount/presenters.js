import { Button, InputAdornment, TextField, Typography } from '@material-ui/core';
import { mdiAccountOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../components/CustomModal';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Department_CreateAccount_Modal___container ${className}`}
    {...props}
  />

function CreateAccount({
  open, setOpen,
  bgColor,
  handleInviteOtherPeopleCreateAccount,
}) {

  const [email, setEmail] = React.useState('');
  const { t } = useTranslation();

  return (
    <CustomModal
      title={t('DMH.VIEW.DP.MODAL.CA.TITLE')}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => t('DMH.VIEW.DP.MODAL.CA.CANCLE')}
    >
      <Container>
        <Typography variant="h4">{t('DMH.VIEW.DP.MODAL.CA.INVT')}</Typography>
        <span>{t('DMH.VIEW.DP.MODAL.CA.EMAIL')}</span>
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <Icon path={mdiAccountOutline} size={1} color={'#aaa'} />
            </InputAdornment>
          }}
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          placeholder={t('DMH.VIEW.DP.MODAL.CA.EMAIL_INP')}
        />
        <Button
          style={{
            backgroundColor: bgColor.color,
            color: 'white',
          }}
          onClick={evt => {
            setEmail('');
            setOpen(false);
            handleInviteOtherPeopleCreateAccount(email);
          }}
        >
          {t('DMH.VIEW.DP.MODAL.CA.SEND')}
        </Button>
        <span>{t('DMH.VIEW.DP.MODAL.CA.NOTE')}</span>
        <small>{t('DMH.VIEW.DP.MODAL.CA.DESC')}</small>
      </Container>
    </CustomModal>
  )
}

export default CreateAccount;
