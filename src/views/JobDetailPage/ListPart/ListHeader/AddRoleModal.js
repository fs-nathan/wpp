import React from 'react';
import {
    TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import _ from 'lodash';

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

function AddRoleModal(props) {
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")

    const handleClose = () => {
        props.setOpen(false)
    }

    const handleSubmit = () => {
        // Call compatible API with 
        if (props.isEditRole) {
            props.editData(props.valueId, name, description)
            handleClose()
        } else {
            props.addData(name, description)
            handleClose()
        }
    }

    React.useEffect(() => {
        setName(props.valueName)
        setDescription(props.valueDes)
    }, [props.valueName, props.valueDes])

    return (
        <Dialog
            open={props.isOpen}
            maxWidth="sm" fullWidth
            onClose={handleClose}>
            {
                props.isEditRole
                    ?
                    <>
                        <DialogTitle onClose={handleClose}>Chỉnh sửa vai trò</DialogTitle>
                        <DialogContent dividers>
                            <TextField
                                value={name}
                                margin="normal"
                                variant="outlined"
                                label='Tên vai trò'
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                helperText={
                                    <ColorTypo variant='caption' color='red'>Không được để trống</ColorTypo>
                                }
                            />
                            <TextField
                                value={description}
                                margin="normal"
                                variant="outlined"
                                label='Mô tả vai trò'
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                helperText={
                                    <ColorTypo variant='caption' color='red'>Không được để trống</ColorTypo>
                                }
                            />
                        </DialogContent>
                    </>
                    :
                    <>
                        <DialogTitle onClose={handleClose}>Tạo vai trò</DialogTitle>
                        <DialogContent dividers>
                            <TextField
                                value={name}
                                margin="normal"
                                variant="outlined"
                                label='Tên vai trò'
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                helperText={
                                    <ColorTypo variant='caption' color='red'>Không được để trống</ColorTypo>
                                }
                            />
                            <TextField
                                value={description}
                                margin="normal"
                                variant="outlined"
                                label='Mô tả vai trò'
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                helperText={
                                    <ColorTypo variant='caption' color='red'>Không được để trống</ColorTypo>
                                }
                            />
                        </DialogContent>
                    </>
            }
            <DialogActions>
                <Button autoFocus color='secondary' onClick={handleClose}>HUỶ</Button>
                <Button autoFocus color='primary' onClick={handleSubmit}>HOÀN THÀNH</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddRoleModal;
