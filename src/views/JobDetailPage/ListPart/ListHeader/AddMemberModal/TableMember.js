import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  Table, TableBody, TableHead, TableRow,
  Paper, TableCell, Menu, MenuItem, IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';

const CustomMenu = styled(Menu)`
& > .MuiPaper-root {
  box-shadow: none;
  border: 1px solid rgba(0,0,0,.1);
  & > ul {
    padding : 0;
    & > li {
      padding : 10px;
    }
  }
}
`

const StyledTableRow = styled(TableRow)`
  &:hover {
      & > *:last-child {
          opacity: 1;
      }
  }
`
const StyledMenu = styled(TableCell)`
    opacity: 0 ;
`

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  table: {
    minWidth: 650,
  },
});

function TableMember(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickEliminate = (evt) => {
    setAnchorEl(evt.currentTarget);
  }
  const handleCloseEliminate = () => {
    setAnchorEl(null);
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{ background: '#f7f7f7' }}>
            <TableCell style={{ width: '9%' }}></TableCell>
            <TableCell style={{ width: '40%' }}>Thành viên</TableCell>
            <TableCell style={{ width: '20%' }}>Nhóm quyền</TableCell>
            <TableCell style={{ width: '32%' }}>Vai trò</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

      </Table>
      <div className="table-scroll">
        <Table className={classes.table}>
          <TableBody>
            {props.listMemberJobState.map((addData, idx) => (
              <StyledTableRow key={idx}>
                <TableCell style={{ width: '9%' }}>{addData.avatarMember}</TableCell>
                <TableCell style={{ width: '40%' }}>{addData.name}</TableCell>
                <TableCell style={{ width: '20%' }}>{addData.permission}</TableCell>
                <TableCell style={{ width: '32%' }}>{addData.roles}</TableCell>
                <StyledMenu >
                  <IconButton size='small' onClick={handleClickEliminate} >
                    <Icon path={mdiDotsVertical} size={1} />
                  </IconButton>
                  <CustomMenu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseEliminate}
                    transformOrigin={{
                      vertical: -10,
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleCloseEliminate}>Loại trừ</MenuItem>
                  </CustomMenu>
                </StyledMenu>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  )
}
export default TableMember