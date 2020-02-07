import React from 'react';
import { TextField, Typography, InputAdornment, Button } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import { connect } from 'react-redux';
import { inviteOtherPeopleCreateAccount } from '../../../../actions/register/inviteOtherPeopleCreateAccount';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div 
    className={`view_Department_CreateAccount_Modal___container ${className}`}
    {...props}
  />

function CreateAccount({ open, setOpen, colors, doInviteOtherPeopleCreateAccount, }) {

  const bgColor = colors.find(item => item.selected === true);
  const [email, setEmail] = React.useState('');

  function handleInviteOtherPeopleCreateAccount() {
    doInviteOtherPeopleCreateAccount({ email });
    setEmail('');
    setOpen(false);
  }

  return (
    <React.Fragment>
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
              startAdornment: <InputAdornment position="start"><Icon path={mdiAccountOutline} size={1} color={'#aaa'} /></InputAdornment>
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
            onClick={evt => handleInviteOtherPeopleCreateAccount()}
          >
            Gửi yêu cầu
          </Button>
          <span>Lưu ý:</span>
          <small>Hệ thống sẽ gửi Email kèm theo mã xác thực tới tài khoản được mời đăng ký. Bạn vui lòng nhắc người được mời kiểm tra mail trong Hòm thư đến hoặc Spam để lấy mã</small>
        </Container>
        </CustomModal>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doInviteOtherPeopleCreateAccount: ({ email }) => dispatch(inviteOtherPeopleCreateAccount({ email })),
  }
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  mapDispatchToProps,
)(CreateAccount);
