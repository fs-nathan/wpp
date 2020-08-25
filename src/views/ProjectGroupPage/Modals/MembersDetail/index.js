import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomModal from '../../../../components/CustomModal';
import './style.scss';
import {memberInGroupProjectSelector} from "../../LeftPart/ProjectGroupDetail/selectors";
import {memberProjectGroup} from "../../../../actions/projectGroup/memberProjectGroup";
import {isNil} from "lodash";
import {connect} from "react-redux";
import {useMountedState} from "react-use";
import {useParams} from "react-router-dom";

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

function MembersDetail({ open, setOpen, members, projectGroupId,  doMemberProjectGroup}) {
  const { t } = useTranslation();
  React.useEffect(() => {
    if(open && !isNil(projectGroupId)) {
      doMemberProjectGroup({projectGroupId});
    }
  }, [useMountedState(), open]);

  return (
    <React.Fragment>
      <CustomModal
        className="view_ProjectGroup_MemberDetailModal___modal"
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
              <TableCell width="5%"></TableCell>
              <TableCell width="45%">{t("DMH.VIEW.PGP.MODAL.MEMBER.NAME")}</TableCell>
              <TableCell width="25%">{t("DMH.VIEW.PGP.MODAL.MEMBER.TIT")}</TableCell>
              <TableCell width="25%">{t("DMH.VIEW.PGP.MODAL.MEMBER.DESC")}</TableCell>
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
const mapStateToProps = state => {
  return {
    members: memberInGroupProjectSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doMemberProjectGroup: ({ projectGroupId }, quite) => dispatch(memberProjectGroup({ projectGroupId }, quite)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MembersDetail);
