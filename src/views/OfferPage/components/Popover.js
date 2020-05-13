import { IconButton } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Routes } from '../contants/routes';
import "./Popover.scss";
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1, 2, 1, 2),
    },
    button: {
        color: "#000000",
    }
}));

export default function ExpandPopover({ offer_id, view }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteModal, setDeleteModal] = React.useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    return (
        <div>
            <IconButton aria-label="delete" a variant="contained" className={classes.button} onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <div className="TaskTable_popover_item">
                    <Typography className={classNames(classes.typography, "Tasktable_option")} onClick={() => history.push(Routes.DETAILOFFER + "/" + offer_id)}>Xem đề xuất</Typography>
                </div>
            </Popover>
        </div >
    );
}