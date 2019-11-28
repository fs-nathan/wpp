import React from 'react';
import styled from 'styled-components';
import HeaderButtonGroup from './HeaderButtonGroup';
import TableMain from './TableMain';
import { Button } from '@material-ui/core';
import colorPal from '../../helpers/colorPalette';
import { darken } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import { mdiCoin, mdiCalendar } from '@mdi/js';
import PropTypes from 'prop-types';
import { get } from 'lodash';

export const CustomTableContext = React.createContext();
export const CustomTableProvider = CustomTableContext.Provider;
export const CustomTableConsumer = CustomTableContext.Consumer;

const Container = styled.div`
  grid-area: right;
  display: grid;
  grid-template-rows: 70px calc(100vh - 70px - 50px);
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "body";
`;

const Header = styled.div`
  grid-area: header;
  padding: 10px;
  display: flex;
  align-items: center;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LeftHeader = styled.div`
  max-width: 250px;
  & > div:first-child {
    display: flex;
    align-items: center;
    color: #444;
    & > p {
      margin: 0;
      font-size: 21px;
      line-height: 26px;
      font-weight: 600;
      text-transform: unset;
    }
  }
  & > span:last-child {
    font-size: 11px;
  }
`;

const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 16px;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${colorPal['orange'][0]};
  color: #fff;
  &:hover {
    background-color: ${darken(colorPal['orange'][0], 0.1)};
  }
`;

const StyledTableMain = styled(TableMain)`
  grid-area: body;
  overflow-y: auto;
`;

function CustomTable() {

  const { options } = React.useContext(CustomTableContext);

  return (
    <Container>
      <Header>
        <LeftHeader>
          <div>
            <p>{typeof(get(options, 'title')) === 'function' ? options.title() : get(options, 'title', '')}</p>
          </div>
          {get(options, 'subTitle') ? <span>{typeof(get(options, 'subTitle')) === 'function' ? options.subTitle() : get(options, 'subTitle', '')}</span> : null}
        </LeftHeader>
        <RightHeader>
          <HeaderButtonGroup />
          {get(options, 'mainAction') && (
            <StyledButton 
              size='small'
              onClick={get(options, 'mainAction.onClick', () => null)}
            >
              {get(options, 'mainAction.label', '')}
            </StyledButton>
          )}
        </RightHeader>   
      </Header>
      <StyledTableMain />
    </Container>
  )
}

function CustomTableWrapper({ options, columns, data }) {
  
  const [searchPatern, setSearchPatern] = React.useState('');
  const [expand, setExpand] = React.useState(false);

  const defaultOptions ={
    title: 'Title',
    subTitle: 'SubTitle',
    mainAction: {
      label: '+ Action',
      onClick: () => console.log('main action clicked'),
    },
    search: {
      patern: searchPatern,
      onChange: str => setSearchPatern(str),
    },
    expand: {
      bool: expand,
      toggleExpand: () => setExpand(expand => !expand),  
    },
    subActions: [{
      label: 'Sub Action 1',
      icon: () => <Icon path={mdiCoin} size={1} />,
      onClick: () => console.log('sub action 1 clicked'),
    }, {
      label: 'Sub Action 2',
      icon: () => <Icon path={mdiCalendar} size={1} />,
      onClick: () => console.log('sub action 2 clicked'),
    }],
    moreMenu: [{
      label: 'Menu Item 1',
      onClick: () => console.log('menu item 1 clicked'),
    }, {
      label: 'Menu Item 2',
      onClick: () => console.log('menu item 2 clicked'),
    }, {
      label: 'Menu Item 3',
      onClick: () => console.log('menu item 3 clicked'),
    }],
    grouped: {
      bool: true,
      id: 'id',
      label: 'group',
      item: 'items',
    },
    row: {
      id: 'id',
      onClick: (row, group) => console.log(group, row),
    },
    draggable: {
      bool: true,
      onDragEnd: () => null,
    },
    loading: {
      bool: false,
      component: () => null,
    },
  };

  const context = {
    options: {
      ...defaultOptions,
      ...options,
    },
    columns: columns || [],
    data: data || [],
  };

  return (
    <CustomTableProvider value={context}>
      <CustomTable />
    </CustomTableProvider>
  )
}

CustomTableWrapper.propTypes = {
  options: PropTypes.object.isRequired, 
  columns: PropTypes.array.isRequired, 
  data: PropTypes.array.isRequired,
}

export default CustomTableWrapper;
