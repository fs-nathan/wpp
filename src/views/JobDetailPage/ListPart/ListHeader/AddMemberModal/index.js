import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SearchInput from 'components/SearchInput';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {
  Avatar, IconButton
} from '@material-ui/core';
import get from 'lodash/get';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProjectMember from './ProjectMember';
import MemberRole from './MemberRole';
import MemberPriority from './MemberPriority';
import MemberDetail from './MemberDetail';
import TableMember from './TableMember';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: '#f5f8fc'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 400,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: '15px 24px',
  },
}))(MuiDialogActions);

const GridArea = styled(Typography)`
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid #e0e0e0;
`
const ButtonAddAll = styled(Button)`
    color: #417cbf;
    margin: 10px 5px;
`

const BorderGrid = styled(Typography)`
    border-right: 1px solid #e0e0e0;
    min-height: 660px;
`
const FlexMemberProject = styled(Typography)` 
    display: flex;
    justify-content: center;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
`

const MemberProject = styled(Typography)`
    margin-bottom: 5px;
    color: #686868;
    font-size: 16px;
    text-transform: uppercase;
`
const FlexJobMember = styled(Typography)`
    display: flex;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
    padding-left: 25px;
`

function AddMemberModal(props) {
  const { t } = useTranslation()
  const member = useSelector(state => state.taskDetail.taskMember.member);
  const memberNotAssigned = useSelector(state => state.taskDetail.taskMember.memberNotAssigned);
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))

  const [listMemberProjectState, setListMemberProject] = React.useState([])
  const [listMemberJobState, setListMemberJob] = React.useState([])
  React.useEffect(() => {
    let arrayMemberNotAssigned = memberNotAssigned && memberNotAssigned.map((item, key) => {
      return (
        <ProjectMember avatar={item.avatar} key={item.id}
          id={item.id}
          name={item.name} email={item.email}
          label={item.permission}
        />
      )
    })
    setListMemberProject(arrayMemberNotAssigned)
  }, [memberNotAssigned])

  React.useEffect(() => {
    let arrayMember = member && member.map((item) => {
      return {
        avatarMember: <Avatar alt="Avatar Member" src={item.avatar} sizes='10px' style={{ width: 30, height: 30 }} />,
        name: <MemberDetail name={item.name} email={item.email} />,
        permission: <MemberPriority />,
        roles: <MemberRole roles={item.roles || []} />
      }
    })
    setListMemberJob(arrayMember)
  }, [member])

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth="xl" onClose={handleClose} open={props.isOpen}>
        <DialogTitle onClose={handleClose}> Thành viên công việc </DialogTitle>
        <DialogContent dividers style={{ padding: 0, overflow: 'hidden' }}>
          <GridArea component={'div'} style={{ borderBottom: 'none' }} >
            <BorderGrid component={'div'}>
              <FlexMemberProject component={'span'}>
                <MemberProject component={'div'} >Thành viên dự án</MemberProject>
              </FlexMemberProject>
              <Typography component="span">
                <div style={{ margin: '10px 10px 0 10px' }}>
                  <SearchInput placeholder='Tìm thành viên' />
                </div>
                <ButtonAddAll
                // onClick={handleAddAll}
                >
                  {t('+ Thêm tất cả')}
                </ButtonAddAll>
                <div className="table-scroll-add-member">
                  {listMemberProjectState}
                </div>
              </Typography>
            </BorderGrid>
            <Typography component="div">
              <FlexJobMember component="div">
                <MemberProject component={'div'}>Thành viên công việc</MemberProject>
              </FlexJobMember>
              <TableMember listMemberJobState={listMemberJobState} style={{ boxShadow: 'none' }} />
            </Typography>
          </GridArea>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ color: "#222" }}>
            Hủy
                    </Button>
          <Button autoFocus onClick={handleClose} style={{ color: groupActiveColor }}>
            Cập nhật
                    </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default AddMemberModal;