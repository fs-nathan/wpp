import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomModal from '../../../../components/CustomModal';
import './style.scss';

const StyledTableHead = ({ className = '', ...props }) =>
  <TableHead 
    className={`view_ProjectGroup_MemberDetailModal___table-head ${className}`}
    {...props}
  />;

const UserTableCell = ({ className = '', ...props }) =>
  <TableCell 
    className={`view_ProjectGroup_MemberDetailModal___table-cell ${className}`}
    {...props}
  />;

function MembersDetail({ open, setOpen, members = [], }) {

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title={t("DMH.VIEW.PGP.MODAL.MEMBER.TITLE")}
        confirmRender={null}
        cancleRender={() => t("DMH.VIEW.PGP.MODAL.MEMBER.EXIT")}
        onCancle={() => setOpen(false)}
      >
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{t("DMH.VIEW.PGP.MODAL.MEMBER.NAME")}</TableCell>
              <TableCell>{t("DMH.VIEW.PGP.MODAL.MEMBER.TIT")}</TableCell>
              <TableCell>{t("DMH.VIEW.PGP.MODAL.MEMBER.DESC")}</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {members.map(member => (
              <TableRow key={get(member, 'id')}>
                <TableCell>
                  <CustomAvatar style={{ width: 35, height: 35, }} src={get(member, 'avatar')} alt='avatar' />
                </TableCell>
                <UserTableCell>
                  <span>{get(member, 'name', '')}</span>
                  <br />
                  <small>{get(member, 'email', '')}</small>  
                </UserTableCell>
                <TableCell>{get(member, 'position', '')}</TableCell>
                <TableCell>{get(member, 'description', '')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomModal>
    </React.Fragment>
  )
}

export default MembersDetail;
