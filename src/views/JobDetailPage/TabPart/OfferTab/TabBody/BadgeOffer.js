import React from 'react';
import styled from 'styled-components';
import ColorChip from '../../../../../components/ColorChip';

export const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`

const BadgeOffer = (status) => {
  let label, color;
  if (status === 1) {
    label = "Duyệt"
    color = "bluelight"
  } else {
    label = "Từ chối"
    color = "redlight"
  }
  return (
    <Badge component='small' color={color} badge size='small' label={label} />
  )
}

export default BadgeOffer