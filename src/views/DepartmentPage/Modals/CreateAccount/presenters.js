import { Button, CircularProgress, InputAdornment, TextField, Typography } from '@material-ui/core';
import { mdiAccountOutline } from '@mdi/js';
import Icon from '@mdi/react';
import CustomModal from 'components/CustomModal';
import { CustomEventDispose, CustomEventListener, INVITE_OTHER_PEOPLE_CREATE_ACCOUNT } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  actionLoading,
}) {

  const [email, setEmail] = React.useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setEmail('');
    };
    CustomEventListener(INVITE_OTHER_PEOPLE_CREATE_ACCOUNT, successClose);
    return () => CustomEventDispose(INVITE_OTHER_PEOPLE_CREATE_ACCOUNT, successClose);
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      title={t('DMH.VIEW.DP.MODAL.CA.TITLE')}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => t('DMH.VIEW.DP.MODAL.CA.CANCLE')}
      manualClose={false}
      onCancle={() => setOpen(false)}
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
            opacity: !actionLoading ? 1 : 0.5,
          }}
          onClick={evt => {
            handleInviteOtherPeopleCreateAccount(email);
          }}
          disabled={actionLoading}
        >
          {actionLoading &&
            <CircularProgress
              size={16}
              className="margin-circular"
              color={bgColor.color}
            />}
          {t('DMH.VIEW.DP.MODAL.CA.SEND')}
        </Button>
        <span>{t('DMH.VIEW.DP.MODAL.CA.NOTE')}</span>
        <small>{t('DMH.VIEW.DP.MODAL.CA.DESC')}</small>
      </Container>
    </CustomModal>
  )
}

export default CreateAccount;
