import React from 'react';
import styled from 'styled-components';
import HeaderButtonGroup from './HeaderButtonGroup';
import TableMain from './TableMain';
import { Button } from '@material-ui/core';
import colorPal from '../../helpers/colorPalette';
import { darken } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import { mdiCoin, mdiCalendar } from '@mdi/js';

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
  & > div:first-child {
    display: flex;
    align-items: center;
    color: #05b50c;
    & > span {
      font-size: 24px;
      margin-right: 10px;
    }
    & > p {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  & > span:last-child {
    margin-left: 30px;
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
            <span>&#9733;</span>
            <p>{typeof(options.title) === 'function' ? options.title() : options.title}</p>
          </div>
          <span>{typeof(options.subTitle) === 'function' ? options.subTitle() : options.subTitle}</span>
        </LeftHeader>
        <RightHeader>
          <HeaderButtonGroup />
          <StyledButton 
            size='small'
            onClick={options.mainAction.onClick}
          >
            {options.mainAction.label}
          </StyledButton>
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
  };

  /*
  const defaultColumns = [{
    label: 'Label 1',
    field: 'label_1',
    renderLabel: () => 'Label 1',
    renderField: null,
  }, {
    label: 'Label 2',
    field: 'label_2',
    renderLabel: () => 'Label 2',
    renderField: null,
  }, {
    label: 'Label 3',
    field: 'label_3',
    renderLabel: null,
    renderField: null,
  }, {
    label: 'Label 4',
    field: 'label_4',
    renderLabel: () => 'Label 4',
    renderField: null,
  }, {
    label: 'Label 5',
    field: 'label_5',
    renderLabel: () => <Icon path={mdiCoin} size={1} />,
    renderField: null,
  }];

  const defaultData = [{
    group: 'Group 1',
    id: 'G1',
    items: [{
      id: 'G1-1',
      label_1: '1-1-1',
      label_2: '1-1-2',
      label_3: '1-1-3',
      label_4: '1-1-4',
      label_5: '1-1-5',
    }, {
      id: 'G1-2',
      label_1: '1-2-1',
      label_2: '1-2-2',
      label_3: '1-2-3',
      label_4: '1-2-4',
      label_5: '1-2-5',
    }, {
      id: 'G1-3',
      label_1: '1-3-1',
      label_2: '1-3-2',
      label_3: '1-3-3',
      label_4: '1-3-4',
      label_5: '1-3-5',
    }],
  }, {
    group: 'Group 2',
    id: 'G2',
    items: [{
      id: 'G2-1',
      label_1: '2-1-1',
      label_2: '2-1-2',
      label_3: '2-1-3',
      label_4: '2-1-4',
      label_5: '2-1-5',
    }],
  }, {
    group: 'Group 3',
    id: 'G3',
    items: [{
      id: 'G3-1',
      label_1: '3-1-1',
      label_2: '3-1-2',
      label_3: '3-1-3',
      label_4: '3-1-4',
      label_5: '3-1-5',
    }, {
      id: 'G3-2',
      label_1: '3-2-1',
      label_2: '3-2-2',
      label_3: '3-2-3',
      label_4: '3-2-4',
      label_5: '3-2-5',
    }],
  }];

  const _defaultData = [{
    id: 'R-1',
    label_1: '3-1-1',
    label_2: '3-1-2',
    label_3: '3-1-3',
    label_4: '3-1-4',
    label_5: '3-1-5',
  }, {
    id: 'R-2',
    label_1: '3-2-1',
    label_2: '3-2-2',
    label_3: '3-2-3',
    label_4: '3-2-4',
    label_5: '3-2-5',
  }];
  */

  const context = {
    options: {
      ...defaultOptions,
      ...options,
    },
    columns: columns || [],
    data: data || [],
  }

  return (
    <CustomTableProvider value={context}>
      <CustomTable />
    </CustomTableProvider>
  )
}

export default CustomTableWrapper;
