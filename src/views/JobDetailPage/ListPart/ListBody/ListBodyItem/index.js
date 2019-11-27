import React from 'react';
import { ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiPin } from '@mdi/js';
import SimpleDonutChart from '../../../../../components/SimpleDonutChart';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import Chip from '@material-ui/core/Chip';
import avatar from '../../../../../assets/avatar.jpg';

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

function JobName(props) {
  return (
    <NameContainer variant='space-between'>
      <ColorTypo bold style={{ fontSize: 17, textOverflow: 'ellipsis', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.title}</ColorTypo>
      <Chip label={props.notification} size='small' style={{ fontSize: '14px', fontWeight: 500 }} />
    </NameContainer>
  )
}
function JobContent(props) {
  // const [colorStatus, setColorStatus] = React.useState(null)

  React.useEffect(() => {
    switch (props.label) {
      case 'Quá hạn':
        // setColorStatus('grey')
        break;
      case 'Đang chờ':
        // setColorStatus('orangelight')
        break;
      default:
        // console.log(colorStatus)
        break;
    }
  }, [props.label])
  return (
    <ContentContainer>
      <div>
        <div>
          <Avatar src={avatar} alt='avatar' style={{ width: 20, height: 20 }} />
          <ColorTypo color='#7a869a' style={{ fontSize: '13px', textOverflow: 'ellipsis', width: '160px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{props.description}</ColorTypo>
        </div>
        <div style={{ color: '#7a869a', padding: '5px', marginRight: '10px', fontSize: '13px' }}>{props.time}</div>
      </div>
      <div style={{ display: 'flex' }}>
        <BadgeItem color='redlight' badge label={props.label} size='small' />
        <Icon color={'#6e6e6e'} style={{ transform: 'rotate(35deg)', marginLeft: '5px' }} path={mdiPin} size={0.8} />
      </div>
    </ContentContainer>
  )
}

function JobUnit(props) {
  return (
    <ListItemText disableTypography>
      <JobName title={props.title} notification={props.notification} />
      <JobContent description={props.description} label={props.status} time={props.time} />
    </ListItemText>
  )
}



function ListBodyItem(props) {
  return (
    <Container>
      <ListItemAvatar style={{ padding: '0 0 0 10px' }}>
        <SimpleDonutChart percentDone={props.progress} />
      </ListItemAvatar>
      <JobUnit {...props} />
    </Container>
  )
}

export default ListBodyItem;
