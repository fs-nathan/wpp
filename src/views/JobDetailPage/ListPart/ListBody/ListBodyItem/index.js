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

const Container = styled.a`
    padding: 10px 8px 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-bottom: 0;
    &:hover{
      background-color: #F2F5FA;
    }
    &:active {
      background-color: #e6f0ff;
    }
`;

const NameContainer = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & >*:last-child {
    margin-right: 15px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    color: white;
    background-color: red;
  }
`;

const ContentContainer = styled.div`
  & > *:not(:first-child) {
    margin-top: 5px;
  }
  & > *:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > *:first-child {
      display: flex;
      & > *:first-child {
        margin-right: 10px;
      }
    }
  }
`;

const BadgeItem = styled(ColorChip)`
  font-weight: 600;
  border-radius: 3px !important
`
const IconPin = styled(Icon)`
  display: ${props => props.isghim === "true" ? 'block' : 'none'};
`
const ChipMes = styled(Chip)`
display: ${props => props.notification === "true" ? 'none': 'block'};
`
function JobName(props) {
  return (
    <NameContainer variant='space-between'>
      <ColorTypo bold style={{ fontSize: 17, textOverflow: 'ellipsis', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.title}</ColorTypo>
      <ChipMes 
        // label={props.notification} 
        size='small' 
        style={{ fontSize: '14px', fontWeight: 500 }}
        {...props}
        notification={props.notification.toString()}
        />
    </NameContainer>
  )
}
function JobContent(props) {
  // const [colorStatus, setColorStatus] = React.useState(null)
  const [status, setStatus] = React.useState('')
  React.useEffect(() => {
    switch (props.label) {
      case 0:
        // setColorStatus('orangelight')
        setStatus('đang chờ')
        break;
      case 1:
        // setColorStatus('orangelight')
        setStatus('đang làm')
        break;
      case 2:
        // setColorStatus('grey')
        setStatus('hoàn thành')
        break;
      case 3:
        // setColorStatus('grey')
        setStatus('quá hạn')
        break;
      case 4:
        // setColorStatus('grey')
        setStatus('tạm dừng')
        break;
      default:
        // console.log(colorStatus)
        setStatus('')
        break;
    }
  }, [props.label])
  return (
    <ContentContainer>
      <div>
        <div>
          <Avatar src={props.avatar} alt='avatar' style={{ width: 20, height: 20 }} />
          <ColorTypo color='#7a869a' style={{ fontSize: '13px', textOverflow: 'ellipsis', width: '160px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.content}</ColorTypo>
        </div>
        <div style={{ color: '#7a869a', padding: '5px', marginRight: '10px', fontSize: '13px' }}>{props.time}</div>
      </div>
      <div style={{ display: 'flex' }}>
        <BadgeItem color='redlight' badge label={status} size='small' />
        <IconPin color={'#6e6e6e'} style={{ transform: 'rotate(35deg)', marginLeft: '5px' }} path={mdiPin} size={0.8} {...props} isghim={props.isghim.toString()}/>  
      </div>
    </ContentContainer>
  )
}

function JobUnit(props) {
  // let avatar, content
  // const chat = props.chat
  // if (chat) {
  //   avatar = chat.user_create_avatar,
  //   content = chat.content
  // }
  // console.log('props:::::', props);
  
  return (
    <ListItemText disableTypography>
      <JobName title={props.name} notification={props.new_chat} />
      <JobContent label={props.status_code} time={"34 phút"} avatar={props.chat.avatar} content={props.chat.content} isghim={props.isGhim} />
    </ListItemText>
  )
}



function ListBodyItem(props) {
  // console.log("props", props);
  const value = React.useContext(WrapperContext);

  return (
    <Container onClick={() => 
      // console.log("id list task:::::", props.id)
      value.chooseTask(props.id)
    }>
      <ListItemAvatar style={{ padding: '0 0 0 10px' }}>
        <SimpleDonutChart percentDone={props.complete} />
      </ListItemAvatar>
      <JobUnit {...props} />
    </Container>
  )
}

export default ListBodyItem;
