import React from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import ColorTypo from '../../../../../components/ColorTypo';

import './styles.scss';

function ListProjectBody({ subPrimary }) {
  return (
    <List className="listProjectBody">
      <ListSubheader disableSticky  className="listProjectBody--header">
        <ColorTypo style={{ color: '#828282', fontWeight: 500 }}>
          {subPrimary}
        </ColorTypo>
      </ListSubheader>
    </List>
  );
}

export default ListProjectBody;