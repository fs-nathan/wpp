import React from 'react';
import { 
  TableCell, Table, TableHead, 
  TableBody, TableRow, Radio, Checkbox,
} from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';
import './style.scss';

const StyledTableHead = ({ className = '', ...props }) => 
  <TableHead 
    className={`view_Department_Permission_Modal___table-head ${className}`}
    {...props}
  />;

const StyledTableBody = TableBody;

const TableCellRadioWrapper = ({ className = '', ...props }) => 
  <TableCell
    className={`view_Department_Permission_Modal___table-cell-radio ${className}`}
    {...props}
  />;

const TableCellCheckboxWrapper = ({ className = '', ...props }) =>
  <TableCell
    className={`view_Department_Permission_Modal___table-cell-checkbox ${className}`}
    {...props}
  />;

function PermissionSettings({ open, setOpen }) {

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Phân quyền thành viên'
      >
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Tên quyền</TableCell>
              <TableCellRadioWrapper>
                <div>
                  <ColorTypo color='red'>Chủ tài khoản</ColorTypo>
                  <Radio 
                    checked
                  />
                </div>
              </TableCellRadioWrapper>
              <TableCellRadioWrapper>
                <div>
                  <ColorTypo>Quản lý</ColorTypo>
                  <Radio />
                </div>
              </TableCellRadioWrapper>
              <TableCellRadioWrapper>
                <div>
                  <ColorTypo>Thành viên</ColorTypo>
                  <Radio />
                </div>
              </TableCellRadioWrapper>
              <TableCellRadioWrapper>
                <div>
                  <ColorTypo>Khác</ColorTypo>
                  <Radio />
                </div>
              </TableCellRadioWrapper>
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            <TableRow>
              <TableCell>Quyền A</TableCell>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled checked />
                </div>
              </TableCellCheckboxWrapper>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled checked />
                </div>
              </TableCellCheckboxWrapper>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled />
                </div>
              </TableCellCheckboxWrapper>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled />
                </div>
              </TableCellCheckboxWrapper>
            </TableRow>
            <TableRow>
              <TableCell>Quyền B</TableCell>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled checked />
                </div>
              </TableCellCheckboxWrapper>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled checked />
                </div>
              </TableCellCheckboxWrapper>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled checked />
                </div>
              </TableCellCheckboxWrapper>
              <TableCellCheckboxWrapper>
                <div>
                  <Checkbox disabled />
                </div>
              </TableCellCheckboxWrapper>
            </TableRow>
            
          </StyledTableBody>
        </Table>
      </CustomModal>
    </React.Fragment>
  )
}

export default PermissionSettings;
