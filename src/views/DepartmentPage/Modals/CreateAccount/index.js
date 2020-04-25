import React from 'react';
import { connect } from 'react-redux';
import { inviteOtherPeopleCreateAccount } from '../../../../actions/register/inviteOtherPeopleCreateAccount';
import CreateAccountPresenter from './presenters';
import { actionLoadingSelector, bgColorSelector } from './selectors';

function CreateAccount({
  open, setOpen, bgColor, actionLoading,
  doInviteOtherPeopleCreateAccount,
}) {

  return (
    <CreateAccountPresenter
      open={open} setOpen={setOpen}
      bgColor={bgColor}
      actionLoading={actionLoading}
      handleInviteOtherPeopleCreateAccount={email => doInviteOtherPeopleCreateAccount({ email })}
    />
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    actionLoading: actionLoadingSelector(state),
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
