import React from 'react';
import { connect } from 'react-redux';
import { inviteOtherPeopleCreateAccount } from '../../../../actions/register/inviteOtherPeopleCreateAccount';
import { bgColorSelector } from './selectors';
import CreateAccountPresenter from './presenters';

function CreateAccount({ 
  open, setOpen, bgColor,
  doInviteOtherPeopleCreateAccount, 
}) {

  return (
    <CreateAccountPresenter 
      open={open} setOpen={setOpen}
      bgColor={bgColor}
      handleInviteOtherPeopleCreateAccount={email => doInviteOtherPeopleCreateAccount({ email })}
    />
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doInviteOtherPeopleCreateAccount: ({ email }) => dispatch(inviteOtherPeopleCreateAccount({ email })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccount);
