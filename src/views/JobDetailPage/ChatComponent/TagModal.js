import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Scrollbars } from 'react-custom-scrollbars';
import { Dialog, DialogContent, Avatar } from '@material-ui/core';
import './ChatComponent.scss';
import { isEmpty } from '../../../helpers/utils/isEmpty';

const TagModal = props => {
  const handleCloseModal = () => {
    props.onClose();
  };

  useEffect(() => {
    setTimeout(() => {
      const tagModal = document.querySelector('.tag-modal');
      const contentModal = document.getElementById('tag_content');
      const dialogContainer = tagModal.querySelector('.MuiDialog-container');
      dialogContainer.style.display = 'block';
      const dialogContent = tagModal.querySelector('.MuiPaper-root');

      const marTop = props.marginTop - contentModal.offsetHeight - 3;

      dialogContent.style.marginTop = `${marTop}px`;
      dialogContent.style.marginLeft = `${props.marginLeft + 10}px`;
      dialogContent.style.marginRight = `${props.marginLeft}px`;
      dialogContent.style.maxWidth = '200px';
    }, 0); // eslint-disable-next-line
  }, []);

  return (
    <Dialog
      open={true}
      maxWidth="xs"
      onClose={handleCloseModal}
      className="tag-modal"
    >
      <DialogContent dividers id="tag_content">
        {!isEmpty(props.members) &&
          props.members.map(el => (
            <div key={el.id} className="tag-item">
              <Avatar className="header-chat-avatar" src={el.avatar} />
              &nbsp;&nbsp;&nbsp;
              <span>{el.name}</span>
            </div>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  state => ({
    members: state.chat.members
  }),
  {}
)(withRouter(TagModal));
