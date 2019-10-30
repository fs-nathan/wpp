import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiUpload } from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import ColorButton from '../../../components/ColorButton';
import TableMain from './TableMain';
import { ListItemIcon } from '@material-ui/core';
import * as TABS from '../../../constants/documentTabType'

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

  // Find current active tab
  // - Init object that hold the result tab
  let activeTab = {}
  // - Cause tab in constant file is object
  // So we need convert to array
  // Then compare current active tab id with each object's id
  const obj = Object.entries(TABS).find(obj => obj[1].id === props.activeTabId)
  // - If found tab => Set it to result tab
  if(obj) activeTab = obj[1]

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
