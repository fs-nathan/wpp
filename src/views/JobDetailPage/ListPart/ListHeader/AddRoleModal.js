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
import _ from 'lodash';

function AddRoleModal(props) {
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

    const handleClose = () => {
        props.setOpen(false);
    };


    return (
        <Dialog
            open={props.isOpen}
            maxWidth="sm" fullWidth
            onClose={handleClose}
        >
            <DialogTitle onClose={handleClose} bold >
                Tạo vai trò
        </DialogTitle>
            <DialogContent dividers>
                <TextField
                    // value={'hello'}
                    // onChange={evt => setName(evt.target.value)}
                    margin="normal"
                    variant="outlined"
                    label='Tên vai trò'
                    fullWidth
                    helperText={
                        <ColorTypo variant='caption' color='red'>
                            Không được để trống
                        </ColorTypo>
                    }
                />
                <TextField
                    // value={'description'}
                    // onChange={evt => setDescription(evt.target.value)}
                    margin="normal"
                    variant="outlined"
                    label='Mô tả vai trò'
                    fullWidth
                    helperText={
                        <ColorTypo variant='caption' color='red'>
                            Không được để trống
                        </ColorTypo>
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus color='secondary'
                onClick={() =>
                    handleClose()
                } >
                    HUỶ
          </Button>
                <Button autoFocus color='primary'
                    onClick={() =>
                        handleClose()
                    }>
                    HOÀN THÀNH
          </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddRoleModal;
