import { Avatar, Checkbox, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

export const StyledDiv = styled.div`
  .Mui-checked {
    color: ${props => props.selectedColor};
  }
`

function OfferMemberItem({
  isSelected = false,
  avatar,
  name,
  roles,
  onClick,
  isDisable,
}) {
  const groupActiveColor = useSelector(currentColorSelector)

  return (
    <StyledDiv
      selectedColor={groupActiveColor}
      className="offerMemberItem">
      <Checkbox checked={isSelected}
        onClick={onClick} disabled={isDisable} />
      <Avatar className="offerMemberItem--avatar" src={avatar}></Avatar>
      <Typography className="offerMemberItem--name" component="div">
        {name}
        <Typography
          className="offerMemberItem--role"
          component="div">{roles}</Typography>
      </Typography>
    </StyledDiv>
  )
}

export default OfferMemberItem