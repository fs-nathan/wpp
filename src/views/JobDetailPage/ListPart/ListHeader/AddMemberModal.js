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
import { ListItem, Avatar, Chip, Table, TableBody, TableHead, TableRow, Paper, TableCell, Menu, MenuItem, IconButton } from '@material-ui/core';
import avatar from '../../../../assets/avatar.jpg';
import ColorTypo from '../../../../components/ColorTypo';
import ColorChip from '../../../../components/ColorChip';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiPlusCircleOutline } from '@mdi/js';
import RoleMemberModal from './RoleMemberModal';
import PriorityMemberModal from './PriorityMemberModal';
import { WrapperContext } from '../..';

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
            <Typography variant="h6">{children}</Typography>
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
        padding: theme.spacing(1),
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
    color: #817f8d;
    font-size: 18px;
`
const FlexJobMember = styled(Typography)`
    display: flex;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
    padding-left: 25px;
`

const MemberTable = styled(TableCell)`
    padding: 5px 0 5px 10px;
`
const ChipPriority = styled(Chip)`
    display: flex;
    flex-direction: row-reverse;
    width: 110px;
    padding: 0 10px;
    justify-content: space-between;
`
function ProjectMember(props) {
    return (
        <StyledListItem>
            <Avatar src={avatar} alt='avatar' />
            <div>
                <ColorTypo bold fontSize>{props.name}</ColorTypo>
                <ColorTypo>{props.email}</ColorTypo>
                <ColorTypo color="orange">{props.label}</ColorTypo>
            </div>
            <Chip bold="true"
                label="Thêm"
            />
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
    if (props.master) {
        return (
            <div style={{ color: '#fd7e14', padding: '0 30px' }}>{props.label}</div>
        )
    }

    return (
        <div>
            <ChipPriority
                size="small"
                label={props.label}
                onClick={() => {
                    setOpenPriorityModal(true)
                }}
                icon={<ArrowDropDownIcon />}
            />
            <PriorityMemberModal isOpen={openPriorityModal} setOpen={setOpenPriorityModal} />
        </div>
    )
}

function MemberRole(props) {
    const [openRoleModal, setOpenRoleModal] = React.useState(false);
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <div>
                    <ColorChip color='grey' badge label={props.role1} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
                    <ColorChip color='grey' badge label={props.role2} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
                </div>
                <div>
                    <ColorChip color='grey' badge label={props.role3} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
                    <ColorChip color='grey' badge label={props.role4} size='small' style={{ borderRadius: '2px', margin: '2px' }} />
                </div>
            </div>
            <IconButton style={{ float: 'right' }}
                size='small'
                onClick={() => {
                    // handleClose()
                    setOpenRoleModal(true)
                }}
            >
                <Icon path={mdiPlusCircleOutline} size={1} style={{ fill: '#b0b0b0' }} />
            </IconButton>
            <RoleMemberModal isOpen={openRoleModal} setOpen={setOpenRoleModal} />
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
                        <MemberTable style={{ width: '9%' }}></MemberTable>
                        <MemberTable style={{ width: '30%' }}>Thành viên</MemberTable>
                        <MemberTable style={{ width: '20%', paddingLeft: 30 }}>Nhóm quyền</MemberTable>
                        <MemberTable style={{ width: '32%' }}>Vai trò</MemberTable>
                        <MemberTable></MemberTable>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.listMemberJobState.map((addData, idx) => (
                        <TableRow key={idx}>
                            <MemberTable>{addData.avatarMember}</MemberTable>
                            <MemberTable component="th" scope="row">
                                {addData.name}
                            </MemberTable>
                            <MemberTable>{addData.permission}</MemberTable>
                            <MemberTable>{addData.roles}</MemberTable>
                            <MemberTable>
                                <IconButton size='small' onClick={handleClickEliminate} >
                                    <Icon path={mdiDotsVertical} size={1} />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseEliminate}
                                    transformOrigin={{
                                        vertical: -30,
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={handleCloseEliminate}>Loại trừ</MenuItem>
                                </Menu>
                            </MemberTable>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

function AddMemberModal(props) {
    const valueContext = React.useContext(WrapperContext);

    const [listMemberProjectState, setListMemberProject] = React.useState([])
    React.useEffect(() => {

        let arrayMemberNotAssigned = valueContext.memberNotAssigned.map((item, key) => {
            return (
                <ProjectMember key={key} name={item.name} email={item.email} label={item.permission} />
            )
        })
        setListMemberProject(arrayMemberNotAssigned)
    }, [valueContext.memberNotAssigned])

    let avatarMember = <Avatar alt="Avatar Member" src={avatar} sizes='10px' style={{ width: 30, height: 30 }} />
    const [listMemberJobState, setListMemberJob] = React.useState([])
    React.useEffect(() => {
        let arrayMember = valueContext.member.map((item) => {
            return {
                avatarMember,
                name: <MemberDetail name={item.name} email={item.email} />,
                permission: item.master
                    ? <MemberPriority label={item.permission} master />
                    : <MemberPriority label={item.permission} />,
                roles: <MemberRole
                //     role1={item.role[0] && item.role[0]}
                //     role2={item.role[1] && item.role[1]}
                //     role3={item.role[2] && item.role[2]}
                //     role4={item.role[3] && item.role[3]} 
                />
            }
        })
        setListMemberJob(arrayMember)
    }, [valueContext.member])

    const handleClose = () => {
        props.setOpen(false);
    };

    // const handleAddAll = () => {
    //     setListMemberProject([])
    //     setListMemberJob([...listMemberJobState, ...listMemberProject.map((item) => {
    //         return {
    //             avatarMember,
    //             name: <MemberDetail name={item.name} email={item.email} />,
    //             permission: item.master
    //                 ? <MemberPriority label={item.permission} master />
    //                 : <MemberPriority label={item.permission} />,
    //             role: <MemberRole
    //                 role1={item.role[0] && item.role[0]}
    //                 role2={item.role[1] && item.role[1]}
    //                 role3={item.role[2] && item.role[2]}
    //                 role4={item.role[3] && item.role[3]} />
    //         }
    //     }
    //     )])
    // }
    
    return (
        <div>
            <Dialog maxWidth="xl" onClose={handleClose} open={props.isOpen}>
                <DialogTitle onClose={handleClose}>
                    Thành viên công việc
        </DialogTitle>
                <DialogContent dividers style={{ padding: 0 }}>
                    <GridArea component={'div'} style={{ borderBottom: 'none' }} >
                        <BorderGrid component={'div'}>
                            <FlexMemberProject component={'span'}>
                                <MemberProject component={'div'}>Thành viên dự án</MemberProject>
                            </FlexMemberProject>
                            <Typography component="span">
                                <div style={{ margin: '10px 10px 0 10px' }}>
                                    <SearchInput placeholder='Tìm thành viên' />
                                </div>
                                <ButtonAddAll
                                // onClick={handleAddAll}
                                >
                                    + Thêm tất cả
                        </ButtonAddAll>
                                {listMemberProjectState}
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
                    <Button autoFocus onClick={handleClose} style={{ color: '#898989' }}>
                        Cập nhật
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default AddMemberModal;