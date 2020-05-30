import ColorTypo from 'components/ColorTypo';
import React from 'react';
import './styles.scss';

function MemberDetail(props) {
  return (
    <div>
      <ColorTypo className="MemberDetail--name">{props.name}</ColorTypo>
      <ColorTypo>{props.email}</ColorTypo>
    </div>
  )
}

export default MemberDetail