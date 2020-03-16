import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SearchInput from '../../../../components/SearchInput';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { ListItem, Avatar, Table, TableBody, TableHead, TableRow, Paper, TableCell, Menu, MenuItem, IconButton } from '@material-ui/core';
import avatar from '../../../../assets/avatar.jpg';
import ColorTypo from '../../../../components/ColorTypo';
import ColorChip from '../../../../components/ColorChip';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiPlusCircleOutline } from '@mdi/js';
import RoleMemberModal from './RoleMemberModal';
import PriorityMemberModal from './PriorityMemberModal';
import get from 'lodash/get';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createMember } from '../../../../actions/taskDetail/taskDetailActions';
// import { Scrollbars } from 'react-custom-scrollbars';

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

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

const AddButton = styled(Button)`
    border: 1px solid #e2e2e2;
    padding: 0 5px;
    color: gray;
    font-weight: 400;
    border-radius: 2px;
    &&:hover {
        color: #fff;
        background: #10c401;
    }
`
const PriorityButton = styled(Button)`
    border: 1px solid #e2e2e2;
    padding: 0 5px;
    text-transform: capitalize;
    color: gray;
    font-weight: 400;
    border-radius: 2px;
`

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

function ProjectMember(props) {
    const dispatch = useDispatch();
    const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

    function onClickAdd() {
        // dispatch(createMember({ task_id: taskId, member_id }))
        // console.log('hello', valueMember)
    }
    return (
        <StyledListItem>
            <Avatar src={avatar} alt='avatar' />
            <div>
                <ColorTypo bold fontSize>{props.name}</ColorTypo>
                <ColorTypo>{props.email}</ColorTypo>
                <ColorTypo color="orange">{props.label}</ColorTypo>
            </div>
            {/* <Chip
                bold="true"
                label="Thêm"
                onClick={props.valueContext.createMemberToTask}
            /> */}
            <AddButton onClick={onClickAdd}>Thêm</AddButton>
        </StyledListItem>
    )
}

function MemberDetail(props) {
    return (
        <div>
            <ColorTypo bold fontSize>{props.name}</ColorTypo>
            <ColorTypo>{props.email}</ColorTypo>
        </div>
    )
}

function MemberPriority(props) {
    const [openPriorityModal, setOpenPriorityModal] = React.useState(false);
    // if (props.master) {
    //     return (
    //         <div style={{ color: '#fd7e14', padding: '0 30px' }}>{props.label}</div>
    //     )
    // }

    return (
        <div>
            <PriorityButton
                onClick={() => {
                    setOpenPriorityModal(true)
                }}
            >Admin<ArrowDropDownIcon /></PriorityButton>
            <PriorityMemberModal isOpen={openPriorityModal} setOpen={setOpenPriorityModal} />
        </div>
    )
}

let listData = []

function MemberRole() {

    const [openRoleModal, setOpenRoleModal] = React.useState(false)
    // console.log("listData...", listData);
    if (listData) {
        listData.map((item, key) => {
            return (
                <div key={key}>
                    {
                        item &&
                        <ColorChip color='grey' badge label={item} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
                    }
                </div>
            )
        })
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {listData}
            <IconButton style={{ float: 'right' }}
                size='small'
                onClick={() => {
                    // handleClose()

                    setOpenRoleModal(true)
                }}
            >

                <Icon path={mdiPlusCircleOutline} size={1} style={{ fill: '#b0b0b0' }} />
            </IconButton>
            <RoleMemberModal

                isOpen={openRoleModal}
                setOpen={setOpenRoleModal}
                setListData={data => { listData = data }}
            />
        </div>
    )
}

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
                <ProjectMember key={key} name={item.name} email={item.email} label={item.permission} />
            )
        })
        setListMemberProject(arrayMemberNotAssigned)
    }, [memberNotAssigned])

    React.useEffect(() => {
        let arrayMember = member && member.map((item) => {
            return {
                avatarMember: <Avatar alt="Avatar Member" src={avatar} sizes='10px' style={{ width: 30, height: 30 }} />,
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