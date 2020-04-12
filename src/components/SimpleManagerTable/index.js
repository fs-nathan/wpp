import { Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { find, get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bgColorSelector } from './selectors';
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

const MyButton = ({ className = '', disabled = false, isDel = false, ...props }) =>
  <Button
    variant="outlined"
    className={`comp_SimpleManagerTable___button${isDel ? '-delete' : ''}${disabled ? '-disabled' : ''} ${className}`}
    disabled={disabled}
    {...props}
  />;

function SimpleManagerTable({
  data = [], pendings = [],
  handleAdd = () => null,
  handleEdit = () => null,
  handleDelete = () => null,
  bgColor,
}) {

  const { t } = useTranslation();

  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <StyledTableCell width={'30%'}>{t('DMH.COMP.SMT.LABEL.NAME')}</StyledTableCell>
          <StyledTableCell width={'50%'}>{t('DMH.COMP.SMT.LABEL.DESC')}</StyledTableCell>
          <TableCell width={'20%'} colSpan={2}>
            <Button
              fullWidth
              style={{
                backgroundColor: bgColor.color,
                color: 'white',
              }}
              onClick={() => handleAdd()}
            >
              {t('DMH.COMP.SMT.LABEL.ADD')}
            </Button>
          </TableCell>
        </TableRow>
      </StyledTableHead>
      <StyledTableBody>
        {data.map(elem => (
          <TableRow key={get(elem, 'id')}>
            <StyledTableCell width={'30%'}>{get(elem, 'name', '')}</StyledTableCell>
            <TableCell width={'50%'}>{get(elem, 'description', '')}</TableCell>
            <TableCell width={'10%'} align='center'>
              <MyButton
                onClick={() => handleEdit(elem)}
                disabled={
                  !isNil(find(pendings, pending => pending === get(elem, 'id')))
                }
              >
                {!isNil(find(pendings, pending => pending === get(elem, 'id'))) &&
                  <CircularProgress
                    size={16}
                    className="margin-circular"
                    color="white"
                  />}
                {t('DMH.COMP.SMT.BTN.UPT')}
              </MyButton>
            </TableCell>
            <TableCell width={'10%'} align='center'>
              <MyButton
                onClick={() => handleDelete(elem)}
                isDel={true}
                disabled={
                  !isNil(find(pendings, pending => pending === get(elem, 'id')))
                }
              >
                {!isNil(find(pendings, pending => pending === get(elem, 'id'))) &&
                  <CircularProgress
                    size={16}
                    className="margin-circular"
                    color="white"
                  />}
                {t('DMH.COMP.SMT.BTN.DEL')}
              </MyButton>
            </TableCell>
          </TableRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
  }
}

export default connect(
  mapStateToProps,
  null,
)(SimpleManagerTable);
