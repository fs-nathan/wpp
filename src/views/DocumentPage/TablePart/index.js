import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiUpload } from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import ColorButton from '../../../components/ColorButton';
import TableMain from './TableMain';
import { ListItemIcon } from '@material-ui/core';
import { getActiveTab } from '../commonFunction'

const Container = styled.div`
  grid-area: table;
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 20px;
  }
`;

function TablePart(props) {

  const activeTab = getActiveTab(props.activeTabId)

  return (
    <Container>
      <Header>
        <ListItemIcon style={{minWidth: 40}}>
          <Icon path={activeTab.icon} size={1.5} />
        </ListItemIcon>
        <ColorTypo color='green' uppercase 
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          {/* &#9733;  */}
          {activeTab.name}
        </ColorTypo>
        <RightHeader>
          <HeaderButtonGroup />
          <ColorButton
            size='small'
            variantColor='blue'
            variant='contained'
            startIcon={
              <Icon path={mdiUpload} size={1} color={'#fff'} />
            }
          >
            Tải lên
          </ColorButton>
        </RightHeader>
      </Header>
      <TableMain {...props}/>
    </Container>
  )
}

export default TablePart;