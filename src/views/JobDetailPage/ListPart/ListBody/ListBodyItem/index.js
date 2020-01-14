import React from 'react';
import { ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiPin } from '@mdi/js';
import SimpleDonutChart from '../../../../../components/SimpleDonutChart';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import Chip from '@material-ui/core/Chip';
// import avatar from '../../../../../assets/avatar.jpg';
import { WrapperContext } from '../../../index'

// const Container = styled.a`
//     padding: 10px 8px 10px 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: transparent;
//     border: none;
//     cursor: pointer;
//     margin-bottom: 0;
//     &:hover{
//       background-color: #F2F5FA;
//     }
//     &:active {
//       background-color: #e6f0ff;
//     }
// `;

// const NameContainer = styled.div`
//   padding: 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   & >*:last-child {
//     margin-right: 15px;
//     border-radius: 50%;
//     width: 16px;
//     height: 16px;
//     color: white;
//     background-color: red;
//   }
// `;

// const ContentContainer = styled.div`
//   & > *:not(:first-child) {
//     margin-top: 5px;
//   }
//   & > *:first-child {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     & > *:first-child {
//       display: flex;
//       & > *:first-child {
//         margin-right: 10px;
//       }
//     }
//   }
// `;

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important
`
const IconPin = styled(Icon)`
  display: ${props => props.isghim === "true" ? 'block' : 'none'};
`
const ChipMes = styled(Chip)`
display: ${props => props.notification === "true" ? 'block' : 'none'};
`

const badgeState = (label) => {
  let color
  switch (label) {
    case "Waiting":
      color = "orangelight"
      break;
    case "Doing":
      color = "indigolight"
      break;
    case "Complete":
      color = "light-green"
      break;
    case "Expired":
      color = "redlight"
      break;
    case "Stop":
      color = "redlight"
      break;
    default:
      color = "redlight"
  }

  return (
    <BadgeItem color={color} badge label={label} size='small' />
  )
}
function JobName(props) {
  return (
    <div className="name-container-lbd" variant='space-between'>
      <ColorTypo bold >{props.title}</ColorTypo>
      <div>
        <IconPin color={'#6e6e6e'} path={mdiPin} size={0.8} {...props} isghim={props.isghim.toString()} />
        {badgeState(props.label)}
      </div>

    </div>
  )
}
function JobContent(props) {
  return (
    <div className="container-content-lbd">
        <div>
          <Avatar src={props.avatar} alt='avatar' />
          <ColorTypo color='#7a869a' >{props.content}</ColorTypo>
        </div>
        <div>
          <ChipMes
            label={'N'}
            size='small'
            {...props}
            notification={props.notification.toString()}
          />
          <div >{props.time}</div>
        </div>
    </div>
  )
}

function JobUnit(props) {

  return (
    <ListItemText disableTypography>
      <JobName title={props.name}  label={props.status_name} isghim={props.is_ghim}/>
      <JobContent  time={props.updated_time} avatar={props.chat.user_create_avatar} content={props.chat.content} notification={props.new_chat}/>
    </ListItemText>
  )
}



function ListBodyItem(props) {
  const value = React.useContext(WrapperContext);

  return (
    <div className="container-lbd" onClick={() =>
      value.chooseTask(props.id)
    }>
      <ListItemAvatar style={{ padding: '0 0 0 10px' }}>
        <SimpleDonutChart percentDone={props.complete} />
      </ListItemAvatar>
      <JobUnit {...props} />
    </div>
  )
}

export default ListBodyItem;
