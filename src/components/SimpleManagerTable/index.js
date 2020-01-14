import React from 'react';
import { 
  TableCell, Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import ColorButton from '../ColorButton';
import PillButton from '../PillButton';
import { get } from 'lodash';
import './style.scss';

const StyledTableHead = ({ className = '', ...props }) => 
  <TableHead 
    className={`comp_SimpleManagerTable___table-head ${className}`}
    {...props}
  />;

const StyledTableBody = ({ className = '', ...props }) => 
  <TableBody 
    className={`comp_SimpleManagerTable___table-body ${className}`}
    {...props}
  />;

const TableCellChipsWrapper = ({ className = '', ...props }) => 
  <TableCell 
    className={`comp_SimpleManagerTable___table-cell-chip ${className}`}
    {...props}
  />;

const StyledTableCell = ({ className = '', ...props }) => 
  <TableCell 
    className={`comp_SimpleManagerTable___table-cell ${className}`}
    {...props}
  />;

const StyledTable = ({ className = '', ...props }) => 
  <Table 
    className={`comp_SimpleManagerTable___table ${className}`}
    {...props}
  />;

function SimpleManagerTable({
  data = [],
  handleAdd = () => null, 
  handleEdit = () => null, 
  handleDelete = () => null, 
}) {

  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <StyledTableCell>Tên</StyledTableCell>
          <StyledTableCell>Mô tả</StyledTableCell>
          <TableCell>
            <ColorButton variantColor='orange' size='small' variant='contained'
              onClick={() => handleAdd()}
            >
              + Thêm mới
            </ColorButton>
          </TableCell>
        </TableRow>
      </StyledTableHead>
      <StyledTableBody>
        {data.map(elem => (
          <TableRow key={get(elem, 'id')}>
            <StyledTableCell>{get(elem, 'name', '')}</StyledTableCell>
            <TableCell>{get(elem, 'description', '')}</TableCell>
            <TableCellChipsWrapper>
              <div>
                <PillButton 
                  onClick={() => handleEdit(elem)}
                  background={'#eeeeee'}
                  text={'#222222'}
                  size='large'
                >
                  Sửa
                </PillButton>
                <PillButton 
                  onClick={() => handleDelete(elem)}
                  background={'#eeeeee'}
                  text={'#dc3545'}
                  size='large' 
                >
                  Xóa
                </PillButton>
              </div>
            </TableCellChipsWrapper>
          </TableRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  )
}

export default SimpleManagerTable;
