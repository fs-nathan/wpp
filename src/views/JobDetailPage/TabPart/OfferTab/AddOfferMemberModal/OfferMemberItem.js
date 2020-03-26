import { Avatar, Checkbox, Typography } from '@material-ui/core';
import React from 'react';
import './styles.scss';

function OfferMemberItem({
  isSelected = false,
  avatar,
  name,
  roles = [],
  onClick,
  isDisable,
}) {
  return (
    <div className="offerMemberItem">
      <Checkbox checked={isSelected} onClick={onClick} disabled={isDisable}></Checkbox>
      <Avatar className="offerMemberItem--avatar" src={avatar}></Avatar>
      <Typography className="offerMemberItem--name" component="div">
        {name}
        <Typography
          className="offerMemberItem--role"
          component="div">{roles.map(({ name }) => name).join(' - ')}</Typography>
      </Typography>
    </div>
  )
}

export default OfferMemberItem