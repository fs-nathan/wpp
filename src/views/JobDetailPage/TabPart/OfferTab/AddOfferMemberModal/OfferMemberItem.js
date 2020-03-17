import React from 'react';
import { Checkbox, Avatar, Typography } from '@material-ui/core';

import './styles.scss';

function OfferMemberItem({
  isSelected = false,
  avatar,
  name,
  role,
  onClick,
}) {
  return (
    <div className="offerMemberItem">
      <Checkbox checked={isSelected} onClick={onClick} ></Checkbox>
      <Avatar className="offerMemberItem--avatar" src={avatar}></Avatar>
      <Typography component="div">
        {name}
        <Typography component="div">{role}</Typography>
      </Typography>
    </div>
  )
}

export default OfferMemberItem