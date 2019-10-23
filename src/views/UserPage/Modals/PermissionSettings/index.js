import React from 'react';
import styled from 'styled-components';
import { 
  TableCell, Table, TableHead, 
  TableBody, TableRow, Radio, Checkbox,
} from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';

const StyledTableHead = styled(TableHead)` 
  background-color: #eee; 
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)`
`;

const TableCellRadioWrapper = styled(TableCell)`
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TableCellCheckboxWrapper = styled(TableCell)`
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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
