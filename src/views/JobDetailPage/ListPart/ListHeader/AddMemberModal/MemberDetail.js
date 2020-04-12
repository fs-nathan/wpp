import React from 'react';
import ColorTypo from 'components/ColorTypo';

function MemberDetail(props) {
  return (
    <div>
      <ColorTypo bold fontSize>{props.name}</ColorTypo>
      <ColorTypo>{props.email}</ColorTypo>
    </div>
  )
}

export default MemberDetail