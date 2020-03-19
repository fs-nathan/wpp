import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styled from 'styled-components';

import PriorityMemberModal from '../PriorityMemberModal';


const PriorityButton = styled(Button)`
    border: 1px solid #e2e2e2;
    padding: 0 5px;
    text-transform: capitalize;
    color: gray;
    font-weight: 400;
    border-radius: 2px;
`

function MemberPriority(props) {
  const [openPriorityModal, setOpenPriorityModal] = React.useState(false);
  // if (props.master) {
  //     return (
  //         <div style={{ color: '#fd7e14', padding: '0 30px' }}>{props.label}</div>
  //     )
  // }

  return (
    <div>
      <PriorityButton
        onClick={() => {
          setOpenPriorityModal(true)
        }}
      >Admin<ArrowDropDownIcon /></PriorityButton>
      <PriorityMemberModal isOpen={openPriorityModal} setOpen={setOpenPriorityModal} />
    </div>
  )
}
export default MemberPriority