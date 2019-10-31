import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SearchInput from '../../../../components/SearchInput';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { ListItem, Avatar, Chip, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import avatar from '../../../../assets/avatar.jpg';
import ColorTypo from '../../../../components/ColorTypo';

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
    margin: 10px 0;
`

const BorderGrid = styled(Typography)`
    border-right: 1px solid #e0e0e0;
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
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


function AddMemberModal(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.setOpen(false);
    };

    let handleClick = () => {

    }

    return (
        <div>
            <Dialog maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.isOpen}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Thành viên công việc
        </DialogTitle>
                <DialogContent dividers>
                    <GridArea component={'div'} >
                        <BorderGrid component={'div'}>
                            <FlexMemberProject component={'span'}>
                                <MemberProject component={'div'}>Thành viên dự án</MemberProject>
                            </FlexMemberProject>
                            <Typography component="span">
                                <div style={{ margin: '10px 15px 0 5px' }}>
                                    <SearchInput placeholder='Tìm thành viên' />
                                </div>
                                <ButtonAddAll >
                                    + Thêm tất cả
                        </ButtonAddAll>
                                <StyledListItem>
                                    <Avatar src={avatar} alt='avatar' />
                                    <div>
                                        <ColorTypo bold fontSize>Khắc Điệp</ColorTypo>
                                        <ColorTypo> dieptk95@gmail.com</ColorTypo>
                                        <ColorTypo color="orange">Giám đốc dự án</ColorTypo>
                                    </div>
                                    <Chip bold
                                        label="Thêm"
                                        onClick={handleClick}
                                    />
                                </StyledListItem>
                                <StyledListItem>
                                    <Avatar src={avatar} alt='avatar' />
                                    <div>
                                        <ColorTypo bold fontSize>Nguyễn Mai Anh</ColorTypo>
                                        <ColorTypo> maianhdigital@gmail.com</ColorTypo>
                                        <ColorTypo color="orange">Chuyên viên</ColorTypo>
                                    </div>
                                    <Chip bold
                                        label="Thêm"
                                        onClick={handleClick}
                                    />
                                </StyledListItem>
                            </Typography>
                        </BorderGrid>
                        <Typography component="div">
                            <FlexMemberProject component="div">
                                <MemberProject component={'div'}>Thành viên công việc</MemberProject>
                            </FlexMemberProject>
                            <Paper className={classes.root}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        </Typography>
                        
                    </GridArea>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cập nhật
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddMemberModal;