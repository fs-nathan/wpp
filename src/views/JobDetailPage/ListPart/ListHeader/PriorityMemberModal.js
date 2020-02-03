import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
// import Grid from "@material-ui/core/Grid";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { mdiCheckboxMarked } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';

const GreenRadio = withStyles({
    root: {
        color: "",
        "&$checked": {
            color: green[600]
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

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

const RowTable = styled(TableRow)`
& > *:not(first-child) {
    & > *:nth-child(1) {
        display: flex;
        flex-direction : column;
        margin: auto;   
        width: 16px;
        height: 16px;
    }
}
`
const CellTable = styled(TableCell)`
    padding: 8px;
`
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

function createData(name, admin, manager, sups, member) {
    return { name, admin, manager, sups, member };
}


function CheckboxMarked() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fill: '#d1d1d1' }}>
            <Icon path={mdiCheckboxMarked} size={1} />
        </div>
    )
}

function PriorityTable(props) {
    return (
        <CellTable style={{ fontSize: '15px', fontWeight: 500 }} align="center">{props.radio}
            <GreenRadio
                style={{ width: 16, height: 16 }}
                checked={props.checked}
                onChange={props.onChange}
                value={props.value}
            />
        </CellTable>
    )
}

const rows = [
    createData("Chỉnh sửa thông tin công việc: Tên, mô tả, loại, nhóm", CheckboxMarked(), CheckboxMarked(), '', ''),
    createData("Chỉnh sửa tiến độ công việc", CheckboxMarked(), CheckboxMarked(), '', ''),
    createData("Cập nhật tiến độ hoàn thành", CheckboxMarked(), '', '', CheckboxMarked()),
    createData("Tạo đề xuất", CheckboxMarked(), CheckboxMarked(), CheckboxMarked(), CheckboxMarked()),
    createData("Phê duyệt đề xuất", CheckboxMarked(), CheckboxMarked(), CheckboxMarked(), ''),
    createData("Quản lý thành viên: Thêm, xóa thành viên", CheckboxMarked(), CheckboxMarked(), '', ''),
    createData("Tạo công việc con", CheckboxMarked(), CheckboxMarked(), '', CheckboxMarked()),
    createData("Chỉnh sửa công việc con", CheckboxMarked(), CheckboxMarked(), CheckboxMarked(), ''),
    createData("Xóa công việc con", CheckboxMarked(), CheckboxMarked(), '', '')
];

function PriorityMemberModal(props) {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog maxWidth="md" fullWidth onClose={handleClose} open={props.isOpen}>
            <DialogTitle onClose={handleClose}>
                Phân quyền thành viên trong công việc
            </DialogTitle>
            <DialogContent dividers>
                <Table>
                    <TableHead>
                        <RowTable>
                            <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>Tên quyền</CellTable>
                            <PriorityTable radio='Admin' value='admin' checked={selectedValue === 'admin'} onChange={handleChange} />
                            <PriorityTable radio='Quản lý' value='quản lý' checked={selectedValue === 'quản lý'} onChange={handleChange} />
                            <PriorityTable radio='Giám sát' value='giám sát' checked={selectedValue === 'giám sát'} onChange={handleChange} />
                            <PriorityTable radio='Thành viên' value='thành viên' checked={selectedValue === 'thành viên'} onChange={handleChange} />
                        </RowTable>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <CellTable component="th" scope="row" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                                    {row.name}
                                </CellTable>
                                <CellTable align="center">{row.admin}</CellTable>
                                <CellTable align="center">{row.manager}</CellTable>
                                <CellTable align="center">{row.sups}</CellTable>
                                <CellTable align="center">{row.member}</CellTable>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color='#222'>
                    Hủy
                </Button>
                <Button autoFocus onClick={handleClose} color='primary'>
                    HOÀN THÀNH
                </Button>
            </DialogActions>
        </Dialog>

    );
}
export default PriorityMemberModal