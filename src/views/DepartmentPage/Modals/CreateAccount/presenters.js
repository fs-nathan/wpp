import React from 'react';
import { TextField, Typography, InputAdornment, Button } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
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

  return (
    <CustomModal
      title={`Thêm tài khoản`}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => 'Hủy'}
    >
      <Container>
        <Typography variant="h4">Mở đăng ký tài khoản</Typography>
        <span>Nhập email bạn muốn mời đăng ký sử dụng phần mềm</span>
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <Icon path={mdiAccountOutline} size={1} color={'#aaa'} />
            </InputAdornment>
          }}
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          placeholder='Nhập email đăng ký'
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
          Gửi yêu cầu
        </Button>
        <span>Lưu ý:</span>
        <small>Hệ thống sẽ gửi Email kèm theo mã xác thực tới tài khoản được mời đăng ký. Bạn vui lòng nhắc người được mời kiểm tra mail trong Hòm thư đến hoặc Spam để lấy mã</small>
      </Container>
    </CustomModal>
  )
}

export default CreateAccount;
